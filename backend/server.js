import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/user.route.js';

dotenv.config();

// console.log("Environment Variables:", process.env.PORT);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', UserRoute);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });