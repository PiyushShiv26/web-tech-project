import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const VendorRoute = () => {
  const { user } = useAuth(); // Get user from our context

  // If no user, or user is not a vendor, redirect them home
  if (!user || user.role !== 'vendor') {
    return <Navigate to="/" replace />;
  }

  // If they are a vendor, show the protected content
  return <Outlet />;
};

export default VendorRoute;