'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/index/hero';
import BackgroundSpace from '../components/index/backgroundSpace';
import Cluster from '../components/stars/cluster';
import { orionBackground } from '../data/backgrounds/orion';
import trainingHonorsCluster from '../data/clusters/mogensen-training-honors';
import TextBox, { TextElement } from '../components/blocks/textBox';

const aboutElements: TextElement[] = [
  { type: 'h2', content: 'About This Site', className: 'text-4xl font-bold mb-6' },
  { type: 'p', content: 'This is an unofficial fansite for Andreas Mogensen, a Danish astronaut and ESA astronaut. He was born on 10 October 1970 in Copenhagen, Denmark. He is married to Astrid Mogensen and has two children, Mathias and Mathilde.' },
  { type: 'p', content: 'This site is <strong>not affiliated</strong> with Andreas Mogensen or the ESA. It is a personal project and a tribute to his work and achievements.' },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className='relative min-h-screen'>
      {/* Background with fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <BackgroundSpace {...orionBackground} />
      </motion.div>
      
      {/* Hero - perfectly centered on screen */}
      <div className="flex items-center justify-center min-h-screen">
        <Hero 
          title="About"
          subtitle="Learn more about this unofficial fansite"
          colorScheme="space"
          fontFamily="audiowide"
        />
      </div>

      {/* Content below - requires scrolling */}
      <div className="relative z-10 pb-20">
        <TextBox 
          elements={aboutElements}
          className="max-w-2xl mx-auto px-6 py-8"
          spacing="loose"
        />
      </div>
      
      {/* Training & Honors Stars - positioned above content but scrollable */}
      <div className="relative z-20 min-h-screen">
        <Cluster stars={trainingHonorsCluster.stars} className="absolute w-full h-full" />
      </div>
    </main>
  );
}