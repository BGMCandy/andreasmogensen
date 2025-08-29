'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/index/hero';
import BackgroundSpace from '../components/index/backgroundSpace';
import Cluster from '../components/stars/cluster';
import { orionBackground } from '../data/backgrounds/orion';
import trainingHonorsCluster from '../data/clusters/mogensen-training-honors';
import TextBox, { TextElement } from '../components/blocks/textBox';
import SiteLinks, { SiteLink } from '../components/blocks/siteLinks';

  const homepageLinks: SiteLink[] = [
    { href: "#start", label: "Read More" }
  ];

const aboutElements: TextElement[] = [
  { type: 'h2', content: 'About This Site', className: 'text-4xl font-bold mb-6' },
  { type: 'p', content: 'This is an unofficial fansite for Andreas Mogensen, a Danish astronaut and ESA astronaut. He was born on 10 October 1970 in Copenhagen, Denmark. He is married to Astrid Mogensen and has two children, Mathias and Mathilde.' },
  { type: 'p', content: 'This site is <strong>not affiliated</strong> with Andreas Mogensen or the ESA. It is a personal project and a tribute to his work and achievements.' },
];

const aboutElements2: TextElement[] = [
  { type: 'h2', content: 'About me', className: 'text-4xl font-bold mb-6' },
  { type: 'p', content: 'I am a software engineer and a musician. I am a fan of Andreas Mogensen and his work. I am a fan of the ESA and the astronauts.' },
  { type: 'p', content: 'This site has no commercial intent and is not affiliated with Andreas Mogensen or the ESA.' },
];

const aboutElements3: TextElement[] = [
  { type: 'h2', content: 'The Music', className: 'text-4xl font-bold mb-6' },
  { type: 'p', content: 'Music is delivered by BGMCandy for this site.' },
  { 
    type: 'button', 
    content: 'Listen to Music',
    buttonVariant: 'primary',
    onClick: () => window.location.href = '/music'
  },
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
      

      {/* Hero and SiteLinks container - both visible on first screen */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Hero 
          title="About"
          subtitle="Learn more about this unofficial fansite"
          colorScheme="space"
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

      {/* Content below - requires scrolling */}
      <div className="relative z-10 pb-20" id="start">
        <TextBox 
          elements={aboutElements}
          className="max-w-2xl mx-auto px-6 py-8"
          spacing="loose"
        />
      </div>

      {/* Content below - requires scrolling */}
      <div className="relative z-10 pb-20">
        <TextBox 
          elements={aboutElements2}
          className="max-w-2xl mx-auto px-6 py-8"
          spacing="loose"
        />
      </div>

      {/* Content below - requires scrolling */}
      <div className="relative z-10 pb-20">
        <TextBox 
          elements={aboutElements3}
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