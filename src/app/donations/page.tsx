'use client';

import React, { useMemo, useState } from 'react';
import FundraisePage from '@/components/common/FundraisePage';

type PaymentType = 'one-off' | 'regular';

type Category = 'school' | 'exhibition' | 'literature';

interface AmountOption {
  value: number;
  label: string;
  cadence?: string; // e.g. "1st of every month"
}

const regularAmounts: AmountOption[] = [
  { value: 5, label: '£5', cadence: '1st of every month' },
  { value: 10, label: '£10', cadence: '1st of every month' },
  { value: 20, label: '£20', cadence: '1st of every month' },
  { value: 40, label: '£40', cadence: '5th of every month' },
];

const oneOffAmounts: AmountOption[] = [
  { value: 5, label: '£5' },
  { value: 10, label: '£10' },
  { value: 20, label: '£20' },
  { value: 40, label: '£40' },
];

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
        flex items-center gap-2 px-6 py-3 rounded-[16px] font-semibold transition-colors
        ${
          active
            ? 'bg-[#111111] text-white shadow-sm'
            : 'bg-[#EDEDED] text-[#111111] opacity-80'
        }
      `}
    >
      {icon}
      {children}
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
    className={`text-[22px] md:text-[26px] font-bold transition-colors ${
      active ? 'text-[#CB892A]' : 'text-[#AFCBB5]'
    }`}
  >
    <span className='relative'>
      {label}
      {active && (
        <span className='absolute left-0 -bottom-1 w-full h-[3px] bg-[#CB892A] rounded' />
      )}
    </span>
  </button>
);

const AmountCard: React.FC<{
  option: AmountOption;
  selected?: boolean;
  onClick?: () => void;
}> = ({ option, selected = false, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-[200px] h-[140px] rounded-[20px] flex flex-col items-center justify-center
      border border-[#E7E7E7] shadow-sm transition
      ${selected ? 'bg-[#CB892A] text-white' : 'bg-white text-[#111111]'}
    `}
  >
    <div className='text-[30px] font-extrabold'>{option.label}</div>
    {option.cadence && (
      <div
        className={`mt-1 text-sm ${selected ? 'text-white/90' : 'text-[#11111199]'}`}
      >
        {option.cadence}
      </div>
    )}
  </button>
);

const CustomAmountCard: React.FC<{
  amount: string;
  setAmount: (v: string) => void;
  active?: boolean;
}> = ({ amount, setAmount, active = false }) => (
  <div
    className={`w-full md:w-[420px] min-h-[120px] rounded-[20px] border border-[#E7E7E7] bg-white flex items-center justify-center p-6`}
  >
    {active ? (
      <div className='w-full flex items-center justify-center gap-3'>
        <span className='text-[#111111] font-bold text-xl'>Enter Amount</span>
        <div className='flex items-center border rounded-[12px] px-3 py-2'>
          <span className='mr-2 text-[#111111] font-semibold'>£</span>
          <input
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            inputMode='decimal'
            className='outline-none w-[120px] text-lg'
            placeholder='0.00'
          />
        </div>
      </div>
    ) : (
      <div className='text-[#111111]'>
        <div className='text-sm text-[#11111199] text-center'>Choose</div>
        <div className='text-2xl md:text-3xl font-extrabold'>Custom Amount</div>
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

export default function DonationsPage() {
  const [paymentType, setPaymentType] = useState<PaymentType>('regular');
  const [category, setCategory] = useState<Category>('school');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(5);
  const [customAmount, setCustomAmount] = useState('');

  const options = useMemo(
    () => (paymentType === 'regular' ? regularAmounts : oneOffAmounts),
    [paymentType]
  );

  const handleCheckout = () => {
    const amount =
      selectedAmount === 'custom' ? Number(customAmount || 0) : selectedAmount;
    // Placeholder checkout action
    alert(`Checkout: £${amount.toFixed(2)} — ${paymentType} — ${category}`);
  };

  return (
    <FundraisePage
      title='Donations'
      titleClassName='text-[#CB892A]'
      descriptionClassName='hidden'
      containerClassName='max-w-[980px]'
    >
      <div className='w-full flex flex-col items-center gap-8'>
        {/* Payment Type Toggle */}
        <div className='flex gap-4'>
          <ToggleButton
            active={paymentType === 'one-off'}
            onClick={() => setPaymentType('one-off')}
            icon={
              <MultiTickIcon
                className='w-5 h-5'
                stroke={paymentType === 'regular' ? '#111111' : '#00000080'}
                strokeOpacity={paymentType === 'regular' ? 1 : 0.5}
              />
            }
          >
            One off payment
          </ToggleButton>
          <ToggleButton
            active={paymentType === 'regular'}
            onClick={() => setPaymentType('regular')}
            icon={
              <span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-white'>
                <MultiTickIcon
                  className='w-5 h-5'
                  stroke={paymentType === 'regular' ? '#CB892A' : '#111111'}
                  strokeOpacity={paymentType === 'regular' ? 1 : 0.5}
                />
              </span>
            }
          >
            Regular payment
          </ToggleButton>
        </div>

        {/* Donation option heading */}
        <div className='text-center'>
          <div className='text-[30px] font-extrabold text-[#111111]'>
            Please select a donation option
          </div>
          <div className='mt-6 flex flex-wrap items-center justify-center gap-8'>
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

        {/* Amount options */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {options.map(opt => (
            <AmountCard
              key={opt.value}
              option={opt}
              selected={selectedAmount === opt.value}
              onClick={() => setSelectedAmount(opt.value)}
            />
          ))}
        </div>

        {/* Custom Amount */}
        <div className='w-full flex items-center justify-center'>
          <button
            className='w-full sm:w-[420px]'
            onClick={() => setSelectedAmount('custom')}
          >
            <CustomAmountCard
              amount={customAmount}
              setAmount={setCustomAmount}
              active={selectedAmount === 'custom'}
            />
          </button>
        </div>

        {/* Checkout */}
        <div className='flex items-center gap-4 mt-2'>
          <button
            onClick={handleCheckout}
            className='bg-[#408360] text-white px-10 py-4 rounded-full font-extrabold text-[20px] hover:brightness-95 transition-shadow shadow-md'
          >
            Checkout
          </button>
          <span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#111111] text-white'>
            <BagIcon className='w-6 h-6' />
          </span>
        </div>
      </div>
    </FundraisePage>
  );
}
