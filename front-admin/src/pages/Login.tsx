// src/pages/Login.jsx
import LoginContainer from '../components/LoginContainer';

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
