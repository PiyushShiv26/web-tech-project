import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuth(); // Get user from our context

  // If no user, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, show the child page (e.g., Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;