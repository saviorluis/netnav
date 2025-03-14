'use client';

import { useState } from 'react';

export default function SimpleEmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Store in localStorage
    try {
      // Get existing emails or initialize empty array
      const existingEmails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
      
      // Add new email if it doesn't exist
      if (!existingEmails.includes(email)) {
        existingEmails.push(email);
        localStorage.setItem('subscribedEmails', JSON.stringify(existingEmails));
      }
      
      // Mark as submitted
      setSubmitted(true);
      setEmail('');
      setError('');
      
      // Also store the individual email for compatibility with existing code
      localStorage.setItem('subscribedEmail', email);
    } catch (err) {
      console.error('Error storing email:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Thank You for Subscribing!</h3>
        <p className="mt-2 text-sm text-gray-600">You're now on the list to receive the latest networking opportunities.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
              required
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Get Access to Exclusive Events
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          By subscribing, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
} 