'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const images = [
  '/figma/gallery/grid-1.png',
  '/figma/gallery/grid-2.png',
  '/figma/gallery/grid-3.png',
  '/figma/gallery/grid-4.png',
  '/figma/gallery/grid-5.png',
  '/figma/gallery/grid-6.png',
];

export default function GalleryGrid() {
  const row1 = images.slice(0, 3);
  const row2 = images.slice(3, 6);

  const [emblaRef1] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        speed: 3.5,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );
  const [emblaRef2] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        speed: 3,
        direction: 'backward',
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  return (
    <section className='w-full bg-white py-12 sm:py-16'>
      <div className='mx-auto max-w-[1230px] px-4 sm:px-6 lg:px-8'>
        <h2 className='text-center font-extrabold text-[#111111] leading-[105%] text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px]'>
          Check out
          <br /> <span className='text-[#111111]'>our </span>
          <span className='relative inline-block text-[#2A6C4C]'>
            Gallery
            <img
              src='/figma/underline_green.png'
              alt='underline'
              className='absolute left-1/2 -translate-x-1/2 -bottom-2 w-[115%] max-w-none h-[10px] sm:h-[12px] md:h-[14px] lg:h-[16px] pointer-events-none select-none'
            />
          </span>
        </h2>
      </div>

      <div className='mt-8 sm:mt-10 relative w-full overflow-hidden flex flex-col gap-3'>
        {/* Row 1 - Infinite carousel, preserves sizes and centering */}
        <div className='mx-auto w-full max-w-[1837px] px-4 sm:px-6 lg:px-8 relative'>
          <div className='overflow-hidden' ref={emblaRef1}>
            <div className='flex gap-4 md:justify-start justify-center'>
              {row1.concat(row1).map((src, idx) => (
                <div
                  key={`r1-${idx}`}
                  className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0 flex-shrink-0'
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${idx + 1}`}
                    width={599}
                    height={380}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Infinite carousel with left cut-off look */}
        <div className='w-full px-4 sm:px-6 lg:px-8'>
          <div className='overflow-hidden' ref={emblaRef2}>
            <div className='flex gap-4 md:-ml-[393px]'>
              {row2.concat(row2).map((src, idx) => (
                <div
                  key={`r2-${idx}`}
                  className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0 flex-shrink-0'
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${idx + 4}`}
                    width={599}
                    height={380}
                    className='w-full h-full object-cover mr'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
