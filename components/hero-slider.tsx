'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: string | number;
  image: string;
  title: string;
  description: string;
  cta: { text: string; link?: string; url?: string; };
}

interface HeroSliderProps {
  slides: Slide[];
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    image: '/images/hero/slide1.jpg',
    title: 'Protecting Music Rights',
    description: 'MCSK is committed to protecting and promoting the rights of music creators in Kenya.',
    cta: { text: 'Join MCSK', link: '/membership' }
  },
  {
    id: 2,
    image: '/images/hero/slide2.jpg',
    title: 'Empowering Artists',
    description: 'We ensure fair compensation for musicians through efficient royalty collection and distribution.',
    cta: { text: 'Learn More', link: '/about' }
  },
  {
    id: 3,
    image: '/images/hero/slide3.jpg',
    title: 'Music Licensing Made Easy',
    description: 'Get your music license quickly and easily through our streamlined process.',
    cta: { text: 'Get License', link: '/licensing' }
  }
];

export default function HeroSlider({ slides = defaultSlides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 animate-pulse-slow" />
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-sm" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    className="max-w-2xl text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-shadow">
                      {slide.title}
                    </h1>
                    <p className="mb-8 text-lg md:text-xl text-white/90">
                      {slide.description}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={slide.cta.link || slide.cta.url || '#'}
                        className="inline-block rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-all hover:shadow-lg hover:shadow-white/20 button-glow"
                      >
                        {slide.cta.text}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110 glass"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110 glass"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-6 scale-110'
                : 'bg-white/50 hover:bg-white/75 w-2'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 