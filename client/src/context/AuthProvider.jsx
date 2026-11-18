import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { session } from '@/utils/session';

// Auth state + plain setters only (no API calls, no toasts).
// Stand-in for zustand/auth/useAuth.Zus.js until zustand is installed.
// Components use the hooks/auth/useAuth hook, not this directly.
export function AuthProvider({ children }) {
  const [showAuth, setShowAuth] = useState(false);
  // Loaded on the first render so route guards don't redirect too early
  const [user, setUser] = useState(session.getUser);
  const [adminUser, setAdminUser] = useState(session.getAdmin);

  return (
    <AuthContext.Provider value={{ showAuth, setShowAuth, user, setUser, adminUser, setAdminUser }}>
      {children}
    </AuthContext.Provider>
  );
}
