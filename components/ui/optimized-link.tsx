'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface OptimizedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  onHoverPrefetch?: boolean;
  onHoverDelay?: number;
  onClick?: () => void;
}

export function OptimizedLink({
  children,
  className = '',
  prefetch = true,
  onHoverPrefetch = true,
  onHoverDelay = 50,
  onClick,
  ...props
}: OptimizedLinkProps) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [shouldPrefetch, setShouldPrefetch] = useState(false);

  // Handle hover with delay for prefetching
  useEffect(() => {
    if (!onHoverPrefetch || !isHovering || isTouched) return;

    const timer = setTimeout(() => {
      if (isHovering && !isTouched) {
        setShouldPrefetch(true);
      }
    }, onHoverDelay);

    return () => clearTimeout(timer);
  }, [isHovering, isTouched, onHoverDelay, onHoverPrefetch]);

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsTouched(true);
    if (onHoverPrefetch) {
      setShouldPrefetch(true);
    }
  };

  // Handle click with custom onClick
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      {...props}
      className={`transition-opacity hover:opacity-80 ${className}`}
      prefetch={prefetch || shouldPrefetch}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
