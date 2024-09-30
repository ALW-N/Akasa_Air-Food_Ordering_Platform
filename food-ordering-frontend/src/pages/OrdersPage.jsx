import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders'); // Adjust the URL as necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data); // Set the orders in state
            } catch (err) {
                setError(err.message); // Handle error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchOrders(); // Call the function to fetch orders
    }, []); // Empty dependency array ensures it runs only once

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error if any
    }

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p> // Message when no orders are found
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}> {/* Ensure that you use a unique key */}
                            Order ID: {order.orderId} - Total Amount: ${order.totalAmount}
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}> {/* If item has a unique id, use that instead */}
                                        Product ID: {item.productId}, Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPage;
