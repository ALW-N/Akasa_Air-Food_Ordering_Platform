import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

const AdminDashboard = () => {
    const [categoryName, setCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
            const response = await axios.get('/api/admin/categories', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });
            console.log("Categories fetched:", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            alert(`Failed to fetch categories: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('/api/admin/category', 
                { name: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.message);
            setCategoryName('');
            fetchCategories();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to add category');
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('/api/admin/product', {
                name: productName,
                description: productDescription,
                price: productPrice,
                category: productCategory,
                quantity: productQuantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductCategory('');
            setProductQuantity('');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to add product');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin panel!</p>

            {/* Category Form */}
            <h2>Add Category</h2>
            <form onSubmit={handleAddCategory}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <button type="submit">Add Category</button>
            </form>

            {/* Product Form */}
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name} {/* Display category name */}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Product Quantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
