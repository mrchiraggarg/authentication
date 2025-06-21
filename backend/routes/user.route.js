import { Router } from "express";

const router = Router();

router.post('/CreateUser', (req, res) => {
    const user = req.body;
    console.log('User data received:', user);
    res.status(201).json({ message: 'User created successfully', user });
});