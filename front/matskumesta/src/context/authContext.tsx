import React, { createContext, useContext, useState, useEffect } from 'react';
import useStore from '../stores/useStore';

interface AuthContextType {
  token: string | null;
  login: (token : string, username : string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const { username, setUserName } = useStore();

  // Save the token in localStorage
  const login = (token : string, username : string) => {
    setToken(token);
    setUserName(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(storedToken) setToken(storedToken);
    const storedUsername = localStorage.getItem('username');
    if(storedUsername) setUserName(storedUsername);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
