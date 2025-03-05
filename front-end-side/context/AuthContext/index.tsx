import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenValid = (expire: string | null): boolean => {
  try {
    if (!expire) return false;

    const currentTime = Date.now() / 1000;
    const expireTime = new Date(expire).getTime() / 1000;

    return expireTime > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      const expire = await AsyncStorage.getItem('expire');

      if (token && isTokenValid(expire)) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (token: string, expire: string) => {
    if (isTokenValid(expire) && token) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('expire', expire);
      setIsAuthenticated(true);
      return true;
    }

    throw new Error('Token inválido');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('expire');
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const currentToken = await AsyncStorage.getItem('token');
      if (!currentToken) return false;

      const response = await fetch('https://seu-servidor.com/refresh-token', {
        headers: {
          Authorization: currentToken,
        },
      });

      if (response.ok) {
        const { newToken, expire } = await response.json();
        return await login(newToken, expire);
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return false;
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };