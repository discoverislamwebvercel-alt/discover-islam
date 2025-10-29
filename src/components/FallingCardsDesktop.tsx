'use client';

import { motion, useInView } from 'framer-motion';
import { Star, Building, MessageCircleQuestion } from 'lucide-react';
import { useRef } from 'react';

export default function FallingCardsDesktop({
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
      className='relative w-full flex flex-col items-center justify-end min-h-[600px] overflow-hidden'
    >
      {/* Section Heading */}
      <div className='text-center mb-[180px]'>
        <motion.h2
          initial={{ y: 400, opacity: 0, rotate: 0, x: 0 }}
          animate={
            isInView
              ? {
                  y: 0,
                  x: 0,
                  opacity: 1,
                }
              : { y: 400, opacity: 0, rotate: 0, x: 0 }
          }
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 15,
            delay: 0.15,
          }}
          className='text-black mb-4 font-extrabold text-[80px] leading-[107%] tracking-[0%] text-center'
        >
          <div>
            {heading1}
            {/* Underline decoration */}
            <div className='flex justify-center mt-2 -mb-[80px]'>
              <svg
                width='400'
                height='20'
                viewBox='0 0 400 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10 10 Q200 2 390 10'
                  stroke='#408360'
                  strokeWidth='4'
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

      {/* Optional subtle background circle */}
      <div className='absolute bottom-[75px] left-[55%] w-16 h-16 bg-[#BFD6C7] rounded-full opacity-60'></div>

      {/* Card row with original scattered layout */}
      <div className='relative flex items-end justify-center gap-3 flex-wrap max-w-7xl mx-auto pb-8 z-10'>
        {cards.map((card, i) => {
          return (
            <motion.div
              key={i}
              initial={{ y: -400, opacity: 0, rotate: 0, x: card.x }}
              animate={
                isInView
                  ? {
                      y: card.y,
                      x: card.x,
                      opacity: 1,
                      rotate: card.rotate,
                    }
                  : { y: -400, opacity: 0, rotate: 0, x: card.x }
              }
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 15,
                delay: i * 0.15,
              }}
              style={{
                width: card.width,
                padding: card.padding,
                gap: card.gap,
              }}
              className={`relative overflow-hidden group gap-[10px] py-[25px] px-[27px] shadow-lg text-center font-extrabold text-lg break-words ${card.styles} hover:scale-105 transition-transform duration-300 ease-out`}
            >
              <span aria-hidden className='hover-animation' />
              {card.icon && renderIcon(card.icon)}
              {card.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
