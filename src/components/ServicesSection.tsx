'use client';

import { motion, type Variants } from 'framer-motion';

export default function ServicesSection() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={titleVariants}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Explore our
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight relative inline-block">
          Services
          <img 
            src="/Ellipse 11.png" 
            alt="Services underline" 
            className="absolute left-0 right-0 bottom-[-8px] w-2/3 mx-auto h-auto"
          />
        </h2>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Exhibition Card */}
        <motion.div
          className="relative bg-green-100 rounded-2xl p-4 sm:p-6 pt-12 sm:pt-14 shadow-lg w-full sm:w-80 md:w-64 flex flex-col items-start"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute -top-4 sm:-top-6 left-0 right-0 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-lg sm:text-xl md:text-2xl shadow-lg transform -rotate-2 mx-4 sm:mx-6">
            Exhibition
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 flex items-center justify-center">
            <img src="/Exibition.png" alt="Exhibition Icon" className="w-full h-full object-contain" />
          </div>
          <p className="text-gray-800 text-lg sm:text-xl font-bold text-left leading-tight">
            Host an<br />
            Exhibition
          </p>
        </motion.div>

        {/* Schools Card */}
        <motion.div
          className="relative bg-gray-200 rounded-2xl p-4 sm:p-6 pt-12 sm:pt-14 shadow-lg w-full sm:w-80 md:w-64 flex flex-col items-start"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute -top-4 sm:-top-6 left-0 right-0 bg-black text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-lg sm:text-xl md:text-2xl shadow-lg transform -rotate-2 mx-4 sm:mx-7">
            Schools
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 flex items-center justify-center">
            <img src="/mosque.png" alt="Mosque Icon" className="w-full h-full object-contain" />
          </div>
          <p className="text-gray-800 text-lg sm:text-xl font-bold text-left leading-tight">
            Book a School or<br />
            Mosque Visit
          </p>
        </motion.div>

        {/* Literature Card */}
        <motion.div
          className="relative bg-orange-50 rounded-2xl p-4 sm:p-6 pt-12 sm:pt-14 shadow-lg w-full sm:w-80 md:w-64 flex flex-col items-start"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute -top-4 sm:-top-6 left-0 right-0 bg-[#cb892a] text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-lg sm:text-xl md:text-2xl shadow-lg transform -rotate-2 mx-4 sm:mx-6">
            Literature
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 flex items-center justify-center">
            <img src="/Litrature.png" alt="Literature Icon" className="w-full h-full object-contain" />
          </div>
          <p className="text-gray-800 text-lg sm:text-xl font-bold text-left leading-tight">
            Request<br />
            Free Literature
          </p>
        </motion.div>
      </div>
    </section>
  );
}
