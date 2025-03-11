'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EventMap from './components/EventMap';
import AdminLoginButton from './components/AdminLoginButton';

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
  venue?: Venue;
  eventType: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [signupStatus, setSignupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [accessEmail, setAccessEmail] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to join waitlist');
      
      setSignupStatus('success');
      setEmail('');
    } catch (error) {
      setSignupStatus('error');
    }
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessEmail.trim() !== '') {
      // Store email in localStorage to remember the user
      localStorage.setItem('userEmail', accessEmail);
      setShowEventDetails(true);
    }
  };

  const handleZipCodeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode.trim()) return;
    
    setLoading(true);
    
    try {
      // Call our new zipcode search API
      const response = await fetch(`/api/events/zipcode?zipcode=${zipCode}&radius=50`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events for this zipcode');
      }
      
      const data = await response.json();
      
      // Update filtered events with the results
      setFilteredEvents(data);
      
      // If no events found, show a message
      if (data.length === 0) {
        setError('No events found in this area. Try a different zipcode or check back later.');
      } else {
        setError('');
      }
    } catch (error) {
      console.error('Error searching by zipcode:', error);
      setError('Failed to search for events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if user has already provided email
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setAccessEmail(storedEmail);
      setShowEventDetails(true);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with Network Navigator */}
      <header className="bg-white shadow-sm py-4 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Network Navigator</h1>
          <div className="flex items-center space-x-4">
            <AdminLoginButton />
          </div>
        </div>
      </header>

      {/* Hero section */}
      <div className="pt-24 pb-16 text-center lg:pt-32 px-4">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          <span className="block text-blue-600 mb-4">Find, Connect, Grow</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Find professional networking opportunities in your area, filtered by industry and event type. 
          Connect with like-minded professionals and grow your network.
        </p>
      </div>

      {/* Map preview section - Moved up */}
      <div className="bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Event Map</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find Events Near You
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore networking events across North Carolina with our interactive map.
            </p>
          </div>
          
          {/* Zipcode search form */}
          <div className="mx-auto mt-8 max-w-md">
            <form onSubmit={handleZipCodeSearch} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter your zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                pattern="[0-9]{5}"
                title="Please enter a valid 5-digit zip code"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search'
                )}
              </button>
            </form>
            <p className="mt-2 text-sm text-gray-500">
              Enter your zip code to find Chamber of Commerce, BNI, Toastmasters, SBA, and other networking events in your area.
            </p>
            {filteredEvents.length > 0 && (
              <p className="mt-2 text-sm text-green-600">
                Found {filteredEvents.length} events near {zipCode}
              </p>
            )}
          </div>
          
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[400px] relative">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-full text-red-600">
                    {error}
                  </div>
                ) : !showEventDetails ? (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Enter Your Email to View Events</h3>
                      <p className="text-gray-600 mb-4 text-center">
                        To access detailed event information, please provide your email address.
                      </p>
                      <form onSubmit={handleAccessSubmit} className="space-y-4">
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={accessEmail}
                          onChange={(e) => setAccessEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Access Events
                        </button>
                      </form>
                    </div>
                  </div>
                ) : null}
                <EventMap events={filteredEvents} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* North Carolina Networking section */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">North Carolina Networking</h2>
            <p className="text-gray-600 mb-6">
              NetNav is currently focused on networking events in North Carolina. Use the map above to find events near you, or view our calendar for upcoming events.
            </p>
            <div className="mt-6 flex flex-col space-y-4">
              <Link
                href="/calendar"
                className="rounded-md bg-blue-600 px-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                View Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Future of Networking
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              NetNav aggregates networking events from chambers of commerce, BNI, Toastmasters, and business incubators 
              to provide you with the most comprehensive list of networking opportunities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  Location-Based Search
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Enter your zip code and desired radius to find networking events near you, whether they're in-person or virtual.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                  </div>
                  Industry Filtering
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Filter events by industry to find the most relevant networking opportunities for your professional goals.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  Connect with Professionals
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Create a profile, connect with other professionals, and see which events your connections are attending.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  All Event Types
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Find both in-person and virtual events, from workshops and conferences to meetups and networking happy hours.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Early access / waitlist section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Join the Waitlist</h2>
            <p className="mt-4 text-lg text-gray-600">
              Be the first to know when NetNav launches to the public
            </p>
          </div>
          <div className="mt-10 mx-auto max-w-md">
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={signupStatus === 'loading'}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                {signupStatus === 'loading' ? 'Submitting...' : 'Request Access'}
              </button>
              {signupStatus === 'success' && (
                <p className="text-green-600 text-sm">Thanks for joining! We'll be in touch soon.</p>
              )}
              {signupStatus === 'error' && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
            <p className="mt-3 text-sm text-gray-500">
              We'll notify you when NetNav is available to the public. No spam, we promise.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 