import React from 'react'

const Footer = () => {
  return (
    <footer className='absolute bottom-0 left-0 right-0 z-[9999] py-4'>
      <span className='text-white text-center text-xs block opacity-80  tracking-wider mb-1 hover:opacity-100 hover:text-cyan-300 transition-all duration-300 cursor-default'>
        EXPLORE THE UNIVERSE
      </span>
      <span className='text-white text-center text-[10px] block opacity-60  tracking-wider hover:opacity-100 hover:text-purple-300 transition-all duration-300 cursor-default'>
        POWERED BY BGMCANDY
      </span>
    </footer>
  )
}

export default Footer