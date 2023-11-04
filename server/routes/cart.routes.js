const express = require("express");
const router = express.Router();

//utils
const {
  addToCart,
  getCartItems,
  updateQantity,
  deleteCartItem,
} = require("../utils/cart.functions");

router.get("", async (req, res) => {
  const { userId } = req.user;
  try {
    const items = await getCartItems(userId);
    if (items) {
      res.status(200).json({ message: "Cart items found", data: items });
    } else {
      res.status(404).json({ message: "Failed to get cart items" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:product_id", async (req, res) => {
  const productId = req.params.product_id;
  const { userId } = req.user;
  try {
    const cartItem = await addToCart(productId, userId);
    if (cartItem) {
      res.status(201).json({ message: "Added to Cart", data: cartItem });
    } else {
      res.status(400).json({ message: "Adding to cart failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const cartItemId = req.params.id;
  const { userId } = req.user;
  try {
    const updatedCart = await deleteCartItem(cartItemId, userId);
    if (updatedCart) {
      res
        .status(200)
        .json({ message: "Item removed from cart", data: updatedCart });
    } else {
      res.status(400).json({ message: "Cart item deletion failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:id/update-quantity", async (req, res) => {
  const cartItemId = req.params.id;
  const { qty } = req.body;
  const { userId } = req.user;
  try {
    const updatedCart = await updateQantity(userId, cartItemId, qty);
    if (updatedCart) {
      res.status(200).json({ message: "Cart updated", data: updatedCart });
    } else {
      res.status(400).json({ message: "Cart updation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
