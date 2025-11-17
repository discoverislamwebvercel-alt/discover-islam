'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Understanding through knowledge and connection';
  const [isCursorBlink, setIsCursorBlink] = useState(false);

  useEffect(() => {
    let i = 0;
    let deleting = false;
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const pauseDelay = 2000;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        if (i < fullText.length) {
          i += 1;
          setTypedText(fullText.slice(0, i));
          setIsCursorBlink(false);
          timeoutId = setTimeout(tick, typingSpeed);
        } else {
          // Pause at full text, then start deleting
          setIsCursorBlink(true);
          timeoutId = setTimeout(() => {
            deleting = true;
            setIsCursorBlink(false);
            tick();
          }, pauseDelay);
        }
      } else {
        if (i > 0) {
          i -= 1;
          setTypedText(fullText.slice(0, i));
          setIsCursorBlink(false);
          timeoutId = setTimeout(tick, deletingSpeed);
        } else {
          // Finished deleting, start typing again
          deleting = false;
          setIsCursorBlink(false);
          timeoutId = setTimeout(tick, typingSpeed);
        }
      }
    };

    timeoutId = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div
      id='home'
      className='h-screen relative opacity-100'
      style={{
        backgroundImage: "url('/image 2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Hero Content */}
      <div className='h-full flex items-center justify-center px-4 sm:px-8'>
        <motion.div
          className='text-center mx-auto flex flex-col items-center gap-1'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className='w-full max-w-[900px] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold leading-[0.9] tracking-tight'
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: [1, 1.06, 1] }}
            transition={{
              opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <span className='text-black'>Discover</span>{' '}
            <span className='text-[#cb892a]'>Islam</span>
          </motion.h1>

          <motion.h2
            className='w-full max-w-[900px] text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-black mt-2 leading-tight tracking-tight'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span>{typedText}</span>
            <motion.span
              aria-hidden='true'
              className='inline-block w-[1ch]'
              animate={isCursorBlink ? { opacity: [0, 1, 0] } : { opacity: 1 }}
              transition={
                isCursorBlink
                  ? { duration: 0.8, repeat: Infinity, ease: 'linear' }
                  : { duration: 0 }
              }
            >
              |
            </motion.span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Scroll Chevron - bottom center */}
      <motion.button
        aria-label='Scroll to next section'
        title='Scroll down'
        onClick={() => {
          const el = document.getElementById('services');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className='absolute cursor-pointer bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 text-black shadow-md backdrop-blur-sm hover:bg-white transition-colors'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <ChevronDown className='w-6 h-6 sm:w-7 sm:h-7' />
      </motion.button>
    </div>
  );
}
