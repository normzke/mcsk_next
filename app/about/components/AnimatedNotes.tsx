'use client'

import React from 'react'

export default function AnimatedNotes() {
  // Use deterministic values to prevent hydration mismatch
  const notes = ['♪', '♫', '♬', '♩', '♭', '♮']
  const positions = [
    { top: '10%', left: '15%', fontSize: '2.5rem', opacity: 0.3, delay: '0s', rotation: 45 },
    { top: '25%', left: '85%', fontSize: '3.2rem', opacity: 0.2, delay: '2s', rotation: 120 },
    { top: '45%', left: '25%', fontSize: '2.8rem', opacity: 0.4, delay: '1s', rotation: 90 },
    { top: '65%', left: '75%', fontSize: '2.1rem', opacity: 0.25, delay: '3s', rotation: 180 },
    { top: '85%', left: '45%', fontSize: '3.5rem', opacity: 0.35, delay: '0.5s', rotation: 270 },
    { top: '15%', left: '55%', fontSize: '2.3rem', opacity: 0.15, delay: '4s', rotation: 60 },
    { top: '35%', left: '95%', fontSize: '2.9rem', opacity: 0.3, delay: '1.5s', rotation: 150 },
    { top: '55%', left: '5%', fontSize: '2.7rem', opacity: 0.2, delay: '2.5s', rotation: 30 },
    { top: '75%', left: '65%', fontSize: '3.1rem', opacity: 0.4, delay: '0.8s', rotation: 210 },
    { top: '95%', left: '35%', fontSize: '2.4rem', opacity: 0.25, delay: '3.5s', rotation: 300 },
    { top: '5%', left: '25%', fontSize: '2.6rem', opacity: 0.35, delay: '1.2s', rotation: 75 },
    { top: '20%', left: '85%', fontSize: '3.3rem', opacity: 0.2, delay: '2.8s', rotation: 135 },
    { top: '40%', left: '15%', fontSize: '2.2rem', opacity: 0.3, delay: '0.3s', rotation: 105 },
    { top: '60%', left: '95%', fontSize: '2.8rem', opacity: 0.25, delay: '4.2s', rotation: 195 },
    { top: '80%', left: '55%', fontSize: '3.0rem', opacity: 0.4, delay: '1.8s', rotation: 240 }
  ]

  return (
    <>
      {/* Animated music notes */}
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <div 
            key={i}
            className="absolute text-white/20 animate-float"
            style={{
              fontSize: pos.fontSize,
              top: pos.top,
              left: pos.left,
              opacity: pos.opacity,
              animationDuration: '15s',
              animationDelay: pos.delay,
              transform: `rotate(${pos.rotation}deg)`
            }}
          >
            {notes[i % notes.length]}
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
