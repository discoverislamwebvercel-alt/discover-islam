'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import HeartIcon from '../icons/HeartIcon';
import DoubleQuoteIcon from '../icons/DoubleQuoteIcon';
import useEmblaCarousel from 'embla-carousel-react';

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

const testimonials: Testimonial[] = [
  {
    quote:
      'Very welcoming and calming environment. Our host spoke beautifully and answered the questions wonderfully. Thanks',
    author: "St Paul's Primary School Whiteinch",
  },
  {
    quote:
      'It was a great learning experience! The children were extremely engaged. Thank you for taking the time to visit our class.',
    author: 'Westbridge Primary School, England',
  },
  {
    quote:
      'Excellent and easy for the children to understand. There were plenty opportunities for them to discuss and ask questions!',
    author: 'St James Primary, Harlow',
  },
  {
    quote:
      'Very confident presentation, children found it very interesting, appropriate content for age level, personalised to classes question.',
    author: 'Giffnock primary',
  },
  {
    quote:
      "A very informative and interesting presentation, with some practical elements that were fantastic for the students to experience (hearing the call to prayer, listening to the Qu'ran read aloud, joining in with the prayer movements, seeing a prayer mat etc).",
    author: 'Chirnsyde Primary School',
  },
];

export default function TestimonialsSupportSection({
  headingTop = 'See why',
  headingMainLeft = 'people',
  headingMainRight = 'love us',
  supportHeading = 'Support this project',
  supportSubtext = 'Help us build a better community',
  donateLabel = 'Donate Now',
  showSupport = true,
}: TestimonialsSupportSectionProps) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Track selected slide to control center/full vs side/low opacity
  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    onSelect();
    embla.on('select', onSelect);
    return () => {
      // Cleanup should not return a value; just detach the handler
      embla.off('select', onSelect);
    };
  }, [embla]);

  // Auto-advance the carousel so cards move
  useEffect(() => {
    if (!embla) return;
    const interval = setInterval(() => {
      if (embla.canScrollNext()) embla.scrollNext();
      else embla.scrollTo(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [embla]);

  return (
    <section className='relative w-full bg-gray-100 py-14 sm:py-16 md:py-20'>
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
          <span className='text-[28px] sm:text-[40px] md:text-[64px] lg:text-[80px] font-extrabold text-[#111111] leading-[1.07] relative inline-block'>
            {headingMainRight}
            <img
              src='/figma/underline_green.png'
              alt='underline'
              className='absolute left-1/2 -translate-x-1/2 -bottom-2 w-[220px] sm:w-[300px] md:w-[360px] lg:w-[386.81px] h-[8px] sm:h-[9px] md:h-[10px] rotate-[-2deg] pointer-events-none select-none'
            />
          </span>
        </div>
      </div>

      {/* Visible carousel rendering testimonial cards without animation */}
      <div className='relative mt-10 sm:mt-12'>
        <div className='overflow-hidden relative h-full' ref={emblaRef}>
          {/* Slides container with consistent gap and edge padding */}
          <div className='flex gap-6 px-6 h-full'>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`flex-shrink-0 basis-[85%] sm:basis-1/2 lg:basis-1/3 h-auto flex items-stretch justify-center pb-2 transition-opacity ${
                  i === selectedIndex ? 'opacity-100' : 'opacity-40'
                }`}
                aria-hidden={i !== selectedIndex}
              >
                <div
                  className={`w-full h-full bg-[#D8E2DA] rounded-[22.69px] p-6 md:p-[35.17px] transform transition-transform duration-300 ${
                    i === selectedIndex
                      ? 'scale-100 shadow-xl'
                      : 'scale-95 shadow-md'
                  }`}
                >
                  <div className='flex flex-col justify-between gap-6 md:gap-[44.25px] w-[280px] sm:w-[340px] md:w-[398.24px] h-full'>
                    <DoubleQuoteIcon
                      color='#408360'
                      className='w-[50px] sm:w-[72px] md:w-[95.22px] h-[34px] sm:h-[48px] md:h-[62.63px]'
                    />
                    <p className='text-[#111111] text-[18px] sm:text-[22px] md:text-[30px] leading-[24px] sm:leading-[30px] md:leading-[36px] font-medium'>
                      {t.quote}
                    </p>
                    <div className='flex flex-col mt-auto'>
                      <div className='text-[#111111] font-bold text-[26px] sm:text-[32px] md:text-[45px]'>
                        {t.author}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className='absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-2'>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type='button'
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => embla?.scrollTo(idx)}
                className={`${
                  idx === selectedIndex
                    ? 'w-6 h-1.5 rounded-full bg-[#111111] opacity-80'
                    : 'w-2 h-2 rounded-full bg-[#111111] opacity-30'
                }`}
              />
            ))}
          </div>

          {/* Carousel arrows */}
          <button
            type='button'
            aria-label='Previous testimonial'
            onClick={() => embla?.scrollPrev()}
            className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#111111] border border-[#E7E7E7] shadow-sm rounded-full w-14 h-14 flex items-center justify-center'
          >
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 18l-6-6 6-6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            type='button'
            aria-label='Next testimonial'
            onClick={() => embla?.scrollNext()}
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#111111] border border-[#E7E7E7] shadow-sm rounded-full w-14 h-14 flex items-center justify-center'
          >
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 6l6 6-6 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
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
          <Link href='/donations' className='cursor-pointer'>
            <Button className='w-[200px]' variant='secondary'>
              {donateLabel}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
