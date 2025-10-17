'use client';

import Image from 'next/image';

const images = [
  '/figma/gallery/grid-1.png',
  '/figma/gallery/grid-2.png',
  '/figma/gallery/grid-3.png',
  '/figma/gallery/grid-4.png',
  '/figma/gallery/grid-5.png',
  '/figma/gallery/grid-6.png',
];

export default function GalleryGrid() {
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

      <div className='mt-8 sm:mt-10 relative w-full overflow-hidden'>
        {/* Row 1 - Three images side by side, centered */}
        <div className='mx-auto w-full max-w-[1837px] px-4 sm:px-6 lg:px-8 relative'>
          <div className='flex flex-col md:flex-row gap-4 mb-4 justify-center'>
            <div className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0'>
              <Image
                src={images[0]}
                alt={`Gallery image 1`}
                width={599}
                height={380}
                className='w-full h-full object-cover'
              />
            </div>

            <div className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0'>
              <Image
                src={images[1]}
                alt={`Gallery image 2`}
                width={599}
                height={380}
                className='w-full h-full object-cover'
              />
            </div>

            <div className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0'>
              <Image
                src={images[2]}
                alt={`Gallery image 3`}
                width={599}
                height={380}
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>

        {/* Row 2 - Full width layout with cut-off effects */}
        <div className='w-full px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row gap-4 overflow-hidden'>
            <div className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0 md:-ml-[393px]'>
              <Image
                src={images[3]}
                alt={`Gallery image 4`}
                width={599}
                height={380}
                className='w-full h-full object-cover'
              />
            </div>

            <div className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0'>
              <Image
                src={images[4]}
                alt={`Gallery image 5`}
                width={599}
                height={380}
                className='w-full h-full object-cover'
              />
            </div>

            <div className='w-full md:w-[599px] h-[200px] md:h-[380px] rounded-[20px] overflow-hidden mx-auto md:mx-0'>
              <Image
                src={images[5]}
                alt={`Gallery image 6`}
                width={599}
                height={380}
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
