/**
 * Performance monitoring and metrics collection
 */

// Performance metrics storage
const metrics: Record<string, number> = {};

/**
 * Start a performance measurement
 */
export function startMeasure(name: string): void {
  if (typeof window !== 'undefined') {
    performance.mark(`start-${name}`);
  } else {
    metrics[`start-${name}`] = Date.now();
  }
}

/**
 * End a performance measurement and return the duration in milliseconds
 */
export function endMeasure(name: string): number {
  if (typeof window !== 'undefined') {
    performance.mark(`end-${name}`);
    const measure = performance.measure(
      name,
      `start-${name}`,
      `end-${name}`
    );
    performance.clearMarks(`start-${name}`);
    performance.clearMarks(`end-${name}`);
    performance.clearMeasures(name);
    return measure.duration;
  } else {
    const start = metrics[`start-${name}`] || 0;
    const duration = Date.now() - start;
    delete metrics[`start-${name}`];
    return duration;
  }
}

/**
 * Measure the execution time of an async function
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<{ result: T; duration: number }> {
  startMeasure(name);
  const result = await fn();
  const duration = endMeasure(name);
  return { result, duration };
}

/**
 * Log performance metrics to the console or server
 */
export function logMetrics(metrics: Record<string, number>): void {
  if (process.env.NODE_ENV === 'production') {
    // In production, send metrics to your analytics service
    try {
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          metrics,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
          path: typeof window !== 'undefined' ? window.location.pathname : 'server',
        }),
      }).catch(console.error);
    } catch (error) {
      console.error('Error sending metrics:', error);
    }
  } else {
    // In development, log to console
    console.group('Performance Metrics');
    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`${key}: ${value.toFixed(2)}ms`);
    });
    console.groupEnd();
  }
}

/**
 * Track page load performance
 */
export function trackPageLoad() {
  if (typeof window === 'undefined') return;

  const metrics: Record<string, number> = {};

  // Navigation Timing API metrics
  if (window.performance) {
    const [entry] = performance.getEntriesByType('navigation');
    if (entry) {
      const navEntry = entry as PerformanceNavigationTiming;
      metrics['DNS Lookup'] = navEntry.domainLookupEnd - navEntry.domainLookupStart;
      metrics['TCP Connect'] = navEntry.connectEnd - navEntry.connectStart;
      metrics['Request Time'] = navEntry.responseStart - navEntry.requestStart;
      metrics['Response Time'] = navEntry.responseEnd - navEntry.responseStart;
      metrics['DOM Load'] = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
      metrics['Page Load'] = navEntry.loadEventEnd - navEntry.loadEventStart;
      metrics['Total Load Time'] = navEntry.loadEventEnd - navEntry.startTime;
    }
  }

  // Resource Timing API metrics
  if (performance.getEntriesByType) {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const resourceMetrics: Record<string, number> = {};
    
    resources.forEach((resource) => {
      const resourceType = 'initiatorType' in resource ? resource.initiatorType : 'other';
      if (!resourceMetrics[resourceType]) {
        resourceMetrics[resourceType] = 0;
      }
      resourceMetrics[resourceType] += resource.duration;
    });

    Object.entries(resourceMetrics).forEach(([type, duration]) => {
      metrics[`Resource: ${type}`] = duration;
    });
  }

  // Log the metrics
  logMetrics(metrics);
}

// Track page load when the page loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    trackPageLoad();
  } else {
    window.addEventListener('load', trackPageLoad);
  }
}
