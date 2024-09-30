import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { OrderProvider } from './OrderContext'; // Import OrderProvider
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import OrdersPage from './pages/OrdersPage'; // Import OrdersPage
import NotFound from './pages/NotFound';
import './index.css';

const App = () => {
  return (
    <CartProvider>
      <OrderProvider> {/* Wrap your application with OrderProvider */}
        <Router>
          <div>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} />
              <Route path="/orders" element={<OrdersPage />} /> {/* Add OrdersPage route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
};

export default App;
