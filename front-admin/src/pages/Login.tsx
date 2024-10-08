// src/pages/Login.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import LoginContainer from '../components/LoginContainer';

const LoginPage = () => {
    const handleLogin = (email: string, password: string) => {
        console.log('Login successful:', email, password);
        // Here you would typically redirect to a dashboard or home page
      };
    

  return (
    <>
      <Navbar />
      <LoginContainer onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
