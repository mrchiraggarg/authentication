import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// console.log("Environment Variables:", process.env.PORT);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/api/user/CreateUser', (req, res) => {
    const user = req.body;
    console.log('User data received:', user);
    res.status(201).json({ message: 'User created successfully', user });
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });