'use client'

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from 'next/image'

const footerSections = {
  quickLinks: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/membership", label: "Membership" },
    { href: "/licensing", label: "Licensing" },
  ],
  resources: [
    { href: "/downloads", label: "Downloads" },
    { href: "/mcskwave", label: "MCSK Wave" },
    { href: "/careers", label: "Careers" },
    { href: "/news", label: "News" },
    { href: "/events", label: "Events" },
  ],
  legal: [
    { href: "/copyright-law", label: "Copyright Law" },
    { href: "/faqs", label: "FAQs" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
  contact: {
    address: "Sports Road, Westlands • P.O. BOX 14806-00800 • Nairobi, Kenya",
    phone: "+254 733 400204/ 0204400200",
    email: "music@mcsk.org",
  },
  social: [
    { href: "https://twitter.com/mcsk", label: "Twitter", icon: "twitter" },
    { href: "https://facebook.com/mcsk", label: "Facebook", icon: "facebook" },
    { href: "https://instagram.com/mcsk", label: "Instagram", icon: "instagram" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1a1464] text-white py-8">
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/images/mcsk-logo-white.svg"
              alt="MCSK Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold mb-4 text-white">About MCSK</h3>
            <p className="text-slate-400">
              Protecting and promoting the interests of musicians in Kenya through
              effective copyright management.
            </p>
            <div className="mt-6 flex space-x-4">
              {footerSections.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800/30 text-blue-300 hover:bg-blue-700/50 hover:text-white hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                >
                  <i className={`fab fa-${item.icon} text-lg`} />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerSections.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {footerSections.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              {footerSections.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-slate-400" />
                <span>{footerSections.contact.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-phone text-slate-400" />
                <span>{footerSections.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-envelope text-slate-400" />
                <span>{footerSections.contact.email}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-blue-800 text-center text-blue-200">
          <p>
            &copy; {new Date().getFullYear()} Music Copyright Society of Kenya. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 