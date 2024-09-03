// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();

  // If the user is not authenticated, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
