import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js';
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

app.listen(port,()=>{
    console.log("SERVER IS RUNNING")
})
