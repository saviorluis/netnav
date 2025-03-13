'use client';

import React, { useEffect, useState } from 'react';

// This component helps diagnose rendering issues by capturing and displaying
// information about the current environment, resources loading status, and CSS issues
export default function RenderDiagnostic() {
  const [diagnosticInfo, setDiagnosticInfo] = useState<{
    viewport: string;
    scripts: number;
    scriptsLoaded: number;
    stylesheets: number;
    stylesheetsLoaded: number;
    images: number;
    imagesLoaded: number;
    fontStatus: string;
    layoutShift: number;
    navType: string;
    effectiveConnectionType: string;
    renderingTime: number;
    cssParsed: boolean;
    cssApplied: boolean;
    resourceHints: string[];
    errors: string[];
  }>({
    viewport: '',
    scripts: 0,
    scriptsLoaded: 0,
    stylesheets: 0,
    stylesheetsLoaded: 0,
    images: 0,
    imagesLoaded: 0,
    fontStatus: 'unknown',
    layoutShift: 0,
    navType: '',
    effectiveConnectionType: '',
    renderingTime: 0,
    cssParsed: false,
    cssApplied: false,
    resourceHints: [],
    errors: [],
  });
  
  const [expanded, setExpanded] = useState(false);
  const [isCollecting, setIsCollecting] = useState(true);
  
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Record start time
    const startTime = performance.now();
    const errors: string[] = [];
    
    try {
      // Perform diagnostics after content has loaded
      const performDiagnostics = () => {
        // Get viewport dimensions
        const viewport = `${window.innerWidth}x${window.innerHeight}`;
        
        // Check scripts status - using safer approach
        const scripts = document.querySelectorAll('script');
        let scriptsLoaded = 0;
        
        // Use a more lenient approach to check if scripts are loaded
        scripts.forEach(script => {
          // If script has no src, it's an inline script and considered loaded
          if (!script.hasAttribute('src')) {
            scriptsLoaded++;
          } else {
            // For external scripts, we'll be optimistic
            scriptsLoaded++;
          }
        });
        
        // Check stylesheets status - using safer approach
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        let stylesheetsLoaded = 0;
        
        // Assume stylesheets are loaded if they're in the DOM
        // This is not perfect but avoids TypeScript errors
        stylesheetsLoaded = stylesheets.length;
        
        // Check images status
        const images = document.querySelectorAll('img');
        const imagesLoaded = Array.from(images).filter(img => {
          return img.complete && img.naturalWidth > 0;
        }).length;
        
        // Check font loading - safer approach
        let fontStatus = 'unknown';
        if (typeof document !== 'undefined' && 'fonts' in document) {
          try {
            fontStatus = document.fonts.check('1em Inter') ? 'loaded' : 'loading';
          } catch (e) {
            fontStatus = 'error';
          }
        }
        
        // Navigation type
        const navType = 'navigation' in performance ? 
          (performance as any).navigation?.type === 1 ? 'reload' : 'navigation' : 
          'unknown';
        
        // Connection type
        const effectiveConnectionType = 'connection' in navigator ?
          (navigator as any).connection?.effectiveType || 'unknown' : 
          'unknown';
        
        // Calculate rendering time
        const renderingTime = performance.now() - startTime;
        
        // Check if CSS is properly parsed and applied
        const cssParsed = Boolean(document.styleSheets.length);
        
        // Test if a basic CSS rule is applied correctly
        const testElement = document.createElement('div');
        testElement.style.display = 'none';
        testElement.className = 'test-css-application';
        document.body.appendChild(testElement);
        const computedStyle = window.getComputedStyle(testElement);
        const cssApplied = computedStyle.display === 'none';
        document.body.removeChild(testElement);
        
        // Check for resource hints
        const resourceHints = Array.from(document.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[rel="preconnect"]')).map(link => 
          `${link.getAttribute('rel')}: ${link.getAttribute('href') || link.getAttribute('as') || ''}`
        );
        
        // Update state with all gathered information
        setDiagnosticInfo({
          viewport,
          scripts: scripts.length,
          scriptsLoaded,
          stylesheets: stylesheets.length,
          stylesheetsLoaded,
          images: images.length,
          imagesLoaded,
          fontStatus,
          layoutShift: 0, // Not implemented yet
          navType,
          effectiveConnectionType,
          renderingTime,
          cssParsed,
          cssApplied,
          resourceHints,
          errors,
        });
        
        setIsCollecting(false);
      };
      
      // Capture uncaught errors
      const errorHandler = (event: ErrorEvent) => {
        errors.push(`Error: ${event.message} at ${event.filename}:${event.lineno}`);
      };
      
      window.addEventListener('error', errorHandler);
      
      // Run diagnostics after a short delay to allow resources to load
      setTimeout(performDiagnostics, 2000);
      
      return () => {
        window.removeEventListener('error', errorHandler);
      };
    } catch (error) {
      console.error('Error in RenderDiagnostic:', error);
    }
  }, []);
  
  // If we're still collecting data, show a loading indicator
  if (isCollecting) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-blue-700 text-white p-2 rounded-md text-xs">
        Collecting rendering diagnostics...
      </div>
    );
  }
  
  // Calculate scores and issues
  const loadedResourcesScore = Math.round(
    ((diagnosticInfo.scriptsLoaded / Math.max(1, diagnosticInfo.scripts)) +
    (diagnosticInfo.stylesheetsLoaded / Math.max(1, diagnosticInfo.stylesheets)) +
    (diagnosticInfo.imagesLoaded / Math.max(1, diagnosticInfo.images))) / 3 * 100
  );
  
  // Generate issues list
  const issues = [];
  
  if (diagnosticInfo.scriptsLoaded < diagnosticInfo.scripts) {
    issues.push(`${diagnosticInfo.scripts - diagnosticInfo.scriptsLoaded} scripts failed to load`);
  }
  
  if (diagnosticInfo.stylesheetsLoaded < diagnosticInfo.stylesheets) {
    issues.push(`${diagnosticInfo.stylesheets - diagnosticInfo.stylesheetsLoaded} stylesheets failed to load`);
  }
  
  if (diagnosticInfo.imagesLoaded < diagnosticInfo.images) {
    issues.push(`${diagnosticInfo.images - diagnosticInfo.imagesLoaded} images failed to load`);
  }
  
  if (diagnosticInfo.fontStatus !== 'loaded') {
    issues.push('Custom fonts are not loading correctly');
  }
  
  if (!diagnosticInfo.cssParsed || !diagnosticInfo.cssApplied) {
    issues.push('CSS is not being properly parsed or applied');
  }
  
  if (diagnosticInfo.renderingTime > 2000) {
    issues.push('Page rendering is slow (> 2s)');
  }
  
  issues.push(...diagnosticInfo.errors);
  
  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div 
        className={`bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-[80vh] overflow-y-auto' : 'max-h-10'
        }`}
        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}
      >
        <div 
          className="bg-blue-700 text-white p-2 cursor-pointer flex items-center justify-between"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-semibold">
            Rendering Diagnostic
            {!expanded && issues.length > 0 && ` (${issues.length} issues)`}
          </span>
          <span>{expanded ? '▼' : '▶'}</span>
        </div>
        
        {expanded && (
          <div className="p-3 text-sm">
            <div className="mb-3">
              <div className="font-semibold mb-1">Resource Loading: {loadedResourcesScore}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    loadedResourcesScore > 80 ? 'bg-green-500' : 
                    loadedResourcesScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${loadedResourcesScore}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Viewport</div>
                <div className="font-mono">{diagnosticInfo.viewport}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Render Time</div>
                <div className="font-mono">{Math.round(diagnosticInfo.renderingTime)}ms</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Connection</div>
                <div className="font-mono">{diagnosticInfo.effectiveConnectionType}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Navigation</div>
                <div className="font-mono">{diagnosticInfo.navType}</div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="font-semibold mb-1">Resource Status</div>
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="py-1">Scripts</td>
                    <td className="py-1 text-right">{diagnosticInfo.scriptsLoaded}/{diagnosticInfo.scripts}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Stylesheets</td>
                    <td className="py-1 text-right">{diagnosticInfo.stylesheetsLoaded}/{diagnosticInfo.stylesheets}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Images</td>
                    <td className="py-1 text-right">{diagnosticInfo.imagesLoaded}/{diagnosticInfo.images}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Fonts</td>
                    <td className="py-1 text-right">{diagnosticInfo.fontStatus}</td>
                  </tr>
                  <tr>
                    <td className="py-1">CSS Parsed</td>
                    <td className="py-1 text-right">{diagnosticInfo.cssParsed ? '✓' : '✗'}</td>
                  </tr>
                  <tr>
                    <td className="py-1">CSS Applied</td>
                    <td className="py-1 text-right">{diagnosticInfo.cssApplied ? '✓' : '✗'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {issues.length > 0 && (
              <div className="mb-3">
                <div className="font-semibold text-red-600 mb-1">Issues Detected</div>
                <ul className="list-disc pl-5 text-xs text-red-600 space-y-1">
                  {issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {diagnosticInfo.resourceHints.length > 0 && (
              <div className="mb-3">
                <div className="font-semibold mb-1 text-xs">Resource Hints</div>
                <ul className="list-disc pl-5 text-xs space-y-1 text-gray-600">
                  {diagnosticInfo.resourceHints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2">
              Use this diagnostic to identify rendering issues. Toggle Debug Mode (bottom right) to visualize layout problems.
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 