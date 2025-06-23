//creating server - 'mean that this file sets up and starts the backend server that will listen for incoming requests (like from your frontend).'
// Add type:module in package.json To use the import in index.js like react style instead of writing an old way const express=require('express') 
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
dotenv.config({})

const app=express(); 

//creating api
/*app.get("/home",(req,res)=>{
    return res.status(200).json({
        meessage:"I am coming from the backend",
        success:true
    })
});*/

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions={
    origin:'http://localhost:5173', //Frontend localhost
    credentials:true
}
app.use(cors(corsOptions));

const PORT=process.env.PORT||3000; // Either it takes 8000 or 3000

//API's
app.use("/api/v1/user", userRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server Running at Port ${PORT}`)
}
)
