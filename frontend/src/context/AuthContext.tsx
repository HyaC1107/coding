import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthInfo, getAuth, saveAuth, clearAuth } from '../utils/auth';

interface AuthContextType {
  auth: AuthInfo | null;
  isLoading: boolean;
  login: (info: AuthInfo) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const savedAuth = await getAuth();
      setAuth(savedAuth);
      setIsLoading(false);
    };
    loadAuth();
  }, []);

  const login = async (info: AuthInfo) => {
    await saveAuth(info);
    setAuth(info);
  };

  const logout = async () => {
    await clearAuth();
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
