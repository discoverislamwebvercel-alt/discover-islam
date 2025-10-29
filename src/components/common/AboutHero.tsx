'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className='relative w-full bg-white min-h-[10vh] sm:min-h-[56vh] md:min-h-[64vh] lg:min-h-[72vh] xl:min-h-[80vh] py-8 sm:py-12 md:py-16 lg:py-20'>
      {/* Soft pattern overlay to match other hero sections */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none'
        style={{ backgroundImage: "url('/image 2.png')" }}
      />

      <div className='relative mx-auto max-w-[1230px] px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 md:pt-44 lg:pt-48 xl:pt-52 pb-6 sm:pb-12 lg:pb-20 xl:pb-24'>
        <motion.h1
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px] font-extrabold uppercase text-[#111111] text-center tracking-tight'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          ABOUT US
        </motion.h1>
      </div>
    </section>
  );
}
