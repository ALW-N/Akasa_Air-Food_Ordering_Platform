const Category = require('../models/Category');
const Product = require('../models/Product');

const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Category creation failed', error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, category, quantity } = req.body;

    try {
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            quantity,
        });
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Product creation failed', error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { productId, name, description, price, category, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price !== undefined) product.price = price;
        if (category) product.category = category;
        if (quantity !== undefined) product.quantity = quantity;

        await product.save();
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Product update failed', error: error.message });
    }
};

const updateProductQuantity = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.quantity = quantity;
        await product.save();

        res.status(200).json({ message: 'Product quantity updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Product quantity update failed', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Product deletion failed', error: error.message });
    }
};

module.exports = {
    createCategory,
    getCategories,
    createProduct,
    getProducts,
    updateProduct,
    updateProductQuantity,
    deleteProduct,
};
