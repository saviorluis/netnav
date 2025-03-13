'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other user properties as needed
}

// Define context type
interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
});

// Custom hook to use the context
export const useUser = () => useContext(UserContext);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Function to check if user is authenticated
  const checkAuth = async () => {
    try {
      setLoading(true);
      // Simulate API call with timeout for demo
      // In production, replace with actual API call
      setTimeout(() => {
        // Check if we have a token in localStorage
        const token = localStorage.getItem('auth_token');
        if (token) {
          // For demo, create a mock user
          // In production, validate token with backend
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'user@example.com',
            role: 'user',
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Authentication check failed');
      setLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store token in localStorage
      localStorage.setItem('auth_token', 'demo_token');
      
      // Set user data
      setUser({
        id: '1',
        name: 'Demo User',
        email,
        role: 'user',
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Remove token from localStorage
      localStorage.removeItem('auth_token');
      
      // Clear user data
      setUser(null);
      
      setLoading(false);
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Logout failed');
      setLoading(false);
    }
  };

  // Initialize auth state on client-side only
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined' && !isInitialized) {
      checkAuth();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Memoize context value to prevent unnecessary re-renders
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
} 