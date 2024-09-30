// orderController.js
const Order = require('../models/Order'); // Ensure this path is correct

const saveOrder = async (req, res) => {
    try {
      const { orderId } = req.body;
  
      const existingOrder = await Order.findOneAndUpdate(
        { orderId },
        req.body,
        { new: true, upsert: true } // This will update or create a new order
      );
  
      res.status(201).json({ message: 'Order saved successfully', order: existingOrder });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ message: 'Failed to save order', error: error.message });
    }
  };

module.exports = {
  saveOrder,
};
