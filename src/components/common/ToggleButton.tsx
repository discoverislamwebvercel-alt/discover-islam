'use client';

import React from 'react';

interface ToggleButtonProps {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  active = false,
  children,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-3 sm:gap-5 px-4 sm:px-[60px] py-3 sm:py-[22px] rounded-[20px] transition-all duration-300 text-lg sm:text-[26px] leading-[107%] h-[60px] sm:h-[74px] w-full sm:w-[350px] cursor-pointer
        ${
          active
            ? 'bg-[#111111] text-[#F2F2F0] font-medium'
            : 'bg-[rgba(17,17,17,0.05)] text-[rgba(17,17,17,0.5)] font-normal hover:bg-[rgba(17,17,17,0.1)]'
        }
        hover:scale-[1.02] active:scale-[0.98]
      `}
    >
      <div className='w-6 h-6 sm:w-[30px] sm:h-[30px] flex items-center justify-center'>
        {icon}
      </div>
      <span className='whitespace-nowrap'>{children}</span>
    </button>
  );
};

export default ToggleButton;
