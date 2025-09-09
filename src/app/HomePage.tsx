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
import StructuredData from './components/seo/StructuredData';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  // Custom links for homepage
  const homepageLinks: SiteLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/claim-domain", label: "Claim Domain" }
  ];

  // Structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andreas Mogensen",
    description: "Danish ESA astronaut and space explorer",
    url: "https://andreasmogensen.dk",
    image: "https://andreasmogensen.dk/og-image.jpg",
    jobTitle: "ESA Astronaut",
    worksFor: {
      "@type": "Organization",
      name: "European Space Agency",
      url: "https://www.esa.int"
    },
    nationality: {
      "@type": "Country",
      name: "Denmark"
    },
    birthPlace: {
      "@type": "Place",
      name: "Copenhagen, Denmark"
    },
    birthDate: "1970-10-10",
    spouse: "Astrid Mogensen",
    children: ["Mathias", "Mathilde"],
    knowsAbout: [
      "Space Exploration",
      "International Space Station",
      "Astronaut Training",
      "ESA Missions",
      "Space Technology"
    ],
    sameAs: [
      "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/Andreas_Mogensen"
    ]
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <StructuredData data={structuredData} />
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
    </>
  );
}
