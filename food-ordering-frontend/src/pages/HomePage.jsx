import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Food Ordering Platform</h1>
      <p>Select an option to continue:</p>
      <div>
        <Link to="/login">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
