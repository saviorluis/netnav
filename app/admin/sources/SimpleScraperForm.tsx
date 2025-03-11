'use client';

import { useState } from 'react';

export default function SimpleScraperForm() {
  const [url, setUrl] = useState('');
  const [scraping, setScraping] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
    eventsProcessed?: number;
    error?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) return;
    
    setScraping(true);
    setResult({});
    
    try {
      const response = await fetch('/api/admin/scrape-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult({
          success: true,
          message: 'Successfully scraped events',
          eventsProcessed: data.eventsProcessed,
        });
        setUrl('');
      } else {
        setResult({
          success: false,
          message: 'Failed to scrape events',
          error: data.error,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred while scraping',
        error: 'Network or server error',
      });
    } finally {
      setScraping(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Chamber of Commerce URL
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://members.durhamchamber.org/events/calendar"
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
            Enter a Chamber of Commerce URL to scrape events (no OpenAI API key required)
          </p>
          <div className="mt-2 text-sm text-gray-500">
            <p>Supported URLs:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>https://members.durhamchamber.org/events/calendar</li>
              <li>https://chamber.greensboro.org/events</li>
              <li>https://directory.charlotteareachamber.com/calendar</li>
            </ul>
          </div>
        </div>
        
        {result.message && (
          <div className={`p-4 rounded-md ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-medium">{result.message}</p>
            {result.eventsProcessed !== undefined && (
              <p className="mt-1">Processed {result.eventsProcessed} events</p>
            )}
            {result.error && (
              <p className="mt-1">{result.error}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
} 