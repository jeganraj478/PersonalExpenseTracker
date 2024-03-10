const mongoose=require('mongoose')
const sequence = require('mongoose-sequence')(mongoose)

const categorySchema=new mongoose.Schema({
    categoryId:{
        type:String,
        required:true
    },
 categoryName:{
        type:String
    },
    categoryDescription:{
        type:String,
    },
    userId:{
        type:Number
    }
},{
    timestamps:true
})


module.exports=mongoose.model("Category",categorySchema);