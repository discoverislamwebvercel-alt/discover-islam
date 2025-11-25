'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useState } from 'react';

export default function AboutUsCards() {
  const [cardStates, setCardStates] = useState<{
    card1: { isVisible: boolean | 'reappear' };
    card2: { isVisible: boolean | 'reappear' };
    card3: { isVisible: boolean };
  }>({
    card1: { isVisible: true },
    card2: { isVisible: true },
    card3: { isVisible: true },
  });

  // Animation variants
  const clickVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.95,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    reappear: {
      opacity: [0, 1],
      y: [-50, 0],
      scale: [0.95, 1],
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Handle card clicks
  const handleCardClick = (cardIndex: number) => {
    if (cardIndex === 0) {
      // Hide first card
      setCardStates(prev => ({ ...prev, card1: { isVisible: false } }));
    } else if (cardIndex === 1) {
      // Hide second card
      setCardStates(prev => ({ ...prev, card2: { isVisible: false } }));
    } else if (cardIndex === 2) {
      // Bring back both cards with reappear animation
      setCardStates({
        card1: { isVisible: 'reappear' },
        card2: { isVisible: 'reappear' },
        card3: { isVisible: true },
      });

      // After the animation finishes, reset them to normal visible state
      setTimeout(() => {
        setCardStates({
          card1: { isVisible: true },
          card2: { isVisible: true },
          card3: { isVisible: true },
        });
      }, 1200);
    }
  };

  const cards = [
    {
      title: 'Exhibitions & Events',
      description: 'Interactive displays and cultural showcases.',
      image: '/about_us_exhibitions/01.jpg',
      bgColor: 'bg-[#4C735D]',
      borderRadius: 'rounded-[30px]',
      padding: 'p-[15px_14px]',
      gap: 'gap-[10px]',
      innerGap: 'gap-[53px]',
      textGap: 'gap-[42px]',
      titleSize: 'text-[40px]',
      titleLineHeight: 'leading-[48px]',
      descSize: 'text-[40px]',
      descLineHeight: 'leading-[48px]',
      imageWidth: 'w-[715px]',
      imageHeight: 'h-[455px]',
      imageRadius: 'rounded-[20px]',
    },
    {
      title: 'Workshops & Seminars',
      description: 'For schools, workplaces, and communities.',
      image: '/about_us_exhibitions/02.jpg',
      bgColor: 'bg-[#111111]',
      borderRadius: 'rounded-[28.8916px]',
      padding: 'p-[14.4458px_13.4827px]',
      gap: 'gap-[9.63px]',
      innerGap: 'gap-[51.04px]',
      textGap: 'gap-[40.45px]',
      titleSize: 'text-[38.5221px]',
      titleLineHeight: 'leading-[46px]',
      descSize: 'text-[38.5221px]',
      descLineHeight: 'leading-[46px]',
      imageWidth: 'w-[688.58px]',
      imageHeight: 'h-[438.19px]',
      imageRadius: 'rounded-[19.261px]',
    },
    {
      title: 'Community Engagement',
      description: 'Building bridges through open dialogue.',
      image: '/about_us_exhibitions/03.jpg',
      bgColor: 'bg-gradient-to-r from-[#ECBC1C] to-[#B26D28]',
      borderRadius: 'rounded-[27.494px]',
      padding: 'p-[13.747px_12.8305px]',
      gap: 'gap-[9.16px]',
      innerGap: 'gap-[48.57px]',
      textGap: 'gap-[38.49px]',
      titleSize: 'text-[36.6586px]',
      titleLineHeight: 'leading-[44px]',
      descSize: 'text-[36.6586px]',
      descLineHeight: 'leading-[44px]',
      imageWidth: 'w-[655.27px]',
      imageHeight: 'h-[416.99px]',
      imageRadius: 'rounded-[18.3293px]',
    },
  ];

  return (
    <section
      id='about'
      className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Mobile Layout - Stacked Cards with Layering Effect */}
        <div className='block lg:hidden'>
          <div className='flex justify-center mb-8 sm:mb-12'>
            <div className='relative w-full max-w-sm sm:max-w-md md:max-w-lg h-[500px] sm:h-[600px] md:h-[700px]'>
              <AnimatePresence>
                {/* Card 1 - Mobile Stacked */}
                {cardStates.card1.isVisible && (
                  <motion.div
                    key='card1-mobile'
                    className={`absolute w-full h-[200px] sm:h-[240px] md:h-[280px] ${cards[0].bgColor} rounded-3xl p-4 sm:p-6 cursor-pointer`}
                    style={{ left: '0px', top: '20px', zIndex: 3 }}
                    variants={clickVariants}
                    initial={
                      cardStates.card1.isVisible === 'reappear'
                        ? 'hidden'
                        : 'visible'
                    }
                    animate={
                      cardStates.card1.isVisible === 'reappear'
                        ? 'reappear'
                        : 'visible'
                    }
                    exit='hidden'
                    onClick={() => handleCardClick(0)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 h-full'>
                      <div className='flex flex-col gap-2 sm:gap-3 flex-1'>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold leading-tight text-white'>
                          {cards[0].title}
                        </h3>
                        <p className='text-sm sm:text-base md:text-lg font-medium leading-relaxed text-white/80'>
                          {cards[0].description}
                        </p>
                      </div>
                      <div className='w-full sm:w-24 md:w-28 h-16 sm:h-20 md:h-24 rounded-xl overflow-hidden flex-shrink-0'>
                        <img
                          src={cards[0].image}
                          alt={cards[0].title}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Card 2 - Mobile Stacked */}
                {cardStates.card2.isVisible && (
                  <motion.div
                    key='card2-mobile'
                    className={`absolute w-[95%] sm:w-[96%] md:w-[97%] h-[200px] sm:h-[240px] md:h-[280px] ${cards[1].bgColor} rounded-3xl p-4 sm:p-6 cursor-pointer`}
                    style={{ left: '8px', top: '30px', zIndex: 2 }}
                    variants={clickVariants}
                    initial={
                      cardStates.card2.isVisible === 'reappear'
                        ? 'hidden'
                        : 'visible'
                    }
                    animate={
                      cardStates.card2.isVisible === 'reappear'
                        ? 'reappear'
                        : 'visible'
                    }
                    exit='hidden'
                    onClick={() => handleCardClick(1)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 h-full'>
                      <div className='flex flex-col gap-2 sm:gap-3 flex-1'>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold leading-tight text-white'>
                          {cards[1].title}
                        </h3>
                        <p className='text-sm sm:text-base md:text-lg font-medium leading-relaxed text-white/80'>
                          {cards[1].description}
                        </p>
                      </div>
                      <div className='w-full sm:w-24 md:w-28 h-16 sm:h-20 md:h-24 rounded-xl overflow-hidden flex-shrink-0'>
                        <img
                          src={cards[1].image}
                          alt={cards[1].title}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Card 3 - Mobile Stacked */}
                {cardStates.card3.isVisible && (
                  <motion.div
                    key='card3-mobile'
                    className={`absolute w-[90%] sm:w-[92%] md:w-[94%] h-[200px] sm:h-[240px] md:h-[280px] ${cards[2].bgColor} rounded-3xl p-4 sm:p-6 cursor-pointer`}
                    style={{ left: '16px', top: '40px', zIndex: 1 }}
                    variants={clickVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    onClick={() => handleCardClick(2)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 h-full'>
                      <div className='flex flex-col gap-2 sm:gap-3 flex-1'>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold leading-tight text-white'>
                          {cards[2].title}
                        </h3>
                        <p className='text-sm sm:text-base md:text-lg font-medium leading-relaxed text-white/80'>
                          {cards[2].description}
                        </p>
                      </div>
                      <div className='w-full sm:w-24 md:w-28 h-16 sm:h-20 md:h-24 rounded-xl overflow-hidden flex-shrink-0'>
                        <img
                          src={cards[2].image}
                          alt={cards[2].title}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Layered Cards */}
        <div className='hidden lg:flex justify-center mb-12 sm:mb-16 md:mb-20 lg:mb-[100px]'>
          <div className='relative w-full max-w-[1245px] h-[600px]'>
            <AnimatePresence>
              {/* Card 1 - Desktop */}
              {cardStates.card1.isVisible && (
                <motion.div
                  key='card1-desktop'
                  className={`absolute w-full max-w-[1245px] h-[485px] ${cards[0].bgColor} ${cards[0].borderRadius} ${cards[0].padding} ${cards[0].gap} flex flex-col items-end cursor-pointer`}
                  style={{ left: '0px', top: '15px', zIndex: 3 }}
                  variants={clickVariants}
                  initial={
                    cardStates.card1.isVisible === 'reappear'
                      ? 'hidden'
                      : 'visible'
                  }
                  animate={
                    cardStates.card1.isVisible === 'reappear'
                      ? 'reappear'
                      : 'visible'
                  }
                  exit='hidden'
                  onClick={() => handleCardClick(0)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`flex flex-row items-center ${cards[0].innerGap} w-[1162px] h-[455px]`}
                  >
                    <div
                      className={`flex flex-col items-start ${cards[0].textGap} w-[394px] h-[282px]`}
                    >
                      <h3
                        className={`w-[254px] h-[96px] font-bold ${cards[0].titleSize} ${cards[0].titleLineHeight} text-white`}
                      >
                        {cards[0].title}
                      </h3>
                      <p
                        className={`w-[394px] h-[144px] font-medium ${cards[0].descSize} ${cards[0].descLineHeight} text-white/80`}
                      >
                        {cards[0].description}
                      </p>
                    </div>
                    <div
                      className={`${cards[0].imageWidth} ${cards[0].imageHeight} ${cards[0].imageRadius} overflow-hidden`}
                    >
                      <img
                        src={cards[0].image}
                        alt={cards[0].title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Card 2 - Desktop */}
              {cardStates.card2.isVisible && (
                <motion.div
                  key='card2-desktop'
                  className={`absolute w-full max-w-[1199px] h-[467.08px] ${cards[1].bgColor} ${cards[1].borderRadius} ${cards[1].padding} ${cards[1].gap} flex flex-col items-end cursor-pointer`}
                  style={{ left: '23px', top: '47px', zIndex: 2 }}
                  variants={clickVariants}
                  initial={
                    cardStates.card2.isVisible === 'reappear'
                      ? 'hidden'
                      : 'visible'
                  }
                  animate={
                    cardStates.card2.isVisible === 'reappear'
                      ? 'reappear'
                      : 'visible'
                  }
                  exit='hidden'
                  onClick={() => handleCardClick(1)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`flex flex-row items-center ${cards[1].innerGap} w-[1119.07px] h-[438.19px]`}
                  >
                    <div
                      className={`flex flex-col items-start ${cards[1].textGap} w-[379.44px] h-[270.45px]`}
                    >
                      <h3
                        className={`w-[379.44px] h-[92px] font-bold ${cards[1].titleSize} ${cards[1].titleLineHeight} text-white`}
                      >
                        {cards[1].title}
                      </h3>
                      <p
                        className={`w-[379.44px] h-[138px] font-medium ${cards[1].descSize} ${cards[1].descLineHeight} text-white/80`}
                      >
                        {cards[1].description}
                      </p>
                    </div>
                    <div
                      className={`${cards[1].imageWidth} ${cards[1].imageHeight} ${cards[1].imageRadius} overflow-hidden`}
                    >
                      <img
                        src={cards[1].image}
                        alt={cards[1].title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Card 3 - Desktop */}
              {cardStates.card3.isVisible && (
                <motion.div
                  key='card3-desktop'
                  className={`absolute w-full max-w-[1141px] h-[444.49px] ${cards[2].bgColor} ${cards[2].borderRadius} ${cards[2].padding} ${cards[2].gap} flex flex-col items-end cursor-pointer`}
                  style={{ left: '52px', top: '83px', zIndex: 1 }}
                  variants={clickVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  onClick={() => handleCardClick(2)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`flex flex-row items-center ${cards[2].innerGap} w-[1064.93px] h-[416.99px]`}
                  >
                    <div
                      className={`flex flex-col items-start ${cards[2].textGap} w-[361.09px] h-[258.49px]`}
                    >
                      <h3
                        className={`w-[361.09px] h-[88px] font-bold ${cards[2].titleSize} ${cards[2].titleLineHeight} text-white`}
                      >
                        {cards[2].title}
                      </h3>
                      <p
                        className={`w-[361.09px] h-[132px] font-medium ${cards[2].descSize} ${cards[2].descLineHeight} text-white/80`}
                      >
                        {cards[2].description}
                      </p>
                    </div>
                    <div
                      className={`${cards[2].imageWidth} ${cards[2].imageHeight} ${cards[2].imageRadius} overflow-hidden`}
                    >
                      <img
                        src={cards[2].image}
                        alt={cards[2].title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
