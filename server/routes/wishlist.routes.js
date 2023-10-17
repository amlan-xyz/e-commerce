const express = require("express");
const router = express.Router();

const {
  addItemToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../utils/wishlist.functions");

router.get("", async (req, res) => {
  const { userId } = req.user;
  try {
    const wishlist = await getWishlist(userId);
    if (wishlist) {
      res.status(200).json({ message: "Wishlist:", data: wishlist });
    } else {
      res.status(404).json({ message: "Wishlist not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:id", async (req, res) => {
  const productId = req.params.id;
  const { userId } = req.user;
  try {
    const wishlistItem = await addItemToWishlist(productId, userId);
    if (wishlistItem) {
      res
        .status(200)
        .json({ message: "Item added to wishlist", data: wishlistItem });
    } else {
      res.status(400).json({ message: "Failed to add to wishlist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const { userId } = req.user;
  try {
    const updatedWishlist = await removeFromWishlist(userId, productId);
    if (updatedWishlist) {
      res
        .status(200)
        .json({ message: "Updated wishlist", data: updatedWishlist });
    } else {
      res.status(400).json({ message: "Failed to remove item from wishlist" });
    }
  } catch (error) {}
});

module.exports = router;
