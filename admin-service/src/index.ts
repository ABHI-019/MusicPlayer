import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import adminRoutes from "./route.js";    
import cloudinary from "cloudinary";
import redis from 'redis';
import cors from "cors";

dotenv.config();

export const redisClient = redis.createClient({
    password:process.env.Redis_Password,
    socket: {
        host:"redis-12367.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 12367,
    },

});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

redisClient.connect().then(() => {
    console.log('Connected to Redis server')
}).catch((err) => {
    console.error('Redis connection error', err)
});

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api_Key,
    api_secret: process.env.Cloud_Api_Secret,
});


const app = express();

app.use(cors());

app.use(express.json());

async function initDB(){
    try{
        await sql`
        CREATE TABLE IF NOT EXISTS album (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
        `;

        await sql`
        CREATE TABLE IF NOT EXISTS songs (
           id SERIAL PRIMARY KEY,
           title VARCHAR(255) NOT NULL,
           description VARCHAR(255) NOT NULL,
           thumbnail VARCHAR(255),
           audio VARCHAR(255) NOT NULL,
           album_id INT REFERENCES album(id) ON DELETE SET NULL,
           created_at TIMESTAMP DEFAULT NOW()
        )
        `;

        console.log("Database initialized Successfully");  
    }catch(error){
        console.log("error initializing database", error);
    }
}

app.use("/api/v1",adminRoutes);

const port = process.env.PORT;
initDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to initialize database:", error);
});
