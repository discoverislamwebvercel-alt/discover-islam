'use client';

import { motion, type Variants } from 'framer-motion';
import { School } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: -90 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 520,
        damping: 32,
        mass: 0.9,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
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
      className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white'
    >
      <motion.div
        className='text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        variants={titleVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className='font-extrabold text-[#111111] leading-[107%] text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] xl:text-[80px]'>
          Explore our Services
        </h2>
        <div className='mx-auto mt-2 flex justify-center'>
          <img
            src='/Ellipse 11.png'
            alt='underline'
            className='w-[180px] sm:w-[240px] md:w-[300px] lg:w-[340px] xl:w-[386.81px] h-[16px] sm:h-[18px] md:h-[20px] lg:h-[21.41px]'
          />
        </div>
      </motion.div>

      <motion.div
        className='mx-auto max-w-[1273px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-10 md:gap-12 lg:gap-0 place-items-center'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Exhibition Card */}
        <Link
          href='/exhibition'
          className='w-full max-w-[412px] cursor-pointer'
        >
          <motion.div
            className='group relative w-full max-w-[412px] h-[280px] sm:h-[350px] lg:h-[413px] bg-[#408360]/15 rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] px-4 sm:px-5 lg:px-6 pt-16 sm:pt-20 lg:pt-24 shadow-sm cursor-pointer'
            variants={cardVariants}
          >
            <div className='absolute -top-4 sm:-top-5 lg:-top-6 left-1/2 -translate-x-1/2 w-[240px] sm:w-[290px] lg:w-[348px] h-[70px] sm:h-[82px] lg:h-[94.75px] bg-[#408360] rounded-[12px] sm:rounded-[15px] lg:rounded-[17.7px] flex items-center justify-center px-6 sm:px-7 lg:px-8 transition-transform duration-300 group-hover:-rotate-2'>
              <div className='text-white font-extrabold text-[28px] sm:text-[36px] md:text-[40px] lg:text-[52px] xl:text-[60px] leading-[107%]'>
                Exhibition
              </div>
            </div>
            <div className='w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[93px] lg:h-[93px] mb-4 sm:mb-5 lg:mb-6 mt-4 sm:mt-5 lg:mt-6 transition-transform duration-300 group-hover:scale-105'>
              <img
                src='/Exibition.png'
                alt='Exhibition Icon'
                className='w-full h-full object-contain'
              />
            </div>
            <p className='text-[#111111] font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[93%] transition-transform duration-300 group-hover:scale-[1.03]'>
              Host an
              <br />
              Exhibition
            </p>
          </motion.div>
        </Link>

        {/* Schools Card */}
        <Link href='/schools' className='w-full max-w-[412px] cursor-pointer'>
          <motion.div
            className='group relative w-full max-w-[412px] h-[280px] sm:h-[350px] lg:h-[413px] bg-[#111111]/15 rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] px-4 sm:px-5 lg:px-6 pt-16 sm:pt-20 lg:pt-24 shadow-sm cursor-pointer'
            variants={cardVariants}
          >
            <div className='absolute -top-4 sm:-top-5 lg:-top-6 left-1/2 -translate-x-1/2 w-[200px] sm:w-[240px] lg:w-[288px] h-[70px] sm:h-[82px] lg:h-[94.75px] bg-[#111111] rounded-[12px] sm:rounded-[15px] lg:rounded-[17.7px] flex items-center justify-center px-5 sm:px-6 lg:px-7 transition-transform duration-300 group-hover:-rotate-2'>
              <div className='text-white font-extrabold text-[28px] sm:text-[36px] md:text-[40px] lg:text-[52px] xl:text-[60px] leading-[107%]'>
                Schools
              </div>
            </div>
            <div className='w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] lg:w-[99px] lg:h-[99px] mb-4 sm:mb-5 lg:mb-6 mt-4 sm:mt-5 lg:mt-6 transition-transform duration-300 group-hover:scale-105'>
              {/* <img
                src='/mosque.png'
                alt='Mosque Icon'
                className='w-full h-full object-contain'
              /> */}
              <School className='w-full h-full object-contain' />
            </div>
            <p className='text-[#111111] font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[93%] transition-transform duration-300 group-hover:scale-[1.03]'>
              Book a School or
              <br />
              Mosque Visit
            </p>
          </motion.div>
        </Link>

        {/* Literature Card */}
        <Link
          href='/literature'
          className='w-full max-w-[412px] cursor-pointer'
        >
          <motion.div
            className='group relative w-full max-w-[412px] h-[280px] sm:h-[350px] lg:h-[413px] bg-[#CB892A]/15 rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] px-4 sm:px-5 lg:px-6 pt-16 sm:pt-20 lg:pt-24 shadow-sm cursor-pointer'
            variants={cardVariants}
          >
            <div className='absolute -top-4 sm:-top-5 lg:-top-6 left-1/2 -translate-x-1/2 w-[230px] sm:w-[280px] lg:w-[338px] h-[70px] sm:h-[82px] lg:h-[94.75px] bg-[#CB892A] rounded-[12px] sm:rounded-[15px] lg:rounded-[17.7px] flex items-center justify-center px-5 sm:px-6 lg:px-7 transition-transform duration-300 group-hover:-rotate-2'>
              <div className='text-white font-extrabold text-[28px] sm:text-[36px] md:text-[40px] lg:text-[52px] xl:text-[60px] leading-[107%]'>
                Literature
              </div>
            </div>
            <div className='w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] lg:w-[84px] lg:h-[84px] mb-4 sm:mb-5 lg:mb-6 mt-4 sm:mt-5 lg:mt-6 transition-transform duration-300 group-hover:scale-105'>
              <img
                src='/Litrature.png'
                alt='Literature Icon'
                className='w-full h-full object-contain'
              />
            </div>
            <p className='text-[#111111] font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[93%] transition-transform duration-300 group-hover:scale-[1.03]'>
              Request
              <br />
              Free Literature
            </p>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
