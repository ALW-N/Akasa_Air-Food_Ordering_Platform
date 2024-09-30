import React from 'react';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ searchTerm, setSearchTerm, cartItems, toggleMenu, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Check if the current path is the cart page
  const isCartPage = location.pathname === '/cart';

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2c3e50",
        padding: "10px 20px",
        borderRadius: "8px",
        color: "white",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaBars
          size={25}
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={toggleMenu}
        />
        <span 
          style={{ fontSize: "18px", cursor: "pointer" }} 
          onClick={() => navigate('/')} // Navigate to homepage
        >
          Akasa Order
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search for Grocery, Stores, Vegetable or Meat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            flexGrow: 1,
            borderRadius: "5px",
            border: "none",
            marginRight: "10px",
          }}
        />
        <FaSearch size={20} style={{ cursor: "pointer" }} onClick={onSearch} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaShoppingCart
          size={25}
          style={{
            cursor: "pointer",
            color: isCartPage ? "#e74c3c" : "white", // Highlight if on cart page
          }}
          onClick={() => navigate('/cart')}
        />
        <span style={{ marginLeft: "5px", color: isCartPage ? "#e74c3c" : "white" }}>
          {Object.values(cartItems).reduce((acc, val) => acc + val, 0)}
        </span>
      </div>
    </div>
  );
};

export default Header;
