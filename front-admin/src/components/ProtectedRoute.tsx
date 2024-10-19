import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../state/store'; // Replace with your store path


const ProtectedRoute: React.FC<any> = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
