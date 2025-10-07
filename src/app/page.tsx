import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import WhatIsDiscoverIslamSection from '@/components/WhatIsDiscoverIslamSection';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import ExploreIslamSection from '@/components/ExploreIslamSection';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Hero />
      <ServicesSection />
      <WhatIsDiscoverIslamSection />
      <GetInvolvedSection />
      <ExploreIslamSection />
    </div>
  );
}
