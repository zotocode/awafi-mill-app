import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../state/store'; // Replace with your store path

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);

  if (isAuthenticated) {
    // If the user is authenticated, redirect to the dashboard
    return <Navigate to="/dashboard" />;
  }

  // If not authenticated, render the public route (login)
  return <>{children}</>;
};

export default PublicRoute;
