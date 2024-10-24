// src/pages/Login.jsx
<<<<<<< HEAD
import LoginContainer from '../components/LoginContainer';
=======
import React from 'react';
import Navbar from '../components/Header';
import LoginContainer from '../components/Login/LoginContainer';
>>>>>>> upstream/develop

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
