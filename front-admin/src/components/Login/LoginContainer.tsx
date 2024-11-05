import React from 'react';
import LoginForm from './LoginForm';
import Text from '../../images/Awafi text.png'

interface LoginContainerProps {
  onLogin: (email: string, password: string) => void;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto min-h-screen">
        {/* Logo Container with enhanced styling */}
        <div className="mb-8 text-center">
          <img
            src={Text}
            alt="Awafimill Logo"
            className="h-12 mx-auto mb-4"
          />
          <div className="h-0.5 w-16 bg-black mx-auto" /> {/* Decorative line */}
        </div>

        {/* Card Container with refined styling */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                Admin Login
                </h1>
                
              </div>

              {/* Login Form */}
              <LoginForm onLogin={onLogin} />

              
             
            </div>
          </div>

          {/* Bottom text */}
          <p className="mt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Awafimill. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;