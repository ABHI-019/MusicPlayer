import express from 'express';
import dotenv from 'dotenv';
import songRoutes from './route.js';
import redis from 'redis';
import cors from 'cors';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB_URL', 'Redis_Password'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

export const redisClient = redis.createClient({
    password:process.env.Redis_Password,
    socket: {
        host:process.env.Redis_Host || "redis-18948.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: parseInt(process.env.Redis_Port || "18948"),
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

const app = express();


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

// Use express.json() before routes
app.use(express.json());

app.use("/api/v1", songRoutes);

// Set default port if not provided
const PORT = process.env.PORT || 8000;

// Optional: Add a root endpoint for health check
app.get('/', (req, res) => {
    res.send('Song Service is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});