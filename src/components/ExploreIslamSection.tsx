'use client';

import { motion, type Variants } from 'framer-motion';

export default function ExploreIslamSection() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className='py-12 sm:py-16 lg:py-20 bg-amber-50 relative'>
      {/* Islamic Lanterns */}
      <div className='absolute top-0 left-4 sm:left-8 lg:left-[130px] opacity-60 hidden sm:block'>
        <img
          src='/islamic-lantern 2.png'
          alt='Islamic Lantern'
          className='w-16 h-24 sm:w-20 sm:h-32 drop-shadow-lg'
          style={{ filter: 'contrast(1.2) brightness(0.9)' }}
        />
      </div>

      <div className='absolute top-0 right-4 sm:right-8 lg:right-[130px] opacity-60 hidden sm:block'>
        <img
          src='/islamic-lantern 1.png'
          alt='Islamic Lantern'
          className='w-16 h-24 sm:w-20 sm:h-32 drop-shadow-lg'
          style={{ filter: 'contrast(1.2) brightness(0.9)' }}
        />
      </div>

      <div className='max-w-6xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8'>
        {/* Section Title */}
        <motion.div
          className='text-center mb-12'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight'>
            Explore <span className='text-[#4c735d]'>Islam</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className='text-center text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Step into the spiritual essence of Islam through sound, sight, and
          sacred space. This section invites you to not just learn about Islam —
          but to feel it.
        </motion.p>

        {/* Main Image */}
        <motion.div
          className='flex justify-center mb-8'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <img
            src='/Rectangle 8.png'
            alt='Call to Prayer'
            className=' max-w-4xl w-full h-auto'
          />
        </motion.div>

        {/* Adhan Section */}
        <motion.div
          className='max-w-xl text-left ml-0 sm:ml-8 lg:ml-32'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
            Listen to the Call to Prayer{' '}
            <span className='relative inline-block'>
              (Adhan)
              <img
                src='/Ellipse 11.png'
                alt='Underline'
                className='absolute left-0 right-0 bottom-[-4px] w-full h-auto'
              />
            </span>
          </h3>

          <p className='text-lg text-gray-700 leading-relaxed'>
            The Adhān is more than a call — it&apos;s a living rhythm of faith
            that encircles the globe. As it ends in one city, it begins in the
            next, creating a continuous wave of remembrance that never leaves
            the earth silent. Hear its beauty and experience the unity it
            represents.
          </p>
        </motion.div>

        {/* Two Column Section */}
        <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 mt-12 sm:mt-16'>
          {/* Left Column - Quran Recitation */}
          <motion.div
            className='flex-1'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <img
              src='/Rectangle 11.png'
              alt='Quran Recitation'
              className='w-full h-auto mb-6'
            />
            <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
              Enjoy the Recitation of the{' '}
              <span className='relative inline-block'>
                Qur&apos;an
                <img
                  src='/Ellipse 11 (1).png'
                  alt='Quran underline'
                  className='absolute left-0 right-0 bottom-[-4px] w-full h-auto'
                />
              </span>
            </h3>
            <p className='text-base sm:text-lg text-gray-700 leading-relaxed'>
              Immerse yourself in the timeless words of Allah, recited with
              beauty, clarity, and deep emotion. Every verse offers a message of
              guidance, peace, and reflection.
            </p>
          </motion.div>

          {/* Right Column - Makkah 360 */}
          <motion.div
            className='flex-1'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <img
              src='/Rectangle 12.png'
              alt='Makkah 360'
              className='w-full h-auto mb-6 mt-[200px]'
            />
            <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 relative inline-block'>
              Explore Makkah in 360°
              <img
                src='/Ellipse 11.png'
                alt='Makkah underline'
                className='absolute left-0 right-0 bottom-[-4px] w-full h-auto'
              />
            </h3>
            <p className='text-base sm:text-lg text-gray-700 leading-relaxed'>
              Take a virtual journey to the holiest site in Islam. Stand before
              the Ka&apos;bah, walk through Masjid al-Haram, and witness the
              spiritual harmony of millions — from wherever you are.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
