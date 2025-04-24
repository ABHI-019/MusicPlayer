import express from 'express';
import dotenv from 'dotenv';
import songRoutes from './route.js';
import redis from 'redis';
import cors from 'cors';

dotenv.config();

export const redisClient = redis.createClient({
    password:process.env.Redis_Password,
    socket: {
        host:"redis-15983.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 15983,
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

app.use(cors());

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