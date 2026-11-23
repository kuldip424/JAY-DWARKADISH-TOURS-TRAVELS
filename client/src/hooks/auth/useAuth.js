import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/zustand/auth/useAuth.Zus';
import { apiError } from '@/api/apiClient';
import { loginApi, registerApi } from '@/api/authApi';
import { session } from '@/utils/session';

// Logged-in user/admin + login/register/logout actions.
export function useAuth() {
  const { user, setUser, adminUser, setAdminUser, showAuth, setShowAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user: account } = await loginApi(email, password); // { success, user }
      session.setUser(account);
      setUser(account);
      toast.success(`Welcome back, ${account.name}!`);
      return true;
    } catch (e) {
      toast.error(apiError(e, 'Login failed'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      await registerApi(formData);
      toast.success('Account created! Please login.');
      return true;
    } catch (e) {
      toast.error(apiError(e, 'Registration failed'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Stable (useCallback) because booking hooks call it from their polling effects
  const logout = useCallback(() => {
    session.clearUser();
    setUser(null);
  }, [setUser]);

  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const { user: account } = await loginApi(email, password);
      if (account.role !== 'admin') {
        toast.error('Access denied. This portal is for administrators only.');
        return false;
      }
      session.setAdmin(account);
      setAdminUser(account);
      toast.success('Welcome back, Administrator!');
      return true;
    } catch (e) {
      toast.error(apiError(e, 'Login failed'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = useCallback(() => {
    session.clearAdmin();
    setAdminUser(null);
  }, [setAdminUser]);

  return {
    user,
    adminUser,
    isAdmin: adminUser?.role === 'admin',
    showAuth,
    setShowAuth,
    loading,
    login,
    register,
    logout,
    adminLogout,
    adminLogin,
  };
}
