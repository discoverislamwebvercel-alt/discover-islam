'use client';

import React from 'react';

interface PlayIconProps {
  className?: string;
}

const PlayIcon: React.FC<PlayIconProps> = ({ className = '' }) => {
  return (
    <svg
      width='15.75'
      height='17.32'
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M3 2.5L13 8.5L3 14.5V2.5Z' fill='#2A2A2A' />
    </svg>
  );
};

export default PlayIcon;
