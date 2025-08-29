
'use client';

import React from "react";
import Hero from "../components/index/hero";
import BackgroundSpace from "../components/index/backgroundSpace";

import AndreasFloat from "../components/index/andreasFloat";
import SiteLinks, { SiteLink } from '../components/blocks/siteLinks';
import { orionBackground } from "../data/backgrounds/orion";

export default function ClaimDomain() {

  const homepageLinks: SiteLink[] = [
    { href: "#start", label: "Read More" }
  ];



  return (
    <main className='relative min-h-screen'>
      {/* Background */}
      <BackgroundSpace {...orionBackground} />
      
      {/* Floating astronaut */}
      <AndreasFloat />
      
      {/* Hero and SiteLinks container - both visible on first screen */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Hero 
          title="Domain Claim" 
          subtitle="andreasmogensen.dk is available for you"
          colorScheme="cosmic"
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

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16" id="start">
        {/* Domain Information Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-audiowide font-bold text-white mb-4">
              andreasmogensen.dk
            </h2>
            <div className="text-xl text-cyan-400 font-mono mb-2">Domain Available for Claim</div>
            <div className="text-zinc-400 text-sm">Registered and hosted by a fan</div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Current Status */}
            <div className="space-y-4">
              <h3 className="text-xl font-audiowide text-white mb-4">Current Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-zinc-300">Domain registered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-zinc-300">Website hosted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-zinc-300">Available for transfer</span>
                </div>
              </div>
            </div>
            
            {/* What You Get */}
            <div className="space-y-4">
              <h3 className="text-xl font-audiowide text-white mb-4">What You Get</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-zinc-300">Full domain ownership</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-zinc-300">DNS management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-zinc-300">Complete control</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Story */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          <h3 className="text-2xl font-audiowide text-white mb-6 text-center">The Story</h3>
          <div className="prose prose-invert max-w-none text-center">
            <p className="text-zinc-300 text-lg leading-relaxed mb-4">
              As a fan of your incredible work as an astronaut and your contributions to space exploration, 
              I registered this domain name thinking it would be perfect for an official Andreas Mogensen website.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-4">
              However, I realized that this domain would be much more valuable and meaningful in your hands. 
              You could use it for your official website, space mission updates, educational content, or any other purpose you choose.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              <strong className="text-cyan-400">The domain is yours to claim if you want it.</strong>
            </p>
          </div>
        </div>

        {/* How to Claim */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/20 rounded-3xl p-8">
          <h3 className="text-2xl font-audiowide text-white mb-6 text-center">How to Claim</h3>
          <div className="text-center space-y-6">
            <p className="text-zinc-300 text-lg">
              If you&apos;re interested in claiming andreasmogensen.dk, please contact me:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-audiowide text-cyan-400 mb-2">Email</h4>
                <p className="text-zinc-300 text-sm mb-3">Primary contact method</p>
                <a 
                  href="mailto:domain@andreasmogensen.dk" 
                  className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm break-all"
                >
                  domain@andreasmogensen.dk
                </a>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-audiowide text-cyan-400 mb-2">GitHub</h4>
                <p className="text-zinc-300 text-sm mb-3">Repository contact</p>
                <a 
                  href="https://github.com/BGMCandy/andreasmogensen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm"
                >
                  github.com/BGMCandy
                </a>
              </div>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-2xl p-4 mt-6">
              <p className="text-yellow-300 text-sm">
                <strong>Note:</strong> This is a genuine offer from a fan. No strings attached, no cost to you. 
                The domain will remain available until you decide to claim it or I hear from you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}