'use client';

import React from 'react';

interface RepeatIconProps {
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
}

const RepeatIcon: React.FC<RepeatIconProps> = ({
  className = '',
  stroke = 'currentColor',
  strokeOpacity = 1,
}) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z'
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 12L12 8L16 12'
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 8V16'
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 12L12 16L8 12'
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 16V8'
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default RepeatIcon;
