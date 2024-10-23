// src/pages/Login.jsx
import React from 'react';
import Navbar from '../components/Header';
import LoginContainer from '../components/LoginContainer';

const LoginPage = () => {
    const handleLogin = (email: string, password: string) => {
        console.log('Login successful:', email, password);
        // Redirect to dashboard or home page
      };

  return (
    <>   
      <LoginContainer onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
