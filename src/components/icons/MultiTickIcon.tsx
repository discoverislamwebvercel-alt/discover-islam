'use client';

import React from 'react';

interface MultiTickIconProps {
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
}

const MultiTickIcon: React.FC<MultiTickIconProps> = ({
  className = '',
  stroke = 'currentColor',
  strokeOpacity = 0.5,
}) => (
  <svg
    width='28'
    height='16'
    viewBox='0 0 28 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M2.28125 9.28125L6.96875 13.9688M13.5312 6.46875L18.2188 1.78125M9.78125 9.28125L14.4688 13.9688L25.7188 1.78125'
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth='2.8125'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default MultiTickIcon;
