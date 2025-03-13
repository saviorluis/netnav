'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const fetchUserData = async () => {
    if (!mounted) return false;
    
    try {
      console.log('Fetching user data...');
      setError(null);
      const response = await fetch('/api/auth/user');
      console.log('User data response:', response.status);
      
      if (response.ok) {
        const userData = await response.json();
        console.log('User data received:', { ...userData, email: userData.email ? '[REDACTED]' : null });
        setUser(userData);
        return true;
      } else {
        const errorData = await response.json();
        console.log('User data error:', errorData);
        if (response.status !== 401) { // Don't show error for unauthorized
          setError(errorData.message || 'Failed to fetch user data');
        }
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch user data');
      setUser(null);
      return false;
    } finally {
      if (mounted) {
        setIsLoading(false);
      }
    }
  };

  const refreshUserData = async () => {
    if (!mounted) return;
    setIsLoading(true);
    await fetchUserData();
  };

  useEffect(() => {
    console.log('UserContext mounted, fetching initial user data...');
    fetchUserData();
  }, []);

  const logout = async () => {
    if (!mounted) return;
    
    try {
      console.log('Logging out...');
      setError(null);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        console.log('Logout successful');
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
        setError(errorData.message || 'Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setError(error instanceof Error ? error.message : 'Failed to logout');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        logout,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 