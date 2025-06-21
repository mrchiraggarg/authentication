import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/user.route.js';
import { connect } from 'mongoose';
// import { BASE_URL, API_PATHS } from './utils/api-path.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connected successfully"))
        .catch(err => console.error("MongoDB connection failed:", err));
});

app.use('/api/user', UserRoute);