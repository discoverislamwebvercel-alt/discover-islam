'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div
      id='home'
      className='h-screen relative opacity-100'
      style={{
        backgroundImage: "url('/image 2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Hero Content */}
      <div className='h-full flex items-center justify-center px-4 sm:px-8'>
        <motion.div
          className='text-center mx-auto flex flex-col items-center gap-1'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{
            scale: 2,
            y: [0, -50, 0, -40, 0, -30, 0, -20, 0, -10, 0],
            cursor: 'default',
            transition: {
              scale: { duration: 0.2, ease: 'easeOut' },
              y: {
                delay: 0.15,
                duration: 2.8,
                ease: 'easeOut',
                repeat: Infinity,
                repeatType: 'loop',
              },
            },
          }}
        >
          <motion.h1
            className='w-full max-w-[584px] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold leading-[0.9] tracking-tight'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className='text-black'>SEE</span>{' '}
            <span className='text-[#cb892a]'>ISLAM</span>
          </motion.h1>

          <motion.h2
            className='w-full max-w-[584px] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold text-black mt-1 leading-[0.9] tracking-tight'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            AS IT IS
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}
