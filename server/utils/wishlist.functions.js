const User = require("../models/users.model");
const Product = require("../models/products.model");

const addItemToWishlist = async (productId, userId) => {
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    user.wishlist.push(product);
    await user.save();
    return product;
  } catch (error) {
    console.error("Error adding item to wishlist", error);
  }
};

const getWishlist = async (userId) => {
  try {
    const user = await User.findById(userId).populate("wishlist");
    const wishlist = user.wishlist;
    return wishlist;
  } catch (error) {
    console.log("Error getting wishlist", error);
  }
};

const removeFromWishlist = async (userId, productId) => {
  try {
    const user = await User.findById(userId).populate("wishlist");
    const wishlist = user.wishlist;
    const product = await Product.findById(productId);
    const updatedWishlist = wishlist.filter(
      ({ _id }) => _id.toHexString() !== productId
    );
    user.wishlist = updatedWishlist;
    await user.save();
    return product;
  } catch (error) {
    console.error("Error removing wishlist item", error);
  }
};

module.exports = { addItemToWishlist, getWishlist, removeFromWishlist };
