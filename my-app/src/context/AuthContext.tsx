import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id?: number;
  name: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:5189/api/Auth', {
        credentials: 'include',
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      console.log(data);

      if (data.isLoggedIn && data.userName) {
        setUser({
          name: data.userName,
          id: data.id ?? data.userId,
          email: data.email ?? data.userEmail,
          role: data.role ?? data.userRole,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:5189/api/Auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return false;
      }

      const userData = await res.json();
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };


  const logout = async () => {
    try {
      await fetch('http://localhost:5189/api/Auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      navigate('/');
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
