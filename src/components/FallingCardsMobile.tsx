'use client';

import { motion, useInView } from 'framer-motion';
import { Star, Building, MessageCircleQuestion } from 'lucide-react';
import { useRef } from 'react';

export default function FallingCardsMobile({
  cards,
  heading1,
  heading2,
}: {
  cards: any[];
  heading1: string;
  heading2: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const renderIcon = (iconType: string | boolean) => {
    if (iconType === 'stars') {
      return (
        <div className='absolute -left-12 -top-2 flex items-center gap-1'>
          <Star className='text-[#E5B73B] w-6 h-6 fill-current' />
          <Star className='text-[#E5B73B] w-6 h-6 fill-current' />
          <Star className='text-[#E5B73B] w-6 h-6 fill-current' />
        </div>
      );
    }
    if (iconType === 'building') {
      return (
        <div className='absolute -right-8 -bottom-4 bg-black rounded-full p-2'>
          <Building className='text-white w-5 h-5' />
        </div>
      );
    }
    if (iconType === 'qa') {
      return (
        <div className='absolute -right-8 -top-4 bg-black rounded-full p-2'>
          <MessageCircleQuestion className='text-white w-5 h-5' />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={ref}
      className='relative w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden'
    >
      {/* Section Heading */}
      <div className='text-center mb-8'>
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={
            isInView
              ? {
                  y: 0,
                  opacity: 1,
                }
              : { y: 50, opacity: 0 }
          }
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 15,
            delay: 0.15,
          }}
          className='text-black mb-4 font-extrabold text-4xl sm:text-5xl leading-[107%] tracking-[0%] text-center'
        >
          <div>
            {heading1}
            {/* Underline decoration */}
            <div className='flex justify-center mt-2 -mb-8'>
              <svg
                width='200'
                height='15'
                viewBox='0 0 200 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full max-w-[200px]'
              >
                <path
                  d='M5 7.5 Q100 2 195 7.5'
                  stroke='#408360'
                  strokeWidth='3'
                  fill='none'
                  strokeLinecap='round'
                />
              </svg>
            </div>
          </div>
          <br />
          {heading2}
        </motion.h2>
      </div>

      {/* Stacked Cards Layout for Mobile */}
      <div className='relative flex flex-col items-center gap-4 w-full max-w-md mx-auto'>
        {cards.map((card, i) => {
          if (card.isTransparent) {
            return null;
          }

          return (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                    }
                  : { y: 100, opacity: 0, scale: 0.8 }
              }
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 15,
                delay: i * 0.1,
              }}
              className={`relative w-full py-4 px-6 shadow-lg text-center font-bold text-sm break-words ${card.styles}`}
            >
              {card.icon && renderIcon(card.icon)}
              {card.text}
            </motion.div>
          );
        })}
      </div>

      {/* Optional decorative elements */}
      <div className='absolute top-1/2 right-4 w-8 h-8 bg-[#BFD6C7] rounded-full opacity-40'></div>
      <div className='absolute bottom-1/4 left-4 w-6 h-6 bg-[#BFD6C7] rounded-full opacity-30'></div>
    </div>
  );
}
