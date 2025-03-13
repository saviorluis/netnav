'use client';

import Link from 'next/link';
import AuthButton from './AuthButton';
import Image from 'next/image';
import { useUser } from '../context/UserContext';

// Get domain from environment variables
const domain = process.env.NEXT_PUBLIC_DOMAIN?.replace('https://', '').replace('http://', '') || 'netnav.app';
const domainSuffix = domain.includes('localhost') ? ':3000' : '';

export default function Header() {
  const { isAuthenticated } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                NetNav<span className="text-gray-500 text-sm">{domain.includes('localhost') ? '' : `.${domain.split('.').pop()}`}</span>
              </span>
              {!isAuthenticated && (
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
              {isAuthenticated && (
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
          {isAuthenticated && (
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