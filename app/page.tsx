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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NetNav - Discover Networking Events
          </h1>
          <p className="text-lg text-gray-600">
            Find and join business networking events in your area
          </p>
        </div>

        <div className="mb-8">
          <EventFilters onFilterChange={handleFilterChange} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <EventMap events={filteredEvents} onEventClick={handleEventClick} />

            {selectedEvent && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedEvent.title}
                </h2>
                <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                    <p className="mt-1">
                      {new Date(selectedEvent.startDate).toLocaleString()}
                    </p>
                  </div>
                  {selectedEvent.venue && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="mt-1">
                        {selectedEvent.venue.name}<br />
                        {selectedEvent.venue.address}<br />
                        {selectedEvent.venue.city}, {selectedEvent.venue.state} {selectedEvent.venue.zipCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AdminLoginButton />
    </main>
  );
} 