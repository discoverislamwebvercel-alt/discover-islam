'use client';

import { motion } from 'framer-motion';

export default function AboutStats() {
  return (
    <section className='relative w-full bg-[#111111]'>
      {/* Desktop layout (absolute, pixel-precise) */}
      <div className='relative mx-auto w-full max-w-[1442px] h-[383px] hidden md:block'>
        {/* Left stat - 100+ Exhibitions delivered */}
        <motion.div
          className='absolute left-[214px] top-[142px]'
          initial={{ opacity: 0, y: -100, rotate: 3.81 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            ease: 'easeOut',
            opacity: { duration: 0.35, delay: 0 },
            y: { duration: 1, delay: 0.2 },
            rotate: { duration: 0.6, delay: 0.25 },
          }}
        >
          <div className='flex items-center justify-center gap-2 px-8 py-1 h-[80px] w-[253px] bg-[#408360] rounded-[20px]'>
            <div className='font-bold text-[#F2F2F0] text-[60px] leading-[72px] tracking-[-0.03em]'>
              100+
            </div>
          </div>
        </motion.div>
        <motion.div
          className='absolute left-[173px] top-[233px] w-[334px] text-center text-[#F2F2F0] text-[26px] leading-[31px] font-medium'
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0 }}
        >
          Exhibitions delivered
        </motion.div>

        {/* Middle stat - 1000+ school visits completed */}
        <motion.div
          className='absolute left-[594px] top-[142px]'
          initial={{ opacity: 0, y: -100, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            ease: 'easeOut',
            opacity: { duration: 0.35, delay: 0.15 },
            y: { duration: 1, delay: 0.27 },
            rotate: { duration: 0.6, delay: 0.27 },
          }}
        >
          <div className='flex items-center justify-center gap-2 px-8 py-1 h-[80px] w-[253px] bg-[#F2F2F0] text-[#111111] rounded-[20px]'>
            <div className='font-bold text-[60px] leading-[72px] tracking-[-0.03em]'>
              1000+
            </div>
          </div>
        </motion.div>
        <motion.div
          className='absolute left-[553px] top-[233px] w-[334px] text-center text-[#F2F2F0] text-[26px] leading-[31px] font-medium'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
        >
          school visits completed
        </motion.div>

        {/* Right stat - 1,000,000 literature pieces shared */}
        <motion.div
          className='absolute left-[933px] top-[142px]'
          initial={{ opacity: 0, y: -100, rotate: -2.36 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            ease: 'easeOut',
            opacity: { duration: 0.35, delay: 0.3 },
            y: { duration: 0.9, delay: 0.42 },
            rotate: { duration: 0.6, delay: 0.42 },
          }}
        >
          <div className='flex items-center justify-center gap-2 px-8 py-1 h-[80px] w-[343px] bg-[#CB892A] rounded-[20px]'>
            <div className='font-bold text-[#F2F2F0] text-[60px] leading-[72px] tracking-[-0.03em]'>
              1,000,000
            </div>
          </div>
        </motion.div>
        <motion.div
          className='absolute left-[933px] top-[233px] w-[334px] text-center text-[#F2F2F0] text-[26px] leading-[31px] font-medium'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        >
          literature pieces shared
        </motion.div>
      </div>

      {/* Mobile/tablet layout */}
      <div className='md:hidden px-4 py-10'>
        <div className='flex flex-col items-center gap-8'>
          <motion.div
            className='flex flex-col items-center gap-3'
            initial={{ opacity: 0, y: 40, rotate: 3.81 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className='h-[64px] px-6 rounded-[16px] bg-[#408360] flex items-center justify-center'>
              <div className='text-[42px] font-bold text-[#F2F2F0] leading-[48px] tracking-[-0.03em]'>
                100+
              </div>
            </div>
            <div className='text-[#F2F2F0] text-base'>
              Exhibitions delivered
            </div>
          </motion.div>

          <motion.div
            className='flex flex-col items-center gap-3'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
          >
            <div className='h-[64px] px-6 rounded-[16px] bg-[#F2F2F0] text-[#111111] flex items-center justify-center'>
              <div className='text-[42px] font-bold leading-[48px] tracking-[-0.03em]'>
                1000+
              </div>
            </div>
            <div className='text-[#F2F2F0] text-base'>
              school visits completed
            </div>
          </motion.div>

          <motion.div
            className='flex flex-col items-center gap-3'
            initial={{ opacity: 0, y: 40, rotate: -2.36 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.24 }}
          >
            <div className='h-[64px] px-6 rounded-[16px] bg-[#CB892A] flex items-center justify-center'>
              <div className='text-[36px] sm:text-[42px] font-bold text-[#F2F2F0] leading-[44px] tracking-[-0.03em]'>
                1,000,000
              </div>
            </div>
            <div className='text-[#F2F2F0] text-base'>
              literature pieces shared
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
