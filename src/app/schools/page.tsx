'use client';

import HeroSection from '@/components/common/HeroSection';
import AnimatedImageSection from '../../components/common/AnimatedImageSection';
// import WhyChooseSection from '../../components/WhyChooseSection';
// import { motion } from 'framer-motion';

export default function School() {
  return (
    <>
      <HeroSection
        heroImage='/schoolHero.png'
        title='School Visits'
        subHeading='Knowledge changes everything'
        description='Our school visits provide a dynamic and accessible introduction to Islam for students of all ages. Designed to complement the Religious Education curriculum, each session is thoughtfully structured to engage pupils through storytelling, multimedia, and interactive learning.'
        buttonText='School Visit'
      />
      <AnimatedImageSection
        text1='KNOWLEDGE CHANGES EVERYTHING'
        text2='KNOWLEDGE CHANGES EVERYTHING'
      />
      {/* <WhyChooseSection /> */}
    </>
  );
}
