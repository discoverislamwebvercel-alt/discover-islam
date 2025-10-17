'use client';

import { motion, type Variants } from 'framer-motion';

export default function ServicesSection() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id='services'
      className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white'
    >
      <motion.div
        className='text-center mb-10 sm:mb-14 lg:mb-16'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        variants={titleVariants}
      >
        <h2 className='font-extrabold text-[#111111] leading-[107%] text-[40px] sm:text-[56px] md:text-[64px] lg:text-[80px]'>
          Explore our
          <br />
          Services
        </h2>
        <div className='mx-auto mt-2 flex justify-center'>
          <img
            src='/Ellipse 11.png'
            alt='underline'
            className='w-[240px] sm:w-[300px] md:w-[340px] lg:w-[386.81px] h-[21.41px] -rotate-[2deg]'
          />
        </div>
      </motion.div>

      <div className='mx-auto max-w-[1273px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 place-items-center'>
        {/* Exhibition Card */}
        <motion.div
          className='relative w-full max-w-[413px] h-[413px] bg-[#408360]/15 rounded-[30px] px-6 pt-24 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className='absolute -top-6 left-1/2 -translate-x-1/2 w-[348px] h-[94.75px] bg-[#408360] rounded-[17.7px] -rotate-2 flex items-center justify-center px-8'>
            <div className='text-white font-extrabold text-[40px] md:text-[52px] lg:text-[60px] leading-[107%]'>
              Exhibition
            </div>
          </div>
          <div className='w-[93px] h-[93px] mb-6 mt-6'>
            <img
              src='/Exibition.png'
              alt='Exhibition Icon'
              className='w-full h-full object-contain'
            />
          </div>
          <p className='text-[#111111] font-bold text-[28px] md:text-[32px] lg:text-[36px] leading-[93%]'>
            Host an
            <br />
            Exhibition
          </p>
        </motion.div>

        {/* Schools Card */}
        <motion.div
          className='relative w-full max-w-[413px] h-[413px] bg-[#111111]/15 rounded-[30px] px-6 pt-24 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className='absolute -top-6 left-1/2 -translate-x-1/2 w-[288px] h-[94.75px] bg-[#111111] rounded-[17.7px] -rotate-2 flex items-center justify-center px-7'>
            <div className='text-white font-extrabold text-[40px] md:text-[52px] lg:text-[60px] leading-[107%]'>
              Schools
            </div>
          </div>
          <div className='w-[99px] h-[99px] mb-6 mt-6'>
            <img
              src='/mosque.png'
              alt='Mosque Icon'
              className='w-full h-full object-contain'
            />
          </div>
          <p className='text-[#111111] font-bold text-[28px] md:text-[32px] lg:text-[36px] leading-[93%]'>
            Book a School or
            <br />
            Mosque Visit
          </p>
        </motion.div>

        {/* Literature Card */}
        <motion.div
          className='relative w-full max-w-[412px] h-[413px] bg-[#CB892A]/15 rounded-[30px] px-6 pt-24 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className='absolute -top-6 left-1/2 -translate-x-1/2 w-[338px] h-[94.75px] bg-[#CB892A] rounded-[17.7px] -rotate-2 flex items-center justify-center px-7'>
            <div className='text-white font-extrabold text-[40px] md:text-[52px] lg:text-[60px] leading-[107%]'>
              Literature
            </div>
          </div>
          <div className='w-[84px] h-[84px] mb-6 mt-6'>
            <img
              src='/Litrature.png'
              alt='Literature Icon'
              className='w-full h-full object-contain'
            />
          </div>
          <p className='text-[#111111] font-bold text-[28px] md:text-[32px] lg:text-[36px] leading-[93%]'>
            Request
            <br />
            Free Literature
          </p>
        </motion.div>
      </div>
    </section>
  );
}
