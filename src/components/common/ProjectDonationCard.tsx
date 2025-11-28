'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MultiTickIcon from '@/components/icons/MultiTickIcon';
import RefreshIcon from '@/components/icons/RefreshIcon';

interface ProjectDonationCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  oneOffUrl: string;
  regularUrls: {
    '10': string;
    '15': string;
    '25': string;
    '50': string;
    '150'?: string;
    '750'?: string;
  };
  isExpanded: boolean;
  onExpand: () => void;
}

export default function ProjectDonationCard({
  title,
  description,
  oneOffUrl,
  regularUrls,
  isExpanded,
  onExpand,
}: ProjectDonationCardProps) {
  const [paymentType, setPaymentType] = useState<'one-off' | 'regular'>(
    'regular'
  );
  const [selectedAmount, setSelectedAmount] = useState<
    '10' | '15' | '25' | '50' | '150' | '750' | null
  >(null);
  const [giftAid, setGiftAid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine which amounts to show based on card title
  const isLiterature = title === 'Literature';
  const availableAmounts: Array<'10' | '15' | '25' | '50' | '150' | '750'> =
    isLiterature
      ? ['10', '15', '25', '50']
      : ['10', '15', '25', '50', '150', '750'];

  const handleDonateNow = () => {
    if (!isExpanded) {
      onExpand();
      return;
    }

    // For one-off payments, redirect immediately
    if (paymentType === 'one-off') {
      setIsProcessing(true);
      window.open(oneOffUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => setIsProcessing(false), 1000);
      return;
    }

    // For regular payments, require amount selection
    if (!selectedAmount) {
      return;
    }

    setIsProcessing(true);
    const url = regularUrls[selectedAmount];

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => setIsProcessing(false), 1000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on interactive elements (buttons, inputs)
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.closest('button') ||
      target.closest('input')
    ) {
      return;
    }

    if (!isExpanded) {
      onExpand();
    }
  };

  return (
    <motion.div
      className='flex flex-col items-start p-4 sm:px-[22px] sm:py-[16px] gap-5 sm:gap-[20px] w-full max-w-[432px] bg-white rounded-[20px] overflow-hidden cursor-pointer relative'
      layout
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1, zIndex: 9999 }}
      style={{ zIndex: 1 }}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className='w-full h-[196px] bg-[#D9D9D9] rounded-lg' />

      {/* Title */}
      <h3
        className='font-bold text-[30px] leading-[107%] text-[#111111]'
        style={{
          fontFamily:
            'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className='font-normal text-[20px] leading-[107%] text-[#111111] opacity-50'
        style={{
          fontFamily:
            'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
        }}
      >
        {description}
      </p>

      {/* Expanded Payment Options */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className='w-full flex flex-col gap-5 sm:gap-[20px] overflow-hidden'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Payment Type Toggle */}
            <div className='flex flex-row items-center gap-[6px] w-full'>
              <button
                onClick={() => {
                  setPaymentType('one-off');
                  setSelectedAmount(null);
                }}
                className={`flex flex-row justify-center items-center px-3 sm:px-[12.0055px_32.7422px] py-3 sm:py-[12.0055px] gap-[10.91px] flex-1 h-[41.01px] rounded-[10.9141px] transition-all ${
                  paymentType === 'one-off'
                    ? 'bg-[#111111]'
                    : 'bg-[rgba(17,17,17,0.05)]'
                }`}
              >
                <MultiTickIcon
                  className='w-4 h-4 sm:w-[16.37px] sm:h-[16.37px]'
                  stroke={
                    paymentType === 'one-off' ? '#F2F2F0' : 'rgba(0,0,0,0.5)'
                  }
                  strokeOpacity={1}
                />
                <span
                  className={`text-[16px] leading-[107%] text-center ${
                    paymentType === 'one-off'
                      ? 'text-[#F2F2F0] font-[400]'
                      : 'text-[#11111180] font-[400]'
                  }`}
                >
                  One off payment
                </span>
              </button>
              <button
                onClick={() => {
                  setPaymentType('regular');
                  setSelectedAmount(null);
                }}
                className={`flex flex-row justify-center items-center px-3 sm:px-[12.0055px_32.7422px] py-3 sm:py-[12.0055px] gap-[10.91px] flex-1 h-[41.01px] rounded-[10.9141px] transition-all ${
                  paymentType === 'regular'
                    ? 'bg-[#111111]'
                    : 'bg-[rgba(17,17,17,0.05)]'
                }`}
              >
                <RefreshIcon
                  className='w-4 h-4 sm:w-[16.37px] sm:h-[16.37px]'
                  stroke={
                    paymentType === 'regular' ? '#F2F2F0' : 'rgba(0,0,0,0.5)'
                  }
                />
                <span
                  className={`text-[16px] leading-[107%] text-center ${
                    paymentType === 'regular'
                      ? 'text-[#F2F2F0] font-medium'
                      : 'text-[rgba(17,17,17,0.5)] font-normal'
                  }`}
                  style={{
                    fontFamily:
                      'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
                  }}
                >
                  Regular payment
                </span>
              </button>
            </div>

            {/* Amount Buttons - Only show for regular payments */}
            {paymentType === 'regular' && (
              <div className='flex flex-row flex-wrap gap-1 sm:gap-[4px] w-full'>
                {availableAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                    }}
                    className={`flex flex-row justify-center items-center px-3 sm:px-[12.0055px_32.7422px] py-3 sm:py-[12.0055px] gap-[4px] h-[41.01px] max-w-[100px] w-full rounded-[10.9141px] transition-all ${
                      selectedAmount === amount
                        ? 'bg-[#CB892A]'
                        : 'border border-[rgba(0,0,0,0.5)] bg-transparent'
                    }`}
                  >
                    <span
                      className={`text-[16px] leading-[107%] text-center font-bold ${
                        selectedAmount === amount
                          ? 'text-white'
                          : 'text-[rgba(17,17,17,0.5)]'
                      }`}
                      style={{
                        fontFamily:
                          'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
                      }}
                    >
                      £{amount}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Gift Aid Checkbox */}
            <div className='flex flex-row items-center gap-[9px]'>
              <input
                type='checkbox'
                id={`gift-aid-${title}`}
                checked={giftAid}
                onChange={e => setGiftAid(e.target.checked)}
                className='w-[14.97px] h-[14.97px] border border-black rounded-full cursor-pointer'
              />
              <label
                htmlFor={`gift-aid-${title}`}
                className='text-[16px] leading-[92%] text-black cursor-pointer'
                style={{
                  fontFamily:
                    'SF Pro Rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
                }}
              >
                Claim Gift Aid
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donate Now Button */}
      <button
        onClick={handleDonateNow}
        disabled={
          isProcessing ||
          (isExpanded && paymentType === 'regular' && !selectedAmount)
        }
        className={`flex flex-row justify-center items-center px-4 sm:px-[37px] py-[18px] gap-[10px] h-[55px] bg-[#408360] rounded-[52px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all ${
          isExpanded ? 'w-full' : 'w-[172px]'
        }`}
      >
        <span
          className='text-[16px] leading-[19px] font-extrabold text-white'
          style={{
            fontFamily:
              'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {isProcessing ? 'Processing...' : 'Donate Now'}
        </span>
      </button>
    </motion.div>
  );
}
