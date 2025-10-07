import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  className = '',
  id,
  name,
}) => {
  const inputId =
    id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className='text-[26px] font-medium text-[#111111] mb-2'
        >
          {label}
          {required && <span className='ml-1'>*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className='
          bg-[#0000000D] 
          rounded-[62px] 
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
        '
        style={{ backgroundColor: '#0000000D' }}
      />
    </div>
  );
};

export default Input;
