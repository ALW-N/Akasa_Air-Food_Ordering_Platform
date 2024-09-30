// PaymentConfirmationPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();

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
