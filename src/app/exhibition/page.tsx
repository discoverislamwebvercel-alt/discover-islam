'use client';

import HeroSection from '@/components/common/HeroSection';
import AnimatedImageSection from '../../components/common/AnimatedImageSection';

export default function Exhibition() {
  return (
    <>
      <HeroSection
        heroImage='/exhibitionHero.png'
        title='ISLAMIC EXHIBITIONS'
        subHeading='Promoting Understanding Through Engagement'
        description='Our Islamic exhibitions promote understanding and challenge
                stereotypes through informative displays and powerful visuals —
                including interactive tech models, educational exhibits, and
                authentic artifacts — that engage visitors and offer deeper
                insight into Islamic culture and values.'
      />
      <AnimatedImageSection />
    </>
  );
}
