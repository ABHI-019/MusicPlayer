// Explicitly handle OPTIONS for /api/v1/user/register to guarantee CORS headers and 204 response
app.options('/api/v1/user/register', (req, res) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
        'https://music-player-frontend-pi.vercel.app',
        'https://music-player-song.vercel.app',
        'https://music-player-admin-mu.vercel.app',
        'https://music-player-user.vercel.app',
        'http://localhost:5173'
    ];
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    res.sendStatus(204);
});





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


// CORS configuration
const allowedOrigins = [
    'https://music-player-frontend-pi.vercel.app',
    'https://music-player-song.vercel.app',
    'https://music-player-admin-mu.vercel.app',
    'https://music-player-user.vercel.app',
    'http://localhost:5173'
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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