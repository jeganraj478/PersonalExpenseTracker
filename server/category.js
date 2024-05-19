const mongoose=require('mongoose')


const categorySchema=new mongoose.Schema({
    categoryId:{
        type:String,
        required:true
    },
 categoryName:{
        type:String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


module.exports=mongoose.model("Category",categorySchema);