'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';
import { motion } from 'framer-motion';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' });

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setCurrentIndex(embla.selectedScrollSnap());
    onSelect();
    embla.on('select', onSelect);
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const interval = setInterval(() => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [embla]);

  const getTestimonial = (offset: number) =>
    testimonials[(currentIndex + offset) % testimonials.length];

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

      {/* Hidden Embla carousel for slide control */}
      <div
        className='absolute opacity-0 pointer-events-none overflow-hidden w-0 h-0'
        ref={emblaRef}
      >
        <div className='flex'>
          {testimonials.map((_, i) => (
            <div key={i} className='flex-[0_0_100%]' />
          ))}
        </div>
      </div>

      {/* Layered testimonial cards with previous layout */}
      <div
        className='relative mt-10 sm:mt-12 min-h-[560px] sm:min-h-[640px] md:min-h-[760px]'
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Far left blurred card */}
        <motion.div
          key={'far-left'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 0.8, rotateX: -1, rotateY: -100 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          className='hidden lg:block absolute w-[300px] xl:w-[402.59px] h-[400px] xl:h-[650px] left-[10px] xl:left-[4rem] bottom-[60px] xl:bottom-[80px] bg-[#EBE8E3] opacity-40 rounded-[18.4px] blur-[5.16px] p-6 xl:p-[28.56px]'
          style={{
            transformStyle: 'preserve-3d',
            // willChange: 'transform, opacity',
            // backfaceVisibility: 'hidden',
          }}
        >
          <div className='w-[323.36px] h-[475.24px]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <motion.div
              key={'far-left-quote'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'
            >
              {getTestimonial(2).quote}
            </motion.div>
            <motion.div
              key={'far-left-author'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'
            >
              {getTestimonial(2).author}
            </motion.div>
          </div>
        </motion.div>

        {/* Far right blurred card */}
        <motion.div
          key={'far-right'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 0.8, rotateX: -1, rotateY: 100 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          className='hidden lg:block absolute w-[300px] xl:w-[402.59px] h-[400px] xl:h-[650px] right-[10px] xl:right-[4rem] bottom-[60px] xl:bottom-[80px] bg-[#EBE8E3] opacity-40 rounded-[18.4px] blur-[5.16px] p-6 xl:p-[28.56px]'
          style={{
            transformStyle: 'preserve-3d',
            // willChange: 'transform, opacity',
            // backfaceVisibility: 'hidden',
          }}
        >
          <div className='w-[323.36px] h-[475.24px]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <motion.div
              key={'far-right-quote'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'
            >
              {getTestimonial(3).quote}
            </motion.div>
            <motion.div
              key={'far-right-author'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'
            >
              {getTestimonial(3).author}
            </motion.div>
          </div>
        </motion.div>

        {/* Mid-left subtle card */}
        <motion.div
          key={'mid-left'}
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotateY: -22 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          className='hidden md:block absolute w-[300px] xl:w-[402.59px] h-[400px] xl:h-[500px] left-[12px] xl:left-[8rem] bottom-[5rem] bg-[#EBE8E3] rounded-[18.4px] blur-[2.27px] p-6 xl:p-[28.56px]'
          style={{
            transformStyle: 'preserve-3d',
            // willChange: 'transform, opacity',
            // backfaceVisibility: 'hidden',
          }}
        >
          <div className='w-[323.36px] h-[475.24px]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <motion.div
              key={'mid-left-quote'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'
            >
              {getTestimonial(1).quote}
            </motion.div>
            <motion.div
              key={'mid-left-author'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'
            >
              {getTestimonial(1).author}
            </motion.div>
          </div>
        </motion.div>

        {/* Mid-right subtle card */}
        <motion.div
          key={'mid-right'}
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotateY: 22 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          className='hidden md:block absolute w-[300px] xl:w-[402.59px] h-[400px] xl:h-[500px] right-[12px] xl:right-[8rem] bottom-[5rem] bg-[#EBE8E3] rounded-[18.4px] blur-[2.27px] p-6 xl:p-[28.56px]'
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className='w-[323.36px] h-[475.24px]'>
            <DoubleQuoteIcon
              color='#CB892A'
              opacity={0.3}
              className='w-[77.31px] h-[50.86px]'
            />
            <motion.div
              key={'mid-right-quote'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 text-[23.95px] leading-[29px]'
            >
              {getTestimonial(4).quote}
            </motion.div>
            <motion.div
              key={'mid-right-author'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className='mt-6 text-[#111111] opacity-30 font-bold text-[36.85px]'
            >
              {getTestimonial(4).author}
            </motion.div>
          </div>
        </motion.div>

        {/* Center primary card */}
        <motion.div
          key={'center'}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            y: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          className='absolute left-1/2 -translate-x-1/2 bottom-0 w-[320px] sm:w-[420px] md:w-[495.81px] bg-[#D8E2DA] rounded-[22.69px] p-6 md:p-[35.17px]'
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className='flex flex-col gap-6 md:gap-[44.25px] w-[280px] sm:w-[340px] md:w-[398.24px]'>
            <motion.div
              key={'center-icon'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                scale: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
              }}
            >
              <DoubleQuoteIcon
                color='#408360'
                className='w-[50px] sm:w-[72px] md:w-[95.22px] h-[34px] sm:h-[48px] md:h-[62.63px]'
              />
            </motion.div>
            <motion.p
              key={'center-quote'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                y: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
              }}
              className='text-[#111111] text-[18px] sm:text-[22px] md:text-[30px] leading-[24px] sm:leading-[30px] md:leading-[36px] font-medium'
            >
              {getTestimonial(0).quote}
            </motion.p>
            <motion.div
              key={'center-author'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                y: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
              }}
              className='flex flex-col'
            >
              <div className='text-[#111111] font-bold text-[26px] sm:text-[32px] md:text-[45px]'>
                {getTestimonial(0).author}
              </div>
            </motion.div>
          </div>
        </motion.div>
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
