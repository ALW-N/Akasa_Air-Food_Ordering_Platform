// server.js
require('dotenv').config(); // Load .env file at the top of your server.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Use auth middleware for protected routes
app.use('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
