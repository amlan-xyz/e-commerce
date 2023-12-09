const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const {
  buyNow,
  confirmOrder,
  fetchOrders,
} = require("../utils/orders.functions");

router.get("", async (req, res) => {
  const { userId } = req.user;
  try {
    const orders = await fetchOrders(userId);
    if (orders) {
      res.status(200).json({ message: "Orders fetched", orders });
    } else {
      res.status(404).json({ message: "Orders not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/checkout", async (req, res) => {
  const orderBody = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: orderBody.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const resultSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === resultSign) {
      res
        .status(200)
        .json({ message: "Success", razorpay_payment_id, razorpay_order_id });
    } else {
      res
        .status(400)
        .json({ message: "Failed", razorpay_payment_id, razorpay_order_id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/razorpay-key", async (req, res) => {
  res.status(200).json({ razorpay_key: process.env.RAZORPAY_KEY });
});

router.post("/confirm", async (req, res) => {
  const { userId } = req.user;
  const orderDetails = req.body;
  try {
    const updatedCart = await confirmOrder(userId, orderDetails);
    if (updatedCart) {
      res.status(200).json({ message: "Order placed", cart: updatedCart });
    } else {
      res.status(400).json({ message: "Failed to place order" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/buy-now", async (req, res) => {
  const { userId } = req.user;
  const orderDetails = req.body;
  try {
    const order = await buyNow(userId, orderDetails);
    if (order) {
      res.status(200).json({ message: "Order placed" });
    } else {
      res.status(400).json({ message: "Failed to place order", order });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
