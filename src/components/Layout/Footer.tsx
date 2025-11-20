'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer
      id='footer'
      className='relative mx-4 sm:mx-6 lg:mx-8 mb-8 rounded-[30px] overflow-hidden text-white bg-[#111111]'
    >
      {/* Decorative overlay: lantern */}
      <div className='pointer-events-none absolute top-6 right-6'>
        <Image
          height={178}
          width={80}
          src='/figma/hanging-footer-lantern.png'
          alt='Islamic Lantern'
        />
      </div>

      {/* Decorative overlay: radial blur gradient (mask group) */}
      <div className='absolute -top-40 left-0 w-[1332px] h-[1340px] mix-blend-overlay opacity-30'>
        <div className='absolute -top-40 left-0 w-[946px] h-[975px] rotate-[34.62deg] blur-[100px] opacity-30 bg-[radial-gradient(59.26%_39.52%_at_64.05%_47.42%,#D9D9D9_0%,rgba(115,115,115,0)_100%)]' />
      </div>

      {/* Main content */}
      <div className='px-6 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16'>
        <div className='mx-auto max-w-[1395px]'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            {/* Left column */}
            <motion.div
              className='relative'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              <div className='flex flex-col gap-[2px]'>
                <h2 className='uppercase font-extrabold text-[36px] sm:text-[48px] lg:text-[63.2066px] leading-[0.94] tracking-[-0.03em]'>
                  Discover the
                </h2>
                <h2 className='uppercase font-extrabold text-[36px] sm:text-[48px] lg:text-[63.2066px] leading-[0.94] tracking-[-0.03em]'>
                  Beauty of islam
                </h2>
              </div>

              <h3 className='mt-6 text-[28px] sm:text-[32px] lg:text-[40px] font-bold leading-[48px]'>
                Office hours
              </h3>
              <p className='mt-3 max-w-[434px] text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.38]'>
                Our offices are open at the following times and days: Monday to
                Friday 10am – 5pm
              </p>

              <button
                className='relative overflow-hidden group bg-[#CB892A] text-black w-[200px] sm:w-[244px] h-[56px] sm:h-[67px] rounded-[52px] font-extrabold text-[18px] sm:text-[26px] transition-colors duration-300 cursor-pointer px-[37px] hover:scale-105 hover:bg-[#CB892A]/70 mt-8 hover:text-black/70'
                onClick={() => router.push('/donations')}
              >
                <span aria-hidden className='hover-animation' />
                Donate Now
              </button>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              <h3 className='text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-[48px] mb-4 sm:mb-6'>
                Get in touch!
              </h3>
              <div className='space-y-6 text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.38]'>
                <div>
                  <div className='font-bold text-[#FFFFFF] mb-1'>
                    LONDON (HQ)
                  </div>
                  <div className='text-white'>
                    7 Bridges Place, Parsons Green, London, SW6 4HW
                  </div>
                  <div className='text-white'>info@discoverislam.co.uk</div>
                </div>
                {/* <div>
                  <div className='font-bold text-[#FFFFFF] mb-1'>
                    IRELAND (HQ)
                  </div>
                  <div className='text-white'>
                    163 South Circular Road, Dublin 8, Ireland
                  </div>
                </div> */}
                {/* <div>
                  <div className='font-bold text-[#FFFFFF] mb-1'>
                    SCOTLAND (Presentations)
                  </div>
                  <div className='text-white'>079 885 92734</div>
                  <div className='text-white'>info@discoverislam.co.uk</div>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom inline meta */}
      <div className='px-6 sm:px-8 lg:px-10 pb-6'>
        <div className='mx-auto max-w-[1395px] flex flex-col sm:flex-row items-center justify-between gap-2'>
          <motion.p
            className='text-[#CB892A] text-[12px] sm:text-[14px] lg:text-[16px]'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
          >
            © 2025 Discover Islam. All Rights Reserved.
          </motion.p>
          <motion.p
            className='text-[#CB892A] text-[12px] sm:text-[14px] lg:text-[16px]'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
          >
            Charity Number: 1146212
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
