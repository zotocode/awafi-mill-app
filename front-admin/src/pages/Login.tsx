// src/pages/Login.jsx


import React from 'react';
import Navbar from '../components/Header';
import LoginContainer from '../components/Login/LoginContainer';

const LoginPage = () => {
    const handleLogin = (email: string, password: string) => {
       
      };

  return (
    <>   
      <LoginContainer onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
