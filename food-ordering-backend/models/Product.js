const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Fruit, Vegetable, Non-veg, Breads, etc.
  description: { type: String },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
