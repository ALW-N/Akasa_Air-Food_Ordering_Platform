// server.js
require('dotenv').config(); // Load .env file at the top of your server.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
const errorHandler = require('./middleware/errorHandler');
const multer = require('multer');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Specify the allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(express.json());
app.use('/api/products', require('./routes/productRoutes'));

// Set up Multer storage and file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where images will be saved
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName); // Use a unique filename
    },
});

const upload = multer({ storage });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', upload.single('image'), require('./routes/adminRoutes')); // Use upload middleware for admin routes
app.use('/api/user', require('./routes/userRoutes')); // Add user routes

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
