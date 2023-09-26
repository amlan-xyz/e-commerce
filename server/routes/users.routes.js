const express=require('express');
const router=express.Router();

//models
const User=require('../models/users.model')

//utils
const { signup, getAllUsers } = require('../utils/users.functions');

router.post('',async(req,res)=>{
    const userDetails=req.body;
    const isUserExist=await User.findOne({email:userDetails.email});

    if(isUserExist){
        const msg="Email already taken";
        console.error(new Error(msg));
        return res.status(403).json({error:msg})
    }else{
        try{
            const newUser=await signup(userDetails);
            if(newUser){
                res.status(201).json({message:"Signup successful",data:newUser});
            }else{
                res.status(400).json({message:"Signup failed"});
            }
        }catch(error){
            res.status(500).json({message:"Interanl Server Error"});
        }
    }
})

router.get('',async(req,res)=>{
    try{
        const users=await getAllUsers();
        if(users){
            res.status(200).json({message:"Users found",data:users});
        }else{
            res.status(404).json({message:"Users not found"});
        }
    }catch(error){
        res.status(500).json({message:"Interanl Server Error"});
    }
})

module.exports=router;