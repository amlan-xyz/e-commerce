const User = require("../models/users.model");

const addToCart = async (productId, userId) => {
  try {
    const user = await User.findById(userId);
    const cartItem = {
      item: productId,
    };
    user.cart.push(cartItem);
    await user.save();
    return cartItem;
  } catch (error) {
    console.error("Failed to add item to cart", error);
  }
};

const getCartItems = async (userId) => {
  try {
    const items = await User.findById(userId).populate("cart.item");
    return items.cart;
  } catch (error) {
    console.error("Failed to get cart items", error);
  }
};

const updateQantity = async (userId, cartItemId, qty) => {
  try {
    const user = await User.findById(userId).populate("cart.item");
    const cartItems = user.cart;
    cartItems.map((item) => {
      if (item._id.toHexString() === cartItemId) {
        item.quantity = qty;
      }
    });
    await user.save();
    return user.cart;
  } catch (error) {
    console.error("Failed to update qunatity", error);
  }
};

const deleteCartItem = async (cartItemId, userId) => {
  try {
    const user = await User.findById(userId).populate("cart.item");
    const cartItems = user.cart;
    const updatedCart = cartItems.filter(
      ({ _id }) => _id.toHexString() !== cartItemId
    );
    user.cart = updatedCart;
    await user.save();
    return user.cart;
  } catch (error) {
    console.error("Failed to delete cart item", error);
  }
};

module.exports = { addToCart, getCartItems, updateQantity, deleteCartItem };
