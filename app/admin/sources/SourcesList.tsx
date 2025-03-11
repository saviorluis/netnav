'use client';

import { useState, useEffect } from 'react';

interface EventSource {
  id: string;
  url: string;
  name: string;
  type: string;
  lastScraped: string | null;
  isActive: boolean;
}

export default function SourcesList() {
  const [sources, setSources] = useState<EventSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchSources();
  }, []);

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
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>;
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>;
  }

  if (sources.length === 0) {
    return <div className="p-4 text-gray-500">No sources added yet</div>;
  }

  return (
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
  );
} 