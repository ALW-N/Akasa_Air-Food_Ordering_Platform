import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Header from "../components/header";
import { useCart } from "../CartContext";
import axios from 'axios';

const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { products } = location.state || { products: [] };
    const [searchTerm, setSearchTerm] = useState("");
    const { cartItems, updateCart, clearCart } = useCart(); // Include clearCart

    const handleRemoveItem = (id) => {
        updateCart(id, 0);
    };

    const handleIncreaseQuantity = (id) => {
        updateCart(id, (cartItems[id] || 0) + 1);
    };

    const handleDecreaseQuantity = (id) => {
        updateCart(id, Math.max((cartItems[id] || 0) - 1, 0));
    };

    const calculateTotal = () => {
        return Object.entries(cartItems).reduce((total, [id, quantity]) => {
            const product = products.find((p) => p._id === id);
            return total + (product ? product.price * quantity : 0);
        }, 0);
    };

    const handleProceedToPayment = async () => {
        const itemsToUpdate = Object.entries(cartItems).map(([id, quantity]) => ({
            id,
            quantity,
        }));

        try {
            console.log("Sending update quantities request:", itemsToUpdate); // Log the request
            const response = await axios.put("http://localhost:5000/api/products/update-quantities", { items: itemsToUpdate });

            console.log("Response from update quantities:", response.data); // Log the response

            // Clear the cart after successful payment processing
            clearCart();

            // Navigate to the payment confirmation page
            navigate("/payment-confirmation");
        } catch (error) {
            console.error("Error updating quantities:", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cartItems={cartItems}
                toggleMenu={() => console.log("Menu toggled")}
                onSearch={() => console.log("Searching for:", searchTerm)}
            />

            <h1>Your Cart</h1>
            {Object.keys(cartItems).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ flex: "7", borderRight: "1px solid #ccc", paddingRight: "20px" }}>
                        {Object.entries(cartItems).map(([id, quantity]) => {
                            const product = products.find((p) => p._id === id);
                            const totalPrice = product ? product.price * quantity : 0;

                            return product ? (
                                <CartItem
                                    key={id}
                                    image={product.image}
                                    name={product.name}
                                    quantity={quantity}
                                    price={product.price}
                                    totalPrice={totalPrice}
                                    onRemove={() => handleRemoveItem(id)}
                                    onIncrease={() => handleIncreaseQuantity(id)}
                                    onDecrease={() => handleDecreaseQuantity(id)}
                                />
                            ) : (
                                <div key={id} style={{ margin: "10px 0" }}>
                                    <p>Product not found.</p>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ flex: "3" }}>
                        <h2>Order Summary</h2>
                        {Object.entries(cartItems).map(([id, quantity]) => {
                            const product = products.find((p) => p._id === id);
                            return product ? (
                                <div key={id} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                                    <span>{product.name} x {quantity}</span>
                                    <span>${(product.price * quantity).toFixed(2)}</span>
                                </div>
                            ) : null;
                        })}
                        <div style={{ borderTop: "1px solid #ccc", marginTop: "10px", paddingTop: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                <span>Total:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            <button
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#27ae60",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "20px"
                                }}
                                onClick={handleProceedToPayment} // Call the function here
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
