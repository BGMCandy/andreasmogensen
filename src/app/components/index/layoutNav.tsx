import React from "react";
import Link from "next/link";

const LayoutNav: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-1 py-4 max-w-6xl mx-auto">
      <div className="relative group p-2">
        <Link 
          href="/"
          className="relative block w-32 h-6 bg-zinc-700/80 border-l border-r border-zinc-500/60 flex items-center justify-center overflow-hidden transition-all duration-600 ease-out group-hover:bg-zinc-600/90 group-hover:border-zinc-400/80"
        >
          {/* Subtle text reveal */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-audiowide tracking-wider text-zinc-100 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            Home
          </span>
          
          {/* Minimal accent line */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 ease-out" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
        </Link>
      </div>

      <div className="relative group p-2">
        <Link 
          href="/about"
          className="relative block w-32 h-6 bg-zinc-700/80 border-l border-r border-zinc-500/60 flex items-center justify-center overflow-hidden transition-all duration-600 ease-out group-hover:bg-zinc-600/90 group-hover:border-zinc-400/80"
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-audiowide tracking-wider text-zinc-100 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            About
          </span>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
        </Link>
      </div>

      <div className="relative group p-2">
        <Link 
          href="/books"
          className="relative block w-32 h-6 bg-zinc-700/80 border-l border-r border-zinc-500/60 flex items-center justify-center overflow-hidden transition-all duration-600 ease-out group-hover:bg-zinc-600/90 group-hover:border-zinc-400/80"
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-audiowide tracking-wider text-zinc-100 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            Books
          </span>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
        </Link>
      </div>

      <div className="relative group p-2">
        <Link 
          href="/music"
          className="relative block w-32 h-6 bg-zinc-700/80 border-l border-r border-zinc-500/60 flex items-center justify-center overflow-hidden transition-all duration-600 ease-out group-hover:bg-zinc-600/90 group-hover:border-zinc-400/80"
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-audiowide tracking-wider text-zinc-100 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            Music
          </span>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
        </Link>
      </div>

      <div className="relative group p-2">
        <Link 
          href="/contact"
          className="relative block w-32 h-6 bg-zinc-700/80 border-l border-r border-zinc-500/60 flex items-center justify-center overflow-hidden transition-all duration-600 ease-out group-hover:bg-zinc-600/90 group-hover:border-zinc-400/80"
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-audiowide tracking-wider text-zinc-100 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            Contact
          </span>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
        </Link>
      </div>
    </div>
  );
};

export default LayoutNav;