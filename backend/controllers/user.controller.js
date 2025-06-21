import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";

const generateRandomUsername = () => {
    const adjectives = ['Happy', 'Clever', 'Brave', 'Swift', 'Bright', 'Cosmic', 'Mystic', 'Wild'];
    const nouns = ['Explorer', 'Ninja', 'Phoenix', 'Dragon', 'Warrior', 'Sage', 'Pioneer', 'Star'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${randomAdjective}${randomNoun}${randomNum}`;
};

export const CreateUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Validate input
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a random username
        const username = generateRandomUsername();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            fullname,
            email,
            password: hashedPassword,
            role: 'user'
        });

        const savedUser = await newUser.save();

        res.status(201).json({ 
            message: 'User created successfully', 
            user: {
                username: savedUser.username,
                fullname: savedUser.fullname,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (error) {
        // console.error('Error creating user:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: error 
        });
    }
}