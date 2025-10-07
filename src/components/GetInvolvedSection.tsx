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

  return (
    <section className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[470px] max-w-4xl mx-auto'>
          {/* Large Left Card - Fundraise with us */}
          <motion.div
            className='bg-[#cb892a] rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative shadow-lg min-h-[300px] lg:min-h-0'
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight'>
                Fundraise
              </h3>
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight'>
                with us
              </h3>
            </div>

            <div className='flex flex-col items-start'>
              <button
                className='bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors duration-300 cursor-pointer'
                onClick={() => router.push('/fundraise')}
              >
                Fill out form
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
              className='bg-[#4c735d] rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-lg flex-1 min-h-[200px]'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight'>
                  Volunteer
                </h3>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight'>
                  with us
                </h3>
              </div>

              <div className='flex justify-start'>
                <button
                  className='bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors duration-300 cursor-pointer'
                  onClick={() => router.push('/volunteer')}
                >
                  Fill out form
                </button>
              </div>
            </motion.div>

            {/* Bottom Right Card - Partner with us */}
            <motion.div
              className='bg-black rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-lg flex-1 min-h-[200px]'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight'>
                  Partner
                </h3>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight'>
                  with us
                </h3>
              </div>

              <div className='flex justify-start'>
                <button
                  className='bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer'
                  onClick={() => router.push('/partner-with-us')}
                >
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
