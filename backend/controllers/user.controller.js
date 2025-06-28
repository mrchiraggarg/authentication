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
            { expiresIn: '24h' } // Extended token expiry
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
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

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Generate a random username
        let username = generateRandomUsername();
        
        // Ensure username is unique
        let existingUsername = await User.findOne({ username });
        while (existingUsername) {
            username = generateRandomUsername();
            existingUsername = await User.findOne({ username });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            username,
            fullname: fullname.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: 'user'
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: savedUser._id,
                username: savedUser.username,
                fullname: savedUser.fullname,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Get all users error:', error);
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

        // Prevent users from deleting themselves
        if (req.user.id === userId) {
            return res.status(400).json({ message: 'You cannot delete your own account' });
        }

        // Find and delete user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'User deleted successfully',
            deletedUser: {
                id: deletedUser._id,
                fullname: deletedUser.fullname,
                email: deletedUser.email
            }
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Find user by ID
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const UpdateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, username } = req.body;

        // Validate input
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (!fullname || !email || !username) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        // Check if email is already taken by another user
        const existingEmailUser = await User.findOne({ 
            email: email.toLowerCase().trim(), 
            _id: { $ne: id } 
        });
        if (existingEmailUser) {
            return res.status(400).json({ message: 'Email is already taken by another user' });
        }

        // Check if username is already taken by another user
        const existingUsernameUser = await User.findOne({ 
            username: username.trim(), 
            _id: { $ne: id } 
        });
        if (existingUsernameUser) {
            return res.status(400).json({ message: 'Username is already taken by another user' });
        }

        // Find and update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { 
                fullname: fullname.trim(), 
                email: email.toLowerCase().trim(), 
                username: username.trim() 
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}