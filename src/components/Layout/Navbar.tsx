'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Button from '../common/Button';
import NavItem from './NavItem';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items mapping
  const navigationItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About us',
      href: '/#about',
    },
    {
      label: 'Services',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Exhibitions',
          href: '/exhibition',
        },
        {
          label: 'Schools',
          href: '/schools',
        },
        {
          label: 'Literature',
          href: '/literature',
        },
      ],
    },
    {
      label: 'Contact Us',
      href: '/#contact',
    },
  ];

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className='bg-white rounded-[100px] mx-8 mt-5 px-8 py-4 shadow-lg absolute top-0 left-0 right-0 z-50'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='flex items-center justify-between'>
        {/* Left side - Logo */}
        <div className='flex items-center'>
          <img
            src='/discover islam horizontal logo - png 1.png'
            alt='Discover Islam Logo'
            className='h-8 sm:h-10 md:h-12 w-auto'
          />
        </div>

        {/* Center - Navigation Links (Desktop only) */}
        <div className='hidden md:flex items-center space-x-8'>
          {navigationItems.map((item, index) => (
            <NavItem
              key={index}
              label={item.label}
              href={item.href}
              hasDropdown={item.hasDropdown}
              dropdownItems={item.dropdownItems}
            />
          ))}
        </div>

        {/* Right side - Desktop Donate Button + Mobile Menu Button */}
        <div className='flex items-center'>
          {/* Desktop Donate Button */}
          <div className='hidden md:block'>
            <Button variant='primary' size='navbar'>
              Donate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-800 hover:text-[#cb892a] p-2 ml-2 transition-colors duration-300'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 bg-black/5 bg-opacity-50 z-40 md:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleMobileMenuClose}
            />

            {/* Mobile Drawer */}
            <motion.div
              className='fixed top-0 right-0 h-full w-[90%] bg-white shadow-xl z-50 md:hidden'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className='p-6'>
                {/* Close button */}
                <div className='flex justify-end mb-8'>
                  <button
                    onClick={handleMobileMenuClose}
                    className='text-gray-800 hover:text-[#cb892a] transition-colors duration-300'
                  >
                    <X className='w-6 h-6' />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className='flex flex-col space-y-6'>
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      {item.hasDropdown ? (
                        <div>
                          <div className='text-gray-800 font-medium text-lg mb-3'>
                            {item.label}
                          </div>
                          <div className='ml-4 space-y-3'>
                            {item.dropdownItems?.map(
                              (dropdownItem, dropdownIndex) => (
                                <div key={dropdownIndex}>
                                  {dropdownItem.href ? (
                                    <Link
                                      href={dropdownItem.href}
                                      className='block text-gray-600 hover:text-[#cb892a] transition-colors duration-300'
                                      onClick={handleMobileMenuClose}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ) : (
                                    <Link
                                      href={dropdownItem.href!}
                                      className='block text-gray-600 hover:text-[#cb892a] transition-colors duration-300 text-left'
                                      onClick={handleMobileMenuClose}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : item.href ? (
                        <Link
                          href={item.href}
                          className='block text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-lg'
                          onClick={handleMobileMenuClose}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <Link
                          href={item.href!}
                          className='text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium text-lg text-left'
                          onClick={handleMobileMenuClose}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Mobile Donate Button */}
                  <div className='pt-6 border-t border-gray-200'>
                    <Button
                      variant='primary'
                      size='navbar'
                      onClick={handleMobileMenuClose}
                    >
                      Donate
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
