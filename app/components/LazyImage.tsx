'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  aspectRatio = '16/9',
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  
  // Default sizes if not provided
  const defaultWidth = width || 800;
  const defaultHeight = height || 450;
  
  // Calculate aspect ratio percentage for container padding
  const getPaddingBottom = () => {
    if (width && height) {
      return `${(height / width) * 100}%`;
    }
    
    // Parse aspectRatio like "16/9"
    const [w, h] = aspectRatio.split('/').map(Number);
    return `${(h / w) * 100}%`;
  };
  
  useEffect(() => {
    // Skip if image is priority or already in view
    if (priority || isInView) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' } // Load image when it's 200px from viewport
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [priority, isInView]);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setHasError(true);
  };
  
  const containerStyle = {
    paddingBottom: getPaddingBottom(),
  };
  
  // Placeholder component for error state
  const ErrorPlaceholder = () => (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
      <svg 
        className="w-12 h-12" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
  
  // Fallback to img tag for external URLs that Next Image might not support
  const isExternalUrl = !src.startsWith('/') && !src.startsWith('data:') && !src.startsWith('blob:');
  
  return (
    <div 
      ref={imgRef} 
      className={`lazy-image-container ${isLoaded ? 'loaded' : ''} ${className}`}
      style={containerStyle}
    >
      {/* Show shimmer effect while loading */}
      {(!isLoaded && (priority || isInView)) && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
      )}
      
      {/* Show error placeholder if image failed to load */}
      {hasError && <ErrorPlaceholder />}
      
      {/* Only render the image if it's priority, in view, or already loaded */}
      {!hasError && (priority || isInView) && (
        isExternalUrl ? (
          // Use regular img for external URLs
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            style={{ 
              opacity: isLoaded ? 1 : 0,
              objectFit: objectFit,
            }}
          />
        ) : (
          // Use Next.js Image for internal URLs
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`(max-width: 768px) 100vw, ${defaultWidth}px`}
            quality={80}
            priority={priority}
            onLoad={handleLoad}
            onError={handleError}
            style={{ 
              opacity: isLoaded ? 1 : 0,
              objectFit: objectFit,
            }}
          />
        )
      )}
    </div>
  );
}

// Keyframe animation for shimmer effect
const shimmerAnimation = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
`;

// Add the shimmer animation to the global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = shimmerAnimation;
  document.head.appendChild(style);
} 