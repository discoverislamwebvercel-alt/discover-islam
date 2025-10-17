import React from 'react';
import { FieldError } from 'react-hook-form';

interface ValidationMessageProps {
  error?: FieldError | undefined;
  message?: string;
  type?: 'error' | 'success' | 'warning';
  className?: string;
  show?: boolean;
}

/**
 * Reusable ValidationMessage component for displaying form validation feedback
 * Works with both react-hook-form FieldError and manual messages
 *
 * @param error - React Hook Form FieldError object
 * @param message - Manual validation message to display
 * @param type - Type of message (error, success, warning)
 * @param className - Additional CSS classes
 * @param show - Whether to show the message (default: true if message or error exists)
 *
 * @example
 * ```tsx
 * <ValidationMessage
 *   error={errors.email}
 * />
 *
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
  error,
  message,
  type = 'error',
  className = '',
  show,
}) => {
  const displayMessage = error?.message || message;
  const shouldShow = show !== undefined ? show : !!displayMessage;

  if (!shouldShow || !displayMessage) {
    return null;
  }

  const getTextColor = () => {
    switch (type) {
      case 'error':
        return 'text-red-500';
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-red-500';
    }
  };

  return (
    <div className={`text-sm mt-1 ${getTextColor()} ${className}`}>
      {displayMessage}
    </div>
  );
};

export default ValidationMessage;
