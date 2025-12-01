'use client';

import { motion, type Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ExhibitionContactCTA() {
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className='w-full bg-white py-12 sm:py-16 md:py-20'>
      <motion.div
        className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Helper Text */}
        <motion.div variants={itemVariants}>
          <h2 className='text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold text-[#111111] leading-[1.1] mb-4 sm:mb-6'>
            Interested in Hosting an Exhibition?
          </h2>
          <p className='text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-[rgba(17,17,17,0.8)] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12'>
            Get in touch with us to discuss how we can bring our engaging and
            educational Islamic exhibition to your venue, school, or community
            center.
          </p>
        </motion.div>

        {/* Contact Button */}
        <motion.div variants={itemVariants} className='flex justify-center'>
          <button
            onClick={() => router.push('/contact-us')}
            className='relative overflow-hidden group bg-[#CB892A] text-black w-[200px] sm:w-[244px] h-[56px] sm:h-[67px] rounded-[52px] font-extrabold text-[18px] sm:text-[26px] transition-all duration-300 cursor-pointer px-[37px] hover:scale-105 hover:bg-[#CB892A]/90 hover:text-black/90 active:scale-95'
          >
            <span aria-hidden className='hover-animation' />
            Contact Us
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
