import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EmailCaptureProps {
  variant?: 'popup' | 'inline' | 'footer' | 'gate';
  title?: string;
  description?: string;
  leadMagnet?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

export default function EmailCapture({
  variant = 'inline',
  title = 'Stay Updated on Networking Events',
  description = 'Join thousands of professionals finding valuable networking opportunities.',
  leadMagnet = 'Get access to exclusive events',
  onSubmit,
  className = '',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, source: variant }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
      setEmail('');
      setName('');
      
      // Store in localStorage to remember this user has subscribed
      localStorage.setItem('subscribedEmail', email);
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(email);
      }
      
      // For gate variant, redirect or update UI
      if (variant === 'gate') {
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Different styling based on variant
  const getContainerClasses = () => {
    switch (variant) {
      case 'popup':
        return 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
      case 'footer':
        return 'bg-gray-100 p-6 rounded-lg';
      case 'gate':
        return 'fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4';
      case 'inline':
      default:
        return 'bg-white border border-gray-200 p-6 rounded-lg shadow-sm';
    }
  };

  const renderContent = () => {
    if (success) {
      return (
        <div className="text-center py-4">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You for Subscribing!</h3>
          <p className="text-gray-600">You're now on the list to receive the latest networking opportunities.</p>
          {variant === 'popup' || variant === 'gate' ? (
            <button 
              onClick={() => variant === 'popup' ? setSuccess(false) : router.refresh()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {variant === 'gate' ? 'Continue to Site' : 'Close'}
            </button>
          ) : null}
        </div>
      );
    }

    return (
      <>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your name"
            />
          </div>
          
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              leadMagnet
            )}
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
      </>
    );
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      <div className={`${variant === 'popup' || variant === 'gate' ? 'bg-white p-6 rounded-lg shadow-xl max-w-md w-full' : 'w-full'}`}>
        {renderContent()}
      </div>
    </div>
  );
} 