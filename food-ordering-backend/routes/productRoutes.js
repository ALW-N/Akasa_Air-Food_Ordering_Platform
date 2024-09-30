// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { updateProductQuantities } = require('../controllers/productController');

// Route for updating product quantities
router.put('/update-quantities', updateProductQuantities);

module.exports = router;
