import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import reviewRouter from './routes/reviewRouter.js'
import inquiryRouter from './routes/inquiryRouter.js'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization")
    

    if(token!=null){
        token = token.replace("Bearer ","")
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(!err){
                req.user = decoded;
            }
        })
    }
    next()
})


const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);


const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB Connected");
});

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/reviews",reviewRouter)
app.use("/api/inquiries",inquiryRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});

//testuser@gmail.com 123 -user
//testuser1@gmail.com 123 -admin
        



