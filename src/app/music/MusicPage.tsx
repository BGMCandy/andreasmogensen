'use client';

import React from "react";
import Hero from "../components/index/hero";
import BackgroundSpace from "../components/index/backgroundSpace";
import { orionBackground } from "../data/backgrounds/orion";
import AndreasFloat from "../components/index/andreasFloat";
import SiteLinks, { SiteLink } from '../components/blocks/siteLinks';
import TextBox, { TextElement } from '../components/blocks/textBox';
import StructuredData from "../components/seo/StructuredData";

export default function MusicPage() {
  const homepageLinks: SiteLink[] = [
    { href: "#start", label: "Explore" }
  ];

  const playlistElements: TextElement[] = [
    { type: 'h2', content: 'Space Music Collection', className: 'text-center mb-8' },
    { type: 'p', content: 'Curated music for your cosmic journey. Each track has been selected to complement the space theme of this site.' },
  ];

  // Structured data for music page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    name: "Andreas Mogensen - Cosmic Soundtrack",
    description: "Space-themed ambient music created by BGMCandy for the Andreas Mogensen fansite",
    url: "https://andreasmogensen.dk/music",
    creator: {
      "@type": "Person",
      name: "BGMCandy"
    },
    numTracks: 5,
    duration: "PT20M",
    track: [
      {
        "@type": "MusicRecording",
        name: "Free Floating",
        byArtist: "BGMCandy",
        duration: "PT3M42S",
        genre: "Ambient Space"
      },
      {
        "@type": "MusicRecording",
        name: "Stellar Drift",
        byArtist: "BGMCandy",
        duration: "PT4M15S",
        genre: "Electronic"
      },
      {
        "@type": "MusicRecording",
        name: "Orbital Harmony",
        byArtist: "BGMCandy",
        duration: "PT3M58S",
        genre: "Ambient"
      },
      {
        "@type": "MusicRecording",
        name: "Cosmic Currents",
        byArtist: "BGMCandy",
        duration: "PT4M32S",
        genre: "Space Rock"
      },
      {
        "@type": "MusicRecording",
        name: "Nebula Dreams",
        byArtist: "BGMCandy",
        duration: "PT3M27S",
        genre: "Dream Pop"
      }
    ]
  };

  const tracks = [
    {
      id: 1,
      title: "Free Floating",
      artist: "BGMCandy",
      duration: "3:42",
      genre: "Ambient Space",
      description: "A gentle, floating melody that captures the feeling of weightlessness in space."
    },
    {
      id: 2,
      title: "Stellar Drift",
      artist: "BGMCandy", 
      duration: "4:15",
      genre: "Electronic",
      description: "Electronic beats with cosmic undertones, perfect for space exploration."
    },
    {
      id: 3,
      title: "Orbital Harmony",
      artist: "BGMCandy",
      duration: "3:58",
      genre: "Ambient",
      description: "Peaceful ambient sounds that evoke the vastness of space."
    },
    {
      id: 4,
      title: "Cosmic Currents",
      artist: "BGMCandy",
      duration: "4:32",
      genre: "Space Rock",
      description: "Rock-inspired space music with driving rhythms and ethereal textures."
    },
    {
      id: 5,
      title: "Nebula Dreams",
      artist: "BGMCandy",
      duration: "3:27",
      genre: "Dream Pop",
      description: "Dreamy, atmospheric music that transports you to distant nebulae."
    }
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <main className='relative min-h-screen pb-24'>
      {/* Background */}
      <BackgroundSpace {...orionBackground} />
      
      {/* Floating astronaut */}
      <AndreasFloat />
      
      {/* Hero and SiteLinks container - both visible on first screen */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Hero 
          title="Music" 
          subtitle="Listen to the cosmic soundtrack"
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16" id="start">
        {/* Introduction */}
        <div className="mb-16">
          <TextBox 
            elements={playlistElements}
            className="text-center"
            spacing="loose"
          />
        </div>

        {/* Listen & Download Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-audiowide text-white mb-6 text-center">Listen & Download</h3>
          <div className="text-center space-y-6">
            <p className="text-zinc-300 text-lg">
              The music player is available in the top-right corner of every page for instant listening.
            </p>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-8">
              <h4 className="text-xl font-audiowide text-cyan-400 mb-4">Full Playlist Available</h4>
              <p className="text-zinc-300 mb-6">
                Listen to all tracks and download them for offline enjoyment.
              </p>
              <a 
                href="https://bgmcandy.com/playlists/andreas-mogensen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-audiowide font-semibold rounded-xl transition-all duration-300 hover:scale-105 border border-cyan-400/30"
              >
                Listen on BGMCandy
              </a>
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-audiowide text-white mb-8 text-center">Full Playlist</h3>
          
          <div className="space-y-4">
            {tracks.map((track) => (
              <div 
                key={track.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-audiowide font-bold">
                      {track.id}
                    </div>
                    <div>
                      <h4 className="text-lg font-audiowide text-white">{track.title}</h4>
                      <p className="text-cyan-400 font-mono text-sm">{track.artist}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-zinc-400 text-sm font-mono">{track.duration}</div>
                    <div className="text-purple-400 text-xs font-mono">{track.genre}</div>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{track.description}</p>
              </div>
            ))}
          </div>

          {/* Playlist Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-audiowide text-cyan-400">{tracks.length}</div>
                <div className="text-zinc-400 text-sm">Total Tracks</div>
              </div>
              <div>
                <div className="text-2xl font-audiowide text-purple-400">~20 min</div>
                <div className="text-zinc-400 text-sm">Total Duration</div>
              </div>
              <div>
                <div className="text-2xl font-audiowide text-blue-400">5</div>
                <div className="text-zinc-400 text-sm">Genres</div>
              </div>
            </div>
          </div>
        </div>

        {/* About the Music */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/20 rounded-3xl p-8">
          <h3 className="text-2xl font-audiowide text-white mb-6 text-center">About the Music</h3>
          <div className="text-center space-y-4">
            <p className="text-zinc-300 text-lg">
              All music is created by BGMCandy, carefully selected to complement the space theme.
            </p>
            <p className="text-cyan-400 font-semibold">
              Enjoy the cosmic soundtrack while you browse!
            </p>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
