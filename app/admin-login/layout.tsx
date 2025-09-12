import { Metadata } from "next"
import React from 'react'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Admin Login - MCSK",
  description: "Login to MCSK Admin Dashboard",
}

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
} 