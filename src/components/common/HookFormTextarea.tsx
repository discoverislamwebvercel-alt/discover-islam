'use client';

import React from 'react';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import ValidationMessage from './ValidationMessage';

interface HookFormTextareaProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name: string;
  rows?: number;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const HookFormTextarea: React.FC<HookFormTextareaProps> = ({
  label,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  rows = 4,
  maxLength,
  resize = 'vertical',
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const error = errors[name] as FieldError | undefined;

  const textareaId =
    id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const getResizeClass = () => {
    switch (resize) {
      case 'none':
        return 'resize-none';
      case 'both':
        return 'resize';
      case 'horizontal':
        return 'resize-x';
      case 'vertical':
        return 'resize-y';
      default:
        return 'resize-y';
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className='text-[26px] font-medium text-[#111111] mb-2'
        >
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              id={textareaId}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
              className={`
                bg-[#0000000D]
                rounded-[22px]
                px-6
                py-4
                text-[20px]
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
                ${getResizeClass()}
                ${error ? 'ring-2 ring-red-500 ring-opacity-50' : ''}
              `}
              style={{ backgroundColor: '#0000000D' }}
              value={field.value || ''}
            />
            {maxLength && (
              <div className='text-right text-sm text-[#0000001A] mt-1'>
                {String(field?.value || '').length}/{maxLength}
              </div>
            )}
          </>
        )}
      />

      <ValidationMessage error={error} />
    </div>
  );
};

export default HookFormTextarea;
