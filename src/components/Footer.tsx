'use client';

import { motion, type Variants } from 'framer-motion';

export default function Footer() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <footer className="bg-gray-900 text-white relative mx-8 mb-8 rounded-2xl">
      {/* Islamic Lantern Decoration */}
      <div className="absolute top-4 right-8 opacity-30">
        <img 
          src="/islamic-lantern 1.png" 
          alt="Islamic Lantern" 
          className="w-12 h-16"
        />
      </div>

      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 ">
            {/* Left Column */}
            <motion.div
              className="text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-left ">
                DISCOVER THE BEAUTY
                <br />
                OF ISLAM
              </h2>
              
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-left">Office hours</h3>
              <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base text-left">
                Our offices are open at the following times and days: Monday to Friday 10am - 5pm
              </p>
              
              <motion.button
                className="bg-[#cb892a] hover:bg-[#a06d22] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reach Out
              </motion.button>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Get in touch!</h3>
              
              <div className="space-y-4 sm:space-y-6">
                {/* London HQ */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#cb892a] mb-2">LONDON (HQ)</h4>
                  <p className="text-gray-300 mb-1 text-sm sm:text-base">7 Bridges Place, Parsons Green, London, SW6 4HW</p>
                  <p className="text-gray-300 text-sm sm:text-base">info@discoverislam.co.uk</p>
                </div>

                {/* Ireland HQ */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#cb892a] mb-2">IRELAND (HQ)</h4>
                  <p className="text-gray-300 text-sm sm:text-base">163 South Circular Road, Dublin 8, Ireland</p>
                </div>

                {/* Scotland Presentations */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#cb892a] mb-2">SCOTLAND (Presentations)</h4>
                  <p className="text-gray-300 mb-1 text-sm sm:text-base">079 885 92734</p>
                  <p className="text-gray-300 text-sm sm:text-base">info@discoverislam.co.uk</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-b-2xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <motion.p
            className="text-[#cb892a] text-xs sm:text-sm text-center sm:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            © 2024 Discover Islam. All Rights Reserved.
          </motion.p>
          
          <motion.p
            className="text-[#cb892a] text-xs sm:text-sm text-center sm:text-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            Charity Number: 1146212
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
