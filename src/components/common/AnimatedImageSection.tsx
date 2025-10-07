'use client';

import { motion } from 'framer-motion';

interface AnimatedImageSectionProps {
  className?: string;
  text1?: string;
  text2?: string;
}

export default function AnimatedImageSection({
  className = '',
  text1 = 'HOST YOUR VERY OWN ISLAMIC EXHIBITION',
  text2 = 'PROMOTING UNDERSTANDING THROUGH ENGAGEMENT',
}: AnimatedImageSectionProps) {
  // 8-pointed star component matching the image style
  const EightPointedStar = () => (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      className='mx-6'
      style={{ color: '#AFCBB5' }}
    >
      <g transform='translate(16,16)'>
        <path
          fill='currentColor'
          d='M0,-12 L2,-4 L8,-8 L4,-2 L12,0 L4,2 L8,8 L2,4 L0,12 L-2,4 L-8,8 L-4,2 L-12,0 L-4,-2 L-8,-8 L-2,-4 Z'
        />
      </g>
    </svg>
  );

  const bannerContent = (
    <div
      className='flex items-center whitespace-nowrap font-bold text-xl md:text-2xl lg:text-3xl'
      style={{ color: '#AFCBB5' }}
    >
      {[...Array(4)].map((_, i) => (
        <div key={i} className='flex items-center'>
          <span className='mx-8'>{text1}</span>
          <EightPointedStar />
          <span className='mx-8'>{text2}</span>
          <EightPointedStar />
        </div>
      ))}
    </div>
  );

  const invertedBannerContent = (
    <div
      className='flex items-center whitespace-nowrap font-bold text-xl md:text-2xl lg:text-3xl'
      style={{ color: '#AFCBB5', transform: 'scaleX(-1)' }}
    >
      {[...Array(4)].map((_, i) => (
        <div key={i} className='flex items-center'>
          <span className='mx-8'>{text1}</span>
          <EightPointedStar />
          <span className='mx-8'>{text2}</span>
          <EightPointedStar />
        </div>
      ))}
    </div>
  );

  return (
    <div className='h-32 mt-32 mb-16 relative'>
      <div
        className={`absolute z-1 top-0 w-full h-16 overflow-hidden ${className}`}
        style={{
          transform: 'rotate(-3deg) translateY(-5px)',
          background: '#408360',
        }}
      >
        <div className='absolute inset-0 w-full overflow-hidden z-10'>
          <motion.div
            className='flex py-4'
            style={{
              width: '200%',
            }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {bannerContent}
            {bannerContent}
          </motion.div>
        </div>
      </div>
      {/* Low opacity banner */}
      <div
        className={`relative w-full h-16 overflow-hidden ${className}`}
        style={{ transform: 'rotate(3deg) translateY(5px)', opacity: 0.3 }}
      >
        <div
          className='absolute inset-0 w-full overflow-hidden z-10'
          style={{ backgroundColor: '#408360' }}
        >
          <motion.div
            className='flex py-4'
            style={{
              width: '200%',
            }}
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {invertedBannerContent}
            {invertedBannerContent}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
