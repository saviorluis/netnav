'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GeoLocatorProps {
  onLocationSelect?: (location: { zipCode: string; lat: number; lng: number; radius: number }) => void;
  className?: string;
}

export default function GeoLocator({ onLocationSelect, className = '' }: GeoLocatorProps) {
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, validate the zip code format
      if (!/^\d{5}$/.test(zipCode)) {
        throw new Error('Please enter a valid 5-digit zip code');
      }

      // Geocode the zip code using OpenCage
      const response = await fetch(`/api/geocode?zipCode=${zipCode}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to find location');
      }

      const location = {
        zipCode,
        lat: data.lat,
        lng: data.lng,
        radius,
      };

      if (onLocationSelect) {
        onLocationSelect(location);
      } else {
        // If no callback provided, redirect to events page with params
        const params = new URLSearchParams({
          zip: zipCode,
          radius: radius.toString(),
          lat: data.lat.toString(),
          lng: data.lng.toString(),
        });
        router.push(`/events?${params.toString()}`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process location');
    } finally {
      setLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocode to get zip code
          const response = await fetch(
            `/api/reverse-geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
          );
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to find location');
          }

          setZipCode(data.zipCode);
          
          if (onLocationSelect) {
            onLocationSelect({
              zipCode: data.zipCode,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              radius,
            });
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to get location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Location
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                pattern="\d{5}"
                maxLength={5}
                required
              />
            </div>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Use Current
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
            Search Radius (miles)
          </label>
          <select
            id="radius"
            name="radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value={5}>5 miles</option>
            <option value={10}>10 miles</option>
            <option value={25}>25 miles</option>
            <option value={50}>50 miles</option>
            <option value={100}>100 miles</option>
          </select>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finding Events...
            </>
          ) : (
            'Find Events'
          )}
        </button>
      </form>
    </div>
  );
} 