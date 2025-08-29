
'use client';

import React from "react";
import Hero from "../components/index/hero";
import BackgroundSpace from "../components/index/backgroundSpace";
import { minimalBackground } from "../data/backgrounds/minimal";
import FlipBlock from "../components/blocks/flipBlock";


export default function Books() {
  return (
    <main className='relative min-h-screen pb-24'>
      {/* Background */}
      <BackgroundSpace {...minimalBackground} />
      
      {/* Hero - perfectly centered on screen */}
      <div className="flex items-center justify-center min-h-screen">
        <Hero 
          title="Books" 
          subtitle="Andreas Mogensen&apos;s books"
          colorScheme="cosmic"
          fontFamily="audiowide"
        />
      </div>

      {/* Content below - requires scrolling */}
      <div className="relative z-10 pb-8 space-y-12">
        {/* Introduction */}
        <FlipBlock
          elements={[
            { type: 'h2', content: 'Space Chronicles', className: 'text-4xl font-bold mb-6' },
            { type: 'h3', content: 'A Personal Journey Through the Cosmos', className: 'text-xl mb-4' },
            { type: 'p', content: 'Andreas Mogensen has documented his extraordinary experiences as an ESA astronaut, sharing insights from his time aboard the International Space Station and his training journey.' },
          ]}
          imageSrc="https://files.andreasmogensen.dk/andreas-mogensen-hubert-niels.jpeg"
          imageAlt="Andreas Mogensen in space suit"
          imagePosition="left"
          spacing="loose"
          className="max-w-4xl mx-auto px-6 py-8"
        />

        {/* Book 1 */}
        <FlipBlock
          elements={[
            { type: 'h2', content: 'Life in Zero Gravity', className: 'text-3xl font-bold mb-4' },
            { type: 'h3', content: 'Daily Adventures on the ISS', className: 'text-lg mb-3' },
            { type: 'p', content: 'A fascinating account of what it&apos;s really like to live and work in space. From floating through modules to conducting experiments in microgravity, Mogensen shares the reality behind the dream.' },
            { type: 'p', content: 'Published: 2023 | Pages: 284 | Genre: Memoir/Science' },
          ]}
          imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
          imageAlt="International Space Station"
          imagePosition="right"
          spacing="normal"
          className="max-w-4xl mx-auto px-6 py-8"
        />

        {/* Book 2 */}
        <FlipBlock
          elements={[
            { type: 'h2', content: 'Training for the Stars', className: 'text-3xl font-bold mb-4' },
            { type: 'h3', content: 'The Road to Becoming an Astronaut', className: 'text-lg mb-3' },
            { type: 'p', content: 'An insider&apos;s look at the rigorous training process that transforms engineers and pilots into space explorers. Mogensen details the physical, mental, and technical challenges.' },
            { type: 'p', content: 'Published: 2022 | Pages: 312 | Genre: Autobiography/Education' },
          ]}
          imageSrc="https://images.unsplash.com/photo-1516339901601-2e1b4dc0c45e?w=400&h=300&fit=crop"
          imageAlt="Astronaut training facility"
          imagePosition="left"
          spacing="normal"
          className="max-w-4xl mx-auto px-6 py-8"
        />

        {/* Book 3 */}
        <FlipBlock
          elements={[
            { type: 'h2', content: 'Earth from Above', className: 'text-3xl font-bold mb-4' },
            { type: 'h3', content: 'Perspectives from 400 Kilometers', className: 'text-lg mb-3' },
            { type: 'p', content: 'A beautiful collection of photographs and reflections on our planet as seen from the unique vantage point of low Earth orbit. Mogensen captures the fragility and beauty of Earth.' },
            { type: 'p', content: 'Published: 2024 | Pages: 196 | Genre: Photography/Philosophy' },
          ]}
          imageSrc="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop"
          imageAlt="Earth from space"
          imagePosition="right"
          spacing="normal"
          className="max-w-4xl mx-auto px-6 py-8"
        />

        {/* Call to Action */}
        <div className="max-w-2xl mx-auto text-center px-6 py-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-audiowide font-bold text-white mb-4">
              Explore the Universe
            </h2>
            <p className="text-zinc-300 mb-6 font-noto-sans">
              These books offer a unique window into the life of a modern astronaut. 
              Perfect for space enthusiasts, aspiring scientists, and anyone curious about humanity&apos;s journey to the stars.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
              <span className="px-3 py-1 bg-white/10 rounded-full">Space Exploration</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Memoir</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Science</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Photography</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}