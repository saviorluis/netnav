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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Local Networking Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're building a platform to help professionals find and join meaningful networking events in North Carolina. Currently in early development.
          </p>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Map</h2>
          <p className="text-gray-600 mb-4">Coming soon: Interactive map showing networking events near you</p>
          <EventMap events={events} />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Focus</h3>
            <p className="text-gray-600">
              Starting in North Carolina, we're building a community of local professionals who want to connect and grow together.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Connections</h3>
            <p className="text-gray-600">
              Find events that match your interests and career goals, from chamber meetings to industry meetups.
            </p>
          </div>
        </div>

        {/* Early Access Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Beta</h2>
          <p className="text-gray-600 mb-6">
            We're currently in development and looking for early users to help shape the platform.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Request Access
              </button>
            </div>
          </form>
        </div>
      </div>

      <AdminLoginButton />
    </main>
  );
} 