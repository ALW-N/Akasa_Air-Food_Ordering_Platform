// OrderContext.js
import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const updateOrders = (newOrder) => {
    // Prevent adding the same order again based on orderId
    setOrders((prevOrders) => {
      // Check if the order ID already exists in the orders
      const orderExists = prevOrders.some(order => order.orderId === newOrder.orderId);
      if (!orderExists) {
        return [...prevOrders, newOrder];
      }
      return prevOrders; // Return the existing orders if it already exists
    });
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  return useContext(OrderContext);
};
