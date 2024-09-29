import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Import LoginPage
import RegisterPage from './RegisterPage'; // Import RegisterPage

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register

  const toggleForm = () => {
    setIsLogin((prev) => !prev); // Toggle between login and register
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '300px' }}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? (
          <LoginPage />
        ) : (
          <RegisterPage />
        )}
        <p>
          {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
          <button onClick={toggleForm} style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'blue' }}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
