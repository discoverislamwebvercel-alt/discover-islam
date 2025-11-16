'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Button from './common/Button';

interface CollectionItem {
  id: number;
  title: string;
  price: string;
  image: string;
}

interface CollectionSectionProps {
  title?: string;
  subtitle?: string;
  items?: CollectionItem[];
  showViewMoreButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  id?: string;
}

export default function CollectionSection({
  title = 'Shop from our collection',
  items,
  showViewMoreButton = true,
  buttonText = 'View More',
  onButtonClick,
  className = '',
  id,
}: CollectionSectionProps) {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const collections = items || [];

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`}
    >
      <div className='max-w-[1220px] mx-auto'>
        {/* Title Section */}
        <motion.div
          className='text-center mb-12 sm:mb-16'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-bold leading-tight mb-4'>
            {title}
          </h2>
        </motion.div>

        <motion.div
          className='mx-auto my-10 text-center max-w-[1063px]'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.4 }}
          variants={textVariants}
        >
          <p className='text-[24px] md:text-[28px] lg:text-[30px] leading-[30px] md:leading-[34px] lg:leading-[36px] text-[rgba(17,17,17,0.8)] font-[500]'>
            Discover timeless wisdom and modern insight through our collection
            of short guides — designed to inspire reflection, learning, and
            understanding.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {collections.map(collection => (
            <motion.div
              key={collection.id}
              className='group cursor-pointer'
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <div className='relative bg-gray-200 overflow-hidden mb-4 aspect-square rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.25)]'>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-[22px]'
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />
              </div>

              {/* Content */}
              <div className='text-left'>
                <h3 className='mb-2 group-hover:text-[#408360] transition-colors duration-300 text-[46px] font-bold text-[#111111E5]'>
                  {collection.title}
                </h3>
                <p className='text-[26px] font-medium text-[#111111E5]'>
                  {collection.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {showViewMoreButton && (
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant='primary'
              onClick={onButtonClick}
              className='!px-8 !py-3 !font-semibold shadow-lg hover:shadow-xl'
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
