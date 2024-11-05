
import LoginContainer from '../components/Login/LoginContainer';

const LoginPage = () => {
    const handleLogin = (email: string, password: string) => {
           console.log("email",email,"password",password)
      };   

  return (
    <>   
      <LoginContainer onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
