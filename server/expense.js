const mongoose=require('mongoose')


const expenseSchema=new mongoose.Schema({
    expenseId:{
        type:String
    },
    expenseCategory:{
        type:String,
        required:true,
    },
    expenseAmount:{
        type:Number
    },
    expenseDate:{
        type:Date
    },
    budgetType:{
       type:String
    },
    userId:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});


module.exports=mongoose.model("expense",expenseSchema);




