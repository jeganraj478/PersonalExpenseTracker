const mongoose=require('mongoose')


const expenseSchema=new mongoose.Schema({
    expenseId:{
        type:String,
        required:true
    },
    expenseCategory:{
        type:String,
        required:true,
    },

    expenseAmount:{
        type:Number,
        required:true
    },
    expenseDate:{
        type:Date,
        required:true
    },
    budgetType:{
       type:String,
       required:true
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


module.exports=mongoose.model("expense",expenseSchema);




