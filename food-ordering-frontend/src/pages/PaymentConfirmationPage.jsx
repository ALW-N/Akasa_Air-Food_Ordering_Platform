import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../OrderContext';
import axios from 'axios'; // Ensure you're importing axios

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const { updateOrders } = useOrders();

  // Mock order details (you would get these from your payment response)
  const orderDetails = {
    orderId: "123456",
    items: [{ productId: "product1", quantity: 2 }],
    totalAmount: 50.00,
  };

  // Update the orders when the component mounts
  useEffect(() => {
    const saveOrder = async () => {
      try {
        // Make sure to use the correct backend URL
        const response = await axios.post('http://localhost:5000/api/orders', orderDetails);
        updateOrders(response.data); // Update orders context with the new order
      } catch (error) {
        console.error('Error saving order:', error);
      }
    };

    saveOrder(); // Call the function to save the order
  }, [updateOrders]);

  const handleReturnHome = () => {
    navigate('/home'); // Navigate back to the home page
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment! Your order is being processed.</p>
      <button onClick={handleReturnHome} style={{ marginTop: "20px", padding: "10px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Return to Home
      </button>
    </div>
  );
};

export default PaymentConfirmationPage;
