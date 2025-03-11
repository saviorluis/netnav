'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EventSource {
  id: string;
  url: string;
  name: string;
  type: string;
  scrapeConfig: {
    eventSelector: string;
    titleSelector: string;
    descriptionSelector: string;
    dateSelector: string;
    locationSelector: string;
    dateFormat: string;
    requiresJavaScript?: boolean;
    scrollToBottom?: boolean;
    clickSelector?: string;
  };
  lastScraped: Date | null;
  isActive: boolean;
}

export default function EventSourcesPage() {
  const [sources, setSources] = useState<EventSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newSource, setNewSource] = useState<Partial<EventSource>>({
    name: '',
    url: '',
    type: 'CHAMBER_OF_COMMERCE',
    scrapeConfig: {
      eventSelector: '',
      titleSelector: '',
      descriptionSelector: '',
      dateSelector: '',
      locationSelector: '',
      dateFormat: 'MMM d, yyyy h:mm a',
    },
    isActive: true,
  });

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      const response = await fetch('/api/admin/sources');
      if (!response.ok) throw new Error('Failed to fetch sources');
      const data = await response.json();
      setSources(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load sources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource),
      });
      
      if (!response.ok) throw new Error('Failed to create source');
      
      await fetchSources();
      setNewSource({
        name: '',
        url: '',
        type: 'CHAMBER_OF_COMMERCE',
        scrapeConfig: {
          eventSelector: '',
          titleSelector: '',
          descriptionSelector: '',
          dateSelector: '',
          locationSelector: '',
          dateFormat: 'MMM d, yyyy h:mm a',
        },
        isActive: true,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create source');
    }
  };

  const toggleSourceStatus = async (sourceId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/sources/${sourceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });
      
      if (!response.ok) throw new Error('Failed to update source');
      
      await fetchSources();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update source');
    }
  };

  const scrapeSource = async (sourceId: string) => {
    try {
      const response = await fetch(`/api/admin/sources/${sourceId}/scrape`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to scrape source');
      
      await fetchSources();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to scrape source');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Sources</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and monitor your event sources
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Add new source form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Source</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="url"
                  value={newSource.url}
                  onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newSource.type}
                  onChange={(e) => setNewSource({ ...newSource, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="CHAMBER_OF_COMMERCE">Chamber of Commerce</option>
                  <option value="BNI">BNI</option>
                  <option value="MEETUP">Meetup</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Selector</label>
                <input
                  type="text"
                  value={newSource.scrapeConfig?.eventSelector}
                  onChange={(e) => setNewSource({
                    ...newSource,
                    scrapeConfig: { ...newSource.scrapeConfig, eventSelector: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title Selector</label>
                <input
                  type="text"
                  value={newSource.scrapeConfig?.titleSelector}
                  onChange={(e) => setNewSource({
                    ...newSource,
                    scrapeConfig: { ...newSource.scrapeConfig, titleSelector: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Source
            </button>
          </form>
        </div>

        {/* Sources list */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Scraped
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sources.map((source) => (
                <tr key={source.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {source.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {source.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.lastScraped ? new Date(source.lastScraped).toLocaleString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      source.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {source.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleSourceStatus(source.id, !source.isActive)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      {source.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => scrapeSource(source.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Scrape Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 