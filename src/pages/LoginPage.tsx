import React from 'react';
import LoginForm from '../components/organisms/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
