import { useAuth } from '@/hooks/auth/useAuth';
import AdminLoginPage from '@/pages/Admin/AdminLoginPage';

// Shows the admin login form until an admin is signed in.
export default function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <AdminLoginPage />;
}
