import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface SiteLink {
  href: string;
  label: string;
}

export interface SiteLinksProps {
  links?: SiteLink[];
  className?: string;
  containerClassName?: string;
  linkClassName?: string;
  textClassName?: string;
  glowClassName?: string;
  maxWidth?: string;
  padding?: string;
}

const SiteLinks: React.FC<SiteLinksProps> = ({
  links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/shop", label: "Shop" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" }
  ],
  className = "",
  containerClassName = "",
  linkClassName = "",
  textClassName = "",
  glowClassName = "",
  maxWidth = "max-w-2xl",
  padding = "py-8"
}) => {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 ${padding} ${maxWidth} mx-auto ${containerClassName} ${className} pointer-events-auto bass-pulse`}>
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
          className="relative group pointer-events-auto p-3"
        >
          <Link 
            href={link.href}
            className={`relative block w-24 h-1 bg-zinc-800/40 border-l border-r border-zinc-600/30 flex items-center justify-center overflow-hidden transition-all duration-600 ease-out pointer-events-auto group-hover:h-6 group-hover:bg-zinc-700/60 group-hover:border-zinc-500/50 ${linkClassName}`}
          >
            {/* Subtle text reveal */}
            <span
              className={`absolute inset-0 flex items-center justify-center text-xs font-audiowide tracking-wider text-zinc-300 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out ${textClassName}`}
            >
              {link.label}
            </span>
            
            {/* Minimal accent line */}
            <div
              className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 ease-out ${glowClassName}`}
            />
            
            {/* Subtle inner glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out ${glowClassName}`}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default SiteLinks;