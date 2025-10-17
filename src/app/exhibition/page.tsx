'use client';

import HeroSection from '@/components/common/HeroSection';
import AnimatedImageSection from '../../components/common/AnimatedImageSection';
import ResponsiveFallingCards from '../../components/ResponsiveFallingCards';
import HostExhibition from '@/components/HostExhibition';
import MoonSection from '@/components/MoonSection';
import TestimonialsSupportSection from '@/components/common/TestimonialsSupportSection';
import ExhibitionBookingForm from '@/components/common/ExhibitionBookingForm';
import ExhibitionInfiniteCarousel from '@/components/common/ExhibitionInfiniteCarousel';
import GalleryGrid from '@/components/common/GalleryGrid';

export default function Exhibition() {
  const cards = [
    {
      text: '10+ Years of Experience',
      styles: 'bg-[#408360] text-white rounded-[20px]',
      rotate: '0.26deg',
      y: 150,
      x: 100,
      width: '250px',
      icon: false,
    },
    {
      text: 'Fully Mobile & Self-Contained',
      styles: 'bg-[#408360] text-white rounded-[20px]',
      rotate: '-7deg',
      y: 20,
      x: 780,
      width: '300px',
      icon: false,
    },
    {
      text: 'Tailored for Non-Muslim Audiences',
      styles: 'bg-[#111111] text-white rounded-[20px]',
      rotate: '15.7deg',
      y: 75,
      x: 50,
      width: '600px',
      icon: false,
    },
    {
      text: 'Backed by Positive feedback',
      styles: 'bg-[#111111] text-white rounded-[20px]',
      rotate: '8deg',
      y: -64,
      x: 250,
      width: '380px',
      icon: false,
    },
    {
      text: 'Content Reviewed by Qualified Scholars',
      styles: 'bg-[#CB892A] text-white rounded-[20px]',
      rotate: '0.36deg',
      y: 35,
      x: 0,
      width: '520px',
      icon: false,
    },
    {
      text: 'Interactive, Modern Displays That Engage and inspire',
      styles: 'bg-[#CB892A] text-white rounded-[20px]',
      rotate: '-9deg',
      y: -170,
      x: -550,
      width: '330px',
      icon: false,
    },
  ];

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

      <ResponsiveFallingCards
        cards={cards}
        heading1={'Why Choose Our'}
        heading2={'Islamic Exhibition?'}
      />

      <HostExhibition />

      <MoonSection />
      <ExhibitionInfiniteCarousel />
      <GalleryGrid />
      <TestimonialsSupportSection showSupport={false} />
      <ExhibitionBookingForm />
    </>
  );
}
