require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

//cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://candyland-by-amlan.vercel.app"],
  })
);

// const seedProducts = require("./seeds/product.seeding");

// seedProducts();

//routes
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");
const { authVerify } = require("./middlewares/auth-verify.middleware");

app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/carts", authVerify, cartRoutes);
app.use("/wishlist", authVerify, wishlistRoutes);
app.use("/orders", authVerify, orderRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
