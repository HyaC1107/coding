import React, { createContext, useState, useContext, useEffect } from 'react';
import type { AuthInfo } from '../utils/auth';
import { getAuth, saveAuth, clearAuth } from '../utils/auth';

interface AuthContextType {
  auth: AuthInfo | null;
  isLoading: boolean;
  login: (info: AuthInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const info = getAuth();
    setAuth(info);
    setIsLoading(false);
  }, []);

  const login = (info: AuthInfo) => {
    saveAuth(info);
    setAuth(info);
  };

  const logout = () => {
    clearAuth();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
