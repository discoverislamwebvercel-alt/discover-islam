'use client';

import React from 'react';
import Button from './Button';

interface Testimonial {
  quote: string;
  author: string;
  subtext?: string;
}

interface TestimonialsSupportSectionProps {
  headingTop?: string;
  headingMainLeft?: string;
  headingMainRight?: string;
  testimonial?: Testimonial;
  supportHeading?: string;
  supportSubtext?: string;
  donateLabel?: string;
  showSupport?: boolean;
}

export default function TestimonialsSupportSection({
  headingTop = 'See why',
  headingMainLeft = 'people',
  headingMainRight = 'love us',
  testimonial = {
    quote:
      'Take a virtual journey to the holiest site in Islam. Stand before the Ka&#39;bah, walk through Masjid al-Haram, and witness the spiritual harmony of millions — from wherever you are.',
    author: 'Ali Amin',
    subtext: 'Subtext',
  },
  supportHeading = 'Support this project',
  supportSubtext = 'Help us build a better community',
  donateLabel = 'Donate Now',
  showSupport = true,
}: TestimonialsSupportSectionProps) {
  const HeartIcon = () => (
    <svg
      width='40'
      height='37'
      viewBox='0 0 40 37'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.59278 23.9344L25.4796 36.5752L38.1204 16.6884C39.6087 14.3468 40.106 11.5099 39.5027 8.80166L39.4006 8.34364C38.2007 2.95707 32.8612 -0.436869 27.4748 0.763058C24.5117 1.42313 22.0096 3.3942 20.6741 6.12012L19.3137 8.89672L16.9035 6.96008C14.5372 5.05879 11.4349 4.3362 8.47202 4.99624C3.08545 6.19619 -0.308494 11.5356 0.891455 16.9222L0.993487 17.3802C1.59679 20.0884 3.2512 22.4461 5.59278 23.9344Z'
        fill='#111111'
      />
    </svg>
  );

  const QuoteMarks = () => (
    <div className='flex gap-1 mb-4'>
      <div className='w-5 h-8 bg-[#408360] rounded-sm' />
      <div className='w-5 h-8 bg-[#408360] rounded-sm' />
    </div>
  );

  return (
    <section className='w-full bg-white py-20'>
      {/* Heading */}
      <div className='text-center'>
        <div className='text-3xl md:text-[80px] font-extrabold text-[#111111]'>
          {headingTop}
        </div>
        <div className='mt-3 flex justify-center items-end gap-4'>
          <span className='text-3xl md:text-[80px] font-extrabold text-[#111111]'>
            {headingMainLeft}
          </span>
          <span className='inline-flex items-center justify-center'>
            <span className='w-[73px] h-[73px] rounded-full bg-[#CB892A] flex items-center justify-center'>
              <HeartIcon />
            </span>
          </span>
          <span className='text-3xl md:text-[80px] font-extrabold text-[#111111] relative'>
            {headingMainRight}
            <span className='block h-[6px] w-full bg-[#408360] rounded mt-2' />
          </span>
        </div>
      </div>

      {/* Testimonials */}
      <div className='mt-12 flex items-center justify-center gap-6'>
        {/* Left blurred card */}
        <div className='hidden md:block w-64 h-80 bg-[#EBE8E3] rounded-2xl p-6 text-gray-500 shadow-md transform rotate-12 scale-95 opacity-70 blur-[1px]'>
          <div className='text-sm leading-relaxed'>
            {
              'Take a virtual journey to the holiest site in Islam. Stand before the Ka‘bah, walk through Masjid al-Haram, and witness the spiritual harmony of millions — from wherever you are.'
            }
          </div>
          <div className='mt-6 font-semibold'>Ali Amin</div>
          <div className='text-xs text-gray-400'>Subtext</div>
        </div>

        {/* Center card */}
        <div className='w-[340px] md:w-[420px] bg-[#D8E7DD] rounded-2xl p-8'>
          <QuoteMarks />
          <p className='text-[#111111] text-[20px] font-medium leading-relaxed'>
            {testimonial.quote}
          </p>
          <div className='mt-8'>
            <div className='text-[#111111] font-bold text-[45px]'>
              {testimonial.author}
            </div>
            <div className=' text-[30px] font-medium'>
              {testimonial.subtext}
            </div>
          </div>
        </div>

        {/* Right blurred card */}
        <div className='hidden md:block w-64 h-80 bg-[#EBE8E3] rounded-2xl p-6 text-gray-500 shadow-md transform -rotate-12 scale-95 opacity-70 blur-[1px]'>
          <div className='text-sm leading-relaxed'>
            Take a virtual journey to the holiest site in Islam. Stand before
            the Ka&#39;bah, walk through Masjid al-Haram, and witness the
            spiritual harmony of millions — from wherever you are.
          </div>
          <div className='mt-6 font-semibold'>Ali Amin</div>
          <div className='text-xs text-gray-400'>Subtext</div>
        </div>
      </div>

      {/* Support CTA */}
      {showSupport && (
        <div className='mt-20 text-center'>
          <div className='text-3xl md:text-[80px] font-extrabold text-[#408360]'>
            {supportHeading}
          </div>
          <div className='my-2 text-[30px] font-bold text-[#408360]'>
            {supportSubtext}
          </div>
          <Button className='w-[200px]' variant='secondary'>
            {donateLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
