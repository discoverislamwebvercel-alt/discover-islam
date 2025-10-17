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

  const toOrdinal = (n: number) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return `${n}st`;
    if (mod10 === 2 && mod100 !== 12) return `${n}nd`;
    if (mod10 === 3 && mod100 !== 13) return `${n}rd`;
    return `${n}th`;
  };

  const scheduleText = (() => {
    if (template.type !== 'recurring') return '';
    const meta = (template.metadata || {}) as {
      dayOfMonth?: number;
      scheduleText?: string;
    };
    if (meta.scheduleText) return meta.scheduleText as string;
    const day = typeof meta.dayOfMonth === 'number' ? meta.dayOfMonth : 1;
    return `${toOrdinal(day)} of every month`;
  })();

  return (
    <motion.button
      onClick={onClick}
      className={`
        w-full max-w-[283px] h-[199px] rounded-[20px] flex flex-col items-center justify-center px-4 sm:px-[42px] py-6 sm:py-[54px] gap-[20px]
        border transition-all duration-200
        ${
          selected
            ? 'bg-[#CB892A] border-[#CB892A] text-[#F2F2F0]'
            : 'bg-white border-[#E7E7E7] text-[#111111] hover:shadow-md'
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB892A]/40
      `}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: selected ? 1.05 : 1.02 }}
    >
      <div className='text-center gap-[20px] flex flex-col'>
        <div
          className={`font-bold text-2xl sm:text-3xl md:text-[40px] leading-[107%] ${selected ? 'text-[#F2F2F0]' : 'text-[#111111]'}`}
        >
          {formatAmount(template.amount)}
        </div>
        {template.type === 'recurring' && (
          <div
            className={`text-lg sm:text-xl md:text-[24px] leading-[107%] opacity-50 ${selected ? 'text-[#F2F2F0]' : 'text-[#111111]'}`}
          >
            {scheduleText}
          </div>
        )}
      </div>
    </motion.button>
  );
};

export default DonationPackage;
