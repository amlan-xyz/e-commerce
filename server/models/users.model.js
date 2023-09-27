const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    profilePicture:{
        type:String,
        required:true,
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema);
module.exports=User;