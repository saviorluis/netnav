'use client';

import { useState, useEffect } from 'react';
import EventMap from './components/EventMap';
import EventFilters from './components/EventFilters';
import AdminLoginButton from './components/AdminLoginButton';

interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue?: Venue;
  eventType: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = async (filters: {
    startDate?: string;
    endDate?: string;
    eventType?: string;
    location?: string;
    radius?: number;
  }) => {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.eventType) params.append('eventType', filters.eventType);
      if (filters.location) params.append('location', filters.location);
      if (filters.radius) params.append('radius', filters.radius.toString());

      const response = await fetch(`/api/events?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setFilteredEvents(data);
    } catch (error) {
      setError('Failed to filter events');
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Mobile-optimized hero section */}
      <div className="relative h-[60vh] bg-gradient-to-b from-blue-600 to-blue-700 flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white opacity-10 transform rotate-45"></div>
          <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
        </div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Next
            <br />
            Networking Event
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Discover local events in North Carolina
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow">
            Get Early Access
          </button>
        </div>
      </div>

      {/* App preview section */}
      <div className="px-4 py-12 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="h-[300px] relative">
              <EventMap events={events} />
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="px-4 py-12">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Simple. Local. Connected.</h2>
            <p className="text-gray-600">Currently in development in North Carolina</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Local Events</h3>
                <p className="text-sm text-gray-600">Find networking opportunities near you</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Real-time Updates</h3>
                <p className="text-sm text-gray-600">Never miss an upcoming event</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Community First</h3>
                <p className="text-sm text-gray-600">Connect with local professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beta signup section */}
      <div className="px-4 py-12 bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Beta</h2>
          <p className="text-gray-600 mb-8">
            We're starting in North Carolina. Be one of our first users.
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Request Access
            </button>
          </form>
        </div>
      </div>

      <AdminLoginButton />
    </main>
  );
} 