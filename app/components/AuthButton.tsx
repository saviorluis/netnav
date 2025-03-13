'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useUser } from '../context/UserContext';

export default function AuthButton() {
  const { isAuthenticated, isLoading } = useUser();

  // Show nothing while loading to prevent layout shift
  if (isLoading) {
    return <div className="h-8"></div>;
  }

  return (
    <div className="flex items-center gap-4">
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