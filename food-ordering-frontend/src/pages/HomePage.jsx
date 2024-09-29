import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const menuRef = useRef(null); // Ref for the sliding menu

  const foodItems = [
    { id: 1, name: 'Pizza', price: 10 },
    { id: 2, name: 'Burger', price: 5 },
    { id: 3, name: 'Sushi', price: 12 },
    { id: 4, name: 'Pasta', price: 8 },
  ];

  const handleIncrement = (id) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [id]: (prevItems[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [id]: prevItems[id] > 0 ? prevItems[id] - 1 : 0,
    }));
  };

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle search icon click
  const handleSearchClick = () => {
    console.log(searchTerm); // Print the content of the search bar
  };

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the menu
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2c3e50', padding: '10px 20px', borderRadius: '8px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaBars size={25} style={{ marginRight: '10px', cursor: 'pointer' }} onClick={toggleMenu} />
          <span style={{ fontSize: '18px' }}>Akasa Order</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '20px', marginRight: '20px' }}>
          <input
            type="text"
            placeholder="Search for Grocery, Stores, Vegetable or Meat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', flexGrow: 1, borderRadius: '5px', border: 'none', marginRight: '10px' }}
          />
          <FaSearch size={20} style={{ cursor: 'pointer' }} onClick={handleSearchClick} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaShoppingCart size={25} style={{ cursor: 'pointer' }} />
          <span style={{ marginLeft: '5px' }}>{Object.values(cartItems).reduce((acc, val) => acc + val, 0)}</span>
        </div>
      </div>

      {/* Sliding Menu */}
      {menuOpen && (
        <div ref={menuRef} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '250px',
          height: '100%',
          backgroundColor: '#34495e',
          color: 'white',
          padding: '20px',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1000,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Menu</h2>
            <FaTimes size={20} style={{ cursor: 'pointer' }} onClick={toggleMenu} />
          </div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ margin: '10px 0' }}>Home</li>
            <li style={{ margin: '10px 0' }}>Menu</li>
            <li style={{ margin: '10px 0' }}>Orders</li>
            <li style={{ margin: '10px 0' }}>Profile</li>
            <li style={{ margin: '10px 0' }}>Settings</li>
            <li style={{ margin: '10px 0' }}>Logout</li>
          </ul>
        </div>
      )}

      {/* Food Menu */}
      <h2 style={{ marginTop: '20px' }}>Food Menu</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredItems.map((item) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
            <span>{item.name} - ${item.price}</span>
            <div>
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <span style={{ margin: '0 10px' }}>{cartItems[item.id] || 0}</span>
              <button onClick={() => handleIncrement(item.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
