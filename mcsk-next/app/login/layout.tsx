import { Metadata } from "next"
import React from 'react'

export const metadata: Metadata = {
  title: "Admin Login - MCSK",
  description: "Login to MCSK Admin Dashboard",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
