// routes/adminRoutes.js
const express = require('express');
const {
    createCategory,
    getCategories,
    createProduct,
    getProducts,
    updateProduct,
    updateProductQuantity,
    deleteProduct
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/admin/category
router.post('/category', authMiddleware, createCategory);

// GET /api/admin/categories
router.get('/categories', authMiddleware, getCategories);

// POST /api/admin/product
router.post('/product', authMiddleware, createProduct);

// GET /api/admin/products
router.get('/products', authMiddleware, getProducts);

// PUT /api/admin/product
router.put('/product', authMiddleware, updateProduct);

// PUT /api/admin/product/quantity
router.put('/product/quantity', authMiddleware, updateProductQuantity);

// DELETE /api/admin/product/:productId
router.delete('/product/:productId', authMiddleware, deleteProduct);

module.exports = router;
