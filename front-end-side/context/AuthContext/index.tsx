import React, { createContext, useContext, useState } from 'react';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const isTokenValid = (expire:string | null): boolean => {
  try {
    if(!expire) {
      return false
    }
    //Verifica se o token expirou
    const currentTime = Date.now() / 1000
    const expireTime = new Date(expire).getTime() / 1000

    if (expireTime < currentTime) {
      return false
    }

    return true
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('token') !== null && isTokenValid(sessionStorage.getItem('expire'))
  })

  const login = async (token: string, expire:string) => {
    // Verifica se o token é válido antes de salvar
    if (isTokenValid(expire) && token) {
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('expire', expire)
      setIsAuthenticated(true) 
      return true
    }

    throw new Error('Token inválido')
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('expire')
    setIsAuthenticated(false)
  }

  const refreshToken = async () => {
    try {
      const currentToken = sessionStorage.getItem('token')
      if (!currentToken) return false

      const response = await fetch('/refresh-token', {
        headers: {
          'Authorization': currentToken
        }
      })

      if (response.ok) {
        const { newToken, expire } = await response.json()
        return await login(newToken, expire)
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
      return false
    }
  }

  const value = {
    isAuthenticated,
    login,
    logout,
    refreshToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }