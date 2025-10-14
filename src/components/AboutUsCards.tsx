'use client';

import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const AboutUsCards = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const stackedCardVariants: Variants = {
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -100,
      transition: { duration: 0.5, ease: 'easeIn' },
    },
  };

  const cards = [
    {
      title: 'Exhibitions & Events',
      description: 'Interactive displays and cultural showcases.',
      image: '/figma/exhibitions-events-bg.png',
      bgColor: 'bg-[#4C735D]',
    },
    {
      title: 'Workshops & Seminars',
      description: 'Educational sessions and skill-building programs.',
      image: '/figma/exhibitions-events-bg.png',
      bgColor: 'bg-[#1a1a1a]',
    },
    {
      title: 'Community Engagement',
      description: 'Building bridges through meaningful connections.',
      image: '/figma/exhibitions-events-bg.png',
      bgColor: 'bg-[linear-gradient(135deg,#ECBC1C_0%,#B26D28_100%)]',
    },
  ];

  const handleCardClick = () => {
    setCurrentCardIndex(prev => (prev + 1) % cards.length);
  };

  return (
    <section
      id='about'
      className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Stacked Interactive Cards */}
        <div className='flex justify-center mb-12 sm:mb-16 md:mb-20 lg:mb-[100px]'>
          <div className='relative w-full max-w-7xl px-2 sm:px-4 lg:px-8'>
            <div className='relative mx-auto w-full max-w-[320px] h-[400px] sm:max-w-[500px] sm:h-[350px] md:max-w-[700px] md:h-[400px] lg:max-w-[900px] lg:h-[420px] xl:max-w-[1200px] xl:h-[450px]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentCardIndex}
                  className={`absolute inset-0 rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] shadow-xl sm:shadow-2xl cursor-pointer overflow-hidden ${cards[currentCardIndex].bgColor}`}
                  variants={stackedCardVariants}
                  initial='enter'
                  animate='enter'
                  exit='exit'
                  onClick={handleCardClick}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className='flex flex-col sm:flex-row items-center h-full p-4 sm:py-8 sm:pl-8 sm:pr-2 md:py-10 md:pl-10 md:pr-4 lg:py-12 lg:pl-12 lg:pr-6 xl:py-[60px] xl:pl-[60px] xl:pr-[10px]'>
                    {/* Text content */}
                    <div className='flex flex-col justify-center w-full sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] h-auto sm:h-full gap-4 sm:gap-6 md:gap-8 xl:gap-[32px] text-center sm:text-left'>
                      <div className='space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10'>
                        <h3 className='text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl leading-[1.1]'>
                          {cards[currentCardIndex].title}
                        </h3>
                        <p className='text-white/90 font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[40px] leading-[1.3] tracking-normal'>
                          {cards[currentCardIndex].description}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    <div className='flex justify-center sm:justify-end items-center flex-1 w-full sm:ml-4 md:ml-6 lg:ml-8 xl:ml-[40px] mt-4 sm:mt-0'>
                      <div className='overflow-hidden w-full max-w-[280px] h-[180px] sm:max-w-[200px] sm:h-[200px] md:max-w-[300px] md:h-[250px] lg:max-w-[450px] lg:h-[300px] xl:max-w-[700px] xl:h-[420px] rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] opacity-100'>
                        <img
                          src={cards[currentCardIndex].image}
                          alt={cards[currentCardIndex].title}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsCards;
