'use client';

import { motion } from 'framer-motion';

export default function AboutIntroText() {
  return (
    <section className='w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-12'>
      <div className='mx-auto max-w-4xl text-center text-gray-800'>
        <motion.p
          className='mb-8 font-medium text-[30px] leading-[100%] text-center'
          style={{
            fontFamily:
              'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          We are <strong>Discover Islam</strong>, an award-winning initiative
          dedicated to promoting understanding and dialogue about Islam. Through
          our educational programmes, interactive exhibitions, and community
          outreach, we’ve earned the trust of schools, organisations, and
          communities across the UK worldwide.
        </motion.p>
        <motion.p
          className='font-medium text-[30px] leading-[100%] text-center'
          style={{
            fontFamily:
              'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Driven by passion and purpose, our team delivers accurate, engaging,
          and thought-provoking experiences that inspire curiosity, break down
          barriers, and foster lasting mutual respect.
        </motion.p>
      </div>
    </section>
  );
}
