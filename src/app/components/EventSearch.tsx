'use client';

import { useState, useEffect } from 'react';

interface Industry {
  id: string;
  name: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  venue?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  url?: string;
  source: string;
  isVirtual: boolean;
  industry: {
    id: string;
    name: string;
  };
}

export default function EventSearch() {
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(25);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [eventType, setEventType] = useState<'all' | 'virtual' | 'in-person'>('all');
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch industries when component mounts
  useEffect(() => {
    async function fetchIndustries() {
      try {
        const response = await fetch('/api/industries');
        const data = await response.json();
        setIndustries(data);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    }

    fetchIndustries();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        zipCode,
        radius: radius.toString(),
      });

      if (selectedIndustry) {
        queryParams.append('industryId', selectedIndustry);
      }

      if (eventType !== 'all') {
        queryParams.append('isVirtual', eventType === 'virtual' ? 'true' : 'false');
      }

      const response = await fetch(`/api/events/search?${queryParams.toString()}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventLocation = (event: Event) => {
    if (event.isVirtual) {
      return 'Virtual Event';
    } else if (event.venue) {
      return `${event.venue.address}, ${event.venue.city}, ${event.venue.state} ${event.venue.zipCode}`;
    } else {
      return 'Location not specified';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              pattern="[0-9]{5}"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter zip code"
              required
            />
          </div>
          <div>
            <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
              Radius (miles)
            </label>
            <select
              id="radius"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              id="industry"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Industries</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <div className="flex space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="eventType"
                  value="all"
                  checked={eventType === 'all'}
                  onChange={() => setEventType('all')}
                />
                <span className="ml-2">All</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="eventType"
                  value="virtual"
                  checked={eventType === 'virtual'}
                  onChange={() => setEventType('virtual')}
                />
                <span className="ml-2">Virtual</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="eventType"
                  value="in-person"
                  checked={eventType === 'in-person'}
                  onChange={() => setEventType('in-person')}
                />
                <span className="ml-2">In-Person</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Find Events'}
        </button>
      </form>

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div>
                <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded mr-2">
                  {event.industry.name}
                </span>
                <span className={`inline-block px-2 py-1 text-xs font-medium text-white rounded ${event.isVirtual ? 'bg-purple-500' : 'bg-green-500'}`}>
                  {event.isVirtual ? 'Virtual' : 'In-Person'}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(event.startDate).toLocaleDateString()} at{' '}
                  {new Date(event.startDate).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500">
                  {getEventLocation(event)}
                </p>
              </div>
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  More Info →
                </a>
              )}
            </div>
            <div className="mt-4">
              <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                {event.source}
              </span>
            </div>
          </div>
        ))}
        {events.length === 0 && !loading && (
          <p className="text-center text-gray-500">No events found. Try adjusting your search criteria.</p>
        )}
      </div>
    </div>
  );
} 