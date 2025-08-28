'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 opacity-80"
      initial={{y: -60 }}
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
        className="bg-black backdrop-blur-sm border-b border-zinc-700/50 shadow-lg"
        initial={{ opacity: 0.2, minHeight: "120px" }}
        animate={{ 
          opacity: isHovered ? 0.9 : 0.2,
          minHeight: isHovered ? "110px" : "120px",
          boxShadow: isHovered ? "0 10px 25px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)"
        }}
        transition={{ duration: 0.3 }}
      >
<div className="container mx-auto px-6 py-4 flex items-center">
  <motion.div 
    className="text-white text-xl font-semibold flex items-center"
    initial={{ y: 20, opacity: 0 }}
    animate={{ 
      y: isHovered ? 0 : 20, 
      opacity: isHovered ? 1 : 0.7 
    }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    <div className="flex items-center gap-4">
    <span className="text-white text-xl font-semibold flex items-center">Welcome to this unofficial fansite</span> 
    <Link href="/">Home</Link>
    <Link href="/about">About</Link> 
    </div>
  </motion.div>
</div>
      </motion.main>
    </motion.div>
  );
};

export default Header;