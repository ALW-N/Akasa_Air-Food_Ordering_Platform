import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const updateCart = (id, quantity) => {
        setCartItems((prevItems) => ({
            ...prevItems,
            [id]: quantity,
        }));
    };

    const clearCart = () => {
        setCartItems({});
    };

    return (
        <CartContext.Provider value={{ cartItems, updateCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
