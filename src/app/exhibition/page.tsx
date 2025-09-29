'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function Exhibition() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <motion.nav 
        className="bg-white rounded-2xl mx-8 mt-5 px-8 py-4 shadow-lg absolute top-0 left-0 right-0 z-50"
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

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
            >
              Home
            </Link>
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
            <Link 
              href="/exhibition"
              className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none"
            >
              Exhibition
            </Link>
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
              <Link 
                href="/"
                className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
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
              <Link 
                href="/exhibition"
                className="text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Exhibition
              </Link>
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

      {/* Exhibition Hero Section with Text from Top 3rd */}
      <section className="relative" style={{ height: "100vh" }}>
        {/* Background Image Container */}
        <div 
          className="relative w-full h-full"
          style={{ 
            backgroundColor: "#f0f0f0" // Fallback color
          }}
        >
          {/* Base Background Image - Rectangle 49.png */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/Rectangle 49.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          
          {/* Overlay Image - Rectangle 51.png */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/Rectangle 51.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.8
            }}
          />
          
          {/* Gradient Overlay - smooth transition to white */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"
          />
          
          {/* Text Content - Starting from Top 3rd */}
          <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex items-start justify-center" style={{ paddingTop: "60vh" }}>
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 uppercase" 
                  style={{ color: '#4c735d' }}>
                ISLAMIC EXHIBITIONS
              </h1>
              
              {/* Sub Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8">
                Promoting Understanding Through Engagement
              </h2>
              
              {/* Paragraph */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Our Islamic exhibitions promote understanding and challenge stereotypes through informative displays and powerful visuals — including interactive tech models, educational exhibits, and authentic artifacts — that engage visitors and offer deeper insight into Islamic culture and values.
              </p>
            </div>
          </div>
        </div>
      </section>
     

    </div>
      <div className="relative w-full bg-white pt-[150px]">
        <img 
          src="/Group 4163.png" 
          alt="Host Your Very Own Islamic Exhibition Banner" 
          className="w-full h-auto"
        />
      </div>
      
      {/* Group 4164.png Content Section */}
      <div className="relative w-full -mt-28">
        <img 
          src="/Group 4164.png" 
          alt="Our Exhibitions Content Section" 
          className="w-full h-auto"
        />
      </div>
      
      {/* Why Choose Our Islamic Exhibition Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20 mt-8 sm:mt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            <span className="relative inline-block ">
              Why Choose
              <img 
                src="/Ellipse 11.png" 
                alt="Underline decoration" 
                className="absolute left-0 right-0 bottom-[-8px] w-full h-auto"
              />
            </span> Our
            <br />
            Islamic Exhibition?
          </h2>
          
          {/* Cards Container - Responsive */}
          <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-3xl p-4 sm:p-6 lg:p-12 overflow-hidden">
            
            {/* Mobile: Stacked Cards */}
            <div className="block lg:hidden space-y-4">
              {/* Mobile Card 1 */}
              <div className="bg-[#408360] text-white px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">10+ Years of Experience</p>
              </div>
              
              {/* Mobile Card 2 */}
              <div className="bg-[#cb892a] text-white px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">Content Reviewed by Qualified Scholars</p>
              </div>
              
              {/* Mobile Card 3 */}
              <div className="bg-black text-white px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">Backed by Positive feedback</p>
              </div>
              
              {/* Mobile Card 4 */}
              <div className="bg-[#cb892a] text-white px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">Interactive, Modern Displays That Engage and Inspire</p>
              </div>
              
              {/* Mobile Card 5 */}
              <div className="bg-black text-white px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">Tailored for Non-Muslim Audiences</p>
              </div>
              
              {/* Mobile Card 6 */}
              <div className="bg-[#408360] text-white px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">Fully Mobile & Self-Contained</p>
              </div>
            </div>

            {/* Desktop: Tilted Cards Layout */}
            <div className="hidden lg:block">
              {/* Bottom: Green - 10+ Years of Experience */}
              <div className="absolute bottom-0 left-8 bg-[#408360] text-white font-bold px-2 py-2 rounded-lg transform shadow-lg w-[230px] z-10">
                <p className="text-lg font-semibold">10+ Years of <br /> Experience</p>
              </div>
              
              {/* Stars above green div - Diagonal arrangement */}
              <div className="absolute bottom-24 left-24">
                {/* Bottom row - 2 stars together */}
                <div className="flex items-center ">
                  <img 
                    src="/Star 3.png" 
                    alt="Star" 
                    className="w-10 h-10 "
                  />
                  <img 
                    src="/Star 4.png" 
                    alt="Star" 
                    className="w-10 h-10"
                  />
                </div>
                {/* Top star - positioned above the right star */}
                <div className="absolute -top-7 -right-1">
                  <img 
                    src="/Star 5.png" 
                    alt="Star" 
                    className="w-10 h-10"
                  />
                </div>
              </div>
              
              {/* Above green: Orange - Content Reviewed by Qualified Scholars */}
              <div className="absolute bottom-0 left-86 bg-[#cb892a] text-white px-2 py-1 rounded-lg transform shadow-lg w-[320px] z-20 -ml-[84px]" >
                <p className="text-md font-semibold">Content Reviewed by Qualified Scholars</p>
              </div>
              
              {/* Above orange: Black - Backed by Positive feedback */}
              <div className="absolute bottom-14 left-44 bg-black text-white px-3 py-4 font-bold rounded-lg transform rotate-12 shadow-lg w-[240px] z-30">
                <p className="text-sm font-semibold">Backed by Positive feedback</p>
              </div>
              
              {/* Above black: Orange - Interactive, Modern Displays */}
              <div className="absolute bottom-32 left-62 bg-[#cb892a] text-white px-6 py-4 rounded-lg transform -rotate-5 shadow-lg max-w-[240px] z-40">
                <p className="text-sm font-semibold">Interactive, Modern Displays That Engage and Inspire</p>
              </div>
              
              {/* Right side: Green circle */}
              <div className="absolute bottom-8 left-[480px] w-15 h-15 bg-[#afcbb5] rounded-full"></div>
              
              {/* Right side: Black tilted - Tailored for Non-Muslim Audiences */}
              <div className="absolute bottom-13 left-[460px] bg-black text-white px-6 py-2 rounded-lg transform rotate-14 shadow-lg w-[440px] z-30">
                <p className="text-sm font-semibold">Tailored for Non-Muslim Audiences</p>
              </div>
              
              {/* Top right: Green - Fully Mobile & Self-Contained */}
              <div className="absolute bottom-18 right-2 bg-[#408360] text-white px-6 py-4 rounded-lg transform -rotate-12 shadow-lg w-[250px] z-20">
                <p className="text-sm font-semibold">Fully Mobile & Self-<br />Contained</p>
              </div>
              
              {/* Bottom right: Icon */}
              <div className="absolute bottom-3 right-12 w-20 h-20 flex items-center justify-center">
                <img 
                  src="/Group 4165.png" 
                  alt="Islamic Icon" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
   </div>
  );
}
