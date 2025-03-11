'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EventCalendar from '../components/EventCalendar';

interface Event {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  venue?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          router.push('/auth');
          return;
        }
      } catch (error) {
        router.push('/auth');
        return;
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json();
        // Convert the dates from strings to Date objects
        const formattedEvents = data.map((event: any) => ({
          ...event,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
        }));
        
        setEvents(formattedEvents);
      } catch (error) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Networking Events Calendar</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your networking events
          </p>
        </div>

        <EventCalendar events={events} />
      </div>
    </div>
  );
} 