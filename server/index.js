const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")

const User = require('./users')
const Category = require('./category')
const Expense = require('./expense')
const Budget = require('./budget');
const createSecretToken = require('./secretToken')

const config = require('./config');

const app = express();
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3001;


//DB
const dbURI = 'mongodb+srv://jeganraj23092000:RdUlneqS1V3c5DsU@cluster0.kqsbpc2.mongodb.net/ExpenseTracker?retryWrites=true&w=majority'

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(port, () => {
      console.log('Server is connected port 3001 and connected to mongodb')
    })
  })
  .catch((error) => {
    console.log(error)
  })


//Middleware
/* 
app.use(cookieParser())
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
 */


app.use(cors());
app.use(bodyParser.json());


//Functions
const uuidFunction = () => {
  return uuidv4()
}

// Middleware
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = header.split(' ')[1];

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.id = user.userUniqueId;
    next();
  });
};



app.post('/verifyToken', verifyToken, (req, res) => {
  res.json({ status: true, message: 'Token verified successfully' });
});

//Routes


//Signup
app.post("/signup", async (req, res) => {
  try {

    const { username, email, password } = req.body;
    const userUniqueId = uuidv4();
    const hashPassword = await bcrypt.hash(password, 10)

    const addUser = new User({ userUniqueId, username, email, password: hashPassword })
    const newUser = await addUser.save()
    const token = createSecretToken(newUser)
    /* res.cookie("token", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000}) */
    res.status(201).json({ message: "User Signed in successfully", id: newUser.userUniqueId, token: token })
  } catch (error) {
    console.error("Error during sign-up:", error);

    res.status(500).json({ error })

  }
})



app.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: "Invalid username and password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username and password" })

    }
    const token = createSecretToken(user._id);
    res.status(200).json({ message: "Login successful", id: user.userUniqueId, token: token })

  } catch (error) {
    res.status(500).json({ error })
  }
})




//Category

app.post("/saveCategory", verifyToken, async (req, res) => {
  try {
    const { Name, Description, userId } = req.body;
    const id = uuidFunction()
    const category = new Category({
      categoryId: id,
      categoryName: Name,
      categoryDescription: Description,
      userId: userId
    }
    )
    await category.save();
    res.status(201).json({ message: "Category saved successfully" })

  } catch {
    res.status(500).json({ message: "Error saving category" })
  }
})

app.post("/updateCategory", async (req, res) => {
  try {
    const { categoryId, Name, Description, userId } = req.body;

    const updatedCategory = await Category.updateOne(
      {
        categoryId: categoryId,
        userId: userId
      }, // Filter criteria
      {
        categoryName: Name,
        categoryDescription: Description,

      }
    );
    res.status(201).json({ message: "Category updated successfully" });


    /* if (updatedCategory.n > 0) {
      res.status(201).json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    } */

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating Category" });
  }
});

app.post('/fetchAllCategory', verifyToken, async (req, res) => {
  try {

    const { userId } = req.body;
    const { sortBy, sortOrder, searchTerm } = req.query;

    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const query  = { userId }
    if (searchTerm && searchTerm.trim() != "") {
      query.$or = [
        { categoryName: { $regex: new RegExp(searchTerm, 'i') } },
        { categoryDescription: { $regex: new RegExp(searchTerm, 'i') } }
      ]
    }

    const category = await Category.find(query).sort(sortOptions);

    res.status(201).json(category);
  } catch {
    res.status(500).json({ message: "Error fetching categories" });
  }
})



app.delete("/deleteCategory", verifyToken, async (req, res) => {
  try {

    const { categoryId } = req.query;

    const result = await Category.deleteOne({
      categoryId: categoryId,
    }
    )

    if ((result).deletedCount > 0) {
      res.status(200).json({ message: "Category Deleted successfully" })
    } else {
      res.status(404).json({ message: "`No data found" })

    }
  } catch {
    res.status(500).json({ message: "Error deleteting Category" })
  }
})



//Expense

app.post("/saveExpense", verifyToken, async (req, res) => {
  const id = uuidFunction()
  try {
    const { Category, Date, Amount, userId, Budget } = req.body;
    const expense = new Expense({
      expenseId: id,
      expenseCategory: Category,
      expenseDate: Date,
      expenseAmount: Amount,
      budgetType: Budget,
      userId: userId
    }
    )
    await expense.save();
    res.status(201).json({ message: "Expense saved successfully" })

  } catch {
    res.status(500).json({ message: "Error saving expense" })
  }
})


