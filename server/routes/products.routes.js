const express=require('express');
const router=express.Router();

const Products=require('../models/products.model')

router.post('',async(req,res)=>{
    try{
        const item={
            name:"Product Name",
            price:45,
            category:"T-shirts",
            image:"Img src"
        }
        const newProduct=new Products(item);
        await newProduct.save();
        res.status(201).json({message:"Product Created",data:newProduct});
    }catch(error){
        res.status(500).json(error);
    }
    
})

module.exports=router;