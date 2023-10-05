const User=require('../models/users.model');

const addToCart=async(productId,userId)=>{
    try{
        const user=await User.findById(userId);
        const cartItem={
            item:productId
        }
        user.cart.push(cartItem);
        await user.save();
        return user.cart;
    }catch(error){
        console.error("Failed to add item to cart",error);
    }
}

const getCartItems=async(userId)=>{
    try{
        const items=await User.findById(userId).populate('cart');
        return items.cart;
    }catch(error){
        console.error("Failed to get cart items",error);
    }
}

const updateQantity=async(userId,productId,qty)=>{
    try{
        const user=await User.findById(userId).populate('cart.item');
        const cartItems=user.cart;
        cartItems.map(cart=>{
            if(cart.item._id.toHexString()===productId){
                const newQty=cart.quantity+qty
                cart.quantity=newQty;
            }
        })
        await user.save();
        return user.cart;
    }catch(error){
        console.error("Failed to update qunatity",error);
    }
}

const deleteCartItem=async(productId,userId)=>{
    try{
        const user=await User.findById(userId).populate('cart.item');
        const cartItems=user.cart;
        const updatedCart=cartItems.filter(item=>item._id.toHexString()===productId);
        user.cart=updatedCart;
        await user.save();
        return user.cart;
    }catch(error){
        console.error("Failed to delete cart item",error);
    }
}

module.exports={addToCart,getCartItems,updateQantity,deleteCartItem};