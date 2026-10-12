import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDataContext } from '../hooks/useDataContext';

export const ProtectedRoute: React.FC = () => {
  const { currentUser } = useDataContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};