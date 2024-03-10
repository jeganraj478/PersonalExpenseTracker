const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

const Category = require('./category')
const Expense = require('./expense')
const Budget = require('./budget')

const app = express();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
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
app.use(bodyParser.json());
app.use(cors())


//Routes


//Category

app.post("/saveCategory", async (req, res) => {
  try {
    const { Name, Description, userId } = req.body;
    const id =uuidv4()
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

app.post('/fetchAllCategory', async (req, res) => {
  try {
    const { userId } = req.body;
    const { sortBy, sortOrder } = req.query;
    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const category = await Category.find({ userId }).sort(sortOptions);
    res.status(201).json(category);
  } catch {
    res.status(500).json({ message: "Error fetching categories" });
  }
})



//Expense

app.post("/saveExpense", async (req, res) => {
  try {
    const { Category, Date, Amount, userId, Budget } = req.body;
    const id =uuidv4()
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


app.post("/updateExpense", async (req, res) => {
  try {
    const { expenseId, Category, Date, Amount, userId, Budget } = req.body;

   const updatedExpense=await Expense.updateOne({
      expenseId: expenseId,
      expenseCategory: Category,
      expenseDate: Date,
      expenseAmount: Amount,
      budgetType: Budget,
      userId: userId
    }
    )
    res.status(201).json({ message: "Expense updated successfully" })
   

  } catch {
    res.status(500).json({ message: "Error updating expense" })
  }
})


app.delete("/deleteExpense", async (req, res) => {
  try {
  
  
    const { expenseId } = req.query;

    const result = await Expense.deleteMany({
      expenseId: expenseId,
    }
    )
    
    if ((result).deletedCount > 0) {
      res.status(201).json({ message: "Expense Deleted successfully" })
    } else {
      res.status(201).json({ message: "`No data found" })
      
    }
  } catch {
    res.status(500).json({ message: "Error deleteting expense" })
  }
})

app.post('/fetchAllExpense', async (req, res) => {
  try {
    const { userId } = req.body;
    const { sortBy, sortOrder, searchTerm } = req.query;

    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const query = { userId }
    if (searchTerm && searchTerm.trim() !== "") {
      query.$or = [
        { expenseCategory: { $regex: new RegExp(searchTerm, 'i') } },
        { expenseAmount: { $regex: new RegExp(searchTerm, 'i') } },
        { expenseDate: { $regex: new RegExp(searchTerm, 'i') } }
      ]
    }

    const expenses = await Expense.find(query).sort(sortOptions);
    res.status(201).json(expenses);

  } catch {
    res.status(500).json({ message: "Error fetching expenses" });
  }
})


//Budget

app.post("/saveBudget", async (req, res) => {
  try {
    const { Name, Amount, userId } = req.body;
    const id =uuidv4()
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


app.post('/fetchBudget', async (req, res) => {
  const { userId } = req.body;
  try {
    const budget = await Budget.find({ userId });
    res.status(201).json(budget);

  } catch {
    res.status(500).json({ message: "Error fetching budget" });
  }
})




