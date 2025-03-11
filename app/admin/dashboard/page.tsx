'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardCard {
  title: string;
  description: string;
  href: string;
  icon: string;
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Email List',
    description: 'View and export user email subscriptions',
    href: '/admin/emails',
    icon: '📧'
  },
  {
    title: 'Events',
    description: 'Manage networking events and venues',
    href: '/admin/events',
    icon: '📅'
  },
  {
    title: 'Analytics',
    description: 'View site traffic and user engagement',
    href: '/admin/analytics',
    icon: '📊'
  }
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/admin/check');
        if (!response.ok) {
          router.push('/');
          return;
        }
        setLoading(false);
      } catch (error) {
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your NetNav platform settings and data
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {card.title}
              </h2>
              <p className="text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 