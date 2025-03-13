'use client';

import { useState, useEffect } from 'react';

export default function DebugMode() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  
  useEffect(() => {
    // Check if debug mode was previously enabled
    const savedDebugMode = localStorage.getItem('netnav-debug-mode') === 'true';
    setIsDebugMode(savedDebugMode);
    
    // Apply debug mode class to the document if enabled
    if (savedDebugMode) {
      document.documentElement.classList.add('debug-mode');
    }
    
    // Listen for keyboard shortcut (Ctrl+Shift+D) to toggle debug mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsDebugMode(prev => {
          const newState = !prev;
          localStorage.setItem('netnav-debug-mode', String(newState));
          
          if (newState) {
            document.documentElement.classList.add('debug-mode');
          } else {
            document.documentElement.classList.remove('debug-mode');
          }
          
          return newState;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isDebugMode ? 'opacity-100' : 'opacity-30'} hover:opacity-100 transition-opacity`}>
      <button
        onClick={() => setIsDebugMode(prev => {
          const newState = !prev;
          localStorage.setItem('netnav-debug-mode', String(newState));
          
          if (newState) {
            document.documentElement.classList.add('debug-mode');
          } else {
            document.documentElement.classList.remove('debug-mode');
          }
          
          return newState;
        })}
        className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs font-mono"
      >
        {isDebugMode ? 'Debug: ON' : 'Debug: OFF'}
      </button>
      
      {isDebugMode && (
        <div className="bg-black bg-opacity-80 text-white p-2 mt-2 rounded-md text-xs max-w-xs">
          <p className="font-bold">Debug Tools:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            <li>Elements have outlines</li>
            <li>Text is highlighted</li>
            <li>Images show dimensions</li>
            <li>Flexbox/Grid visualized</li>
          </ul>
          <p className="mt-2 text-gray-300">Press Ctrl+Shift+D to toggle</p>
        </div>
      )}
    </div>
  );
} 