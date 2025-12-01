'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/common/HeroSection';
import AnimatedImageSection from '../../components/common/AnimatedImageSection';
import ResponsiveFallingCards from '@/components/ResponsiveFallingCards';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';

const cards = [
  {
    text: 'In-School or Mosque Visit Options',
    styles: 'bg-[#408360] text-white rounded-[20px]',
    rotate: '0.26deg',
    y: 150,
    x: 100,
    width: '250px',
    icon: false,
  },
  {
    text: 'Interactive Q&A Sessions',
    styles: 'bg-[#408360] text-white rounded-[20px]',
    rotate: '-6.5deg',
    y: 10,
    x: 770,
    width: '300px',
    icon: false,
  },
  {
    text: 'Curriculum-Aligned Presentations',
    styles: 'bg-[#111111] text-white rounded-[20px]',
    rotate: '15.51deg',
    y: 70,
    x: 50,
    width: '600px',
    icon: false,
  },
  {
    text: 'Led by Experienced Presenters',
    styles: 'bg-[#111111] text-white rounded-[20px]',
    rotate: '5.53deg',
    y: -70,
    x: 250,
    width: '380px',
    icon: false,
  },
  {
    text: 'SACRE-Approved Content',
    styles: 'bg-[#CB892A] text-white rounded-[20px]',
    rotate: '0.36deg',
    y: 35,
    x: 0,
    width: '520px',
    icon: false,
  },
  {
    text: 'Engaging & Age-Appropriate Delivery',
    styles: 'bg-[#CB892A] text-white rounded-[20px]',
    rotate: '-9deg',
    y: -180,
    x: -550,
    width: '330px',
    icon: false,
  },
];

export default function School() {
  const router = useRouter();

  return (
    <>
      <HeroSection
        heroImage='/schools_hero_bg.jpg'
        title='School Visits'
        subHeading='Knowledge changes everything'
        description='Our school visits provide pupils with an engaging and interactive introduction to
Islam. Through tailored presentations, activities, and discussions, we help students explore
Islamic beliefs, values, and culture in a welcoming and educational environment.'
        // buttonText='Book School Visit'
      />
      <AnimatedImageSection
        text1='KNOWLEDGE CHANGES EVERYTHING'
        text2='KNOWLEDGE CHANGES EVERYTHING'
      />
      <ResponsiveFallingCards
        cards={cards}
        heading1={'Why Book a School'}
        heading2={'Visit with Us?'}
      />

      {/* Visit Options Cards Section */}
      <section className='pt-16 sm:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-[1316px] mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6'>
            {/* Mosque Visit Card */}
            <motion.div
              className='relative bg-[#CB892A] rounded-[24px] sm:rounded-[28px] lg:rounded-[30px] p-6 sm:p-8 lg:p-12 flex flex-col justify-between min-h-[420px] sm:min-h-[520px] lg:min-h-[662px]'
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <h3
                  className='font-extrabold text-[34px] sm:text-[48px] md:text-[60px] lg:text-[80px] leading-[1.05] text-white mb-4 sm:mb-6'
                  style={{
                    fontFamily:
                      'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
                  }}
                >
                  Mosque Visit
                </h3>
                <p
                  className='font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[30px] leading-relaxed text-white mb-6 sm:mb-8'
                  style={{
                    fontFamily:
                      'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
                  }}
                >
                  Bring your students to one of our partner mosques for an
                  inspiring and memorable experience that brings learning to
                  life. We work with a wide network of mosques across the
                  country to make visits easy, accessible, and welcoming for
                  all.
                </p>
              </div>
              <button
                onClick={() => router.push('/schools/mosque-visit')}
                className='relative overflow-hidden group bg-[#181818] text-white w-full sm:w-[244px] h-[52px] sm:h-[60px] lg:h-[67px] rounded-[40px] sm:rounded-[48px] lg:rounded-[52px] font-extrabold text-[18px] sm:text-[22px] lg:text-[26px] transition-transform transition-colors duration-300 cursor-pointer px-6 sm:px-[32px] lg:px-[37px] hover:scale-[1.03] hover:bg-[#181818]/90 flex items-center justify-center'
              >
                <span aria-hidden className='hover-animation' />
                Fill out form
              </button>
            </motion.div>

            {/* In School Visit Card */}
            <motion.div
              className='relative bg-[#408360] rounded-[24px] sm:rounded-[28px] lg:rounded-[30px] p-6 sm:p-8 lg:p-12 flex flex-col justify-between min-h-[420px] sm:min-h-[520px] lg:min-h-[662px]'
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <h3
                  className='font-extrabold text-[34px] sm:text-[48px] md:text-[60px] lg:text-[80px] leading-[1.05] text-white mb-4 sm:mb-6'
                  style={{
                    fontFamily:
                      'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
                  }}
                >
                  In School Visit
                </h3>
                <p
                  className='font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[30px] leading-relaxed text-white mb-6 sm:mb-8'
                  style={{
                    fontFamily:
                      'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
                  }}
                >
                  We visit your school to deliver an engaging and interactive
                  presentation about Islam, tailored to your students&apos; age
                  and curriculum needs.
                </p>
              </div>
              <button
                onClick={() => router.push('/schools/school-visit')}
                className='relative overflow-hidden group bg-[#181818] text-white w-full sm:w-[244px] h-[52px] sm:h-[60px] lg:h-[67px] rounded-[40px] sm:rounded-[48px] lg:rounded-[52px] font-extrabold text-[18px] sm:text-[22px] lg:text-[26px] transition-transform transition-colors duration-300 cursor-pointer px-6 sm:px-[32px] lg:px-[37px] hover:scale-[1.03] hover:bg-[#181818]/90 flex items-center justify-center'
              >
                <span aria-hidden className='hover-animation' />
                Fill out form
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedJourneySection />
    </>
  );
}
