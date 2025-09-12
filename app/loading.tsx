'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const loadingMessages = [
  'Preparing your content...',
  'Almost there...',
  'Just a moment...',
  'Loading...',
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Rotate loading messages
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Smooth fade-in effect for the loading state
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-medium text-gray-900">
            {loadingMessages[messageIndex]}
          </h2>
          <p className="text-sm text-gray-500">
            Loading {pathname || 'page'}...
          </p>
        </div>
      </div>
    </div>
  );
} 