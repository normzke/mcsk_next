'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LoginForm } from '@/components/admin/auth/LoginForm'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-400 blur-xl"
              style={{
                width: `${5 + (i % 5)}rem`,
                height: `${5 + (i % 5)}rem`,
                top: `${(i * 5)}%`,
                left: `${(i * 5)}%`,
                opacity: 0.3,
                animation: `float ${10 + (i % 5)}s linear infinite`,
                animationDelay: `${i}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Glass card */}
      <div className="max-w-md w-full p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl z-10 relative overflow-hidden">
        {/* Glowing accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="flex flex-col items-center relative z-10">
          <div className="bg-white/90 p-4 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/">
              <Image
                src="/images/MCSK Logo.png"
                alt="MCSK Logo"
                width={150}
                height={50}
                priority
                className="w-auto h-auto"
              />
            </Link>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">
            Admin Portal
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-4"></div>
          <p className="text-sm text-blue-100 mb-6">
            Sign in to access the management dashboard
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 shadow-inner">
          <LoginForm />
        </div>

        <div className="text-center text-sm text-blue-100 mt-6">
          <Link 
            href="/"
            className="inline-flex items-center hover:text-white transition-colors duration-300"
          >
            <span className="mr-1">←</span> Return to Website
          </Link>
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  )
}
