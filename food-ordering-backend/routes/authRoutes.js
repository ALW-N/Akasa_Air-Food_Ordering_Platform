const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure these are properly defined and imported
const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
