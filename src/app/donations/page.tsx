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
        flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-[12px] sm:rounded-[16px] font-semibold transition-colors text-sm sm:text-base
        ${
          active
            ? 'bg-[#111111] text-white shadow-sm'
            : 'bg-[#EDEDED] text-[#111111] opacity-80'
        }
      `}
    >
      {icon}
      <span className='whitespace-nowrap'>{children}</span>
    </button>
  );
};

const CategoryTab: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`text-sm sm:text-base md:text-lg lg:text-[22px] xl:text-[26px] font-bold transition-colors text-center ${
      active ? 'text-[#CB892A]' : 'text-[#AFCBB5]'
    }`}
  >
    <span className='relative block'>
      {label}
      {active && (
        <span className='absolute left-0 -bottom-1 w-full h-[2px] sm:h-[3px] bg-[#CB892A] rounded' />
      )}
    </span>
  </button>
);

const CustomAmountCard: React.FC<{
  amount: string;
  setAmount: (v: string) => void;
  active?: boolean;
}> = ({ amount, setAmount, active = false }) => (
  <div
    className={`w-full sm:w-[320px] md:w-[420px] min-h-[100px] sm:min-h-[120px] rounded-[16px] sm:rounded-[20px] border border-[#E7E7E7] bg-white flex items-center justify-center p-4 sm:p-6`}
  >
    {active ? (
      <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-3'>
        <span className='text-[#111111] font-bold text-lg sm:text-xl'>
          Enter Amount
        </span>
        <div className='flex items-center border rounded-[12px] px-3 py-2'>
          <span className='mr-2 text-[#111111] font-semibold'>£</span>
          <input
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            inputMode='decimal'
            className='outline-none w-[100px] sm:w-[120px] text-base sm:text-lg'
            placeholder='0.00'
          />
        </div>
      </div>
    ) : (
      <div className='text-[#111111] text-center'>
        <div className='text-xs sm:text-sm text-[#11111199]'>Choose</div>
        <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold'>
          Custom Amount
        </div>
      </div>
    )}
  </div>
);

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
}> = ({ className = '', stroke = 'currentColor', strokeOpacity = 0.5 }) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M1 4v6h6M23 20v-6h-6'
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15'
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default function DonationsPage() {
  const [paymentType, setPaymentType] = useState<PaymentType>('regular');
  const [category, setCategory] = useState<Category>('school');
  const [selectedTemplate, setSelectedTemplate] =
    useState<DonationTemplate | null>(null);
  const [customAmount, setCustomAmount] = useState('');
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
    setSelectedTemplate(template);
    setError(null);
  };

  const handleCustomAmountSelect = () => {
    setSelectedTemplate(null);
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

      if (amount <= 0) {
        throw new Error('Please select a valid amount');
      }

      const description = selectedTemplate
        ? selectedTemplate.description
        : `Custom donation for ${category} projects`;

      const redirectUri = `${window.location.origin}/donations/success`;

      // Both one-off and recurring payments use redirect flow
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const redirectFlow = await createRedirectFlow({
        description,
        success_redirect_url: redirectUri,
        session_token: sessionToken,
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
        <div className='w-full flex flex-col items-center gap-6 sm:gap-8'>
          {/* Payment Type Toggle */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto'>
            <ToggleButton
              active={paymentType === 'one-off'}
              onClick={() => setPaymentType('one-off')}
              icon={
                <MultiTickIcon
                  className='w-5 h-5'
                  stroke={paymentType === 'one-off' ? '#ffffff' : '#111111'}
                  strokeOpacity={paymentType === 'one-off' ? 1 : 0.8}
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
                  className='w-5 h-5'
                  stroke={paymentType === 'regular' ? '#ffffff' : '#111111'}
                  strokeOpacity={paymentType === 'regular' ? 1 : 0.8}
                />
              }
            >
              Regular payment
            </ToggleButton>
          </div>

          {/* Donation option heading */}
          <div className='text-center w-full'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-extrabold text-[#111111] px-4'>
              Please select a donation option
            </div>
            <div className='mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 px-4'>
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
            </div>
          </div>

          {/* Donation Packages */}
          <motion.div
            className='w-full'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {loading ? (
              <div className='flex justify-center items-center py-12'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB892A]'></div>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 place-items-center w-full max-w-7xl'>
                {filteredTemplates.map(template => (
                  <DonationPackage
                    key={template.id}
                    template={template}
                    selected={selectedTemplate?.id === template.id}
                    onClick={() => handleTemplateSelect(template)}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Custom Amount */}
          <motion.div
            className='w-full flex items-center justify-center px-4'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <button
              className='w-full max-w-[420px]'
              onClick={handleCustomAmountSelect}
            >
              <CustomAmountCard
                amount={customAmount}
                setAmount={setCustomAmount}
                active={!selectedTemplate}
              />
            </button>
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
            className='flex flex-col sm:flex-row w-full max-w-md sm:w-auto items-center gap-3 sm:gap-[7px] mt-2 px-4'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.button
              onClick={handleCheckout}
              disabled={
                isProcessing || (!selectedTemplate && !Number(customAmount))
              }
              className='cursor-pointer bg-[#408360] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 sm:px-[24px] md:px-[37px] py-4 sm:py-[16px] md:py-[18px] h-[56px] sm:h-[67px] w-full sm:w-auto rounded-[52px] font-extrabold text-lg sm:text-[22px] md:text-[26px] leading-tight transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#408360]/40'
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
              className='cursor-pointer inline-flex items-center justify-center px-6 sm:px-[24px] md:px-[37px] py-4 sm:py-[16px] md:py-[18px] h-[56px] sm:h-[67px] w-full sm:w-auto rounded-[52px] bg-[#111111] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <BagIcon className='w-6 h-6 sm:w-[24px] sm:h-[24px] md:w-[31px] md:h-[31px]' />
            </motion.button>
          </motion.div>
        </div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}
