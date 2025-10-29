'use client';

import React from 'react';

interface CategoryTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryTab: React.FC<CategoryTabProps> = ({
  label,
  active = false,
  onClick,
}) => {
  const getWidth = () => {
    if (label.includes('school'))
      return active ? 'w-full sm:w-[261px]' : 'w-full sm:w-[262px]';
    if (label.includes('exhibition'))
      return active ? 'w-full sm:w-[262px]' : 'w-full sm:w-[262px]';
    if (label.includes('literature'))
      return active ? 'w-full sm:w-[264px]' : 'w-full sm:w-[264px]';
    return 'w-full sm:w-[262px]';
  };

  return (
    <button
      onClick={onClick}
      className={`h-[64px] text-lg sm:text-[26px] leading-[107%] text-center transition-all duration-300 ${getWidth()} cursor-pointer ${
        active
          ? 'text-[#CB892A] font-bold'
          : 'text-[#AFCBB5] font-semibold hover:text-[#CB892A]/70'
      } hover:scale-[1.02] active:scale-[0.98]`}
    >
      <span className='relative block whitespace-normal break-words leading-snug px-1'>
        {label}
        {active && (
          <img
            src='/figma/underline_yellow.png'
            alt='underline'
            className='absolute left-1/2 -translate-x-1/2 -bottom-1 h-[6px] sm:h-[7px] w-[95%] sm:w-[100%] select-none pointer-events-none'
          />
        )}
      </span>
    </button>
  );
};

export default CategoryTab;
