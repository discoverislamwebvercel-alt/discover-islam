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

import {
  getGoCardlessTemplates,
  createGoCardlessOneOffRedirectFlow,
} from '@/lib/gocardless';
import { DonationTemplate, PaymentType, Category } from '@/types/donation';

// Using GoCardless for one-off and recurring payments

export default function DonationsPage() {
  const [paymentType, setPaymentType] = useState<PaymentType>('one-off');
  const [category, setCategory] = useState<Category>('school');
  const [selectedTemplate, setSelectedTemplate] =
    useState<DonationTemplate | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recurringTemplates, setRecurringTemplates] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      amount: string | null;
      authorisationUrl?: string;
      createdAt: string;
      updatedAt: string;
      type: 'recurring';
      currency: string;
    }>
  >([]);
  const [oneOffTemplates, setOneOffTemplates] = useState<
    Array<{
      id: string;
      name: string;
      amount: string;
      description?: string;
      authorisationUrl?: string;
      createdAt: string;
      updatedAt: string;
      type: 'one-off';
    }>
  >([]);
  const [loadingPackages, setLoadingPackages] = useState(false);

  // Fetch GoCardless templates
  React.useEffect(() => {
    setLoadingPackages(true);
    getGoCardlessTemplates()
      .then(result => {
        if (result.success && 'recurring' in result && 'oneOff' in result) {
          // eslint-disable-next-line no-console
          console.log('GoCardless API result:', {
            recurringCount:
              'recurringCount' in result ? result.recurringCount : 0,
            oneOffCount: 'oneOffCount' in result ? result.oneOffCount : 0,
            recurring: result.recurring,
            oneOff: result.oneOff,
          });
          setRecurringTemplates(result.recurring || []);
          setOneOffTemplates(result.oneOff || []);
        } else {
          console.error('Error loading GoCardless templates:', result.error);
          setError('Failed to load donation packages. Please try again.');
        }
      })
      .catch(err => {
        console.error('Error fetching GoCardless templates:', err);
        setError('Failed to load donation packages. Please try again.');
      })
      .finally(() => {
        setLoadingPackages(false);
      });
  }, []); // Fetch once on mount

  // Map templates to DonationTemplate format and filter based on payment type
  const filteredTemplates = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('Filtering templates:', {
      paymentType,
      recurringCount: recurringTemplates.length,
      oneOffCount: oneOffTemplates.length,
    });

    let templates: DonationTemplate[] = [];

    if (paymentType === 'regular') {
      // Map recurring templates to DonationTemplate format
      templates = recurringTemplates.map(t => {
        // Parse amount if provided (e.g., "10 GBP")
        let amount = 0;
        if (t.amount) {
          const m = t.amount.match(/(\d+(?:\.\d+)?)/);
          amount = m ? parseFloat(m[1]) : 0;
        }
        return {
          id: t.id,
          name: t.name,
          description: t.description || '',
          amount, // May be 0 if not provided in template
          currency: t.currency || 'GBP',
          type: 'recurring' as const,
          category: 'school' as const, // Default category, could be extracted from metadata later
          interval: 'monthly' as const, // Default interval
          metadata: {
            authorisationUrl: t.authorisationUrl,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          },
        };
      });
    } else {
      // Map one-off templates to DonationTemplate format
      templates = oneOffTemplates.map(t => {
        // Parse amount from string like "10 GBP" or "5.0 GBP"
        const amountMatch = t.amount?.match(/(\d+(?:\.\d+)?)/);
        const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;
        const currencyMatch = t.amount?.match(/(GBP|USD|EUR)/);
        const currency = currencyMatch ? currencyMatch[1] : 'GBP';

        return {
          id: t.id,
          name: t.name,
          description: t.description || '',
          amount,
          currency,
          type: 'one-off' as const,
          category: 'school' as const, // Default category
          metadata: {
            authorisationUrl: t.authorisationUrl,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          },
        };
      });
    }

    // eslint-disable-next-line no-console
    console.log('Filtered templates result:', templates.length);
    return templates;
  }, [paymentType, recurringTemplates, oneOffTemplates]);

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
      // For one-off payments, allow custom amount
      if (paymentType === 'one-off') {
        const amount = selectedTemplate
          ? selectedTemplate.amount
          : Number(customAmount || 0);

        if (amount <= 0) {
          throw new Error('Please select a valid amount');
        }

        // GoCardless minimum amount is £1.00
        const minimumAmount = 1.0;
        if (amount < minimumAmount) {
          throw new Error(
            `Minimum donation amount is £${minimumAmount.toFixed(2)}`
          );
        }

        // If a template is selected and has a payment link, use it directly
        if (selectedTemplate) {
          const authUrl = selectedTemplate.metadata?.authorisationUrl as
            | string
            | undefined;
          if (authUrl) {
            window.location.href = authUrl;
            return;
          }
        }

        // Otherwise, create a one-off billing request via server action
        const successUrl = new URL(
          '/donations/success',
          window.location.origin
        ).toString();
        const result = await createGoCardlessOneOffRedirectFlow(
          {
            amount,
            currency: selectedTemplate?.currency || 'GBP',
            description: selectedTemplate?.description || 'One-off donation',
          },
          successUrl
        );

        if (result.success && result.redirectUrl) {
          window.location.href = result.redirectUrl as string;
          return;
        }

        throw new Error(
          (result as { error?: string }).error ||
            'Failed to initiate one-off payment. Please try again.'
        );
      } else {
        // For recurring payments, require a template selection
        if (!selectedTemplate) {
          throw new Error(
            'Please select a donation package for recurring payments'
          );
        }

        // Get the authorisation URL from the template metadata
        const authUrl = selectedTemplate.metadata?.authorisationUrl as
          | string
          | undefined;

        if (!authUrl) {
          throw new Error(
            'No payment link available for this template. Please contact support.'
          );
        }

        // Redirect to GoCardless checkout
        window.location.href = authUrl;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Payment failed. Please try again.'
      );
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
            {loadingPackages ? (
              <div className='flex justify-center items-center min-h-[387px]'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB892A]'></div>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className='flex justify-center items-center min-h-[387px] text-gray-500'>
                <p>No donation packages available for this category.</p>
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

          {/* Custom Amount - Only show for one-off payments */}
          {paymentType === 'one-off' && (
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
          )}

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
                isProcessing ||
                loadingPackages ||
                (paymentType === 'regular'
                  ? !selectedTemplate
                  : !selectedTemplate && !customAmount)
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
