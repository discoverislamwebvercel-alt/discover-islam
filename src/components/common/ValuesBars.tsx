'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const bars = [
  {
    text: 'Authenticity',
    bg: 'bg-[#CB892A]',
    textColor: 'text-white',
    extra: 'All materials are reviewed by qualified Islamic scholars.',
  },
  {
    text: 'Respect',
    bg: 'bg-[#4C735D]',
    textColor: 'text-white',
    extra: 'We welcome dialogue, questions, and diversity of thought',
  },
  { text: 'Community', bg: 'bg-[#3E5F4E]', textColor: 'text-white' },
  { text: 'Clarity', bg: 'bg-black', textColor: 'text-white' },
];

export default function ValuesBars() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const onHoverAnimation = (idx: number) => {
    setTimeout(() => {
      setHoveredIndex(idx);
    }, 100);
  };

  return (
    <section className='w-full bg-white px-0 py-12 sm:py-14'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='relative flex flex-col items-center mb-8'>
          <motion.h2
            className='font-extrabold text-center text-[44px] sm:text-[56px] md:text-[72px] lg:text-[80px] leading-[107%]'
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            What We Stand For
          </motion.h2>
          <motion.img
            src='/figma/underline_green.png'
            alt='underline'
            className='mt-2 w-[280px] sm:w-[360px]'
            initial={{ opacity: 0, scaleX: 0.8 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className='w-full'>
        {bars.map((bar, idx) => (
          <motion.div
            key={bar.text}
            className={`${bar.bg} ${bar.textColor}`}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            animate={
              hoveredIndex === idx ? (bar.extra ? 'hover' : 'rest') : 'rest'
            }
            variants={{ rest: { height: 96 }, hover: { height: 132 } }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            onHoverStart={() => onHoverAnimation(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full'>
              <div className='flex items-center gap-4 h-full'>
                <motion.div
                  className='mx-auto text-center'
                  layout
                  animate={
                    hoveredIndex === idx && bar.extra ? { x: -100 } : { x: 0 }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 22,
                    mass: 0.6,
                    duration: 2,
                  }}
                >
                  <div className='font-bold text-[#F2F2F0] text-[40px] leading-[48px] tracking-[-0.03em]'>
                    {bar.text}
                  </div>
                </motion.div>

                {bar.extra && (
                  <motion.div
                    layout
                    style={{
                      display: hoveredIndex === idx ? 'block' : 'none',
                    }}
                    className='text-[#F2F2F0]'
                    initial={{ opacity: 0, x: 60 }}
                    animate={
                      hoveredIndex === idx
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: 60 }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 130,
                      damping: 20,
                      mass: 0.6,
                    }}
                  >
                    <div className='text-right text-[26px] leading-[31px]'>
                      {bar.extra}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
