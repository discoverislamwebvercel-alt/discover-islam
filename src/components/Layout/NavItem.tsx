'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
  label: string;
  onClick?: () => void;
  href?: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{
    label: string;
    onClick?: () => void;
    href?: string;
  }>;
  className?: string;
}

export default function NavItem({
  label,
  onClick,
  href,
  hasDropdown = false,
  dropdownItems = [],
  className = '',
}: NavItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    if (hasDropdown) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasDropdown) {
      setIsDropdownOpen(false);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (!hasDropdown) {
      setIsDropdownOpen(false);
    }
  };

  const baseClasses =
    'text-gray-800 hover:text-[#cb892a] transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none relative';
  const combinedClasses = `${baseClasses} ${className}`;

  if (href && !hasDropdown) {
    return (
      <Link href={href} className={combinedClasses} onClick={handleClick}>
        {label}
      </Link>
    );
  }

  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={combinedClasses} onClick={handleClick}>
        {label}
        {hasDropdown && (
          <ChevronDown
            className='w-4 h-4 ml-1 inline-block transition-transform duration-200'
            style={{
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </button>

      {hasDropdown && (
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className='absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {dropdownItems.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className='block px-4 py-2 text-gray-800 hover:text-[#cb892a] hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:scale-[1.02]'
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className='w-full text-left px-4 py-2 text-gray-800 hover:text-[#cb892a] hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
