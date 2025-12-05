'use client';

import { motion, type Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function GetInvolvedSection() {
  const router = useRouter();
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(186.54deg,rgba(242,242,240,0)_5.14%,#C9C9C9_247.82%)]'>
      <div className='mx-auto max-w-[1251px]'>
        {/* Title */}
        <motion.div
          className='text-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h2 className='font-extrabold text-[#111111] leading-[107%] text-[44px] sm:text-[56px] md:text-[72px] lg:text-[80px] mb-28'>
            Get Involved
            <img
              src='/figma/underline_green.png'
              alt='underline'
              className='absolute left-1/2 -translate-x-1/2  w-[386.81px] h-[21.41px] pointer-events-none select-none'
            />
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Large Left Card - Fundraise with us */}
          <motion.div
            className='bg-[#CB892A] rounded-[30px] p-6 sm:p-8 flex flex-col justify-between relative shadow-lg min-h-[300px] lg:h-[662px]'
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <h3 className='font-extrabold text-white leading-[93%] text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px]'>
                Support us
              </h3>
            </div>

            <div className='flex flex-col items-start'>
              <button
                className='relative overflow-hidden group bg-[#181818] text-white w-[200px] sm:w-[254px] h-[56px] sm:h-[67px] rounded-[52px] font-extrabold text-[18px] sm:text-[26px] hover:bg-black transition-colors duration-300 cursor-pointer px-[37px] hover:scale-105'
                onClick={() => router.push('/donations')}
              >
                <span aria-hidden className='hover-animation' />
                Find Out More
              </button>

              {/* Decorative arrow using Group (1).png - pointing to button */}
              <div className='absolute bottom-4 right-4 sm:right-[100px]'>
                <img
                  src='/Group (1).png'
                  alt='Arrow decoration'
                  className='w-[150px] h-[150px] mr-24 sm:mr-0 sm:w-[180px] sm:h-[180px] lg:w-[230px] lg:h-[230px] opacity-90'
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Two Cards Stacked */}
          <div className='flex flex-col gap-6'>
            {/* Top Right Card - Volunteer with us */}
            <motion.div
              className='bg-[#4C735D] rounded-[30px] p-6 sm:p-8 flex flex-col justify-between shadow-lg flex-1 min-h-[200px] lg:h-[324px]'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <h3 className='font-extrabold text-white leading-[93%] text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px]'>
                  Volunteer
                  <br />
                  with us
                </h3>
              </div>

              <div className='flex justify-start'>
                <button
                  className='relative overflow-hidden group bg-[#181818] text-white w-[200px] sm:w-[244px] h-[56px] sm:h-[67px] rounded-[52px] font-extrabold text-[18px] sm:text-[26px] hover:bg-black transition-colors duration-300 cursor-pointer px-[37px] hover:scale-105'
                  onClick={() => router.push('/volunteer')}
                >
                  <span aria-hidden className='hover-animation' />
                  Fill out form
                </button>
              </div>
            </motion.div>

            {/* Bottom Right Card - Partner with us */}
            <motion.div
              className='bg-black rounded-[30px] p-6 sm:p-8 flex flex-col justify-between shadow-lg flex-1 min-h-[200px] lg:h-[324px]'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <h3 className='font-extrabold text-white leading-[93%] text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px]'>
                  Partner
                  <br />
                  with us
                </h3>
              </div>

              <div className='flex justify-start'>
                <button
                  className='relative overflow-hidden group bg-[#F2F2F0] text-black w-[200px] sm:w-[244px] h-[56px] sm:h-[67px] rounded-[52px] font-extrabold text-[18px] sm:text-[26px] transition-colors duration-300 cursor-pointer px-[37px] hover:scale-105 hover:bg-[#F2F2F0]/70'
                  onClick={() => router.push('/partner-with-us')}
                >
                  <span aria-hidden className='hover-animation' />
                  Fill out form
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
