'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?from=/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be briefly shown before the redirect happens
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Welcome, {user.name}</h2>
          <p className="text-gray-600">
            This is your personal dashboard where you can manage your profile, events, and connections.
          </p>
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Your Events</h2>
          <p className="text-gray-600">
            You have no upcoming events. Browse events to find networking opportunities.
          </p>
          <button 
            onClick={() => router.push('/events')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Browse Events
          </button>
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Your Network</h2>
          <p className="text-gray-600">
            You have 0 connections. Start building your professional network.
          </p>
          <button 
            onClick={() => router.push('/connections')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Manage Connections
          </button>
        </div>
      </div>
    </div>
  );
} 