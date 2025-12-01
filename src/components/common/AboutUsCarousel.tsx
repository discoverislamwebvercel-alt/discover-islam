'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const images = Array.from(
  { length: 10 },
  (_, i) =>
    `/about_us_exhibitions/about_us_two/${String(i + 1).padStart(2, '0')}.jpg`
);

export default function AboutUsCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    duration: 0, // Instant snap, no animation
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Track selected slide
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', onSelect);
    };
  }, [embla, onSelect]);

  // Auto-play: snap to next picture, pause, repeat
  useEffect(() => {
    if (!embla) return;

    let timeoutId: NodeJS.Timeout | null = null;
    let isPaused = false;

    const snapToNext = () => {
      if (isPaused) return;

      // Snap instantly to next (duration is 0)
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }

      // Pause for 3 seconds before next snap
      timeoutId = setTimeout(snapToNext, 3000);
    };

    const startAutoplay = () => {
      isPaused = false;
      if (timeoutId) clearTimeout(timeoutId);
      // Initial pause before first snap
      timeoutId = setTimeout(snapToNext, 3000);
    };

    const stopAutoplay = () => {
      isPaused = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    startAutoplay();

    const container = embla.containerNode();
    if (container) {
      container.addEventListener('mouseenter', stopAutoplay);
      container.addEventListener('mouseleave', startAutoplay);
    }

    return () => {
      stopAutoplay();
      if (container) {
        container.removeEventListener('mouseenter', stopAutoplay);
        container.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [embla]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const scrollTo = useCallback(
    (index: number) => {
      if (embla) embla.scrollTo(index);
    },
    [embla]
  );

  return (
    <section className='w-full bg-white py-8 sm:py-12 md:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='relative'>
          {/* Carousel Container */}
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {images.map((src, index) => (
                <div key={index} className='flex-shrink-0 w-full basis-full'>
                  <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[20px] overflow-hidden'>
                    <Image
                      src={src}
                      alt={`About Us Exhibition ${index + 1}`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px'
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            type='button'
            aria-label='Previous image'
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#111111] border border-[#E7E7E7] shadow-sm rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 18l-6-6 6-6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            type='button'
            aria-label='Next image'
            onClick={scrollNext}
            disabled={!canScrollNext}
            className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#111111] border border-[#E7E7E7] shadow-sm rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 6l6 6-6 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className='mt-6 sm:mt-8 flex items-center justify-center'>
          <div className='flex items-center gap-2'>
            {images.map((_, idx) => (
              <button
                key={idx}
                type='button'
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => scrollTo(idx)}
                className={`transition-all duration-300 ${
                  idx === selectedIndex
                    ? 'w-8 sm:w-10 h-2 sm:h-2.5 rounded-full bg-[#111111] opacity-80'
                    : 'w-2 h-2 rounded-full bg-[#111111] opacity-30 hover:opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
