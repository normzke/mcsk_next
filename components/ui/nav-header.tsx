'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import type { NavHeaderProps } from './nav-header.types';

// Define types for navigation items
type NavChild = {
  href: string;
  label: string;
};

type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { 
    href: "#", 
    label: "About",
    children: [
      { href: "/about", label: "About MCSK" },
      { href: "/about/leadership", label: "Leadership" }
    ]
  },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/membership", label: "Membership" },
  { href: "/licensing", label: "Licensing" },
  {
    href: "#",
    label: "Resources",
    children: [
      { href: "/downloads", label: "Downloads" },
      { href: "/mcskwave", label: "MCSK Wave" },
      { href: "/careers", label: "Careers" }
    ]
  },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" }
]

// Desktop dropdown menu component
interface DesktopDropdownMenuProps {
  item: NavItem;
  pathname: string;
  isScrolled: boolean;
}

function DesktopDropdownMenu({ item, pathname, isScrolled }: DesktopDropdownMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const hasActiveChild = item.children?.some(child => pathname === child.href);
  
  return (
    <div className="relative group px-4 py-2">
      <button 
        className={cn(
          "flex items-center font-medium transition-all duration-300",
          isScrolled ? "text-xs" : "text-sm",
          hasActiveChild
            ? "text-[#1a1464] font-semibold"
            : "text-gray-600 group-hover:text-[#1a1464]"
        )}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        {item.label}
        <ChevronDown className={cn(
          "h-4 w-4 ml-1 transition-transform duration-300",
          isDropdownOpen && "rotate-180"
        )} />
      </button>
      {hasActiveChild && (
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600"
          layoutId="navbar-indicator"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="absolute left-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-lg shadow-xl py-2 z-10 border border-blue-100 overflow-hidden"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {item.children?.map((child: NavChild) => {
              const isActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "block px-4 py-2 text-sm transition-all duration-200",
                    isActive
                      ? "text-[#1a1464] font-medium bg-blue-50/80"
                      : "text-gray-700 hover:bg-blue-50/50 hover:text-[#1a1464]"
                  )}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {child.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile dropdown menu component
interface MobileDropdownMenuProps {
  item: NavItem;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileDropdownMenu({ item, setIsOpen }: MobileDropdownMenuProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className="py-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-base font-medium py-2 text-gray-600 hover:text-[#1a1464]"
      >
        <span>{item.label}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-300",
          isExpanded && "rotate-180"
        )} />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-4 border-l border-blue-100 ml-2 mt-1 space-y-1">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm text-gray-600 hover:text-[#1a1464]"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NavHeader({ logo = "/images/MCSK Logo.png" }: NavHeaderProps) {
  // Ensure logo has a default value if empty
  const logoUrl = logo || "/images/MCSK Logo.png";
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Add scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className="w-full">
      {/* Top bar with contact info - futuristic design */}
      <div className="bg-gradient-to-r from-[#1a1464] to-[#2c2580] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>+254 733 400204/ 0204400200</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Sports Road, Westlands • P.O. BOX 14806-00800 • Nairobi, Kenya</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/member-access" className="hover:underline hover:text-blue-100 transition-colors duration-200">Member Access</Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline hover:text-blue-100 transition-colors duration-200">Contact</Link>
          </div>
        </div>
      </div>
      
      {/* Main navigation - futuristic design */}
      <div className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled 
          ? "bg-white/98 backdrop-blur-xl shadow-xl border-blue-200 transform translate-y-0" 
          : "bg-white/95 backdrop-blur-lg shadow-lg border-blue-100"
      )}>
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-14" : "h-16"
          )}>
            {/* Logo with futuristic styling */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className={cn(
                "relative overflow-hidden rounded-full p-1 transition-all duration-300",
                isScrolled 
                  ? "bg-gradient-to-r from-blue-200 to-indigo-200 group-hover:from-blue-300 group-hover:to-indigo-300" 
                  : "bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200"
              )}>
                <Image
                  src={logoUrl}
                  alt="MCSK Logo"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className={cn(
                "font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a1464] to-[#3a2b8c] group-hover:from-[#3a2b8c] group-hover:to-[#1a1464] transition-all duration-500",
                isScrolled ? "text-lg" : "text-xl"
              )}>MCSK</span>
            </Link>

            {/* Desktop Navigation with futuristic styling */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                if (item.children) {
                  // Handle dropdown menu
                  return <DesktopDropdownMenu key={item.label} item={item} pathname={pathname} isScrolled={isScrolled} />;
                }
                
                // Regular menu item with futuristic active state
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 group"
                  >
                    <span className={cn(
                      "font-medium transition-all duration-300",
                      isScrolled ? "text-xs" : "text-sm",
                      isActive 
                        ? "text-[#1a1464] font-semibold" 
                        : "text-gray-600 group-hover:text-[#1a1464]"
                    )}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Apply for License Button with futuristic styling */}
            <div className="hidden md:block">
              <Button 
                className="bg-gradient-to-r from-[#1a1464] to-[#2c2580] hover:from-[#2c2580] hover:to-[#1a1464] text-white shadow-md transition-all duration-300 hover:shadow-lg"
                asChild
              >
                <a href="https://online.mcsk.org/" target="_blank" rel="noopener noreferrer">Apply For License</a>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-700"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="border-l border-blue-100">
                  <div className="flex items-center mb-8">
                    <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-r from-blue-100 to-indigo-100 mr-2">
                      <Image
                        src={logo}
                        alt="MCSK Logo"
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain"
                        priority
                      />
                    </div>
                    <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a1464] to-[#3a2b8c]">MCSK</h3>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => {
                      if (item.children) {
                        // Handle dropdown menu for mobile
                        return <MobileDropdownMenu key={item.label} item={item} setIsOpen={setIsOpen} />;
                      }
                      
                      // Regular menu item
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-base font-medium py-2 block transition-colors",
                            pathname === item.href
                              ? "text-[#1a1464] font-semibold"
                              : "text-gray-600 hover:text-[#1a1464]"
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                    <div className="pt-4 mt-4 border-t border-blue-100">
                      <Button 
                        className="bg-gradient-to-r from-[#1a1464] to-[#2c2580] hover:from-[#2c2580] hover:to-[#1a1464] text-white w-full shadow-md transition-all duration-300"
                        asChild
                      >
                        <Link href="https://online.mcsk.org/" target="_blank" rel="noopener noreferrer">Apply For License</Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        {isScrolled && (
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </header>
  );
}
