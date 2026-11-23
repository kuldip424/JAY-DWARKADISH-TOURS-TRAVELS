import { create } from 'zustand';
import { session } from '@/utils/session';

// Shared auth state + plain setters only (no API calls, no toasts).
// Components use the hooks/auth/useAuth hook, not this store directly.
export const useAuthStore = create((set) => ({
  // Read on the first render so route guards don't redirect too early
  user: session.getUser(),
  adminUser: session.getAdmin(),
  showAuth: false,

  setUser: (user) => set({ user }),
  setAdminUser: (adminUser) => set({ adminUser }),
  setShowAuth: (showAuth) => set({ showAuth }),
}));
