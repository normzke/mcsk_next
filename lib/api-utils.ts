/**
 * Utility functions for API calls with better error handling for build time
 */

/**
 * Safely fetch data from an API with proper error handling and timeout
 * This is especially useful during build time to prevent hanging on API calls
 */
export async function safeFetch<T>(
  url: string, 
  options: RequestInit = {}, 
  fallbackData: T,
  timeoutMs: number = 5000
): Promise<T> {
  // Create an abort controller for the timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    // Add the signal to the fetch options
    const fetchOptions = {
      ...options,
      signal: controller.signal
    };
    
    const res = await fetch(url, fetchOptions);
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.data || fallbackData;
  } catch (error) {
    console.warn(`Error fetching ${url}:`, error);
    return fallbackData;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Get the base URL for API calls
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}
