import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export interface NavLink {
  href: string
  label: string
  external?: boolean
}

interface NavigationProps {
  links: NavLink[]
  className?: string
  linkClassName?: string
}

const Navigation: React.FC<NavigationProps> = ({ 
  links, 
  className = "",
  linkClassName = ""
}) => {
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{ 
            y: -2,
            scale: 1.05
          }}
          className="relative group"
        >
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative px-4 py-2 text-white/80 hover:text-white transition-colors duration-300 ${linkClassName}`}
            >
              {link.label}
              {/* Hover underline effect */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-lg blur-sm opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </a>
          ) : (
            <Link
              href={link.href}
              className={`relative px-4 py-2 text-white/80 hover:text-white transition-colors duration-300 ${linkClassName}`}
            >
              {link.label}
              {/* Hover underline effect */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-lg blur-sm opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  )
}

export default Navigation