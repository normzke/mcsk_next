import { redirect } from 'next/navigation'
import { getSession } from '@/lib/custom-auth'
import AdminSidebar from '@/components/admin/Sidebar'
import AdminHeader from '@/components/admin/Header'
import { Metadata } from "next"
import React, { Suspense } from 'react'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "MCSK Admin Dashboard",
  description: "Admin dashboard for managing MCSK website content",
}

// Loading component for better UX
function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  )
}

// Cache session check for better performance
let sessionCache: any = null
let sessionCacheTime = 0
const SESSION_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function getCachedSession() {
  const now = Date.now()
  
  // Return cached session if still valid
  if (sessionCache && (now - sessionCacheTime) < SESSION_CACHE_DURATION) {
    return sessionCache
  }
  
  // Fetch new session
  const session = await getSession()
  sessionCache = session
  sessionCacheTime = now
  
  return session
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication for all admin pages with caching
  const session = await getCachedSession()
  
  // Check if user is authenticated and is an admin
  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/admin-login')
  }

  // Return full admin layout for authenticated users
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block">
            <Suspense fallback={<div className="w-64 bg-gray-200 animate-pulse h-screen"></div>}>
              <AdminSidebar />
            </Suspense>
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Suspense fallback={<AdminLoading />}>
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </>
  )
} 