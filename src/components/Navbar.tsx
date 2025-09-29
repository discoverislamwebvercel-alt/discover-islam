'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      className="bg-white rounded-2xl mx-8 mt-5 px-8 py-4 shadow-lg z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[#cb892a]">DISCOVER</span>{' '}
            <span className="text-gray-800">ISLAM</span>
          </h1>
        </div>

        {/* Center - Navigation Links */}
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
          <button 
            className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Us
          </button>
        </div>

        {/* Right side - Donate Button */}
        <motion.button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Donate
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden mt-4">
        <button className="text-gray-800 hover:text-[#cb892a]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}
