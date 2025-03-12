import { useState } from 'react';
import EmailCapture from './EmailCapture';

interface LeadMagnetProps {
  title: string;
  description: string;
  imageUrl?: string;
  buttonText: string;
  downloadUrl?: string;
  variant?: 'popup' | 'inline' | 'footer';
  className?: string;
}

export default function LeadMagnet({
  title,
  description,
  imageUrl,
  buttonText,
  downloadUrl,
  variant = 'inline',
  className = '',
}: LeadMagnetProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleEmailSubmit = (email: string) => {
    // Track this conversion
    console.log(`Lead magnet conversion for: ${email}`);
    
    // If there's a download URL, make it available
    if (downloadUrl) {
      setDownloadReady(true);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {/* Lead Magnet Content */}
      <div className="p-6">
        {imageUrl && (
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {!showEmailCapture && !downloadReady && (
          <button
            onClick={() => setShowEmailCapture(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            {buttonText}
          </button>
        )}
        
        {showEmailCapture && !downloadReady && (
          <EmailCapture 
            variant={variant}
            title={`Get ${title}`}
            description="Enter your email to receive this resource"
            leadMagnet="Get Instant Access"
            onSubmit={handleEmailSubmit}
          />
        )}
        
        {downloadReady && downloadUrl && (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-3">Your download is ready!</p>
            <a
              href={downloadUrl}
              download
              className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
            >
              Download Now
            </a>
          </div>
        )}
      </div>
      
      {/* Footer with benefits */}
      <div className="bg-gray-50 px-6 py-4">
        <h4 className="font-medium text-gray-900 mb-2">What you'll get:</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-600">Actionable networking strategies</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-600">Exclusive event notifications</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-600">Industry-specific connections</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 