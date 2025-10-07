'use client';

import { motion } from 'framer-motion';
// import { Star } from 'lucide-react';

export default function FallingCards() {
  const cards = [
    {
      text: '10+ Years of Experience',
      color: '#408360',
      rotate: '0deg',
      y: 0,
      // icon: true,
    },
    {
      text: 'Backed by Positive feedback',
      color: '#000000',
      rotate: '-10deg',
      y: 0,
    },
    {
      text: 'Interactive, Modern Displays That Engage and inspire',
      color: '#C38C47',
      rotate: '0deg',
      y: 10,
    },
    {
      text: 'Content Reviewed by Qualified Scholars',
      color: '#CB892A',
      rotate: '0deg',
      y: 0,
    },
    {
      text: 'Tailored for Non-Muslim Audiences',
      color: '#000000',
      rotate: '10deg',
      y: 20,
    },
    {
      text: 'Fully Mobile & Self-Contained',
      color: '#508265',
      rotate: '5deg',
      y: 40,
    },
  ];

  return (
    <div className='relative w-full flex flex-col items-center justify-end min-h-[400px] overflow-hidden'>
      {/* Base green bar */}

      {/* Optional subtle background circle */}
      <div className='absolute bottom-[60px] left-[60%] w-24 h-24 bg-[#BFD6C7] rounded-full opacity-60'></div>

      {/* Card row */}
      <div className='relative flex items-end justify-center gap-3 flex-wrap max-w-7xl mx-auto pb-8 z-10'>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ y: -200, opacity: 0, rotate: 0 }}
            animate={{
              y: card.y,
              opacity: 1,
              rotate: card.rotate,
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 12,
              delay: i * 0.2,
            }}
            style={{
              backgroundColor: card.color,
              color: card.color === '#000000' ? '#fff' : '#fff',
              transformOrigin: 'center',
            }}
            className='relative px-6 py-3 rounded-lg shadow-lg text-center font-semibold text-base md:text-lg whitespace-nowrap'
          >
            {/* {card.icon && (
              <div className='absolute -left-10 flex items-center gap-1'>
                <Star className='text-[#E5B73B] w-6 h-6' />
                <Star className='text-[#E5B73B] w-6 h-6' />
                <Star className='text-[#E5B73B] w-6 h-6' />
              </div>
            )} */}
            {card.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
