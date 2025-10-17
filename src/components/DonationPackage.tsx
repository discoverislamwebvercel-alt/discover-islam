'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DonationTemplate } from '@/lib/gocardless';

interface DonationPackageProps {
  template: DonationTemplate;
  selected?: boolean;
  onClick?: () => void;
}

const DonationPackage: React.FC<DonationPackageProps> = ({
  template,
  selected = false,
  onClick,
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    const iconProps = {
      className: 'w-full h-full',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    };

    switch (category) {
      case 'school':
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
            />
          </svg>
        );
      case 'exhibition':
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
            />
          </svg>
        );
      case 'literature':
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
            />
          </svg>
        );
      default:
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        );
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        w-full max-w-[280px] min-h-[120px] sm:min-h-[140px] rounded-[16px] sm:rounded-[20px] flex flex-col items-center justify-center p-4 sm:p-6
        border border-[#E7E7E7] shadow-sm transition-all duration-200
        ${
          selected
            ? 'bg-[#CB892A] text-white shadow-lg scale-105'
            : 'bg-white text-[#111111] hover:shadow-md hover:scale-102'
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB892A]/40
      `}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: selected ? 1.05 : 1.02 }}
    >
      <div className='flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3'>
        <div
          className={`p-1.5 sm:p-2 rounded-full ${selected ? 'bg-white/20' : 'bg-[#CB892A]/10'}`}
        >
          <div className='w-4 h-4 sm:w-6 sm:h-6'>
            {getCategoryIcon(template.category)}
          </div>
        </div>
        <div className='text-right'>
          <div
            className={`text-lg sm:text-xl md:text-[24px] font-extrabold ${selected ? 'text-white' : 'text-[#111111]'}`}
          >
            {formatAmount(template.amount)}
          </div>
          {template.type === 'recurring' && template.interval && (
            <div
              className={`text-xs sm:text-[12px] ${selected ? 'text-white/90' : 'text-[#111111]/70'}`}
            >
              per {template.interval}
            </div>
          )}
        </div>
      </div>

      <div className='text-center'>
        <div
          className={`text-sm sm:text-base md:text-[16px] font-bold mb-1 sm:mb-2 ${selected ? 'text-white' : 'text-[#111111]'}`}
        >
          {template.name}
        </div>
        <div
          className={`text-xs sm:text-[12px] leading-relaxed ${selected ? 'text-white/90' : 'text-[#111111]/70'}`}
        >
          {template.description}
        </div>
      </div>

      {template.type === 'recurring' && (
        <div
          className={`mt-2 sm:mt-3 px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold ${
            selected
              ? 'bg-white/20 text-white'
              : 'bg-[#408360]/10 text-[#408360]'
          }`}
        >
          Recurring Payment
        </div>
      )}
    </motion.button>
  );
};

export default DonationPackage;
