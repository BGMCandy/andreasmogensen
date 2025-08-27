'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -60 }}
      animate={{ y: isHovered ? 0 : -60 }}
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
        className="bg-zinc-900/95 backdrop-blur-sm min-h-[80px] border-b border-zinc-700/50 shadow-lg"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0.8,
          boxShadow: isHovered ? "0 10px 25px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)"
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-6 py-4">
          <motion.div 
            className="text-white text-xl font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 20, 
              opacity: isHovered ? 1 : 0.7 
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Header
          </motion.div>
          
          {/* Subtle hover indicator */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </div>
      </motion.main>
    </motion.div>
  );
};

export default Header;