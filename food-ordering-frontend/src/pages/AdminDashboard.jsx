import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

const AdminDashboard = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [categories, setCategories] = useState([]);


    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found, please log in again.');
            return;
        }

        try {
            const response = await axios.get('/api/admin/categories', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(response.data);
        } catch (error) {
            alert(`Failed to fetch categories: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const file = categoryImage;

        if (!file) {
            alert('Please select a file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64data = reader.result; // Convert to Base64
            try {
                const response = await axios.post('/api/admin/category', 
                    { name: categoryName, image: base64data },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                alert(response.data.message);
                setCategoryName('');
                setCategoryImage(null);
                fetchCategories();
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to add category');
            }
        };

        reader.readAsDataURL(file);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        if (!productImage) {
            alert('Please select a product image');
            return;
        }
    
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64data = reader.result; // Convert to Base64
    
            const productData = {
                name: productName,
                description: productDescription,
                price: productPrice,
                category: productCategory,
                quantity: productQuantity,
                image: base64data,
            };
    
            try {
                const response = await axios.post('/api/admin/product', productData, {
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
                setProductImage(null);
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to add product');
            }
        };
    
        // Read the selected product image as a Data URL (Base64)
        reader.readAsDataURL(productImage);
    };
    

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Add Category</h2>
            <form onSubmit={handleAddCategory}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setCategoryImage(e.target.files[0])}
                    accept="image/*"
                    required
                />
                <button type="submit">Add Category</button>
            </form>

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
                            {category.name}
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
