import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/user.route.js';
import { connect } from 'mongoose';
import cors from 'cors';
// import { BASE_URL, API_PATHS } from './utils/api-path.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins for simplicity, adjust as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

const PORT = process.env.PORT || 5000;

// app.use(loggingMiddleware);
app.use('/api/user', authorizeUserAccess, UserRoute);

app.listen(PORT, () => {
    connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connected successfully"))
        .catch(err => console.error("MongoDB connection failed:", err));
});

// function loggingMiddleware(req, res, next) {
//     console.log(`${new Date().toISOString()}: ${req.method} request to ${req.url}`);
//     next();
// }

function authorizeUserAccess(req, res, next) {
    const user = req.user; // Assuming user information is attached to the request
    const resource = req.originalUrl;

    console.error(`Authorization check for user: ${user ? user.id : 'unknown'} on resource: ${resource}`);

    // Implement your authorization logic here
    if (user && user.permissions.includes('admin')) {
        user.admin = true; // Example of setting an admin flag
        console.log(`User ${user.id} is authorized for resource: ${resource}`);
        next(); // User is authorized
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}