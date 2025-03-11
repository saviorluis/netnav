'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await logout();
      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {loading ? 'Logging out...' : 'Sign Out'}
    </button>
  );
} 