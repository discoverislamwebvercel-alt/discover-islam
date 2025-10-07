'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div
      id='home'
      className='h-screen relative'
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
          className='text-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.7] tracking-tight'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className='text-black'>SEE</span>{' '}
            <span className='text-[#cb892a]'>ISLAM</span>
          </motion.h1>

          <motion.h2
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mt-2 sm:mt-4 leading-[0.7] tracking-tight'
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
