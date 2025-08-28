'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/index/hero';
import BackgroundSpace from '../components/index/backgroundSpace';
import { orionBackground } from '../data/backgrounds/orion';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className='flex flex-col items-center justify-center relative min-h-screen'>
      {/* Background with fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <BackgroundSpace {...orionBackground} />
      </motion.div>
      
      {/* Hero */}
      <Hero 
        title="About"
        subtitle="Learn more about this unofficial fansite"
        colorScheme="space"
      />
    </main>
  );
}