import React from 'react';

interface ValidationMessageProps {
  message?: string;
  type?: 'error' | 'success' | 'warning';
  className?: string;
  show?: boolean;
}

/**
 * Reusable ValidationMessage component for displaying form validation feedback
 *
 * @param message - The validation message to display
 * @param type - Type of message (error, success, warning)
 * @param className - Additional CSS classes
 * @param show - Whether to show the message (default: true if message exists)
 *
 * @example
 * ```tsx
 * <ValidationMessage
 *   message="This field is required"
 *   type="error"
 * />
 *
 * <ValidationMessage
 *   message="Email is valid"
 *   type="success"
 * />
 * ```
 */
const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
  type = 'error',
  className = '',
  show = !!message,
}) => {
  if (!show || !message) {
    return null;
  }

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-red-500 bg-red-50 border-red-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return '⚠️';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      default:
        return '⚠️';
    }
  };

  return (
    <div
      className={`
        flex items-center gap-2 
        px-3 py-2 
        text-sm 
        border 
        rounded-lg 
        ${getTypeStyles()} 
        ${className}
      `}
    >
      <span className='text-xs'>{getIcon()}</span>
      <span>{message}</span>
    </div>
  );
};

export default ValidationMessage;
