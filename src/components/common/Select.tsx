import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  multiple?: boolean;
}

/**
 * Reusable Select component with consistent styling
 *
 * @param label - Label text for the select
 * @param placeholder - Placeholder text (shown as first disabled option)
 * @param value - Current selected value
 * @param onChange - Function to handle value changes
 * @param options - Array of options to display
 * @param required - Whether the field is required
 * @param disabled - Whether the field is disabled
 * @param className - Additional CSS classes
 * @param id - HTML id attribute
 * @param name - HTML name attribute
 * @param multiple - Whether multiple selections are allowed
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   value={country}
 *   onChange={(e) => setCountry(e.target.value)}
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *     { value: 'ca', label: 'Canada' }
 *   ]}
 *   required
 * />
 * ```
 */
const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  multiple = false,
}) => {
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
          {required && <span className=' ml-1'>*</span>}
        </label>
      )}
      <div className='relative'>
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          multiple={multiple}
          className='
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
          '
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

        {/* Custom dropdown arrow */}
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
    </div>
  );
};

export default Select;
