const Products=require('../models/products.model');

const createProduct=async(productDetails)=>{
    try{
        const item={
            name:productDetails.name,
            price:productDetails.price,
            category:productDetails.category,
            image:productDetails.image
        }
        const newProduct=new Products(item);
        await newProduct.save();
        return newProduct;
    }catch(error){
        console.error("Error creating product:",error);
    }
}

const getAllProducts=async()=>{
    try{
        const products=await Products.find({});
        return products;
    }catch(error){
        console.error("Error getting all products:",error);
    }
}

const getProductById=async(productId)=>{
    try{
        const product=await Products.findById(productId);
        return product;
    }catch(error){
        console.error("Error getting product:",error);
    }
}

const updateProductDetails=async(productId,productDetails)=>{
    try{
        const updateProduct=await Products.findByIdAndUpdate(productId,productDetails,{new:true});
        await updateProduct.save();
        return updateProduct;
    }catch(error){
        console.error("Error updating product:",error);
    }
}

const deleteProduct=async(productId)=>{
    try{
        const deletedProduct=await Products.findByIdAndDelete(productId);
        return deletedProduct;
    }catch(error){
        console.error("Error deleting product:",error);
    }
}

module.exports={createProduct,getAllProducts,getProductById,updateProductDetails,deleteProduct};