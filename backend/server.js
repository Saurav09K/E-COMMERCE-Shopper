import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import connectDb from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';

dotenv.config();
const app = express()


const port = process.env.PORT || 5000;


//middlewares
app.use(express.json())
app.use(cors())
connectDb();
connectCloudinary();

//api endpoint
app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)

app.listen(port,()=>{
    console.log("SERVER IS RUNNING")
})
