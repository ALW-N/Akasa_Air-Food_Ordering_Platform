const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  items: [{ productId: String, quantity: Number }],
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
