import { useState, useEffect } from 'react';
import EmailCapture from './EmailCapture';

interface EmailPopupProps {
  triggerType?: 'exit' | 'scroll' | 'time';
  scrollThreshold?: number; // Percentage of page scrolled
  timeDelay?: number; // Milliseconds before showing
  showOnce?: boolean; // Show only once per session
  showOncePerDays?: number; // Show only once per X days
  className?: string;
}

export default function EmailPopup({
  triggerType = 'time',
  scrollThreshold = 50,
  timeDelay = 5000,
  showOnce = true,
  showOncePerDays = 7,
  className = '',
}: EmailPopupProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (subscribedEmail) {
      setHasSubscribed(true);
      return;
    }

    // Check if popup was recently shown
    if (showOncePerDays > 0) {
      const lastShown = localStorage.getItem('popupLastShown');
      if (lastShown) {
        const daysSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
        if (daysSinceLastShown < showOncePerDays) {
          return;
        }
      }
    }

    // Set up the appropriate trigger
    if (triggerType === 'exit') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !showPopup && !hasSubscribed) {
          setShowPopup(true);
          if (showOnce) {
            document.removeEventListener('mouseleave', handleMouseLeave);
            localStorage.setItem('popupLastShown', Date.now().toString());
          }
        }
      };
      
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    } 
    else if (triggerType === 'scroll') {
      const handleScroll = () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrolled >= scrollThreshold && !showPopup && !hasSubscribed) {
          setShowPopup(true);
          if (showOnce) {
            window.removeEventListener('scroll', handleScroll);
            localStorage.setItem('popupLastShown', Date.now().toString());
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } 
    else if (triggerType === 'time') {
      const timer = setTimeout(() => {
        if (!hasSubscribed) {
          setShowPopup(true);
          localStorage.setItem('popupLastShown', Date.now().toString());
        }
      }, timeDelay);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [triggerType, scrollThreshold, timeDelay, showOnce, showOncePerDays, showPopup, hasSubscribed]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleSubmit = (email: string) => {
    setHasSubscribed(true);
    setShowPopup(false);
  };

  if (!showPopup || hasSubscribed) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          <EmailCapture 
            variant="inline"
            title="Join Our Networking Community"
            description="Get exclusive access to premium networking events and resources."
            leadMagnet="Join Now - It's Free!"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
} 