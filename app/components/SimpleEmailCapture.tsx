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
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You for Subscribing!</h3>
        <p className="text-gray-600">You're now on the list to receive the latest networking opportunities.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Updated on Networking Events</h3>
        <p className="text-gray-600">Join thousands of professionals finding valuable networking opportunities.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
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