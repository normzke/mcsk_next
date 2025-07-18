'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SocialPost {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram';
  content: string;
  image?: string;
  author: string;
  authorImage?: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  url: string;
}

interface SocialFeedProps {
  posts: SocialPost[];
  title?: string;
  subtitle?: string;
}

const SocialFeed: React.FC<SocialFeedProps> = ({ 
  posts, 
  title = "Social Media", 
  subtitle = "Join the conversation on our social media channels" 
}) => {
  // Group posts by platform for easy access - one post per platform
  const postsByPlatform: Record<string, SocialPost> = {};
  
  // Get the latest post from each platform
  posts.forEach(post => {
    if (!postsByPlatform[post.platform] || 
        new Date(post.date) > new Date(postsByPlatform[post.platform].date)) {
      postsByPlatform[post.platform] = post;
    }
  });
  
  // Available platforms
  const availablePlatforms = Object.keys(postsByPlatform) as Array<'twitter' | 'facebook' | 'instagram'>;
  const hasPosts = availablePlatforms.length > 0;
  
  const platformColors = {
    twitter: 'bg-blue-400',
    facebook: 'bg-blue-600',
    instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
  };
  
  const platformIcons = {
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a1464] mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availablePlatforms.map((platform, index) => {
              const post = postsByPlatform[platform];
              return (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    {/* Author info */}
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full overflow-hidden ${platformColors[platform]} flex items-center justify-center mr-3`}>
                        <Image 
                          src={post.authorImage || '/images/default-avatar.png'} 
                          alt={post.author}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-gray-500 text-sm flex items-center">
                          <span className="mr-1">{platformIcons[platform]}</span>
                          <span suppressHydrationWarning>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    {/* Image if available */}
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <Image 
                          src={post.image} 
                          alt="Post image"
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Engagement stats */}
                    <div className="flex justify-between text-gray-500 text-sm border-t pt-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        {post.comments}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        {post.shares}
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-gray-50 text-center py-3 text-[#1a1464] hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    View on {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No social media posts available at this time.</p>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link 
            href="/news" 
            className="inline-flex items-center text-[#1a1464] font-medium hover:underline"
          >
            View all updates
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
