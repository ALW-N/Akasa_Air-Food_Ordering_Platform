import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;