const User=require('../models/users.model')

const createUser=async(userDetails)=>{
    const {email,username,password,name,address,phoneNumber}=userDetails;
    try{
        const newUser={
            email,
            username,
            name,
            password,
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

module.exports={createUser,getAllUsers};