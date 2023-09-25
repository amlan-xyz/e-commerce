const express=require('express');
const router=express.Router();

//utils
const {createProduct, getAllProducts, getProductById, updateProductDetails, deleteProduct} =require('../utils/routes.functions')

router.post('',async(req,res)=>{
    const productDetails=req.body;
    try{
        const product=await createProduct(productDetails);
        if(product){
            res.status(201).json({message:"Product Created",data:product});
        }else{
            res.status(404).json({message:"Product not created"})
        }
        
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('',async(req,res)=>{
    try{
        const products=await getAllProducts();
        if(products){
            res.status(200).json({message:"Products found:",data:products});
        }else{
            res.status(404).json({message:"Products not found"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('/:id',async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await getProductById(productId);
        if(product){
            res.status(200).json({message:"Product Found",data:product});
        }else{
            res.status(404).json({message:"Product not found"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.post('/:id/update',async(req,res)=>{
    const productDetails=req.body;
    const productId=req.params.id;
    try{
        const updateProduct=await updateProductDetails(productId,productDetails);
        if(updateProduct){
            res.status(200).json({message:"Product Details Updated",data:updateProduct})
        }else{
            res.status(400).json({message:"Product Updation Failed"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.delete('/:id/delete',async(req,res)=>{
    const productId=req.params.id;
    try{
        const deletedProduct=await deleteProduct(productId);
        if(deletedProduct){
            res.status(200).json({message:"Product Deleted",data:deletedProduct});
        }else{
            res.status(400).json({message:"Product Deletion Failed"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

module.exports=router;