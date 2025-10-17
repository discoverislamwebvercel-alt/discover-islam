'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';

const XIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    className={className}
  >
    <path
      d='M18 6L6 18M6 6l12 12'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const AlertTriangleIcon: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    className={className}
  >
    <path
      d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='12'
      y1='9'
      x2='12'
      y2='13'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='12'
      y1='17'
      x2='12.01'
      y2='17'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

function DonationFailedContent() {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<{
    type:
      | 'payment_failed'
      | 'user_cancelled'
      | 'network_error'
      | 'validation_error'
      | 'unknown';
    message: string;
    code?: string;
  }>({
    type: 'unknown',
    message: 'An unexpected error occurred during payment processing.',
  });

  useEffect(() => {
    // Parse error details from URL parameters
    const error = searchParams.get('error');
    const errorCode = searchParams.get('error_code');
    const errorMessage = searchParams.get('error_message');
    const cancelled = searchParams.get('cancelled');

    if (cancelled === 'true') {
      setErrorDetails({
        type: 'user_cancelled',
        message: 'Payment was cancelled. No charges have been made.',
      });
    } else if (errorCode === 'insufficient_funds') {
      setErrorDetails({
        type: 'payment_failed',
        message:
          'Payment failed due to insufficient funds. Please check your account balance and try again.',
        code: errorCode,
      });
    } else if (errorCode === 'invalid_account') {
      setErrorDetails({
        type: 'payment_failed',
        message:
          'Invalid bank account details. Please verify your account information and try again.',
        code: errorCode,
      });
    } else if (errorCode === 'network_error') {
      setErrorDetails({
        type: 'network_error',
        message:
          'Network connection error. Please check your internet connection and try again.',
        code: errorCode,
      });
    } else if (errorCode === 'validation_error') {
      setErrorDetails({
        type: 'validation_error',
        message:
          'Invalid payment information provided. Please check your details and try again.',
        code: errorCode,
      });
    } else if (errorMessage) {
      setErrorDetails({
        type: 'payment_failed',
        message: errorMessage,
        code: errorCode || undefined,
      });
    } else if (error) {
      setErrorDetails({
        type: 'payment_failed',
        message:
          'Payment processing failed. Please try again or contact support.',
        code: error,
      });
    }
  }, [searchParams]);

  const getErrorIcon = () => {
    switch (errorDetails.type) {
      case 'user_cancelled':
        return <XIcon className='w-10 h-10 text-orange-600' />;
      case 'network_error':
        return <AlertTriangleIcon className='w-10 h-10 text-yellow-600' />;
      default:
        return <XIcon className='w-10 h-10 text-red-600' />;
    }
  };

  const getErrorColor = () => {
    switch (errorDetails.type) {
      case 'user_cancelled':
        return 'bg-orange-100 border-orange-200';
      case 'network_error':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-red-100 border-red-200';
    }
  };

  const getTitleColor = () => {
    switch (errorDetails.type) {
      case 'user_cancelled':
        return 'text-orange-600';
      case 'network_error':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  const getTitle = () => {
    switch (errorDetails.type) {
      case 'user_cancelled':
        return 'Payment Cancelled';
      case 'network_error':
        return 'Connection Error';
      case 'validation_error':
        return 'Invalid Information';
      default:
        return 'Payment Failed';
    }
  };

  const getHelpText = () => {
    switch (errorDetails.type) {
      case 'user_cancelled':
        return 'You can try again anytime or contact us if you need assistance.';
      case 'network_error':
        return 'Please check your internet connection and try again.';
      case 'validation_error':
        return 'Please double-check your payment details and try again.';
      case 'payment_failed':
        return 'Please try again or contact your bank if the problem persists.';
      default:
        return 'Please try again or contact support if the problem continues.';
    }
  };

  return (
    <>
      <FundraisePage
        title='Donation Status'
        titleClassName='text-[#CB892A]'
        descriptionClassName='hidden'
        containerClassName='max-w-[600px] px-4'
      >
        <div className='w-full flex flex-col items-center gap-8'>
          <motion.div
            className='flex flex-col items-center gap-6 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`w-20 h-20 ${getErrorColor()} rounded-full flex items-center justify-center border-2`}
            >
              {getErrorIcon()}
            </div>

            <div>
              <h2 className={`text-3xl font-bold mb-2 ${getTitleColor()}`}>
                {getTitle()}
              </h2>
              <p className='text-lg text-gray-600 mb-4'>
                {errorDetails.message}
              </p>
              <p className='text-sm text-gray-500'>{getHelpText()}</p>
              {errorDetails.code && (
                <p className='text-xs text-gray-400 mt-2'>
                  Error Code: {errorDetails.code}
                </p>
              )}
            </div>

            <div className='flex flex-col sm:flex-row gap-4 mt-6'>
              <motion.button
                onClick={() => (window.location.href = '/donations')}
                className='px-8 py-3 bg-[#CB892A] text-white rounded-full font-semibold hover:bg-[#B8791F] transition-colors'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
              <motion.button
                onClick={() => (window.location.href = '/contact')}
                className='px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
              <motion.button
                onClick={() => (window.location.href = '/')}
                className='px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return Home
              </motion.button>
            </div>
          </motion.div>

          {/* Additional Help Section */}
          <motion.div
            className='w-full bg-gray-50 rounded-lg p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Need Help?
            </h3>
            <div className='space-y-2 text-sm text-gray-600'>
              <p>
                <strong>Common Solutions:</strong>
              </p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Check your bank account balance</li>
                <li>Verify your bank account details</li>
                <li>Ensure your internet connection is stable</li>
                <li>Try using a different payment method</li>
                <li>Contact your bank if the issue persists</li>
              </ul>
              <p className='mt-3'>
                <strong>Still having trouble?</strong> Our support team is here
                to help. Contact us at{' '}
                <a
                  href='mailto:support@discoverislam.org'
                  className='text-[#CB892A] hover:underline'
                >
                  support@discoverislam.org
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}

export default function DonationFailedPage() {
  return (
    <Suspense
      fallback={
        <div className='w-full flex justify-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB892A]'></div>
        </div>
      }
    >
      <DonationFailedContent />
    </Suspense>
  );
}
