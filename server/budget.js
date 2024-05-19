const mongoose=require('mongoose')


const budgetSchema=new mongoose.Schema({
    budgetId:{
        type:String,
        requird:true
    },
    budgetName:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


module.exports=mongoose.model("Budget",budgetSchema);