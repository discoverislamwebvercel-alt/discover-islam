'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import dynamic from 'next/dynamic';

export default function ExploreIslamSection() {
  const textVariants: Variants = {
    hidden: { opacity: 0.15, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0.15, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className='py-12 sm:py-16 lg:py-20 bg-[#F2F2F0] relative'>
      {/* Islamic Lanterns */}
      <div className='absolute top-0 left-8 sm:left-8 lg:left-[400px] opacity-60 hidden sm:block'>
        <Image
          width={185}
          height={185}
          src='/islamic-lantern 2.png'
          alt='Islamic Lantern'
          className='drop-shadow-lg'
          style={{ filter: 'contrast(1.2) brightness(0.9)' }}
        />
      </div>

      <div className='absolute top-0 right-4 sm:right-8 lg:right-[400px] opacity-60 hidden sm:block'>
        <Image
          width={178}
          height={800}
          src='/islamic-lantern 1.png'
          alt='Islamic Lantern'
          className='drop-shadow-lg'
          style={{ filter: 'contrast(1.2) brightness(0.9)' }}
        />
      </div>

      <div className='mx-auto mt-12 relative z-10 px-4 sm:px-6 lg:px-8 max-w-[1242px]'>
        {/* Section Title */}
        <motion.div
          className='text-center mb-12 max-w-[728px] mx-auto pt-16 sm:pt-20 lg:pt-24'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h2 className='font-extrabold text-[#111111] leading-[94%] tracking-[-0.03em] text-[40px] sm:text-[56px] md:text-[64px] lg:text-[80px]'>
            Explore <span className='text-[#4C735D]'>Islam</span>
            <img
              src='/figma/underline_green.png'
              alt='underline'
              className='absolute left-1/2 -translate-x-1/2  w-[386.81px] h-[21.41px] pointer-events-none select-none mt-3'
            />
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className='text-center mx-auto mb-22 max-w-[684px] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] leading-[26px] sm:leading-[32px] md:leading-[34px] lg:leading-[36px] text-[rgba(17,17,17,0.8)] font-[500]'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Step into the spiritual essence of Islam through sound, sight, and
          sacred space. This section invites you to not just learn about Islam —
          but to feel it.
        </motion.p>

        {/* Main Video */}
        <motion.div
          className='flex justify-center mb-8 flex-col gap-5'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <h3 className='font-bold text-[#111111] tracking-[-0.03em] text-[28px] sm:text-[34px] md:text-[40px] leading-[36px] sm:leading-[44px] md:leading-[48px] mb-4'>
            Listen to the Call to Prayer{' '}
            <span className='relative inline-block pb-1'>
              (Adhan)
              <img
                src='/Ellipse 11.png'
                alt='Underline'
                className='absolute left-0 right-0 bottom-[-14px] w-[174.19px] h-[21.41px] rotate-[2deg]'
              />
            </span>
          </h3>
          <DynamicVideoPlayer
            src='/videos/adhan_video.mp4'
            className='w-full h-[420px] sm:h-[500px] md:h-[580px] lg:h-[640px] object-cover rounded-[50px]'
            roundedClassName='rounded-[50px] overflow-hidden'
            poster='/Rectangle 8.png'
          />
        </motion.div>

        {/* Adhan Section */}
        <motion.div
          className='max-w-[878px] text-left ml-0 sm:ml-4 lg:ml-8'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <p className='text-[18px] sm:text-[22px] md:text-[26px] leading-[26px] sm:leading-[30px] md:leading-[31px] text-[rgba(17,17,17,0.6)] font-[500'>
            The Adhān is more than a call — it&apos;s a living rhythm of faith
            that encircles the globe. As it ends in one city, it begins in the
            next, creating a continuous wave of remembrance that never leaves
            the earth silent. Hear its beauty and experience the unity it
            represents.
          </p>
        </motion.div>

        {/* Two Column Section */}
        <motion.div
          className='flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-20 mt-14 sm:mt-20'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {/* Left Column - Quran Recitation */}
          <motion.div className='flex-1' variants={textVariants}>
            <h3 className='font-bold text-[#111111] tracking-[-0.03em] text-[28px] sm:text-[34px] md:text-[40px] leading-[36px] sm:leading-[44px] md:leading-[48px] mb-4'>
              Enjoy the Recitation of the{' '}
              <span className='relative inline-block pb-2'>
                Qur&apos;an
                <img
                  src='/Ellipse 11 (1).png'
                  alt='Quran underline'
                  className='absolute left-0 right-0 bottom-[-14px] w-[174.19px] h-[21.41px] rotate-[3deg]'
                />
              </span>
            </h3>
            <img
              src='/Rectangle 11.png'
              alt='Quran Recitation'
              className='w-full h-auto mb-6 rounded-[50px]'
            />
            <p className='text-[18px] sm:text-[22px] md:text-[26px] leading-[26px] sm:leading-[30px] md:leading-[31px] text-[rgba(17,17,17,0.6)] font-[500]'>
              Immerse yourself in the timeless words of Allah, recited with
              beauty, clarity, and deep emotion. Every verse offers a message of
              guidance, peace, and reflection.
            </p>
          </motion.div>

          {/* Right Column - Makkah 360 */}
          <motion.div className='flex-1 mt-14' variants={textVariants}>
            <h3 className='font-bold text-[#111111] tracking-[-0.03em] text-[28px] sm:text-[34px] md:text-[40px] leading-[36px] sm:leading-[44px] md:leading-[48px] mb-4 relative inline-block pb-2'>
              Explore Makkah in 360°
              <img
                src='/Ellipse 11.png'
                alt='Makkah underline'
                className='absolute left-0 bottom-[-14px] w-[260.75px] h-[21.41px] rotate-[2deg]'
              />
            </h3>
            <img
              src='/Rectangle 12.png'
              alt='Makkah 360'
              className='w-full h-auto mb-6 rounded-[50px] lg:mt-[60px]'
            />
            <p className='text-[18px] sm:text-[22px] md:text-[26px] leading-[26px] sm:leading-[30px] md:leading-[31px] text-[rgba(17,17,17,0.6)] font-[500]'>
              Take a virtual journey to the holiest site in Islam. Stand before
              the Ka&apos;bah, walk through Masjid al-Haram, and witness the
              spiritual harmony of millions — from wherever you are.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const DynamicVideoPlayer = dynamic(() => import('./common/VideoPlayer'), {
  ssr: false,
});
