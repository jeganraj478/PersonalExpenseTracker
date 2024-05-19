const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    userUniqueId:{
        type:String,
        required:true,
    },
    username: {
        type: String,
        required: [true,"Your username address is required"],
        unique: [true,"Username exists"],
    },
    email: {
        type: String,
        required:  [true, "Your email is required"],
        unique: [true,"Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Your password is required"]

    }
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);