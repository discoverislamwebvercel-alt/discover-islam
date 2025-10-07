import React from 'react';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  rows?: number;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

/**
 * Reusable Textarea component with consistent styling
 *
 * @param label - Label text for the textarea
 * @param placeholder - Placeholder text
 * @param value - Current value of the textarea
 * @param onChange - Function to handle value changes
 * @param required - Whether the field is required
 * @param disabled - Whether the field is disabled
 * @param className - Additional CSS classes
 * @param id - HTML id attribute
 * @param name - HTML name attribute
 * @param rows - Number of visible text lines (default: 4)
 * @param maxLength - Maximum character length
 * @param resize - CSS resize property (default: 'vertical')
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Message"
 *   placeholder="Enter your message"
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 *   rows={6}
 *   required
 * />
 * ```
 */
const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  rows = 4,
  maxLength,
  resize = 'vertical',
}) => {
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
          {required && <span className='ml-1'>*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
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
        `}
        style={{ backgroundColor: '#0000000D' }}
      />
      {maxLength && (
        <div className='text-right text-sm text-[#0000001A] mt-1'>
          {value?.length || 0}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default Textarea;
