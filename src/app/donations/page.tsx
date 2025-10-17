'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import DonationPackage from '@/components/DonationPackage';
import { useGoCardless } from '@/hooks/useGoCardless';
import { DonationTemplate } from '@/lib/gocardless';

type PaymentType = 'one-off' | 'regular';

type Category = 'school' | 'exhibition' | 'literature';

const BagIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    className={className}
  >
    <path
      d='M6 7h12l-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7z'
      strokeWidth='1.6'
    />
    <path d='M9 7a3 3 0 106 0' strokeWidth='1.6' />
  </svg>
);

const ToggleButton: React.FC<{
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
}> = ({ active = false, children, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-3 sm:gap-5 px-4 sm:px-[60px] py-3 sm:py-[22px] rounded-[20px] transition-colors text-lg sm:text-[26px] leading-[107%] h-[60px] sm:h-[74px] w-full sm:w-[350px]
        ${
          active
            ? 'bg-[#111111] text-[#F2F2F0] font-medium'
            : 'bg-[rgba(17,17,17,0.05)] text-[rgba(17,17,17,0.5)] font-normal'
        }
      `}
    >
      <div className='w-6 h-6 sm:w-[30px] sm:h-[30px] flex items-center justify-center'>
        {icon}
      </div>
      <span className='whitespace-nowrap'>{children}</span>
    </button>
  );
};

const CategoryTab: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, active = false, onClick }) => {
  const getWidth = () => {
    if (label.includes('school'))
      return active ? 'w-full sm:w-[261px]' : 'w-full sm:w-[262px]';
    if (label.includes('exhibition'))
      return active ? 'w-full sm:w-[262px]' : 'w-full sm:w-[262px]';
    if (label.includes('literature'))
      return active ? 'w-full sm:w-[264px]' : 'w-full sm:w-[264px]';
    return 'w-full sm:w-[262px]';
  };

  return (
    <button
      onClick={onClick}
      className={`h-[64px] text-lg sm:text-[26px] leading-[107%] text-center transition-colors ${getWidth()} ${
        active ? 'text-[#CB892A] font-bold' : 'text-[#AFCBB5] font-semibold'
      }`}
    >
      <span className='relative block whitespace-normal break-words leading-snug px-1'>
        {label}
        {active && (
          // underline image from public/figma/underline_yellow.png
          <img
            src='/figma/underline_yellow.png'
            alt='underline'
            className='absolute left-1/2 -translate-x-1/2 -bottom-1 h-[6px] sm:h-[7px] w-[95%] sm:w-[100%] select-none pointer-events-none'
          />
        )}
      </span>
    </button>
  );
};

const CustomAmountCard: React.FC<{
  amount: string;
  setAmount: (v: string) => void;
  active?: boolean;
  error?: string | null;
}> = ({ amount, setAmount, active = false, error }) => {
  const formatAmount = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');

    // Prevent multiple decimal points
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }

    return cleaned;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value);
    setAmount(formatted);
  };

  const displayAmount = amount ? `£${amount}` : '';

  return (
    <div
      className={`w-full max-w-[570px] h-[180px] rounded-[20px] bg-white flex flex-col items-center justify-center px-4 sm:px-[42px] py-6 sm:py-[54px] gap-[1px] ${
        error ? 'border-2 border-red-300' : ''
      }`}
    >
      {active ? (
        <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-3'>
          <span className='text-[#111111] font-bold text-lg sm:text-xl'>
            Enter Amount
          </span>
          <div className='flex items-center border-2 border-[#408360] rounded-[12px] px-3 py-2 focus-within:ring-2 focus-within:ring-[#408360]/20'>
            <span className='mr-2 text-[#111111] font-semibold'>£</span>
            <input
              value={amount}
              onChange={handleAmountChange}
              inputMode='decimal'
              className='outline-none w-[100px] sm:w-[120px] text-base sm:text-lg font-medium'
              placeholder='0.00'
              autoFocus
            />
          </div>
          {amount && (
            <div className='text-sm text-[#408360] font-medium'>
              {displayAmount}
            </div>
          )}
        </div>
      ) : (
        <div className='text-[#111111] text-center'>
          <div className='text-lg sm:text-[26px] leading-[107%] text-[#111111] opacity-50'>
            Choose
          </div>
          <div className='text-2xl sm:text-3xl md:text-[40px] leading-[107%] font-bold text-[#111111]'>
            Custom Amount
          </div>
          {amount && (
            <div className='mt-2 text-lg text-[#408360] font-semibold'>
              {displayAmount}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MultiTickIcon: React.FC<{
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
}> = ({ className = '', stroke = 'currentColor', strokeOpacity = 0.5 }) => (
  <svg
    width='28'
    height='16'
    viewBox='0 0 28 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M2.28125 9.28125L6.96875 13.9688M13.5312 6.46875L18.2188 1.78125M9.78125 9.28125L14.4688 13.9688L25.7188 1.78125'
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth='2.8125'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const RefreshIcon: React.FC<{
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
}> = ({ className = '', stroke = 'currentColor', strokeOpacity = 1 }) => {
  return (
    <div
      className={className}
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: stroke,
        mask: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACz0lEQVR4AexV0VHbQBDdE/DBDAirgtgVJFQQu4JABTEVBFdgu4KECuIOoAPTAaSCOBXIkj3DDB7p8t5Kp5FsR4ODCPng5la3t3f73u3d3smTVypvxP9s4/+/rV4swm4cR9+jaP4zjud2F4HPXQxfYvxpCzcifngI23E8n1prpiK2b4y0ZccCnw/0JQawrom5DlEh5oTVioTSFRRrZS4iN9ba8S5CH4irZ8QktjOwLYg5wAkwaoQgukpT2/H91vnJSTDaReiTJLZDDOCxtokdhmGLHUpBvFp5Qxgc6RhEl0EQMGKYd6/wnRED5OPcu723533NdVFiRis4z8xoJnAYZfrzvznWTYZk+y5qJX58lDPJS5KkboW55fmNMfbKoXie9AVFiY0xH6ELkmnGLaLepBwfB7fAm0HEGO89WyWGoodujOigvEzJsa3mkSPWJELEuoCX4a2iKjEy7xfNiLjtDp/9hiV/G+wP4ioxDjzPOmlB18Pn4N/Ichl9wWs1zW5KhhDHYYGJ4Hje2XXi4WOb9QyMMcOyU+b6tO9iEQ3x6HzD7C5uipJlWGYImyav7wcapEZMI1J+wBbS4iuTOaD3xEpSHJnefwaRpjIhBrEAoQkFjuKqFsRcCRzdAJ84/cMslyEefLjW1HVSEAz2973PIL2Dm5ISGxwT9LUWxOzxleEE6hBkuO2nqcECqr/FKAovMa61TEqDMQIicw2ckYgAQwQ6n2D2xZUKMY0kTxJ7Cl2TAO1GNcZ8ckaA1u3ILaLvEdPNd+0GMQfwet37fquHBXSw3nOAV36LsF9wHgX6gGdKPRckqb04ONA/W4+Jm9srzVZiNwMLmPnIQq64LLSX5yCTeyXyNp7Fd4eHARbgZm22tcSb07dbuJAyOXZoVL6727waISbwOjltddIYMUkcuefZUxxRcXU4ti6NEhOc5EdHwT31OmmcuI6sPPZqxL8BAAD//ziBZvcAAAAGSURBVAMAJiTRTOs2jFUAAAAASUVORK5CYII=') no-repeat center`,
        maskSize: 'contain',
        opacity: strokeOpacity,
      }}
    />
  );
};

