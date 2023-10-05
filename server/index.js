require('dotenv').config()
require('./db')
const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.json());

//cors
app.use(cors({
    origin: 'http://localhost:3000'
}));

// const seedProducts=require('./seeds/product.seeding')

// seedProducts();

//routes
const productsRoutes=require('./routes/products.routes');
const usersRoutes=require('./routes/users.routes')
const cartRoutes=require('./routes/cart.routes')

app.get('/',(req,res)=>{
    res.send("Its working")
})

app.use('/products',productsRoutes);
app.use('/users',usersRoutes);
app.use('/carts',cartRoutes);

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})