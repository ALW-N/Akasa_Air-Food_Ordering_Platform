import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Join Us Today'}
        </h2>
        {isLogin ? <LoginPage /> : <RegisterPage />}
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={toggleForm}
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;