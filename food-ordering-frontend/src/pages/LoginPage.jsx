import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import { jwtDecode } from 'jwt-decode';  // Named import
// Correct import

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { identifier, password });
      const token = response.data.token;
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);

      if (decodedToken.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="space-y-4">
      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Email or Phone Number"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
