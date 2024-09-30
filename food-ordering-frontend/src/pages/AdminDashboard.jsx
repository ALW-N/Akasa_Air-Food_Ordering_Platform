import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

const AdminDashboard = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null); // State for category image
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productImage, setProductImage] = useState(null); // State for product image
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        console.log('Fetched token:', token); // Debugging line
        if (!token) {
            alert('No token found, please log in again.');
            return;
        }
    
        try {
            const response = await axios.get('/api/admin/categories', {
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure correct format
                },
            });
            console.log("Categories fetched:", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error.response?.data || error.message);
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
    
        const token = localStorage.getItem('token');
        const reader = new FileReader();
    
        reader.onloadend = async () => {
            const base64data = reader.result;
            console.log('Adding category:', { name: categoryName, image: base64data }); // Debugging line
            try {
                const response = await axios.post('/api/admin/category', 
                    { name: categoryName, image: base64data },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert(response.data.message);
                setCategoryName('');
                setCategoryImage(null);
                fetchCategories();
            } catch (error) {
                console.error('Error adding category:', error.response?.data || error.message); // Debugging line
                alert(error.response?.data?.message || 'Failed to add category');
            }
        };
    
        reader.readAsDataURL(file);
    };
    

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('category', productCategory);
        formData.append('quantity', productQuantity);
        if (productImage) {
            formData.append('image', productImage);
        }

        try {
            const response = await axios.post('/api/admin/product', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductCategory('');
            setProductQuantity('');
            setProductImage(null); // Reset product image
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
                <input
                    type="file"
                    onChange={(e) => setCategoryImage(e.target.files[0])} // Update to use state
                    accept="image/*"
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
                    onChange={(e) => setProductImage(e.target.files[0])} // Set product image
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
