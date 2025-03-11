'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EventSource {
  id: string;
  url: string;
  name: string;
  type: string;
  lastScraped: string | null;
  isActive: boolean;
}

export default function SourcesPage() {
  const [sources, setSources] = useState<EventSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [scraping, setScraping] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState<{
    success?: boolean;
    message?: string;
    eventsProcessed?: number;
  }>({});
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/admin/check');
        if (!response.ok) {
          router.push('/');
          return;
        }
      } catch (error) {
        router.push('/');
        return;
      }
    };

    const fetchSources = async () => {
      try {
        const response = await fetch('/api/admin/sources');
        if (!response.ok) throw new Error('Failed to fetch sources');
        
        const data = await response.json();
        setSources(data);
      } catch (error) {
        setError('Failed to load sources');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchSources();
  }, [router]);

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSourceUrl) return;
    
    setScraping(true);
    setScrapeStatus({});
    
    try {
      const response = await fetch('/api/admin/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: newSourceUrl }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setScrapeStatus({
          success: true,
          message: 'Successfully scraped events',
          eventsProcessed: data.eventsProcessed,
        });
        
        // Refresh sources list
        const sourcesResponse = await fetch('/api/admin/sources');
        if (sourcesResponse.ok) {
          const sourcesData = await sourcesResponse.json();
          setSources(sourcesData);
        }
        
        setNewSourceUrl('');
      } else {
        setScrapeStatus({
          success: false,
          message: data.error || 'Failed to scrape events',
        });
      }
    } catch (error) {
      setScrapeStatus({
        success: false,
        message: 'An error occurred while scraping',
      });
    } finally {
      setScraping(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/sources/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });
      
      if (response.ok) {
        setSources(sources.map(source => 
          source.id === id ? { ...source, isActive: !isActive } : source
        ));
      }
    } catch (error) {
      console.error('Error toggling source active state:', error);
    }
  };

  const handleDeleteSource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this source?')) return;
    
    try {
      const response = await fetch(`/api/admin/sources/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSources(sources.filter(source => source.id !== id));
      }
    } catch (error) {
      console.error('Error deleting source:', error);
    }
  };

  if (loading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Event Sources</h1>
          <p className="mt-2 text-sm text-gray-600">
            Add and manage sources for event scraping
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Source</h2>
          <form onSubmit={handleAddSource} className="space-y-4">
            <div>
              <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-700">
                URL to Scrape
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="url"
                  id="sourceUrl"
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  placeholder="https://example.com/events"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  disabled={scraping}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {scraping ? 'Scraping...' : 'Scrape Events'}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter the URL of a page containing events to scrape
              </p>
            </div>
            
            {scrapeStatus.message && (
              <div className={`p-4 rounded-md ${scrapeStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p>{scrapeStatus.message}</p>
                {scrapeStatus.eventsProcessed !== undefined && (
                  <p className="mt-1">Processed {scrapeStatus.eventsProcessed} events</p>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Event Sources</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              List of all event sources
            </p>
          </div>
          
          {error ? (
            <div className="p-4 bg-red-50 text-red-700">
              {error}
            </div>
          ) : sources.length === 0 ? (
            <div className="p-4 text-gray-500">
              No sources added yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Scraped
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {source.url.length > 40 ? `${source.url.substring(0, 40)}...` : source.url}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {source.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {source.lastScraped ? new Date(source.lastScraped).toLocaleString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${source.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {source.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleToggleActive(source.id, source.isActive)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          {source.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteSource(source.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 