'use client';

import AboutHero from '@/components/common/AboutHero';
// import AboutUsCards from '@/components/AboutUsCards';
import AboutIntroText from '@/components/common/AboutIntroText';
import AboutUsCarousel from '@/components/common/AboutUsCarousel';
import MissionVision from '@/components/common/MissionVision';
import ValuesBars from '@/components/common/ValuesBars';
import AboutStats from '@/components/common/AboutStats';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';

export default function AboutUsPage() {
  return (
    <div className='bg-white'>
      <AboutHero />
      <AboutIntroText />
      <AboutUsCarousel />
      {/* <AboutUsCards /> */}
      <MissionVision />
      <ValuesBars />
      <AboutStats />
      <AnimatedJourneySection />
    </div>
  );
}
