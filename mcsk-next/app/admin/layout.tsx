import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/Sidebar'
import AdminHeader from '@/components/admin/Header'
import { Metadata } from "next"
import React from 'react'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "MCSK Admin Dashboard",
  description: "Admin dashboard for managing MCSK website content",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current URL path to check if we're on the login page
  const { pathname } = new URL(headers().get('x-url') || 'http://localhost/admin')
  const isLoginPage = pathname === '/login/admin'

  // TEMPORARY: Bypass authentication in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEV] Authentication bypassed')
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block">
            <AdminSidebar />
          </div>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    )
  }

  // Only check authentication if we're not on the login page
  if (!isLoginPage) {
    const session = await auth()
    
    // Check if user is authenticated and is an admin
    if (!session || !session.user || session.user.role !== 'admin') {
      redirect('/login/admin')
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block">
            <AdminSidebar />
          </div>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  )
} 