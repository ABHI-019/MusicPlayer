import express from 'express';
import dotenv from 'dotenv';
import songRoutes from './route.js';

dotenv.config();

const app = express();

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