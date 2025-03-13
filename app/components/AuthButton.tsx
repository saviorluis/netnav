'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useUser } from '../context/UserContext';

export default function AuthButton() {
  const { isAuthenticated, loading, error } = useUser();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Add a small delay when auth state changes to prevent abrupt UI changes
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (loading || isTransitioning) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-md bg-gray-100"></div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Dashboard
          </Link>
          <Link
            href="/events"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Events
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Developer Login
          </Link>
        </div>
      )}
    </div>
  );
} 