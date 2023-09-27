const bcrypt=require('bcrypt')

//models
const User=require('../models/users.model')

const signup=async(userDetails)=>{
    const {email,username,password,name,address,phoneNumber}=userDetails;
    try{
        const salt=await bcrypt.genSalt(10)        
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser={
            email,
            username,
            name,
            password:hashedPassword,
            address,
            phoneNumber
        };
        const user=new User(newUser);
        await user.save();
        return user;
    }catch(error){
        console.error("Error creating user",error);
    }
}


const getAllUsers=async()=>{
    try{
        const users=await User.find();
        return users;
    }catch(error){
        console.error("Error getting all users:",error)
    }
}

module.exports={signup,getAllUsers};