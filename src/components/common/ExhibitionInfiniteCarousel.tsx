'use client';

import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

type CarouselItem = {
  id: string;
  imageSrc: string;
  title: string;
  date: string;
  description: string;
};

const defaultItems: CarouselItem[] = [
  {
    id: '1',
    imageSrc: '/Frame 74.png',
    title: 'Exhibition Name',
    date: '05/12/2025',
    description: 'Lorem Ipsum text plaeholder',
  },
  {
    id: '2',
    imageSrc: '/Frame 75.png',
    title: 'Exhibition Name',
    date: '05/12/2025',
    description: 'Lorem Ipsum text plaeholder',
  },
  {
    id: '3',
    imageSrc: '/Frame 94.png',
    title: 'Exhibition Name',
    date: '05/12/2025',
    description: 'Lorem Ipsum text plaeholder',
  },
  {
    id: '4',
    imageSrc: '/exhibitionHero.png',
    title: 'Exhibition Name',
    date: '05/12/2025',
    description: 'Lorem Ipsum text plaeholder',
  },
  {
    id: '5',
    imageSrc: '/Rectangle 8.png',
    title: 'Exhibition Name',
    date: '05/12/2025',
    description: 'Lorem Ipsum text plaeholder',
  },
  {
    id: '6',
    imageSrc: '/schoolHero.png',
    title: 'Exhibition Name',
    date: '05/12/2025',
    description: 'Lorem Ipsum text plaeholder',
  },
  {
    id: '7',
    imageSrc: '/schools_hero_bg.jpg',
    title: 'Exhibition Name',
    date: '05/12/2025',
    description: 'Lorem Ipsum text plaeholder',
  },
];

export default function ExhibitionInfiniteCarousel({
  items = defaultItems,
}: {
  items?: CarouselItem[];
}) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  });

  const autoplay = useCallback(() => {
    if (!embla) return;
    const run = () => {
      if (!embla) return;
      if (embla.canScrollNext()) {
        embla.scrollNext();
        window.setTimeout(run, 2600);
      } else {
        embla.scrollTo(0);
        window.setTimeout(run, 2600);
      }
    };
    window.setTimeout(run, 1400);
  }, [embla]);

  // start autoplay once embla is ready
  useEffect(() => {
    if (embla) autoplay();
  }, [embla, autoplay]);

  return (
    <section className='w-full overflow-hidden py-8 sm:py-12'>
      <div className='relative w-full'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex gap-6 sm:gap-8'>
            {items.map(item => (
              <article
                key={item.id}
                className='w-[320px] sm:w-[420px] lg:w-[599px] flex-shrink-0'
              >
                <div className='w-full h-[220px] sm:h-[280px] lg:h-[380px] rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden'>
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    width={1200}
                    height={800}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='mt-4 flex flex-col gap-1'>
                  <h3 className='text-[#111111] font-bold text-[22px] sm:text-[30px] lg:text-[40px] leading-[1.2] tracking-[-0.03em]'>
                    {item.title}
                  </h3>
                  <div className='text-[#111111] text-[14px] sm:text-[18px] lg:text-[26px] leading-[1.2] font-medium'>
                    {item.date}
                  </div>
                  <div className='text-[#111111] text-opacity-80 text-[14px] sm:text-[18px] lg:text-[26px] leading-[1.2] font-medium'>
                    {item.description}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
