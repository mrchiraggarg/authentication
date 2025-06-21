import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

console.log("Environment Variables:", process.env);

const app = express();

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });