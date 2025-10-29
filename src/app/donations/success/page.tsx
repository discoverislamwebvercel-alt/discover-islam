'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';

const CheckIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    className={className}
  >
    <path
      d='M9 12l2 2 4-4'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle cx='12' cy='12' r='10' strokeWidth='2' />
  </svg>
);

function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<
    'success' | 'error' | 'loading'
  >('loading');

  useEffect(() => {
    // Check URL parameters for payment status
    const status = searchParams.get('status');
    const error = searchParams.get('error');
    const cancelled = searchParams.get('cancelled');

    if (error || cancelled === 'true') {
      // Redirect to failed page with error details
      const failedUrl = new URL('/donations/failed', window.location.origin);
      if (error) failedUrl.searchParams.set('error', error);
      if (cancelled) failedUrl.searchParams.set('cancelled', cancelled);
      if (searchParams.get('error_code'))
        failedUrl.searchParams.set(
          'error_code',
          searchParams.get('error_code')!
        );
      if (searchParams.get('error_message'))
        failedUrl.searchParams.set(
          'error_message',
          searchParams.get('error_message')!
        );

      window.location.href = failedUrl.toString();
      return;
    } else if (
      status === 'success' ||
      searchParams.get('redirect_flow_id') ||
      searchParams.get('billing_request_id') ||
      searchParams.get('mandate_id') ||
      searchParams.get('mock')
    ) {
      setPaymentStatus('success');
    } else {
      setPaymentStatus('error');
    }
  }, [searchParams]);

  return (
    <>
      <FundraisePage
        title='Donation Status'
        titleClassName='text-[#CB892A]'
        descriptionClassName='hidden'
        containerClassName='max-w-[600px] px-4'
      >
        <div className='w-full flex flex-col items-center gap-8'>
          {paymentStatus === 'loading' && (
            <motion.div
              className='flex flex-col items-center gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-[#CB892A]'></div>
              <p className='text-lg text-gray-600'>
                Processing your donation...
              </p>
            </motion.div>
          )}

          {paymentStatus === 'success' && (
            <motion.div
              className='flex flex-col items-center gap-6 text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'>
                <CheckIcon className='w-10 h-10 text-green-600' />
              </div>

              <div>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                  Thank You!
                </h2>
                <p className='text-lg text-gray-600 mb-4'>
                  Your donation has been successfully processed.
                </p>
                <p className='text-sm text-gray-500'>
                  You will receive a confirmation email shortly.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                <motion.button
                  onClick={() => (window.location.href = '/donations')}
                  className='px-8 py-3 bg-[#CB892A] text-white rounded-full font-semibold hover:bg-[#B8791F] transition-all duration-300 cursor-pointer'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Make Another Donation
                </motion.button>
                <motion.button
                  onClick={() => (window.location.href = '/')}
                  className='px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 cursor-pointer'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Return Home
                </motion.button>
              </div>
            </motion.div>
          )}

          {paymentStatus === 'error' && (
            <motion.div
              className='flex flex-col items-center gap-6 text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-10 h-10 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </div>

              <div>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                  Payment Failed
                </h2>
                <p className='text-lg text-gray-600 mb-4'>
                  We&apos;re sorry, but there was an issue processing your
                  donation.
                </p>
                <p className='text-sm text-gray-500'>
                  Please try again or contact support if the problem persists.
                </p>
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
                  onClick={() => (window.location.href = '/')}
                  className='px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Return Home
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='w-full flex justify-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB892A]'></div>
        </div>
      }
    >
      <DonationSuccessContent />
    </Suspense>
  );
}
