// src/pages/auth/Login.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    // Display message if provided in location state
    if (message) {
      alert(message);
    }
  }, [message]);

  return <LoginForm />;
};

export default Login;