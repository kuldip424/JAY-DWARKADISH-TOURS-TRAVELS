import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProtectedRoute = ({ children }) => {
  const { user, setShowAuth } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (!user) {
      addToast('Please login to access this page.', 'error');
      setShowAuth(true);
    }
  }, [user, setShowAuth, addToast]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
