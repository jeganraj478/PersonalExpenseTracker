const mongoose=require('mongoose')


const budgetSchema=new mongoose.Schema({
    budgetId:{
        type:String,
        requird:true
    },
    budgetName:{
        type:String
    },
    Amount:{
        type:Number,
    },
    userId:{
        type:String
    }
},{
    timestamps:true
})


module.exports=mongoose.model("Budget",budgetSchema);