import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-16 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10 border-b border-gray-500 pb-14">
        {/* Left Side: Brand and App Links */}
        <div className="md:max-w-xl">
          <img alt="QuickShow Logo" className="h-11" src={assets.logo} />
          <p className="mt-6 text-sm leading-relaxed text-gray-400">
            QuickShow is your all-in-one destination for discovering movies, watching official trailers, 
            exploring showtimes, and booking tickets with ease. Designed for movie lovers, QuickShow 
            brings the excitement of cinema closer to you from the first trailer to the final seat selection.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <img src={assets.googlePlay} alt="Google Play" className="h-9 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
            <img src={assets.appStore} alt="App Store" className="h-9 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
        </div>

        {/* Right Side: Contact Info */}
        <div className="md:text-right min-w-[150px]">
          <h2 className="font-semibold text-white mb-4 tracking-wider uppercase text-xs">Get in touch</h2>
          <a 
            href="mailto:nethra.krish0906@gmail.com" 
            className="text-sm text-gray-400 hover:text-white transition-colors duration-200 block"
          >
            nethra.krish0906@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="pt-6 text-center text-xs text-gray-500 pb-6">
        Copyright {new Date().getFullYear()} © QuickShow. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer