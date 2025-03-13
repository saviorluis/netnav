'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await logout();
      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setError(error instanceof Error ? error.message : 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ${
          loading
            ? 'bg-gray-100 text-gray-400 ring-gray-200 cursor-not-allowed'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          {loading && (
            <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
          )}
          {loading ? 'Logging out...' : 'Sign Out'}
        </div>
      </button>
      {error && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-md bg-red-50 p-2">
          <p className="text-xs text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
} 