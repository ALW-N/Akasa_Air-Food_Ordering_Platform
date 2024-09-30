const express = require('express');
const { saveOrder, getAllOrders } = require('../controllers/orderController');
const router = express.Router();

// Route to save an order
router.post('/', saveOrder);

// Route to get all orders
router.get('/', getAllOrders); // Ensure this route exists

module.exports = router;
