const mongoose = require("mongoose");

const orderShcema = new mongoose.Schema(
  {
    order_item: {
      type: String,
    },
    order_value: {
      type: Number,
    },
    order_quantity: {
      type: Number,
    },
    razorpay_order_id: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
    },
    delivery_address: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderShcema);
module.exports = Order;
