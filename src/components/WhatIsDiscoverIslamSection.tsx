'use client';

import { motion, type Variants } from 'framer-motion';

export default function WhatIsDiscoverIslamSection() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id='about'
      className='relative px-4 sm:px-6 lg:px-8 py-12 bg-white'
    >
      <div className='mx-auto w-full max-w-[1438px]'>
        {/* Title */}
        <motion.div
          className='text-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h2 className='font-extrabold text-[#111111] leading-[107%] text-[44px] sm:text-[56px] md:text-[72px] lg:text-[80px]'>
            What is DiscoverIslam?
          </h2>
          <div className='mt-1 flex justify-center'>
            <img
              src='/Ellipse 11.png'
              alt='underline'
              className='w-[240px] sm:w-[300px] md:w-[340px] lg:w-[386.81px] h-[21.41px] -rotate-[2deg]'
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className='mx-auto mt-8 text-center max-w-[1063px]'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.4 }}
          variants={textVariants}
        >
          <p className='text-[22px] md:text-[26px] lg:text-[30px] leading-[28px] md:leading-[34px] lg:leading-[36px] text-[rgba(17,17,17,0.8)]'>
            DiscoverIslam is a dedicated initiative that shares the beauty,
            values, and teachings of Islam in a clear and authentic way. We work
            to bridge understanding, remove misconceptions, and open dialogue
            between communities.
          </p>
          <p className='mt-6 text-[22px] md:text-[26px] lg:text-[30px] leading-[28px] md:leading-[34px] lg:leading-[36px] text-[rgba(17,17,17,0.8)]'>
            Over the years, we’ve grown into a trusted platform offering
            exhibitions, educational resources, events, and community programs,
            reaching thousands locally and globally.
          </p>
          <p className='mt-6 text-[22px] md:text-[26px] lg:text-[30px] leading-[28px] md:leading-[34px] lg:leading-[36px] text-[rgba(17,17,17,0.8)]'>
            Educational Resources: Clear, accessible materials for all
            audiences.
          </p>
        </motion.div>

        {/* Cards row */}
        <div className='relative mx-auto mt-12 w-full max-w-[1276px]'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {/* Exhibitions & Events */}
            <motion.div
              className='relative w-full h-[315px] bg-[#408360]/15 rounded-[30px] px-[46px] pt-[62px]'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className='font-bold text-[40px] leading-[48px] text-[#4C735D]'>
                Exhibitions & Events
              </h3>
              <p className='mt-[30px] max-w-[304px] text-[30px] leading-[36px] text-[rgba(0,0,0,0.8)]'>
                Interactive displays and cultural showcases.
              </p>
            </motion.div>

            {/* Workshops & Seminars */}
            <motion.div
              className='relative w-full h-[315px] bg-[#111111]/15 rounded-[30px] px-[46px] pt-[62px]'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className='font-bold text-[40px] leading-[48px] text-[#111111]'>
                Workshops & Seminars
              </h3>
              <p className='mt-[30px] max-w-[318px] text-[30px] leading-[36px] text-[rgba(0,0,0,0.8)]'>
                For schools, workplaces, and communities.
              </p>
            </motion.div>

            {/* Community Engagement */}
            <motion.div
              className='relative w-full h-[315px] bg-[#CB892A]/15 rounded-[30px] px-[46px] pt-[62px]'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className='font-bold text-[40px] leading-[48px] text-[#CB892A]'>
                Community Engagement
              </h3>
              <p className='mt-[30px] max-w-[317px] text-[30px] leading-[36px] text-[rgba(0,0,0,0.8)]'>
                Building bridges through open dialogue.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient strip */}
        <div className='relative mt-10'>
          <div className='mx-auto h-[379px] max-w-[1438px] bg-[linear-gradient(186.54deg,rgba(242,242,240,0)_5.14%,#C9C9C9_247.82%)] rounded-b-[0px]' />
        </div>
      </div>
    </section>
  );
}
