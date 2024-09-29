
// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
            role: 'user' // Always assign 'user' role during registration
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Check if it's the static admin user
        if (identifier === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Admin logged in successfully', token });
        }

        // Otherwise, treat as a regular user
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { phoneNumber: identifier }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token with user's role (user role in this case)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
};
