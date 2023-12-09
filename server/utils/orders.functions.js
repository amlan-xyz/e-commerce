const Order = require("../models/orders.model");
const User = require("../models/users.model");

const confirmOrder = async (userId, orderDetails) => {
  const { razorpay_order_id, razorpay_payment_id, delivery_address } =
    orderDetails;
  try {
    const user = await User.findById(userId).populate(
      "cart.item",
      "price name"
    );
    const cart = user.cart;
    for (let i = 0; i < cart.length; i++) {
      let order = await Order.create({
        order_item: cart[i].item.name,
        order_quantity: cart[i].quantity,
        order_value: cart[i].item.price * cart[i].quantity,
        razorpay_order_id,
        razorpay_payment_id,
        delivery_address,
      });
      user.orders.push(order);
    }
    user.cart = [];
    await user.save();
    return user.cart;
  } catch (error) {
    console.error("Error creating order", error);
  }
};

const buyNow = async (userId, orderDetails) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    order_item,
    order_quantity,
    order_value,
    delivery_address,
  } = orderDetails;
  try {
    const user = await User.findById(userId).populate(
      "cart.item",
      "price name"
    );
    const order = await Order.create({
      order_item,
      order_quantity,
      order_value,
      razorpay_order_id,
      razorpay_payment_id,
      delivery_address,
    });
    user.orders.push(order);
    await user.save();
    return order;
  } catch (error) {
    console.error("Error creating order", error);
  }
};

const fetchOrders = async (userId) => {
  try {
    const user = await User.findById(userId).populate("orders");
    return user.orders;
  } catch (error) {
    console.error("Error getting orders", error);
  }
};

module.exports = { confirmOrder, buyNow, fetchOrders };
