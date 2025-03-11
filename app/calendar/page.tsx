'use client';

import { useState, useEffect } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventFilters from '../components/EventFilters';

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
  start: Date;
  end: Date;
  venue?: Venue;
  eventType: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setFilteredEvents(formattedEvents);
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
    setLoading(true);
    
    try {
      // Build query string from filters
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.eventType) params.append('eventType', filters.eventType);
      if (filters.location) params.append('location', filters.location);
      if (filters.radius) params.append('radius', filters.radius.toString());
      
      const response = await fetch(`/api/events?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch filtered events');
      
      const data = await response.json();
      // Convert the dates from strings to Date objects
      const formattedEvents = data.map((event: any) => ({
        ...event,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
      }));
      
      setFilteredEvents(formattedEvents);
    } catch (error) {
      setError('Failed to filter events');
    } finally {
      setLoading(false);
    }
  };

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Networking Events Calendar</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and filter networking events in North Carolina
          </p>
        </div>

        <div className="mb-6">
          <EventFilters onFilterChange={handleFilterChange} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-yellow-700">No events found matching your criteria.</p>
          </div>
        ) : (
          <EventCalendar events={filteredEvents} />
        )}
      </div>
    </div>
  );
} 