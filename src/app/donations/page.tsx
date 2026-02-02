'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import ProjectDonationCard from '@/components/common/ProjectDonationCard';

// One-off payment URL (same for all cards)
const ONE_OFF_URL = 'https://donate.stripe.com/28E7sN4AP9XXcG2crMe3e00';

// Regular payment URLs
// Literature card: 10, 15, 25, 50
// School Visits & Exhibitions: 10, 15, 25, 50, 150, 750
const LITERATURE_REGULAR_URLS = {
  '10': 'https://pay.gocardless.com/BRT000459GQ48GC',
  '15': 'https://pay.gocardless.com/BRT000459H8BEZ0',
  '25': 'https://pay.gocardless.com/BRT000459HAA8P0',
  '50': 'https://pay.gocardless.com/BRT000459HB28PQ',
};

const SCHOOL_EXHIBITION_REGULAR_URLS = {
  '10': 'https://pay.gocardless.com/BRT000459GQ48GC',
  '15': 'https://pay.gocardless.com/BRT000459H8BEZ0',
  '25': 'https://pay.gocardless.com/BRT000459HAA8P0',
  '50': 'https://pay.gocardless.com/BRT000459HB28PQ',
  '150': 'https://pay.gocardless.com/BRT000459J7QSX6',
  '750': 'https://pay.gocardless.com/BRT000459JCRH01',
};

const PROJECTS = [
  {
    title: 'School Visits',
    description:
      'Bring authentic, engaging lessons about Islam directly to classrooms. Your support funds travel, materials, and trained presenters who inspire curiosity and respect among young people.',
    imageUrl: '/schools_hero_bg.jpg',
    regularUrls: SCHOOL_EXHIBITION_REGULAR_URLS,
  },
  {
    title: 'Exhibitions',
    description:
      'Support impactful exhibitions that open doors to dialogue and understanding through powerful visuals and meaningful interaction.',
    imageUrl: '/Exhibitions_hero_bg.jpg',
    regularUrls: SCHOOL_EXHIBITION_REGULAR_URLS,
  },
  {
    title: 'Literature',
    description:
      'Help us share beautifully designed Islamic materials with schools and communities across the country, spreading knowledge and truth with clarity and care.',
    imageUrl: '/Literature_hero_bg.jpg',
    regularUrls: LITERATURE_REGULAR_URLS,
  },
];

export default function DonationsPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <>
      <FundraisePage
        title='Donations'
        titleClassName='text-[#CB892A]'
        containerClassName='max-w-[1500px] w-full px-4 sm:px-6 lg:px-8'
        descriptionClassName='hidden'
      >
        {/* Animated Description Text */}
        <motion.div
          className='w-full text-center mb-8 sm:mb-10 md:mb-12 px-4 flex items-center justify-center'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className='font-medium text-lg md:text-xl lg:text-[30px] leading-[100%] text-center w-full max-w-[1100px] tracking-normal'
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Your donation helps us educate, inspire, and build understanding
            between communities. By supporting our projects, you enable us to
            continue sharing the message of Islam and creating a lasting
            positive impact.
          </motion.p>
        </motion.div>

        {/* Support our Projects Section */}
        <motion.div
          className='w-full flex flex-col items-center justify-center gap-3 sm:gap-[12px] mb-8 sm:mb-12 md:mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {/* Support our Projects Heading */}
          <motion.h2
            className='font-bold text-2xl md:text-3xl lg:text-[40px] leading-[107%] text-center text-[#111111]'
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Support our Projects
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className='font-bold text-base md:text-lg lg:text-[30px] leading-[36px] text-center text-[rgba(17,17,17,0.8)]'
            style={{
              fontFamily:
                'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Make a difference through the project you support
          </motion.p>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          className='w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[10px] px-4 justify-items-center max-w-[1316px] mx-auto'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              className='w-full max-w-[432px]'
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: 'easeOut',
              }}
            >
              <ProjectDonationCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                oneOffUrl={ONE_OFF_URL}
                regularUrls={project.regularUrls}
                isExpanded={expandedCard === project.title}
                onExpand={() => setExpandedCard(project.title)}
              />
            </motion.div>
          ))}
        </motion.div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}
