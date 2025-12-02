'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MissionVision() {
  return (
    <section className='w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16'>
      {/* Desktop layout */}
      <div className='mx-auto max-w-6xl space-y-10 hidden md:block'>
        {/* Mission card (green) */}
        <motion.div
          className='relative h-[396px] rounded-[30px]'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          animate='rest'
          whileHover='hover'
        >
          {/* background rectangle */}
          <div className='absolute inset-x-0 bottom-0 top-[43px] bg-[#408360] opacity-15 rounded-[30px]' />
          {/* tilted label */}
          <div className='absolute left-[36px] top-0'>
            <motion.div
              className='inline-flex items-center justify-center px-8 py-3 rounded-[18px] bg-[#408360] shadow-sm'
              variants={{ rest: { rotate: 0 }, hover: { rotate: -6 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className='text-white font-extrabold text-[38px] sm:text-[48px] md:text-[60px] leading-[107%]'>
                Our Mission
              </div>
            </motion.div>
          </div>
          {/* paragraph */}
          <motion.p
            className='absolute text-[30px] leading-[36px] font-medium sm:font-[550] text-[#111111CC] top-[170px] md:left-6 md:translate-x-0 md:w-[520px] lg:left-1/2 lg:-translate-x-[calc(589px/2+236.5px)] lg:w-[589px]'
            style={{ maxWidth: 589 }}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            To share the true message of Islam through clear, engaging, and
            authentic educational experiences that foster understanding,
            respect, and dialogue across all communities.
          </motion.p>
          {/* right image */}
          <motion.div
            className='absolute right-6 top-[55px]'
            variants={{
              rest: { scale: 1, rotate: 0 },
              hover: { scale: 0.96, rotate: -6 },
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            <Image
              src='/figma/target_svgrepo.com.png'
              alt='target'
              width={456}
              height={341}
            />
          </motion.div>
        </motion.div>

        {/* Vision card (amber) */}
        <motion.div
          className='relative h-[396px] rounded-[30px]'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          animate='rest'
          whileHover='hover'
        >
          {/* background rectangle */}
          <div className='absolute inset-x-0 bottom-0 top-[43px] bg-[#CB892A] opacity-15 rounded-[30px]' />
          {/* tilted label */}
          <div className='absolute left-[36px] top-0'>
            <motion.div
              className='inline-flex items-center justify-center px-8 py-3 rounded-[18px] bg-[#CB892A] shadow-sm'
              variants={{ rest: { rotate: 0 }, hover: { rotate: -6 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className='text-white font-extrabold text-[38px] sm:text-[48px] md:text-[60px] leading-[107%]'>
                Our Vision
              </div>
            </motion.div>
          </div>
          {/* paragraph */}
          <motion.p
            className='absolute text-[30px] leading-[36px] font-[550] text-[#111111CC] top-[170px] md:left-6 md:translate-x-0 md:w-[520px] lg:left-1/2 lg:-translate-x-[calc(553px/2+254.5px)] lg:w-[553px]'
            style={{ maxWidth: 553 }}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            A society where people have access to accurate information about
            Islam, leading to greater harmony, mutual respect, and meaningful
            connections.
          </motion.p>
          {/* right image */}
          <motion.div
            className='absolute right-6 top-[50px]'
            variants={{
              rest: { scale: 1, rotate: 0 },
              hover: { scale: 0.96, rotate: -6 },
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            <Image
              src='/figma/vision_svgrepo.com.png'
              alt='vision'
              width={340}
              height={340}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile layout */}
      <div className='mx-auto max-w-3xl space-y-6 md:hidden'>
        <motion.div
          className='relative rounded-2xl bg-[#E3EFE9] p-6 overflow-hidden'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className='inline-block -rotate-2 bg-[#408360] text-white font-extrabold text-2xl px-4 py-2 rounded-xl'>
            Our Mission
          </div>
          <p className='mt-4 text-[#111111CC] text-lg'>
            To share the true message of Islam through clear, engaging, and
            authentic educational experiences that foster understanding,
            respect, and dialogue across all communities.
          </p>
          <div className='absolute right-2 bottom-2 opacity-10'>
            <Image
              src='/figma/target_svgrepo.com.png'
              alt='target'
              width={180}
              height={180}
            />
          </div>
        </motion.div>

        <motion.div
          className='relative rounded-2xl bg-[#F4E7D6] p-6 overflow-hidden'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className='inline-block -rotate-2 bg-[#CB892A] text-white font-extrabold text-2xl px-4 py-2 rounded-xl'>
            Our Vision
          </div>
          <p className='mt-4 text-[#111111CC] text-lg'>
            A society where people have access to accurate information about
            Islam, leading to greater harmony, mutual respect, and meaningful
            connections.
          </p>
          <div className='absolute right-2 bottom-2 opacity-10'>
            <Image
              src='/figma/vision_svgrepo.com.png'
              alt='vision'
              width={160}
              height={160}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