export default function DonationsPage() {
  const [paymentType, setPaymentType] = useState<PaymentType>('one-off');
  const [category, setCategory] = useState<Category>('school');
  const [selectedTemplate, setSelectedTemplate] =
    useState<DonationTemplate | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { templates, loading, fetchTemplates, createRedirectFlow } =
    useGoCardless();

  // Fetch templates when payment type or category changes
  useEffect(() => {
    const type = paymentType === 'regular' ? 'recurring' : 'one-off';
    fetchTemplates(type, category);
  }, [paymentType, category, fetchTemplates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const typeMatch =
        paymentType === 'regular'
          ? template.type === 'recurring'
          : template.type === 'one-off';
      const categoryMatch = template.category === category;
      return typeMatch && categoryMatch;
    });
  }, [templates, paymentType, category]);

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

      const description = selectedTemplate
        ? selectedTemplate.description
        : `Custom ${paymentType === 'regular' ? 'monthly' : 'one-off'} donation of £${amount.toFixed(2)} for ${category} projects`;

      const redirectUri = `${window.location.origin}/donations/success`;

      // Both one-off and recurring payments use redirect flow
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const redirectFlow = await createRedirectFlow({
        description,
        success_redirect_url: redirectUri,
        session_token: sessionToken,
        amount: amount, // Pass the amount for better tracking
        payment_type: paymentType,
        category: category,
      });

      // Redirect to GoCardless payment page
      window.location.href = redirectFlow.redirect_uri;
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
            {loading ? (
              <div className='flex justify-center items-center py-12'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB892A]'></div>
              </div>
            ) : (
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
            )}
          </motion.div>

          {/* Custom Amount */}
          <motion.div
            className='w-full flex items-center justify-center px-4'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              className='w-full max-w-[570px]'
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
            className='flex flex-col sm:flex-row items-center gap-2 sm:gap-[7px] w-full max-w-[481px] mt-2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              onClick={handleCheckout}
              disabled={
                isProcessing || (!selectedTemplate && !Number(customAmount))
              }
              className='flex flex-row justify-center items-center px-6 sm:px-[37px] py-4 sm:py-[18px] gap-[10px] w-full sm:w-[360px] h-[60px] sm:h-[67px] bg-[#408360] rounded-[52px] disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-lg sm:text-[26px] leading-[31px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#408360]/40'
              whileHover={{
                scale: isProcessing ? 1 : 1.02,
                boxShadow: '0 6px 18px rgba(64,131,96,0.35)',
              }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
            >
              {isProcessing ? 'Processing...' : 'Checkout'}
            </motion.button>
            <motion.button
              aria-label='Cart'
              className='flex flex-row justify-center items-center px-6 sm:px-[37px] py-4 sm:py-[18px] gap-[10px] w-full sm:w-[114px] h-[60px] sm:h-[67px] bg-[#111111] rounded-[52px] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <BagIcon className='w-6 h-6 sm:w-[31px] sm:h-[31px]' />
            </motion.button>
          </motion.div>
        </div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}
