// controllers/productController.js
const Product = require('../models/Product');

const updateProductQuantities = async (req, res) => {
    const items = req.body.items; // Expecting items to be an array of { id, quantity }

    try {
        // Loop through each item to update quantities
        for (const item of items) {
            const productId = item.id;
            const quantityToUpdate = item.quantity;

            // Find the product by ID
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found.` });
            }

            // Check if there's enough quantity to fulfill the request
            if (product.quantity < quantityToUpdate) {
                return res.status(400).json({ message: `Not enough quantity for product ID ${productId}.` });
            }

            // Update the product quantity
            product.quantity -= quantityToUpdate; // Subtract the purchased quantity
            await product.save();
        }

        return res.status(200).json({ message: 'Product quantities updated successfully.' });
    } catch (error) {
        console.error("Error updating product quantities:", error);
        return res.status(500).json({ message: "Failed to update product quantities." });
    }
};

module.exports = { updateProductQuantities };
