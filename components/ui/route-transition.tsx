'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface RouteTransitionProps {
  children: ReactNode;
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChanging, setIsChanging] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Only run on client-side navigation
    if (pathname !== currentPath) {
      // Start fade out
      setShowContent(false);
      
      // Wait for fade out to complete
      const timer = setTimeout(() => {
        setCurrentPath(pathname);
        setIsChanging(true);
        
        // Force a small delay to ensure the DOM has updated
        requestAnimationFrame(() => {
          // Scroll to top on route change
          window.scrollTo(0, 0);
          
          // Fade in new content
          setShowContent(true);
          
          // Reset changing state after animation completes
          setTimeout(() => {
            setIsChanging(false);
          }, 300);
        });
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  return (
    <div 
      className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      aria-busy={isChanging}
      aria-live="polite"
    >
      {children}
    </div>
  );
}
