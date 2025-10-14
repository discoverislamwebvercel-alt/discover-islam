import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HostExhibition = () => {
  const [colorTransition, setColorTransition] = useState(false);
  const [scissorsAnimation, setScissorsAnimation] = useState(false);
  const [ribbonTransition, setRibbonTransition] = useState(false);
  const [ribbonCutting, setRibbonCutting] = useState(false);
  const [cutRibbonsFadeOut, setCutRibbonsFadeOut] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger color transition after a short delay
          setTimeout(() => {
            setColorTransition(true);
          }, 500);

          // Show original ribbon
          setTimeout(() => {
            setRibbonTransition(true);
          }, 800);

          // Trigger scissors animation
          setTimeout(() => {
            setScissorsAnimation(true);
          }, 1000);

          // Scissors pass through ribbon - transition to cut ribbons
          setTimeout(() => {
            setRibbonCutting(true);
          }, 1800);

          // Fade out cut ribbons after scissors animation completes
          setTimeout(() => {
            setCutRibbonsFadeOut(true);
          }, 3200);

          // Trigger heading and CTA movement after all animations complete
          setTimeout(() => {
            setAnimationsComplete(true);
          }, 4500);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full min-h-screen max-h-screen overflow-hidden transition-colors duration-1000 ease-in-out ${
        colorTransition ? 'bg-[#F2F2F0]' : 'bg-[#408360]'
      }`}
    >
      {/* Background gradient overlay */}
      {!colorTransition && (
        <div className='absolute top-0 left-0 w-full h-[30vh] sm:h-[275px] bg-gradient-to-b from-black to-transparent' />
      )}

      {/* Main content container */}
      <div className='relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
        {/* Main heading */}
        <motion.div
          className={`relative z-10 w-full max-w-4xl mx-auto text-center mt-8 sm:mt-16 lg:mt-32 transition-all duration-1000 ease-in-out ${
            animationsComplete
              ? 'mb-1 sm:mb-0 lg:mb-1 xl:mb-1'
              : 'mb-40 sm:mb-32 lg:mb-40 xl:mb-48'
          }`}
          animate={
            animationsComplete ? { y: 'clamp(50px, 20vh, 400px)' } : { y: 0 }
          }
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0,
          }}
        >
          <h1
            className={`text-6xl sm:text-5xl md:text-7xl lg:text-7xl font-extrabold leading-none transition-colors duration-1000 ease-in-out ${
              colorTransition ? 'text-[#408360]' : 'text-white'
            }`}
          >
            Interested in hosting <br />
            <span
              className={`transition-colors duration-1000 ease-in-out ${
                colorTransition ? 'text-black' : 'text-white'
              }`}
            >
              our exhibition at your centre!
            </span>
          </h1>
        </motion.div>

        {/* Ribbon/Wave decoration with cutting animation */}
        <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 h-20 sm:h-24 md:h-28 lg:h-32 xl:h-[154px] z-20'>
          {/* Original ribbon - visible initially, fades out when cut */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={
              ribbonTransition
                ? { opacity: ribbonCutting ? 0 : 1 }
                : { opacity: 1 }
            }
            transition={{
              duration: ribbonCutting ? 0.8 : 0.5,
              ease: 'easeOut',
            }}
            className='absolute inset-0'
          >
            <Image
              src='/figma/ribbon.svg'
              alt='Decorative ribbon'
              width={1597}
              height={154}
              className='w-full h-full object-cover drop-shadow-[0px_1px_86.3px_rgba(0,0,0,0.1)]'
            />
          </motion.div>

          {/* Left cut ribbon - appears when cutting happens - responsive sizing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: ribbonCutting ? (cutRibbonsFadeOut ? 0 : 1) : 0,
            }}
            transition={{
              duration: cutRibbonsFadeOut ? 1 : 0.8,
              ease: 'easeOut',
            }}
            className='absolute left-0 top-0 w-1/2 h-48 sm:h-56 md:h-64 lg:h-80 xl:h-[461px] z-10 overflow-hidden'
          >
            <Image
              src='/figma/ribbon-left-cut.svg'
              alt='Left cut ribbon'
              width={732}
              height={461}
              className='w-full h-full object-cover object-left drop-shadow-[0px_1px_86.3px_rgba(0,0,0,0.1)]'
            />
          </motion.div>

          {/* Right cut ribbon - appears when cutting happens - responsive sizing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: ribbonCutting ? (cutRibbonsFadeOut ? 0 : 1) : 0,
            }}
            transition={{
              duration: cutRibbonsFadeOut ? 1 : 0.8,
              ease: 'easeOut',
              delay: cutRibbonsFadeOut ? 0.1 : 0.2,
            }}
            className='absolute right-0 top-0 w-1/2 h-44 sm:h-52 md:h-60 lg:h-72 xl:h-[404px] z-10 overflow-hidden'
          >
            <Image
              src='/figma/ribbon-right-cut.svg'
              alt='Right cut ribbon'
              width={728}
              height={404}
              className='w-full h-full object-cover object-right drop-shadow-[0px_1px_86.3px_rgba(0,0,0,0.1)]'
            />
          </motion.div>
        </div>

        {/* Scissors image with Framer Motion animation - centered with CTA */}
        <motion.div
          className='absolute z-30 left-1/2 -translate-x-1/2 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-[358px] h-48 sm:h-56 md:h-64 lg:h-72 xl:h-[358px]'
          style={{
            bottom: 'clamp(6rem, 15vh, 12rem)', // Position relative to CTA area
          }}
          initial={{ y: 0, scale: 1, opacity: 1 }}
          animate={
            scissorsAnimation
              ? {
                  y: -400,
                  scale: 0.7,
                  opacity: 0,
                }
              : {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
        >
          <Image
            src='/figma/scissors.png'
            alt='Scissors'
            width={358}
            height={358}
            className='w-full h-full object-contain object-center'
          />
        </motion.div>

        {/* Bottom content container */}
        <motion.div
          className='relative z-10 flex flex-col  items-center justify-center mt-auto mb-8 sm:mb-12 lg:mb-16 pb-8 sm:pb-16 lg:pb-24'
          animate={
            animationsComplete ? { y: 'clamp(-50px, -20vh, -300px)' } : { y: 0 }
          }
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0,
          }}
        >
          {/* Decorative arrows - centered with CTA */}
          <Image
            src='/figma/arrows.svg'
            alt='Decorative arrows'
            width={626}
            height={76}
            className='h-auto w-auto max-w-[400px] sm:max-w-[500px] lg:max-w-[626px] drop-shadow-[0px_2px_10px_rgba(0,0,0,0.1)]'
          />

          {/* CTA Button - centered */}
          <button className='bg-[#181818] text-white px-6 sm:px-8 lg:px-[37px] py-3 sm:py-4 lg:py-[18px] rounded-full flex items-center justify-center gap-2 font-extrabold text-lg sm:text-xl lg:text-2xl hover:bg-[#2a2a2a] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform leading-[1.193359375em]'>
            Host an Exhibition Now!
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HostExhibition;
