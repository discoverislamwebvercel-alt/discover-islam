'use client';

import { motion, type Variants } from 'framer-motion';

export default function WhatIsDiscoverIslamSection() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight relative inline-block">
            What is
            <img
              src="/Ellipse 11.png"
              alt="Underline"
              className="absolute left-0 right-0 bottom-[-8px] w-full h-auto"
            />
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cb892a] leading-tight mt-2 sm:mt-4">
            DiscoverIslam?
          </h2>
        </motion.div>

        {/* Description Text */}
        <motion.div
          className="text-center text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-12 sm:mb-16 leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <p className="mb-6">
            DiscoverIslam is a dedicated initiative that shares the beauty, values, and teachings of Islam in a clear and authentic way. We work to bridge understanding, remove misconceptions, and open dialogue between communities.
          </p>
          <p className="mb-6">
            Over the years, we&apos;ve grown into a trusted platform offering exhibitions, educational resources, events, and community programs, reaching thousands locally and globally.
          </p>
          <p className="text-lg font-medium">
            Educational Resources: Clear, accessible materials for all audiences.
          </p>
        </motion.div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Exhibitions & Events */}
          <motion.div
            className="bg-green-50 rounded-2xl p-8 shadow-lg flex flex-col items-start"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-green-700 mb-2">Exhibitions</h3>
            <p className="text-2xl font-bold text-green-700 mb-4">& Events</p>
            <p className="text-gray-700 text-lg leading-relaxed">Interactive displays and cultural showcases.</p>
          </motion.div>

          {/* Card 2: Workshops & Seminars */}
          <motion.div
            className="bg-gray-100 rounded-2xl p-8 shadow-lg flex flex-col items-start"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Workshops</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">& Seminars</p>
            <p className="text-gray-700 text-lg leading-relaxed">For schools, workplaces, and communities.</p>
          </motion.div>

          {/* Card 3: Community Engagement */}
          <motion.div
            className="bg-orange-50 rounded-2xl p-8 shadow-lg flex flex-col items-start"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-[#cb892a] mb-2">Community</h3>
            <p className="text-2xl font-bold text-[#cb892a] mb-4">Engagement</p>
            <p className="text-gray-700 text-lg leading-relaxed">Building bridges through open dialogue.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
