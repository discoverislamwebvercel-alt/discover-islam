'use client';

import React from 'react';
import { useFormikContext } from 'formik';

interface FormButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormButton: React.FC<FormButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
}) => {
  const formik = useFormikContext();
  const isSubmitting = formik?.isSubmitting || loading;
  const isDisabled = disabled || (type === 'submit' && isSubmitting);

  const baseClasses =
    'font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variantClasses = {
    primary: 'bg-[#408360] hover:bg-[#357050] text-white focus:ring-[#408360]',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    outline:
      'border-2 border-[#408360] text-[#408360] hover:bg-[#408360] hover:text-white focus:ring-[#408360]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-[31px]',
    md: 'px-6 py-3 text-base rounded-[40px]',
    lg: 'px-8 py-4 text-[20px] rounded-[62px]',
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {isSubmitting && (
        <svg
          className='animate-spin -ml-1 mr-3 h-5 w-5 text-current inline'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default FormButton;
