'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const MOCK_CONNECTIONS = [
  {
    id: '1',
    name: 'Alex Johnson',
    position: 'Marketing Director',
    company: 'TechCorp',
    industry: 'Technology',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    upcomingEvents: [
      { id: 'e1', title: 'Tech Summit 2024', date: '2024-06-15' }
    ]
  },
  {
    id: '2',
    name: 'Samantha Williams',
    position: 'Investment Analyst',
    company: 'Global Finance',
    industry: 'Finance',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    upcomingEvents: [
      { id: 'e2', title: 'Finance Forum', date: '2024-05-22' }
    ]
  },
  {
    id: '3',
    name: 'Michael Chen',
    position: 'Startup Founder',
    company: 'InnoVenture',
    industry: 'Entrepreneurship',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    upcomingEvents: [
      { id: 'e3', title: 'Entrepreneur Meetup', date: '2024-05-10' },
      { id: 'e4', title: 'Venture Capital Panel', date: '2024-06-05' }
    ]
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    position: 'Sales Manager',
    company: 'SalesPro Inc',
    industry: 'Sales',
    profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg',
    upcomingEvents: []
  },
  {
    id: '5',
    name: 'David Kim',
    position: 'Healthcare Administrator',
    company: 'MediHealth',
    industry: 'Healthcare',
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
    upcomingEvents: [
      { id: 'e5', title: 'Healthcare Innovation Conference', date: '2024-07-12' }
    ]
  },
];

export default function ConnectionsPage() {
  const [connections, setConnections] = useState(MOCK_CONNECTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  
  // Filter connections based on search term and industry
  const filteredConnections = connections.filter(conn => {
    const matchesSearch = !searchTerm || 
      conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = !industryFilter || conn.industry === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });

  // Extract unique industries for filter dropdown
  const industriesSet = new Set<string>();
  connections.forEach(conn => {
    if (conn.industry) {
      industriesSet.add(conn.industry);
    }
  });
  const industries = Array.from(industriesSet);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            My Network
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <input
                type="text"
                placeholder="Search by name or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            {filteredConnections.length > 0 ? (
              filteredConnections.map((connection) => (
                <div key={connection.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start">
                    <img
                      src={connection.profilePicture}
                      alt={connection.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{connection.name}</h3>
                      <p className="text-sm text-gray-600">
                        {connection.position} at {connection.company}
                      </p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                        {connection.industry}
                      </span>
                      
                      {connection.upcomingEvents.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-900">Upcoming Events:</p>
                          <ul className="mt-1 space-y-1">
                            {connection.upcomingEvents.map((event) => (
                              <li key={event.id} className="text-sm">
                                <Link 
                                  href={`/events/${event.id}`}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {event.title}
                                </Link>
                                <span className="text-gray-500 ml-2">
                                  ({new Date(event.date).toLocaleDateString()})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No connections found matching your filters.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/connections/find"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Find More Connections
          </Link>
        </div>
      </div>
    </main>
  );
} 