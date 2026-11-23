import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/auth/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, setShowAuth } = useAuth();

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access this page.');
      setShowAuth(true);
    }
  }, [user, setShowAuth]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
