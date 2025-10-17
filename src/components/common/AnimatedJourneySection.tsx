'use client';

import { motion } from 'framer-motion';

export default function AnimatedJourneySection() {
  const EightPointedStar = () => (
    <svg
      width='54'
      height='54'
      viewBox='0 0 32 32'
      className='ml-6'
      style={{ color: '#408360' }}
    >
      <g transform='translate(16,16)'>
        <path
          fill='currentColor'
          d='M0,-12 L2,-4 L8,-8 L4,-2 L12,0 L4,2 L8,8 L2,4 L0,12 L-2,4 L-8,8 L-4,2 L-12,0 L-4,-2 L-8,-8 L-2,-4 Z'
        />
      </g>
    </svg>
  );

  const content = (
    <div
      className='flex items-center whitespace-nowrap font-bold uppercase'
      style={{ color: '#AFCBB5', fontSize: '141px', lineHeight: 1 }}
    >
      <span>Let’s start your journey</span>
      <EightPointedStar />
    </div>
  );

  return (
    <div className='relative w-full overflow-hidden pt-8'>
      <motion.div
        className='flex items-center'
        style={{
          width: 'max-content',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
}
