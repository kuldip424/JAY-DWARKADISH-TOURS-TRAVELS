import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/ui/useToast';

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
