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
      'Take a virtual journey to the holiest site in Islam. Stand before the Kaabah, walk through Masjid al-Haram, and witness the spiritual harmony of millions — from wherever you are.',
    author: 'Ali Amin',
    subtext: 'Subtext',
  },
  supportHeading = 'Support this project',
  supportSubtext = 'Help us build a better community',
  donateLabel = 'Donate Now',
  showSupport = true,
}: TestimonialsSupportSectionProps) {
  const HeartIcon = ({ className = '' }: { className?: string }) => (
    <svg
      viewBox='0 0 40 37'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M5.59278 23.9344L25.4796 36.5752L38.1204 16.6884C39.6087 14.3468 40.106 11.5099 39.5027 8.80166L39.4006 8.34364C38.2007 2.95707 32.8612 -0.436869 27.4748 0.763058C24.5117 1.42313 22.0096 3.3942 20.6741 6.12012L19.3137 8.89672L16.9035 6.96008C14.5372 5.05879 11.4349 4.3362 8.47202 4.99624C3.08545 6.19619 -0.308494 11.5356 0.891455 16.9222L0.993487 17.3802C1.59679 20.0884 3.2512 22.4461 5.59278 23.9344Z'
        fill='#111111'
      />
    </svg>
  );

  const DoubleQuoteIcon = ({
    color = '#408360',
    opacity = 1,
    className = '',
  }: {
    color?: string;
    opacity?: number;
    className?: string;
  }) => (
    <svg
      viewBox='0 0 64 48'
      width='64'
      height='48'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      style={{ opacity }}
    >
      {/* Left quote */}
      <path
        d='M6 44c0-9.5 7.7-18 17.2-18h4.8V8H16C8.3 8 2 14.3 2 22v22h4Z'
        fill={color}
      />
      {/* Right quote */}
      <path
        d='M38 44c0-9.5 7.7-18 17.2-18h4.8V8H48C40.3 8 34 14.3 34 22v22h4Z'
        fill={color}
      />
    </svg>
  );

  return (
    <section className='relative w-full bg-white py-14 sm:py-16 md:py-20'>
      {/* Heading group */}
      <div className='relative mx-auto max-w-[934px] text-center'>
        <div className='text-[28px] sm:text-[40px] md:text-[64px] lg:text-[80px] font-extrabold text-[#111111] leading-[1.07]'>
          {headingTop}
        </div>
        <div className='mt-1 sm:mt-2 relative flex items-center justify-center gap-2 sm:gap-3'>
          <span className='text-[28px] sm:text-[40px] md:text-[64px] lg:text-[80px] font-extrabold text-[#111111] leading-[1.07]'>
            {headingMainLeft}
          </span>
          <span className='inline-flex items-center justify-center w-[40px] sm:w-[48px] md:w-[56px] lg:w-[64px] h-[40px] sm:h-[48px] md:h-[56px] lg:h-[64px] rounded-full bg-[#CB892A] -rotate-[0.18deg]'>
            <span className='inline-flex items-center justify-center -rotate-[12.56deg]'>
              <HeartIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
            </span>
          </span>
          <span className='text-[28px] sm:text-[40px] md:text-[64px] lg:text-[80px] font-extrabold text-[#111111] leading-[1.07] relative'>
            {headingMainRight}
            <span className='block w-[180px] sm:w-[260px] md:w-[320px] lg:w-[386.81px] h-[0px] border-b-[6px] border-[#408360] -rotate-[5.34deg] mx-auto mt-1 sm:mt-2' />
          </span>
        </div>
      </div>

      {/* Layered testimonial cards */}
      <div className='relative mt-10 sm:mt-12 min-h-[420px] sm:min-h-[520px] md:h-[588px]'>
        {/* Far left blurred card */}
        <div className='hidden lg:block absolute w-[300px] xl:w-[402.59px] h-[360px] xl:h-[478.13px] left-0 top-0 bg-[#EBE8E3] opacity-40 rounded-[18.4px] blur-[5.16px] transform [transform:matrix(0.74,-0.67,0,1,0,0)] p-6 xl:p-[28.56px]'>
          <div className='w-[323.36px] h-[398.71px] [transform:matrix(0.74,-0.67,0,1,0,0)]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <div className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              {testimonial.quote}
            </div>
            <div className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'>
              Ali Amin
            </div>
            <div className='text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              Subtext
            </div>
          </div>
        </div>

        {/* Far right blurred card */}
        <div className='hidden lg:block absolute w-[300px] xl:w-[402.59px] h-[360px] xl:h-[478.13px] right-0 top-0 bg-[#EBE8E3] opacity-40 rounded-[18.4px] blur-[5.16px] transform [transform:matrix(-0.74,-0.67,0,1,0,0)] p-6 xl:p-[28.56px]'>
          <div className='w-[323.36px] h-[398.71px] [transform:matrix(-0.74,-0.67,0,1,0,0)]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <div className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              {testimonial.quote}
            </div>
            <div className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'>
              Ali Amin
            </div>
            <div className='text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              Subtext
            </div>
          </div>
        </div>

        {/* Mid-left subtle card */}
        <div className='hidden md:block absolute w-[300px] xl:w-[402.59px] h-[360px] xl:h-[478.13px] left-[24px] xl:left-[42px] bottom-0 bg-[#EBE8E3] rounded-[18.4px] blur-[2.27px] transform [transform:matrix(0.95,0.33,0,1,0,0)] p-6 xl:p-[28.56px]'>
          <div className='w-[323.36px] h-[398.71px] [transform:matrix(0.95,0.33,0,1,0,0)]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <div className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              {testimonial.quote}
            </div>
            <div className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'>
              Ali Amin
            </div>
            <div className='text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              Subtext
            </div>
          </div>
        </div>

        {/* Mid-right subtle card */}
        <div className='hidden md:block absolute w-[300px] xl:w-[402.59px] h-[360px] xl:h-[478.13px] right-[24px] xl:right-[42px] bottom-0 bg-[#EBE8E3] rounded-[18.4px] blur-[2.27px] transform [transform:matrix(0.93,-0.37,0,1,0,0)] p-6 xl:p-[28.56px]'>
          <div className='w-[323.36px] h-[398.71px] [transform:matrix(0.93,-0.37,0,1,0,0)]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <div className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              {testimonial.quote}
            </div>
            <div className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'>
              Ali Amin
            </div>
            <div className='text-[#111111] opacity-30 text-[23.95px] leading-[29px]'>
              Subtext
            </div>
          </div>
        </div>

        {/* Center primary card */}
        <div className='absolute left-1/2 -translate-x-1/2 bottom-0 w-[320px] sm:w-[420px] md:w-[495.81px] bg-[#D8E2DA] rounded-[22.69px] p-6 md:p-[35.17px]'>
          <div className='flex flex-col gap-6 md:gap-[44.25px] w-[280px] sm:w-[340px] md:w-[398.24px]'>
            <DoubleQuoteIcon
              color='#408360'
              className='w-[50px] sm:w-[72px] md:w-[95.22px] h-[34px] sm:h-[48px] md:h-[62.63px]'
            />
            <p className='text-[#111111] text-[18px] sm:text-[22px] md:text-[30px] leading-[24px] sm:leading-[30px] md:leading-[36px] font-medium'>
              {testimonial.quote}
            </p>
            <div className='flex flex-col'>
              <div className='text-[#111111] font-bold text-[26px] sm:text-[32px] md:text-[45px]'>
                {testimonial.author}
              </div>
              <div className='text-[#111111] text-opacity-50 text-[18px] sm:text-[22px] md:text-[30px] leading-[26px] sm:leading-[30px] md:leading-[36px]'>
                {testimonial.subtext}
              </div>
            </div>
          </div>
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
