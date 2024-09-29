import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
// Import any additional pages you want to include
import ProfilePage from './pages/ProfilePage'; // Example of another page
import CartPage from './pages/CartPage'; // Example for cart page
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LandingPage />} />
          {/* Additional Routes */}
          <Route path="/profile" element={<ProfilePage />} /> {/* Example Profile Page */}
          <Route path="/cart" element={<CartPage />} /> {/* Example Cart Page */}
          {/* Add any other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
