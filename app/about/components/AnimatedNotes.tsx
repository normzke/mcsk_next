'use client'

import React from 'react'

export default function AnimatedNotes() {
  return (
    <>
      {/* Animated music notes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-white/20 animate-float"
            style={{
              fontSize: `${Math.random() * 3 + 2}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {['♪', '♫', '♬', '♩', '♭', '♮'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>
      
      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
