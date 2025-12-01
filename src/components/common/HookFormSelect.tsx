'use client';

import React from 'react';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import ValidationMessage from './ValidationMessage';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface HookFormSelectProps {
  label?: string;
  name: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const HookFormSelect: React.FC<HookFormSelectProps> = ({
  label,
  name,
  placeholder,
  options,
  required = false,
  disabled = false,
  className = '',
  id,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const error = errors[name] as FieldError | undefined;

  const selectId =
    id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className='text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] font-medium text-[#111111] mb-2'
        >
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='relative'>
            <select
              {...field}
              id={selectId}
              disabled={disabled}
              className={`
                bg-[#0000000D]
                rounded-[35px] sm:rounded-[45px] md:rounded-[55px] lg:rounded-[62px]
                px-4 sm:px-5 md:px-6
                py-3 sm:py-3.5 md:py-4
                h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px]
                text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px]
                border-none
                outline-none
                focus:ring-2
                focus:ring-[#408360]
                focus:ring-opacity-50
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                appearance-none
                w-full
                cursor-pointer
                pr-10 sm:pr-12
                ${error ? 'ring-2 ring-red-500 ring-opacity-50' : ''}
              `}
            >
              {placeholder && (
                <option value='' disabled className='text-[#0000001A]'>
                  {placeholder}
                </option>
              )}
              {options.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className='text-[#111111] bg-white py-2'
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 md:pr-6 pointer-events-none'>
              <svg
                className='w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-[#0000001A]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
        )}
      />
      <ValidationMessage error={error} />
    </div>
  );
};

export default HookFormSelect;
