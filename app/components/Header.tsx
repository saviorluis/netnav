'use client';

import Link from 'next/link';
import AuthButton from './AuthButton';
import Image from 'next/image';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { isAuthenticated, isLoading } = useUser();
  const [currentDomain, setCurrentDomain] = useState<string>('');

  useEffect(() => {
    // Get the current domain and port from the window location
    const domain = window.location.hostname;
    const port = window.location.port;
    const isLocalhost = domain === 'localhost';
    setCurrentDomain(isLocalhost ? `localhost${port ? `:${port}` : ''}` : domain);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                NetNav
                {currentDomain && (
                  <span className="text-gray-500 text-sm">
                    {currentDomain.includes('localhost') ? '' : `.${currentDomain.split('.').pop()}`}
                  </span>
                )}
              </span>
              {!isAuthenticated && !isLoading && (
                <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  Developer Preview
                </span>
              )}
            </Link>
            <div className="ml-10 hidden space-x-8 md:block">
              <Link 
                href="/" 
                className="text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              {isAuthenticated && !isLoading && (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/events" 
                    className="text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    Events
                  </Link>
                  <Link 
                    href="/connections" 
                    className="text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    Network
                  </Link>
                </>
              )}
              {isLoading && (
                <div className="space-x-8">
                  <div className="inline-block h-5 w-20 animate-pulse rounded bg-gray-100"></div>
                  <div className="inline-block h-5 w-20 animate-pulse rounded bg-gray-100"></div>
                  <div className="inline-block h-5 w-20 animate-pulse rounded bg-gray-100"></div>
                </div>
              )}
              <Link 
                href="/about" 
                className="text-base font-medium text-gray-600 hover:text-gray-900"
              >
                About
              </Link>
            </div>
          </div>
          <AuthButton />
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 md:hidden">
          <Link 
            href="/" 
            className="text-base font-medium text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>
          {isAuthenticated && !isLoading && (
            <>
              <Link 
                href="/dashboard" 
                className="text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link 
                href="/events" 
                className="text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Events
              </Link>
              <Link 
                href="/connections" 
                className="text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Network
              </Link>
            </>
          )}
          {isLoading && (
            <div className="flex gap-x-6">
              <div className="h-5 w-20 animate-pulse rounded bg-gray-100"></div>
              <div className="h-5 w-20 animate-pulse rounded bg-gray-100"></div>
              <div className="h-5 w-20 animate-pulse rounded bg-gray-100"></div>
            </div>
          )}
          <Link 
            href="/about" 
            className="text-base font-medium text-gray-600 hover:text-gray-900"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
} 