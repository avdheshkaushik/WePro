import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@WePro:user');
      const storedToken = await AsyncStorage.getItem('@WePro:token');
      
      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', { email, password });
      const { data } = response.data;
      
      // Transform backend response to match frontend expectations
      const userData = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        organizationId: data.user.organization_id
      };

      setUser(userData);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      await AsyncStorage.setItem('@WePro:user', JSON.stringify(userData));
      await AsyncStorage.setItem('@WePro:token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      // Transform field names to match backend expectations
      const requestData = {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName
      };
      
      const response = await api.post('/auth/register', requestData);
      const { data } = response.data;
      
      // Transform backend response to match frontend expectations
      const newUser = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        organizationId: data.user.organization_id
      };

      setUser(newUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      await AsyncStorage.setItem('@WePro:user', JSON.stringify(newUser));
      await AsyncStorage.setItem('@WePro:token', data.token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      await AsyncStorage.removeItem('@WePro:user');
      await AsyncStorage.removeItem('@WePro:token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 