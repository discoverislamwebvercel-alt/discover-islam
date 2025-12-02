'use client';

import React from 'react';

interface CloseIconProps {
  className?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ className = '' }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M12 4L4 12M4 4L12 12'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CloseIcon;
