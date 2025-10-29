'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import DonationPackage from '@/components/DonationPackage';
import ToggleButton from '@/components/common/ToggleButton';
import CategoryTab from '@/components/common/CategoryTab';
import CustomAmountCard from '@/components/common/CustomAmountCard';
import MultiTickIcon from '@/components/icons/MultiTickIcon';
import RefreshIcon from '@/components/icons/RefreshIcon';

import testData from '@/lib/testData.json';
import { DonationTemplate, PaymentType, Category } from '@/types/donation';

export default function DonationsPage() {
  const [paymentType, setPaymentType] = useState<PaymentType>('one-off');
  const [category, setCategory] = useState<Category>('school');
  const [selectedTemplate, setSelectedTemplate] =
    useState<DonationTemplate | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load test data
  const allTemplates = testData.donationPackages as DonationTemplate[];

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(template => {
      const typeMatch =
        paymentType === 'regular'
          ? template.type === 'recurring'
          : template.type === 'one-off';
      const categoryMatch = template.category === category;
      return typeMatch && categoryMatch;
    });
  }, [allTemplates, paymentType, category]);

  const handleTemplateSelect = (template: DonationTemplate) => {
    setSelectedTemplate(prev => (prev?.id === template.id ? null : template));
    setShowCustomAmount(false);
    setError(null);
  };

  const handleCustomAmountSelect = () => {
    setSelectedTemplate(null);
    setShowCustomAmount(prev => !prev);
    setError(null);
  };

  const handleCheckout = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const amount = selectedTemplate
        ? selectedTemplate.amount
        : Number(customAmount || 0);

      // Enhanced validation for custom amounts
      if (amount <= 0) {
        throw new Error('Please select a valid amount');
      }

      if (!selectedTemplate && amount < 1) {
        throw new Error('Minimum donation amount is £1.00');
      }

      if (!selectedTemplate && amount > 10000) {
        throw new Error('Maximum donation amount is £10,000.00');
      }

      // Validate decimal places for custom amounts
      if (!selectedTemplate && customAmount.includes('.')) {
        const decimalPlaces = customAmount.split('.')[1]?.length || 0;
        if (decimalPlaces > 2) {
          throw new Error('Please enter amount with maximum 2 decimal places');
        }
      }

      // Simulate payment processing with mock redirect
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to success page with mock payment data
      const redirectUri = new URL('/donations/success', window.location.origin);
      redirectUri.searchParams.set('mock', 'true');
      redirectUri.searchParams.set('amount', amount.toFixed(2));
      redirectUri.searchParams.set('type', paymentType);
      redirectUri.searchParams.set('category', category);
      if (selectedTemplate) {
        redirectUri.searchParams.set('template_id', selectedTemplate.id);
      }

      window.location.href = redirectUri.toString();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Payment failed. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <FundraisePage
        title='Donations'
        titleClassName='text-[#CB892A]'
        descriptionClassName='hidden'
        containerClassName='max-w-[980px] px-4 sm:px-6 lg:px-8'
      >
        <div className='w-full flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 lg:-mt-12'>
          {/* Payment Type Toggle */}
          <motion.div
            className='flex flex-col sm:flex-row gap-3 sm:gap-[33px] w-full sm:w-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ToggleButton
              active={paymentType === 'one-off'}
              onClick={() => setPaymentType('one-off')}
              icon={
                <MultiTickIcon
                  className='w-6 h-6 sm:w-[30px] sm:h-[30px]'
                  stroke={
                    paymentType === 'one-off' ? '#F2F2F0' : 'rgba(17,17,17,0.5)'
                  }
                  strokeOpacity={1}
                />
              }
            >
              One off payment
            </ToggleButton>
            <ToggleButton
              active={paymentType === 'regular'}
              onClick={() => setPaymentType('regular')}
              icon={
                <RefreshIcon
                  className='w-6 h-6 sm:w-[30px] sm:h-[30px]'
                  stroke={
                    paymentType === 'regular' ? '#F2F2F0' : 'rgba(17,17,17,0.5)'
                  }
                />
              }
            >
              Regular payment
            </ToggleButton>
          </motion.div>

          {/* Donation option heading */}
          <motion.div
            className='text-center w-full mt-30'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className='text-2xl sm:text-3xl md:text-[40px] font-bold leading-[107%] text-center text-[#111111] px-4'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Please select a donation option
            </motion.div>
            <motion.div
              className='mt-3 sm:mt-4 md:mt-6 flex flex-col sm:flex-row sm:flex-nowrap items-stretch sm:items-center justify-center gap-3 sm:gap-[42px] px-4 no-scrollbar'
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CategoryTab
                label='Support school visits projects'
                active={category === 'school'}
                onClick={() => setCategory('school')}
              />
              <CategoryTab
                label='Support exhibition projects'
                active={category === 'exhibition'}
                onClick={() => setCategory('exhibition')}
              />
              <CategoryTab
                label='Support literature projects'
                active={category === 'literature'}
                onClick={() => setCategory('literature')}
              />
            </motion.div>
          </motion.div>

          {/* Donation Packages */}
          <motion.div
            className='w-full  sm:mt-4'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className='flex flex-row flex-wrap justify-center items-start content-center gap-1 sm:gap-[8px] w-full max-w-[1174px] min-h-[387px] sm:mt-6'>
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <DonationPackage
                    template={template}
                    selected={selectedTemplate?.id === template.id}
                    onClick={() => handleTemplateSelect(template)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Custom Amount */}
          <motion.div
            className='w-full flex items-center justify-center px-4'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              className='w-full max-w-[570px] cursor-pointer'
              onClick={handleCustomAmountSelect}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CustomAmountCard
                amount={customAmount}
                setAmount={setCustomAmount}
                active={showCustomAmount}
                error={error}
              />
            </motion.button>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className='w-full max-w-2xl bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center mx-4'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Checkout */}
          <motion.div
            className='flex items-center justify-center gap-2 sm:gap-[7px] w-full max-w-[481px] mt-2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              onClick={handleCheckout}
              disabled={
                isProcessing || (!selectedTemplate && !Number(customAmount))
              }
              className='flex flex-row justify-center items-center px-6 sm:px-[37px] py-4 sm:py-[18px] gap-[10px] w-full sm:w-[360px] h-[60px] sm:h-[67px] bg-[#408360] rounded-[52px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white font-extrabold text-lg sm:text-[26px] leading-[31px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#408360]/40'
              whileHover={{
                scale: isProcessing ? 1 : 1.02,
                boxShadow: '0 6px 18px rgba(64,131,96,0.35)',
              }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
            >
              {isProcessing ? 'Processing...' : 'Checkout'}
            </motion.button>
          </motion.div>
        </div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}
