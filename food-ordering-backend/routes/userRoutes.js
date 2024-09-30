// routes/userRoutes.js
const express = require('express');
const {
    getCategoriesForUsers,
    getProductsForUsers
} = require('../controllers/userController'); // Create this controller
const router = express.Router();

// GET /api/categories
router.get('/categories', getCategoriesForUsers);

// GET /api/products
router.get('/products', getProductsForUsers);

module.exports = router;
