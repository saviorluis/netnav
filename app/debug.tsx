'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DebugPage() {
  const [environment, setEnvironment] = useState<string>('');
  const [cssLoaded, setCssLoaded] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [userAgent, setUserAgent] = useState<string>('');
  const [tailwindLoaded, setTailwindLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check environment
    const hostname = window.location.hostname;
    setEnvironment(hostname.includes('localhost') ? 'Development' : 'Production');
    
    // Check if CSS is loaded
    const allStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
    setCssLoaded(allStyles.length > 0);
    
    // Get window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Get user agent
    setUserAgent(navigator.userAgent);
    
    // Check if Tailwind is loaded
    const testElement = document.createElement('div');
    testElement.className = 'hidden sm:block';
    document.body.appendChild(testElement);
    const computedStyle = window.getComputedStyle(testElement);
    setTailwindLoaded(computedStyle.display === 'none');
    document.body.removeChild(testElement);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">NetNav Rendering Diagnostic</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Environment Information</h2>
            <ul className="space-y-2">
              <li><strong>Environment:</strong> {environment}</li>
              <li><strong>CSS Loaded:</strong> {cssLoaded ? 'Yes' : 'No'}</li>
              <li><strong>Tailwind Loaded:</strong> {tailwindLoaded ? 'Yes' : 'No'}</li>
              <li><strong>Window Size:</strong> {windowSize.width} x {windowSize.height}</li>
              <li><strong>User Agent:</strong> {userAgent}</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Tailwind Test</h2>
            <div className="space-y-4">
              <div className="p-2 bg-blue-100 text-blue-800 rounded">bg-blue-100 text-blue-800</div>
              <div className="p-2 bg-green-100 text-green-800 rounded">bg-green-100 text-green-800</div>
              <div className="p-2 bg-red-100 text-red-800 rounded">bg-red-100 text-red-800</div>
              <div className="hidden sm:block p-2 bg-purple-100 text-purple-800 rounded">
                This should only show on sm screens and up
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Layout Test</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>Left</span>
                <span>Right</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-100 p-2 rounded text-center">1</div>
                <div className="bg-gray-100 p-2 rounded text-center">2</div>
                <div className="bg-gray-100 p-2 rounded text-center">3</div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Font Test</h2>
            <div className="space-y-2">
              <p className="text-xs">Text Extra Small (xs)</p>
              <p className="text-sm">Text Small (sm)</p>
              <p className="text-base">Text Base</p>
              <p className="text-lg">Text Large (lg)</p>
              <p className="text-xl">Text Extra Large (xl)</p>
              <p className="font-bold">Bold Text</p>
              <p className="italic">Italic Text</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 