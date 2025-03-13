'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import GeoLocator from '../components/GeoLocator';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  industries: string[];
  eventType: string;
  venue?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

function EventsContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams();
        if (searchParams.get('zip')) params.append('zip', searchParams.get('zip')!);
        if (searchParams.get('radius')) params.append('radius', searchParams.get('radius')!);
        if (searchParams.get('lat')) params.append('lat', searchParams.get('lat')!);
        if (searchParams.get('lng')) params.append('lng', searchParams.get('lng')!);
        if (selectedIndustries.length) params.append('industries', selectedIndustries.join(','));
        if (selectedEventTypes.length) params.append('eventTypes', selectedEventTypes.join(','));

        const response = await fetch(`/api/events?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchParams, selectedIndustries, selectedEventTypes]);

  const handleLocationSelect = (location: { zipCode: string; lat: number; lng: number; radius: number }) => {
    // Location selection is handled by GeoLocator component
    // It will update the URL params and trigger a re-fetch
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Networking Events</h1>
          <p className="mt-2 text-sm text-gray-600">
            Find business networking events in your area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <GeoLocator className="mb-6" />

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Industries</h3>
                <div className="space-y-2">
                  {['Technology', 'Finance', 'Healthcare', 'Real Estate', 'Marketing'].map((industry) => (
                    <label key={industry} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        checked={selectedIndustries.includes(industry)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIndustries([...selectedIndustries, industry]);
                          } else {
                            setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                          }
                        }}
                      />
                      <span className="ml-2 text-gray-700">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Event Type</h3>
                <div className="space-y-2">
                  {['NETWORKING', 'WORKSHOP', 'CONFERENCE', 'SEMINAR', 'MEETUP'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        checked={selectedEventTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEventTypes([...selectedEventTypes, type]);
                          } else {
                            setSelectedEventTypes(selectedEventTypes.filter(t => t !== type));
                          }
                        }}
                      />
                      <span className="ml-2 text-gray-700">{type.charAt(0) + type.slice(1).toLowerCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events list */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-700">{error}</p>
              </div>
            ) : events.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No events found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                          <p className="mt-2 text-gray-600">{event.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          {event.industries.map((industry) => (
                            <span
                              key={industry}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={event.startDate}>
                          {format(new Date(event.startDate), 'MMM d, yyyy h:mm a')}
                        </time>
                      </div>

                      {event.venue && (
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <address className="not-italic">
                            {event.venue.name}, {event.venue.address}, {event.venue.city}, {event.venue.state} {event.venue.zipCode}
                          </address>
                        </div>
                      )}

                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
} 