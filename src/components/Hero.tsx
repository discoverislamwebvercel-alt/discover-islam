'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div 
      id="home"
      className="h-screen relative"
      style={{
        backgroundImage: "url('/image 2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Navbar inside Hero */}
      <motion.nav 
        className="bg-white rounded-2xl mx-8 mt-5 px-8 py-4 shadow-lg absolute top-0 left-0 right-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <img 
              src="/discover islam horizontal logo - png 1.png" 
              alt="Discover Islam Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </div>

          {/* Center - Navigation Links (Desktop only) */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
              onClick={() => {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Home
            </button>
            <button 
              className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About us
            </button>
            <button 
              className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Services
            </button>
            <a 
              href="/exhibition"
              className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
            >
              Exhibition
            </a>
            <button 
              className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
            </button>
          </div>

          {/* Right side - Desktop Donate Button + Mobile Menu Button */}
          <div className="flex items-center">
            {/* Desktop Donate Button */}
            <motion.button
              className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate
            </motion.button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800 hover:text-[#cb892a] p-2 ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

              {/* Mobile Menu */}
              {isMobileMenuOpen && (
                <motion.div 
                  className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col space-y-4">
                    <button 
                      className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-left"
                      onClick={() => {
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Home
                    </button>
                    <button 
                      className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-left"
                      onClick={() => {
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      About us
                    </button>
                    <button 
                      className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-left"
                      onClick={() => {
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Services
                    </button>
                    <a 
                      href="/exhibition"
                      className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-left"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Exhibition
                    </a>
                    <button 
                      className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-left"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Contact Us
                    </button>
                    <motion.button
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300 text-center mt-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Donate
                    </motion.button>
                  </div>
                </motion.div>
              )}
      </motion.nav>

      {/* Hero Content */}
      <div className="h-full flex items-center justify-center px-4 sm:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.7] tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="text-black">SEE</span>{' '}
            <span className="text-[#cb892a]">ISLAM</span>
          </motion.h1>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mt-2 sm:mt-4 leading-[0.7] tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            AS IT IS
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}
