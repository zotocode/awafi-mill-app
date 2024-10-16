// src/pages/Login.jsx
import React from 'react';
import Navbar from '../layouts/Navbar';
import LoginContainer from '../components/LoginContainer';

const LoginPage = () => {
    const handleLogin = (email: string, password: string) => {
        console.log('Login successful:', email, password);
        // Redirect to dashboard or home page
      };

  return (
    <>
      <Navbar showLogoutButton={false} />
      <LoginContainer onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
