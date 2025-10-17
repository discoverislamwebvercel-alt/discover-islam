'use client';

import AboutHero from '@/components/common/AboutHero';
import AboutUsCards from '@/components/AboutUsCards';
import AboutIntroText from '@/components/common/AboutIntroText';
import MissionVision from '@/components/common/MissionVision';
import ValuesBars from '@/components/common/ValuesBars';
import AboutStats from '@/components/common/AboutStats';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';

export default function AboutUsPage() {
  return (
    <div className='bg-white'>
      <AboutHero />
      <AboutUsCards />
      <AboutIntroText />
      <MissionVision />
      <ValuesBars />
      <AboutStats />
      <AnimatedJourneySection />
    </div>
  );
}
