'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface ViewportPrefetcherProps {
  prefetchDistance?: number;
  prefetchOnHover?: boolean;
}

export function ViewportPrefetcher({
  prefetchDistance = 2,
  prefetchOnHover = true,
}: ViewportPrefetcherProps) {
  const pathname = usePathname();

  const router = useRouter();
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get all links in the viewport
    const getLinksInViewport = () => {
      const viewportWidth = window.innerWidth;
      const viewportRect = {
        top: -viewportHeight * prefetchDistance,
        left: -viewportWidth * prefetchDistance,
        right: viewportWidth * (1 + prefetchDistance),
        bottom: viewportHeight * (1 + prefetchDistance),
      };

      return Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
        .filter(link => {
          // Skip links without href or with special protocols
          if (!link.href || link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
            return false;
          }

          // Skip links to the current page
          if (link.pathname === pathname) {
            return false;
          }

          // Check if link is in or near viewport
          const rect = link.getBoundingClientRect();
          return (
            rect.bottom >= viewportRect.top &&
            rect.right >= viewportRect.left &&
            rect.left <= viewportRect.right &&
            rect.top <= viewportRect.bottom
          );
        });
    };

    // Prefetch links in viewport
    const prefetchLinks = () => {
      const links = getLinksInViewport();
      links.forEach(link => {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          // Use the router's prefetch method
          router.prefetch(url.pathname);
        }
      });
    };

    // Initial prefetch
    prefetchLinks();

    // Set up intersection observer for dynamic content
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLAnchorElement) {
          const url = new URL(entry.target.href);
          if (url.origin === window.location.origin) {
            router.prefetch(url.pathname);
          }
        }
      });
    }, {
      root: null,
      rootMargin: `${viewportHeight * prefetchDistance}px`,
      threshold: 0.01,
    });

    // Observe all links
    document.querySelectorAll('a[href]').forEach(link => {
      if (observerRef.current) {
        observerRef.current.observe(link);
      }
    });

    // Set up hover prefetching
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          router.prefetch(url.pathname);
        }
      }
    };

    if (prefetchOnHover) {
      document.addEventListener('mouseover', handleHover, { once: true, passive: true });
    }

    // Clean up
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (prefetchOnHover) {
        document.removeEventListener('mouseover', handleHover);
      }
    };
  }, [pathname, prefetchDistance, prefetchOnHover]);

  return null;
}
