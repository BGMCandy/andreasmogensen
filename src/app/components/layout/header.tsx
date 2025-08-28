'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '../index/navigation';
import MobileNavigation from '../index/mobileNavigation';
import type { NavLink } from '../index/navigation';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/books', label: 'Books' }
  ];

  return (
    <>
      {/* Desktop Header with hover effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 hidden md:block"
        initial={{y: -50 }}
        animate={{ y: isHovered ? 0 : -50 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.3
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.main 
          className="bg-black backdrop-blur-sm border-b border-zinc-700/50 shadow-lg h-[100px]"
          initial={{ opacity: 0.2 }}
          animate={{ 
            opacity: isHovered ? 0.9 : 0.2,
            boxShadow: isHovered ? "0 10px 25px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 h-full flex items-center justify-between">
            <motion.div 
              className="text-white text-xl font-semibold flex items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20, 
                opacity: isHovered ? 1 : 0.7 
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="font-audiowide">The Unofficial Andreas Mogensen Fansite</span>
            </motion.div>
            
            <Navigation 
              links={navigationLinks}
              linkClassName="font-medium"
            />
          </div>
        </motion.main>
      </motion.div>

      {/* Mobile Header - always visible */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 md:hidden"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <motion.main 
          className="bg-black/30 backdrop-blur-sm border-b border-zinc-700/30 shadow-lg h-16"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.3 }}
        >
          <div className="container mx-auto px-6 h-full flex items-center justify-between">
            <motion.div 
              className="text-white text-xl font-semibold flex items-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <span className="font-audiowide hidden sm:block">Welcome to this unofficial fansite</span>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </motion.main>
      </motion.div>
      
      {/* Mobile Navigation */}
      <MobileNavigation 
        links={navigationLinks}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;