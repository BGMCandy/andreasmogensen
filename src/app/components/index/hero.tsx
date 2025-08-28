import React from "react"
import { motion } from "framer-motion"

export type HeroColorScheme = 'zinc' | 'space' | 'cosmic'
export type HeroFontFamily = 'noto-sans' | 'noto-serif' | 'noto-mono' | 'audiowide' | 'default'

interface HeroProps {
  title: string
  subtitle: string
  colorScheme?: HeroColorScheme
  fontFamily?: HeroFontFamily
  className?: string
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  colorScheme = 'zinc',
  fontFamily = 'default',
  className = ""
}) => {
  const colorSchemes = {
    zinc: {
      title: "from-zinc-400 via-zinc-400 to-zinc-700",
      card: "bg-white/10 border-white/20"
    },
    space: {
      title: "from-blue-400 via-cyan-400 to-indigo-600",
      card: "bg-blue-500/10 border-blue-300/20"
    },
    cosmic: {
      title: "from-purple-400 via-pink-400 to-rose-600",
      card: "bg-purple-500/10 border-purple-300/20"
    }
  }

  const colors = colorSchemes[colorScheme]
  
  const fontClasses = {
    'noto-sans': 'font-noto-sans',
    'noto-serif': 'font-noto-serif', 
    'noto-mono': 'font-noto-mono',
    'audiowide': 'font-audiowide',
    'default': ''
  }

  return (
    <div className={`opacity-80 relative px-4 ${className}`}>
      
      {/* Glassmorphic hero card */}
      <motion.div
        className={`relative z-10 rounded-3xl backdrop-blur-xl border shadow-2xl p-12 text-center ${colors.card}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className={`text-5xl md:text-7xl opacity-100 font-extrabold bg-gradient-to-r cursor-default ${colors.title} bg-clip-text text-transparent drop-shadow-lg ${fontClasses[fontFamily]}`}
        >
          {title}
        </motion.h1>
        <p className={`mt-6 text-lg md:text-xl text-white/80 cursor-default ${fontClasses[fontFamily]}`}>
          {subtitle}
        </p>
      </motion.div>
    </div>
  )
}

export default Hero
