'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';

interface PartnerCardProps {
  id: string;
  name: string;
  logo: string;
  url: string;
  description?: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ 
  id, 
  name, 
  logo, 
  url, 
  description 
}) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a unique floating animation for each card
  const floatY = parseFloat(id) % 3 === 0 ? 8 : parseFloat(id) % 2 === 0 ? 6 : 4;
  const floatDuration = 3 + (parseFloat(id) % 3);
  
  // Subtle continuous floating animation
  useEffect(() => {
    controls.start({
      y: [0, -floatY, 0],
      transition: {
        duration: floatDuration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    });
  }, [controls, floatY, floatDuration]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: parseFloat(id) * 0.1 }}
      viewport={{ once: true }}
      animate={controls}
      whileHover={{ y: -12, rotate: 1, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group block h-full"
      >
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 h-full flex flex-col justify-between border border-gray-100 overflow-hidden group-hover:border-[#1a1464]/30 relative">
          {/* Background gradient that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1464]/5 via-transparent to-[#1a1464]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Decorative musical notes that appear on hover */}
          <div className="absolute top-4 left-4 text-[#1a1464]/0 group-hover:text-[#1a1464]/10 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          
          <div className="absolute top-4 right-4 text-[#1a1464]/0 group-hover:text-[#1a1464]/10 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 17H5v-2h4v2zm0-4H5v-2h4v2zm0-4H5V7h4v2zm10 4h-4v-2h4v2zm0-4h-4V7h4v2zm0 8h-4v-2h4v2zm-5 4H5v-2h9v2zm0-4H5v-2h9v2zm0-4H5v-2h9v2zm0-4H5V7h9v2z"/>
            </svg>
          </div>
          
          {/* Logo container with enhanced hover effect */}
          <div className="relative z-10 h-32 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white/50 p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1464]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image 
              src={logo} 
              alt={name}
              width={160}
              height={80}
              className="object-contain max-h-24 transition-all duration-500 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-md"
            />
          </div>
          
          {/* Content with enhanced hover effects */}
          <div className="text-center relative z-10">
            <h3 className="font-medium text-[#1a1464] mb-1 transition-all duration-300 group-hover:text-[#1a1464]/90 group-hover:font-semibold">{name}</h3>
            {description && (
              <p className="text-gray-600 text-sm mb-3 transition-all duration-300 group-hover:text-gray-700">{description}</p>
            )}
            <div className="inline-flex items-center text-sm text-gray-500 group-hover:text-[#1a1464] transition-all duration-300 bg-transparent group-hover:bg-[#1a1464]/5 py-1 px-3 rounded-full">
              <span>Visit website</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
          
          {/* Decorative musical note */}
          <div className="absolute bottom-2 right-2 text-[#1a1464]/10 group-hover:text-[#1a1464]/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:rotate-12 transition-transform duration-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PartnerCard;