app.post("/updateExpense", verifyToken, async (req, res) => {
  try {
    const { expenseId, Category, Date, Amount, userId, Budget } = req.body;

    const updatedExpense = await Expense.updateOne(
      { expenseId: expenseId, userId: userId }, // Filter criteria
      {
        expenseCategory: Category,
        expenseDate: Date,
        expenseAmount: Amount,
        budgetType: Budget,

      }
    );
    res.status(201).json({ message: "Expense updated successfully" });

    /*
    if (updatedExpense.nModified !== undefined || updatedExpense.nModified > 0) {
      if (updatedExpense.nModified > 0) {
        res.status(201).json({ message: "Expense updated successfully" });
      } else {

        res.status(404).json({ message: "Expense not found or not modified" });
      }
    } else {
      res.status(500).json({ message: "Error updating expense" });
    }
*/

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating expense" });
  }
});



app.delete("/deleteExpense", verifyToken, async (req, res) => {
  try {

    const { expenseId } = req.query;

    const result = await Expense.deleteOne({
      expenseId: expenseId,
    }
    )
    if ((result).deletedCount > 0) {
      res.status(200).json({ message: "Expense Deleted successfully" })
    } else {
      res.status(404).json({ message: "`No data found" })

    }


  } catch {
    res.status(500).json({ message: "Error deleteting expense" })
  }
})


app.post('/fetchExpense', verifyToken, async (req, res) => {
  try {
    const { userId } = req.body;
    const { sortBy, sortOrder, searchTerm } = req.query;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const query = { userId };

    if (searchTerm && searchTerm.trim() !== "") {
      const partialMatchForCategory = { $regex: new RegExp(searchTerm, 'i') };
      const partialMatchForAmount = { $regex: new RegExp(searchTerm, 'i') }
      const partialMatchForDate = { $regex: new RegExp(searchTerm, 'i') }
      query.$or = [
        { expenseCategory: partialMatchForCategory },
        { formattedExpenseAmount: partialMatchForAmount },
        { formattedExpenseDate: partialMatchForDate }
      ];

    }
    const expenses = await Expense.aggregate([
      {
        $addFields: {
          formattedExpenseDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$expenseDate" }
          },
          formattedExpenseAmount: { $toString: "$expenseAmount" }
        }
      },
      { $sort: sortOptions },
      { $match: query }
    ]);

    res.status(201).json(expenses);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching expenses" });
  }
});




app.post('/fetchAllExpense', verifyToken, async (req, res) => {
  try {
    const { userId } = req.body;

    const expenses = await Expense.find({ userId });
    res.status(201).json(expenses);

  } catch {
    res.status(500).json({ message: "Error fetching expenses" });
  }

})


//Budget

app.post("/saveBudget", verifyToken, async (req, res) => {
  try {
    const { Name, Amount, userId } = req.body;
    const id = uuidFunction()
    const budget = new Budget({
      budgetId: id,
      budgetName: Name,
      Amount: Amount,
      userId: userId
    }
    )
    await budget.save();
    res.status(201).json({ message: "Budget saved successfully" })

  } catch {
    res.status(500).json({ message: "Error saving budget" })
  }
})

app.post("/updateBudget", verifyToken, async (req, res) => {
  try {
    const { budgetId, Name, Amount, userId } = req.body;

    const updatedBudget = await Budget.updateOne(
      { budgetId: budgetId, userId: userId }, // Filter criteria
      {
        budgetName: Name,
        Amount: Amount,

      }
    );
    res.status(201).json({ message: "Budget updated successfully" });

    /* if (updatedBudget.n > 0) {
      res.status(201).json({ message: "Budget updated successfully" });
    } else {
      res.status(404).json({ message: "Budget not found" });
    } */

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating Budget" });
  }
});

app.delete("/deleteBudget", verifyToken, async (req, res) => {
  try {

    const { budgetId } = req.query;

    const result = await Budget.deleteOne({
      budgetId: budgetId,
    }
    )

    if ((result).deletedCount > 0) {
      res.status(200).json({ message: "Budget Deleted successfully" })
    } else {
      res.status(201).json({ message: "`No data found" })

    }
  } catch {
    res.status(500).json({ message: "Error deleteting Budget" })
  }
})

app.post('/fetchBudget', verifyToken, async (req, res) => {
  const { userId } = req.body;
  try {
    const budget = await Budget.find({ userId });
    res.status(201).json(budget);

  } catch {
    res.status(500).json({ message: "Error fetching budget" });
  }
})











