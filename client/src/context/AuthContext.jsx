import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Initial check for admin user from localStorage
    const storedAdmin = localStorage.getItem('admin_user');
    if (storedAdmin) {
      try {
        setAdminUser(JSON.parse(storedAdmin));
      } catch (e) {
        console.error('Failed to parse admin from localStorage', e);
      }
    }

    // Initial check for normal user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  const isAdmin = adminUser && adminUser.role === 'admin';

  const loginAdmin = (userData) => {
    localStorage.setItem('admin_user', JSON.stringify(userData));
    setAdminUser(userData);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('admin_user');
    setAdminUser(null);
  };

  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      showAuth, 
      setShowAuth, 
      adminUser, 
      isAdmin,
      loginAdmin,
      logoutAdmin,
      user,
      loginUser,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
