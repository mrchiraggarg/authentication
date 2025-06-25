import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const generateRandomUsername = () => {
    const adjectives = ['Happy', 'Clever', 'Brave', 'Swift', 'Bright', 'Cosmic', 'Mystic', 'Wild'];
    const nouns = ['Explorer', 'Ninja', 'Phoenix', 'Dragon', 'Warrior', 'Sage', 'Pioneer', 'Star'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${randomAdjective}${randomNoun}${randomNum}`;
};

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user.toObject();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // token expires in 1 hour
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

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

        res.status(200).json({
            message: 'User created successfully',
            user: {
                username: savedUser.username,
                fullname: savedUser.fullname,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const DeleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate input
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Find and delete user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}