'use client';
import { useState, useEffect } from 'react';
import Hero from './components/index/hero';
import BackgroundSpace from './components/index/backgroundSpace';
import Cluster from './components/stars/cluster';
import AndreasFloat from './components/index/andreasFloat';
import SlothFloat from './components/index/slothFloat';
import { andromedaBackground } from './data/backgrounds/andromeda';
import mogensenCluster from './data/clusters/andreas-mogensen';
import { motion } from 'framer-motion';
import SiteLinks, { SiteLink } from './components/blocks/siteLinks';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  // Custom links for homepage
  const homepageLinks: SiteLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/claim-domain", label: "Claim Domain" }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className='relative min-h-screen pb-24'>
      {/* Background with fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <BackgroundSpace {...andromedaBackground} />
      </motion.div>
      
      {/* Hero and SiteLinks container - both visible on first screen */}
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        {/* Floating astronaut - behind content but above background */}
        <AndreasFloat />
        
        {/* Floating sloth mascot - positioned on the left side */}
        <SlothFloat />
        
        <Hero   
          title="Andreas Mogensen"
          subtitle="An unofficial fansite"
          colorScheme="zinc"
          fontFamily="audiowide"
        />
        
        {/* SiteLinks with custom props - positioned exactly 6px below Hero */}
        <div className="mt-1.5">
          <SiteLinks 
            links={homepageLinks}
            className="relative z-40"
            maxWidth="max-w-3xl"
            padding="py-6 px-6"
          />
        </div>
      </div>
      
      {/* Stars - positioned above content but scrollable */}
      <div className="relative z-20 min-h-screen">
        <Cluster stars={mogensenCluster.stars} className="absolute w-full h-full" />
      </div>
    </main>
  );
}
