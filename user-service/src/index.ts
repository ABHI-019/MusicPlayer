import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRoutes from './route.js';
import cors from 'cors';


dotenv.config()

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SEC'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

const connectDb= async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI as string,{
            dbName : "Spotify"

        });
        console.log("Mongo DB Connected");

    } catch(error){
        console.log(error);
    }
}

const app=express()

app.use(cors());

app.use(express.json())

app.use("/api/v1",userRoutes);

app.get("/",(req,res)=>{
    res.send("server is running")
});
const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDb()
})