'use client';

import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface FundraisePageProps {
  title?: string;
  titleClassName?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  descriptionClassName?: string;
  heroImageAlt?: string;
}

const FundraisePage: React.FC<FundraisePageProps> = ({
  title = 'Fundraise with Us',
  titleClassName = '',
  description = 'Help Discover Islam spread awareness and understanding by raising funds to support our educational programs, campaigns, and resources. Whether you are an individual, a group, or an organization, your fundraising effort can make a real impact. Join hands with us to create positive change!',
  children,
  className = '',
  containerClassName = '',
  descriptionClassName = '',
  heroImageAlt = 'Fundraise with Us Hero Image',
}) => {
  return (
    <div className={twMerge('min-h-screen bg-gray-50', className)}>
      {/* Hero Section with Background Image */}
      <div className='relative w-full pt-24 sm:pt-28 md:pt-[200px]'>
        <Image
          src='/FormHero.png'
          alt={heroImageAlt}
          fill
          className='object-cover opacity-20'
          priority
        />

        {/* Hero Content */}
        <div className='inset-0 flex items-center justify-center'>
          <div className='text-center px-4'>
            <h1
              className={twMerge(
                'text-4xl md:text-5xl lg:text-[80px] text-[#CB892A] font-extrabold mb-4',
                titleClassName
              )}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className='py-12 md:py-16 lg:py-20'>
        <div className='flex flex-col items-center px-4 sm:px-6 lg:px-8'>
          {/* Description Section */}
          <div
            className={twMerge(
              'w-full text-center mb-12 md:mb-16',
              descriptionClassName
            )}
            style={{ maxWidth: '1130px' }}
          >
            <p className='text-base md:text-lg lg:text-[30px] font-medium leading-relaxed'>
              {description}
            </p>
          </div>

          {/* Form Container */}
          <div
            className={twMerge('w-full', containerClassName)}
            style={{ maxWidth: '913px' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisePage;
