import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import type { NavLink } from "./navigation"

interface MobileNavigationProps {
  links: NavLink[]
  isOpen: boolean
  onClose: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  links, 
  isOpen, 
  onClose 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Slide-out menu */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-zinc-700/50 z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-700/50">
              <h2 className="text-white text-lg font-audiowide">Menu</h2>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="p-6">
              <div className="space-y-4">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white/80 hover:text-white text-lg py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 border-l-2 border-transparent hover:border-blue-400"
                        onClick={onClose}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="block text-white/80 hover:text-white text-lg py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 border-l-2 border-transparent hover:border-blue-400"
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </nav>
            
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-zinc-700/50">
              <p className="text-white/50 text-sm text-center">
                Explore the universe
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileNavigation 