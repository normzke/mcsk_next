import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Music Copyright Society of Kenya',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-[#1a1464] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-[#1a1464] text-white px-6 py-3 rounded-lg hover:bg-[#2c2580] transition-colors"
          >
            Go to Homepage
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these pages:</p>
            <div className="mt-2 space-x-4">
              <Link href="/about" className="text-[#1a1464] hover:underline">About</Link>
              <Link href="/services" className="text-[#1a1464] hover:underline">Services</Link>
              <Link href="/contact" className="text-[#1a1464] hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 