'use client';

import React from 'react';

interface CustomAmountCardProps {
  amount: string;
  setAmount: (v: string) => void;
  active?: boolean;
  error?: string | null;
  selected?: boolean;
}

const CustomAmountCard: React.FC<CustomAmountCardProps> = ({
  amount,
  setAmount,
  active = false,
  error,
  selected = false,
}) => {
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
        error
          ? 'border-2 border-red-300'
          : selected
            ? 'border-2 border-[#408360] shadow-[0_6px_18px_rgba(64,131,96,0.15)]'
            : 'border border-transparent'
      }`}
      aria-selected={selected}
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

export default CustomAmountCard;
