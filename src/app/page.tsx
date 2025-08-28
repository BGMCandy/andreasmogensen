'use client';
import { useState, useEffect } from 'react';
import Hero from './components/index/hero';
import BackgroundSpace from './components/index/backgroundSpace';
import Cluster from './components/stars/cluster';
import { andromedaBackground } from './data/backgrounds/andromeda';
import { andromeda } from './data/clusters/andromeda';
import { motion } from 'framer-motion';

export default function Home() {
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
        <BackgroundSpace {...andromedaBackground} />
      </motion.div>
      
      {/* Hero */}
      <Hero   
        title="Andreas Mogensen"
        subtitle="An unofficial fansite"
        colorScheme="zinc"
      />
      
      {/* Stars - positioned to cover the full viewport and CLICKABLE */}
      <div className="fixed inset-0 z-30">
        <Cluster stars={andromeda.stars} className="absolute w-full h-full" />
      </div>
    </main>
  );
}
