import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from '../axiosInstance'; // Import the axios instance
import { jwtDecode } from 'jwt-decode'; // Use named import for jwt-decode

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // This will hold either email or phone number
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { identifier, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store JWT token

      // Decode the token to get user information
      const decodedToken = jwtDecode(token); // Decode the token
      
      // Check the role and navigate accordingly
      if (decodedToken.role === 'admin') {
        navigate('/admin-dashboard'); // Navigate to the admin dashboard
      } else {
        navigate('/home'); // Navigate to the homepage for regular users
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="text"
        placeholder="Email or Phone Number"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
