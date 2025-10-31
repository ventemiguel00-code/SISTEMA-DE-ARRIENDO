import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario, mockUsuarios } from './mock-data';

interface AuthContextType {
  currentUser: Usuario | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (nombre: string, email: string, password: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  useEffect(() => {
    // Check if user is already logged in (localStorage)
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      const user = mockUsuarios.find(u => u.ID_Usuario === savedUserId);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = mockUsuarios.find(
      u => u.Email === email && u.Password === password
    );
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUserId', user.ID_Usuario);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId');
  };

  const register = (nombre: string, email: string, password: string): boolean => {
    // Check if email already exists
    const existingUser = mockUsuarios.find(u => u.Email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: Usuario = {
      ID_Usuario: `user${Date.now()}`,
      Nombre: nombre,
      Email: email,
      Password: password,
      Rol: 'Residente/Arrendador',
      Historial_Pagos: []
    };

    mockUsuarios.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('currentUserId', newUser.ID_Usuario);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        isAuthenticated: currentUser !== null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
