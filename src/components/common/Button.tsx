'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'navbar';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'default',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = `font-medium transition-colors duration-300 rounded-full ${
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  }`;

  const variantClasses = {
    primary: 'bg-[#408360] hover:bg-[#356b52] text-white',
    secondary: 'bg-[#CB892A] hover:bg-[#b37426] text-white',
  };

  const sizeClasses = {
    default: 'px-6 py-2',
    navbar: 'w-[172px] h-[55px]',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      className={combinedClasses}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
