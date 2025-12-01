'use client';

import React from 'react';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import ValidationMessage from './ValidationMessage';

interface HookFormInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name: string;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

const HookFormInput: React.FC<HookFormInputProps> = ({
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  maxLength,
  min,
  max,
  step,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const error = errors[name] as FieldError | undefined;

  const inputId =
    id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
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
          <input
            {...field}
            id={inputId}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            min={min}
            max={max}
            step={step}
            className={`
              bg-[#0000000D]
              rounded-[35px] sm:rounded-[45px] md:rounded-[55px] lg:rounded-[62px]
              px-4 sm:px-5 md:px-6
              py-3 sm:py-3.5 md:py-4
              h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px]
              text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px]
              placeholder:text-[#0000001A]
              border-none
              outline-none
              focus:ring-2
              focus:ring-[#408360]
              focus:ring-opacity-50
              transition-all
              duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
              w-full
              ${error ? 'ring-2 ring-red-500 ring-opacity-50' : ''}
            `}
            style={{ backgroundColor: '#0000000D' }}
            value={field.value || ''}
          />
        )}
      />

      <ValidationMessage error={error} />
    </div>
  );
};

export default HookFormInput;
