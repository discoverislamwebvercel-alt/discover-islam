'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MoonData {
  id: number;
  name: string;
  icon: string;
  title: string;
  description: string;
}

const moonData: MoonData[] = [
  {
    id: 0,
    name: 'Full Moon',
    icon: '/icons/full-moon.svg',
    title: 'Full Moon',
    description:
      'Our school visits provide a dynamic and accessible introduction to Islam for students of all ages. Designed to complement the Religious Education curriculum, each session is thoughtfully structured to engage pupils through storytelling, multimedia, and interactive learning.',
  },
  {
    id: 1,
    name: 'Half Full Moon',
    icon: '/icons/half-moon.svg',
    title: 'Half Full Moon',
    description:
      'Our school visits provide a dynamic and accessible introduction to Islam for students of all ages. Designed to complement the Religious Education curriculum, each session is thoughtfully structured to engage pupils through storytelling, multimedia, and interactive learning.',
  },
  {
    id: 2,
    name: 'Crescent',
    icon: '/icons/crescent-moon.svg',
    title: 'Crescent',
    description:
      'Our school visits provide a dynamic and accessible introduction to Islam for students of all ages. Designed to complement the Religious Education curriculum, each session is thoughtfully structured to engage pupils through storytelling, multimedia, and interactive learning.',
  },
];

const MoonSection = () => {
  const [currentMoon, setCurrentMoon] = useState(0);
  const [direction, setDirection] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');

  // Responsive screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const handleMoonClick = (index: number) => {
    setDirection(index > currentMoon ? 1 : -1);
    setCurrentMoon(index);
  };

  const getMoonPosition = (index: number) => {
    const diff = index - currentMoon;

    // Responsive positioning multipliers with reduced gaps for smaller screens
    const config = {
      mobile: {
        xMultiplier: 80,
        yMultiplier: 15,
        baseScale: 1.1,
        minScale: 0.6,
      },
      tablet: {
        xMultiplier: 140,
        yMultiplier: 25,
        baseScale: 1.2,
        minScale: 0.65,
      },
      desktop: {
        xMultiplier: 300,
        yMultiplier: 50,
        baseScale: 1.3,
        minScale: 0.7,
      },
    };

    const { xMultiplier, yMultiplier, baseScale, minScale } =
      config[screenSize as keyof typeof config];

    // Current moon (center) - responsive size
    if (diff === 0)
      return { x: 0, y: 0, scale: baseScale, opacity: 1, zIndex: 10 };

    // Moons to the left - responsive downward arc
    if (diff < 0) {
      const leftPosition = Math.abs(diff);
      return {
        x: -xMultiplier * leftPosition,
        y: yMultiplier * leftPosition * leftPosition,
        scale: Math.max(minScale, baseScale - 0.1 - (leftPosition - 1) * 0.2),
        opacity: Math.max(0.1, 0.3 - (leftPosition - 1) * 0.1),
        zIndex: 10 - leftPosition,
      };
    }

    // Moons to the right - responsive downward arc
    const rightPosition = diff;
    return {
      x: xMultiplier * rightPosition,
      y: yMultiplier * rightPosition * rightPosition,
      scale: Math.max(minScale, baseScale - 0.1 - (rightPosition - 1) * 0.2),
      opacity: Math.max(0.1, 0.3 - (rightPosition - 1) * 0.1),
      zIndex: 10 - rightPosition,
    };
  };

  // Shared animation configuration for synchronized timing
  const sharedTransition = {
    type: 'spring' as const,
    stiffness: 120,
    damping: 25,
    duration: 2.2,
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x:
        direction > 0
          ? screenSize === 'mobile'
            ? 200
            : 400
          : screenSize === 'mobile'
            ? -200
            : -400,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x:
        direction < 0
          ? screenSize === 'mobile'
            ? 200
            : 400
          : screenSize === 'mobile'
            ? -200
            : -400,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className='relative min-h-screen bg-[#F2F2F0] flex flex-col items-center justify-center py-8 sm:py-12 lg:py-20 px-4 overflow-hidden'>
      {/* Moon Navigation */}
      <div className='relative flex items-center justify-center mb-8 sm:mb-12 lg:mb-16 w-full max-w-7xl'>
        <div className='relative w-full h-[120px] sm:h-[160px] lg:h-[200px] flex items-center justify-center'>
          {moonData.map((moon, index) => {
            const position = getMoonPosition(index);
            return (
              <motion.div
                key={moon.id}
                className='absolute cursor-pointer'
                onClick={() => handleMoonClick(index)}
                whileHover={{
                  scale:
                    currentMoon === index
                      ? position.scale * 1.05
                      : position.scale * 1.1,
                }}
                whileTap={{
                  scale: position.scale * 0.95,
                  transition: { duration: 0.1 },
                }}
                animate={{
                  x: position.x,
                  y: position.y,
                  scale: position.scale,
                  opacity: position.opacity,
                  zIndex: position.zIndex,
                }}
                transition={sharedTransition}
                style={{
                  zIndex: position.zIndex,
                }}
              >
                <div className='relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[200px] xl:h-[200px]'>
                  <Image
                    src={moon.icon}
                    alt={moon.name}
                    fill
                    className='object-contain'
                    priority
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <div className='w-full max-w-xs sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center relative px-4'>
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentMoon}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={sharedTransition}
            className='space-y-4 sm:space-y-6 lg:space-y-8'
          >
            {/* Title */}
            <motion.h2
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black'
              style={{
                fontFamily:
                  'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 700,
              }}
            >
              {moonData[currentMoon].title}
            </motion.h2>

            {/* Description Container */}
            <motion.div className='relative mx-auto w-full'>
              <motion.p
                className='text-black leading-tight'
                style={{
                  fontFamily:
                    'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(16px, 4vw, 30px)',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  textAlign: 'center',
                }}
              >
                {moonData[currentMoon].description}
              </motion.p>

              {/* Duplicate paragraph as shown in design */}
              <motion.p
                className='text-black leading-tight mt-4 sm:mt-6 lg:mt-8'
                style={{
                  fontFamily:
                    'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(16px, 4vw, 30px)',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  textAlign: 'center',
                }}
              >
                {moonData[currentMoon].description}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MoonSection;
