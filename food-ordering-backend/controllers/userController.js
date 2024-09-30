// controllers/userController.js
const Category = require('../models/Category'); // Adjust the path as necessary
const Product = require('../models/Product'); // Adjust the path as necessary

const getCategoriesForUsers = async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductsForUsers = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getCategoriesForUsers,
    getProductsForUsers
};
