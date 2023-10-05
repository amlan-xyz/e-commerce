const express=require('express');
const router=express.Router();

//utils
const { addToCart,getCartItems, updateQantity, deleteCartItem } =require( '../utils/cart.functions');

router.get('',async(req,res)=>{
    const {userId}=req.body;
    try{
        const items=await getCartItems(userId);
        if(items){
            res.status(200).json({message:"Cart items found",data:items});
        }else{
            res.status(404).json({message:"Failed to get cart items"})
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

router.post('/:product_id',async(req,res)=>{
    const productId=req.params.product_id;
    const {userId}=req.body;
    try{
        const updatedCart=await addToCart(productId,userId);
        if(updatedCart){
            res.status(201).json({message:"Added to Cart",data:updatedCart});
        }else{
            res.status(400).json({message:"Adding to cart failed"})
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

router.delete('/:product_id',async(req,res)=>{
    const productId=req.params.product_id;
    const {userId}=req.body;
    try{
        const updatedCart=await deleteCartItem(productId,userId);
        if(updatedCart){
            res.status(200).json({message:"Item removed from cart",data:updatedCart})
        }else{
            res.status(400).json({message:"Cart item deletion failed"})
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

router.post('/:product_id/update-quantity',async(req,res)=>{
    const productId=req.params.product_id;
    const {userId,qty}=req.body;
    try{
        const updatedCart=await updateQantity(userId,productId,qty);
        if(updatedCart){
            res.status(200).json({message:"Cart updated",data:updatedCart});
        }else{
            res.status(400).json({message:"Cart updation failed"});
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

module.exports=router;