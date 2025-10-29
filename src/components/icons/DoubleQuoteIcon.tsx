'use client';

import React from 'react';

interface DoubleQuoteIconProps {
  className?: string;
  color?: string; // Fill color
  opacity?: number; // Fill opacity
  strokeColor?: string; // Stroke color
  strokeWidth?: number; // Stroke width
}

const DoubleQuoteIcon: React.FC<DoubleQuoteIconProps> = ({
  className = '',
  color = '#2E6A4F', // Default dark green from image
  opacity = 1, // Default solid from image
  strokeColor: _strokeColor = '#00BFFF', // Default bright blue from image
  strokeWidth: _strokeWidth = 1, // Default thin stroke from image
}) => {
  return (
    <svg
      width='95'
      height='63'
      viewBox='0 0 95 63'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* Left quote mark - parallelogram with forward slant */}
      <path
        d='M 10 3 L 25 3 L 30 60 L 15 60 Z'
        fill={color}
        fillOpacity={opacity}
      />
      {/* Right quote mark - parallelogram with forward slant */}
      <path
        d='M 45 3 L 60 3 L 65 60 L 50 60 Z'
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default DoubleQuoteIcon;
