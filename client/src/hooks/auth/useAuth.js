import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useToast } from '@/hooks/ui/useToast';
import { apiError } from '@/api/apiClient';
import { loginApi, registerApi } from '@/api/authApi';
import { session } from '@/utils/session';

// Logged-in user/admin + login/register/logout actions.
export function useAuth() {
  const { user, setUser, adminUser, setAdminUser, showAuth, setShowAuth } = useContext(AuthContext);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user: account } = await loginApi(email, password); // { success, user }
      session.setUser(account);
      setUser(account);
      addToast(`Welcome back, ${account.name}!`, 'success');
      return true;
    } catch (e) {
      addToast(apiError(e, 'Login failed'), 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      await registerApi(formData);
      addToast('Account created! Please login.', 'success');
      return true;
    } catch (e) {
      addToast(apiError(e, 'Registration failed'), 'error');
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
        addToast('Access denied. This portal is for administrators only.', 'error');
        return false;
      }
      session.setAdmin(account);
      setAdminUser(account);
      addToast('Welcome back, Administrator!', 'success');
      return true;
    } catch (e) {
      addToast(apiError(e, 'Login failed'), 'error');
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
    adminLogin,
    adminLogout,
  };
}
