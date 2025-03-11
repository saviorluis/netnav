'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface EventFiltersProps {
  onFilterChange: (filters: {
    startDate?: string;
    endDate?: string;
    eventType?: string;
    location?: string;
    radius?: number;
  }) => void;
}

const EVENT_TYPES = [
  'All Types',
  'NETWORKING',
  'WORKSHOP',
  'CONFERENCE',
  'SEMINAR',
  'MEETUP',
];

export default function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventType, setEventType] = useState('All Types');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(25);

  const handleFilterChange = () => {
    onFilterChange({
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      eventType: eventType === 'All Types' ? undefined : eventType,
      location: location || undefined,
      radius,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              handleFilterChange();
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              handleFilterChange();
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
              handleFilterChange();
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              placeholder="Enter zip code"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                handleFilterChange();
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <select
              value={radius}
              onChange={(e) => {
                setRadius(Number(e.target.value));
                handleFilterChange();
              }}
              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value={10}>10 mi</option>
              <option value={25}>25 mi</option>
              <option value={50}>50 mi</option>
              <option value={100}>100 mi</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 