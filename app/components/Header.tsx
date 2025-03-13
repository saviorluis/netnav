'use client';

import Link from 'next/link';
import AuthButton from './AuthButton';
import Image from 'next/image';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { isAuthenticated, loading } = useUser();
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Get the current domain and port from the window location
    const domain = window.location.hostname;
    const port = window.location.port;
    const isLocalhost = domain === 'localhost';
    setCurrentDomain(isLocalhost ? `localhost${port ? `:${port}` : ''}` : domain);
  }, []);

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">NetNav</span>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3">N</div>
            <span className="text-xl font-bold text-gray-900">
              NetNav
              {currentDomain && (
                <span className="text-gray-500 text-sm">
                  {currentDomain.includes('localhost') ? '' : `.${currentDomain.split('.').pop()}`}
                </span>
              )}
            </span>
            {!isAuthenticated && !loading && (
              <span className="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                Beta
              </span>
            )}
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
            Home
          </Link>
          {isAuthenticated && !loading && (
            <>
              <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/events" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                Events
              </Link>
              <Link href="/connections" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                Network
              </Link>
            </>
          )}
          {loading && (
            <div className="flex gap-x-12">
              <div className="h-5 w-20 animate-pulse rounded bg-gray-100"></div>
              <div className="h-5 w-20 animate-pulse rounded bg-gray-100"></div>
              <div className="h-5 w-20 animate-pulse rounded bg-gray-100"></div>
            </div>
          )}
          <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
            About
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <AuthButton />
        </div>
      </nav>
      
      {/* Mobile menu, show/hide based on mobile menu state */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">NetNav</span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3">N</div>
                <span className="text-xl font-bold text-gray-900">NetNav</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  {isAuthenticated && !loading && (
                    <>
                      <Link
                        href="/dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/events"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Events
                      </Link>
                      <Link
                        href="/connections"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Network
                      </Link>
                    </>
                  )}
                  <Link
                    href="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
                <div className="py-6">
                  <div className="-mx-3 block rounded-lg px-3 py-2.5">
                    <AuthButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 