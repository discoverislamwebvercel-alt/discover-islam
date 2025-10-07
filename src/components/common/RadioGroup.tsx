import React from 'react';
import { useField } from 'formik';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
}

/**
 * Reusable RadioGroup component with Formik integration
 *
 * @param label - Label text for the radio group
 * @param name - Field name for Formik
 * @param options - Array of radio options
 * @param required - Whether the field is required
 * @param disabled - Whether the field is disabled
 * @param className - Additional CSS classes
 * @param columns - Number of columns for layout (1, 2, or 3)
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   label="Select Materials"
 *   name="materials"
 *   options={[
 *     { value: 'quran', label: 'Qur\'an' },
 *     { value: 'leaflets', label: 'Leaflets' }
 *   ]}
 *   columns={3}
 *   required
 * />
 * ```
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  required = false,
  disabled = false,
  className = '',
  columns = 3,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const error = meta.touched && meta.error;

  const handleChange = (value: string) => {
    setValue(value);
  };

  const getGridClass = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className='text-[26px] font-medium text-[#111111] mb-4'>
          {label}
          {required && <span className='ml-1'>*</span>}
        </label>
      )}

      <div className={`grid ${getGridClass()} gap-4`}>
        {options.map(option => {
          const isSelected = field.value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={`
                flex items-center cursor-pointer p-2 rounded-lg transition-colors
                ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}
              `}
            >
              <div className='relative flex items-center'>
                <input
                  type='radio'
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => !isDisabled && handleChange(option.value)}
                  disabled={isDisabled}
                  className='sr-only'
                />

                {/* Custom radio button */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                    ${
                      isSelected
                        ? 'border-[#408360] bg-[#408360]'
                        : 'border-gray-300 bg-white'
                    }
                    ${error ? 'border-red-500' : ''}
                  `}
                >
                  {isSelected && (
                    <div className='w-2 h-2 rounded-full bg-white' />
                  )}
                </div>

                <span className='ml-3 text-[20px] text-[#111111] select-none'>
                  {option.label}
                </span>
              </div>
            </label>
          );
        })}
      </div>

      {error && <div className='mt-2 text-red-500 text-sm'>{error}</div>}
    </div>
  );
};

export default RadioGroup;
