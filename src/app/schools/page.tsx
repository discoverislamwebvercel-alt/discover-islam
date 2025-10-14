'use client';

import HeroSection from '@/components/common/HeroSection';
import AnimatedImageSection from '../../components/common/AnimatedImageSection';
import ResponsiveFallingCards from '@/components/ResponsiveFallingCards';
import TestimonialsSupportSection from '@/components/common/TestimonialsSupportSection';
// import { motion } from 'framer-motion';

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
      <ResponsiveFallingCards
        cards={cards}
        heading1={'Why Book a School'}
        heading2={'Visit with Us?'}
      />
      <TestimonialsSupportSection />
    </>
  );
}
