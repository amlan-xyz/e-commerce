require('dotenv').config()
require('./db')
const express=require('express');
const app=express();

app.use(express.json());

//routes
const productsRoutes=require('./routes/products.routes');
const usersRoutes=require('./routes/users.routes')

app.get('/',(req,res)=>{
    res.send("Its working")
})

app.use('/products',productsRoutes);
app.use('/users',usersRoutes);

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})