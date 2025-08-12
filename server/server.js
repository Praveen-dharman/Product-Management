const express =require('express')
const db=require('./db');
const cors=require('cors');
require('dotenv').config();

const app=express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
const productRoutes = require('./routes/products.routes');
app.use('/products',productRoutes);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
