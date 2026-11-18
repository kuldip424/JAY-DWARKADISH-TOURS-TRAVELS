import { createContext } from 'react';

// Value is provided by <AuthProvider>. Read it with the useAuth() hook.
export const AuthContext = createContext(null);
