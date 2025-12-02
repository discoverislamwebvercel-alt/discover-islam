'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import PlayIcon from './icons/PlayIcon';
import EyeIcon from './icons/EyeIcon';
import AudioPlayerModal, {
  type CollectionItem,
} from './common/AudioPlayerModal';
import PDFViewerModal from './common/PDFViewerModal';

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
  subtitle,
  items,
  className = '',
  id,
}: CollectionSectionProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPDFItem, setSelectedPDFItem] = useState<CollectionItem | null>(
    null
  );
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const originalItems = items || [];

  // Create infinite loop by duplicating items multiple times
  const collections =
    originalItems.length > 0
      ? [...originalItems, ...originalItems, ...originalItems]
      : [];
  const cardWidth = 397;
  const cardGap = 14;
  const itemsPerSet = originalItems.length;

  // Initialize to start of second set for seamless looping
  const [currentIndex, setCurrentIndex] = useState(() => {
    return itemsPerSet > 0 ? itemsPerSet : 0;
  });

  const handlePlayClick = (item: CollectionItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleViewClick = (item: CollectionItem) => {
    setSelectedPDFItem(item);
    setIsPDFModalOpen(true);
  };

  const handleClosePDFModal = () => {
    setIsPDFModalOpen(false);
    setSelectedPDFItem(null);
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

  // Auto-scroll carousel with infinite loop
  useEffect(() => {
    if (collections.length <= 1 || itemsPerSet === 0) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;

        // If we've reached the end of the second set, jump back to the start of the second set
        // This creates a seamless infinite loop
        if (nextIndex >= itemsPerSet * 2) {
          // Disable transition temporarily for instant reset
          isTransitioningRef.current = true;
          // Use requestAnimationFrame to ensure the state update happens after render
          requestAnimationFrame(() => {
            setCurrentIndex(itemsPerSet);
            // Re-enable transition after a brief delay
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 50);
          });
          return itemsPerSet;
        }

        return nextIndex;
      });
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [collections.length, itemsPerSet, isPaused]);

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`}
    >
      <div className='max-w-[1630px] mx-auto'>
        {/* Title Section */}
        <motion.div
          className='text-center mb-12 sm:mb-16'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <h2 className='text-[80px] font-extrabold leading-[107%] tracking-normal text-center mb-4'>
            {title}
          </h2>
          {subtitle && (
            <h3 className='text-[60px] font-bold leading-[107%] tracking-normal text-center'>
              {subtitle}
            </h3>
          )}
        </motion.div>

        {/* Carousel Container */}
        <div
          className='overflow-hidden relative w-full min-h-[630px]'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className='relative w-full h-full flex items-center'>
            <div
              ref={carouselRef}
              className={`flex flex-row items-center gap-[14px] ${
                isTransitioningRef.current
                  ? ''
                  : 'transition-transform duration-700 ease-in-out'
              }`}
              style={{
                transform: `translateX(calc(50vw - ${currentIndex * (cardWidth + cardGap) + cardWidth / 2}px))`,
              }}
            >
              {collections.map((collection, index) => (
                <div
                  key={`${collection.id}-${index}`}
                  className='flex flex-col items-start gap-[19px] flex-none w-[397px]'
                >
                  {/* Image Container */}
                  <div className='relative w-[397px] h-[375px] rounded-[22.01px] overflow-hidden'>
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className='object-cover'
                      sizes='397px'
                    />
                  </div>

                  {/* Content Section */}
                  <div className='flex flex-col items-start gap-[27px] w-[397px] flex-none self-stretch flex-grow-0'>
                    {/* Title and Description */}
                    <div className='flex flex-col items-start gap-1 w-full'>
                      <h3 className='w-full h-[29px] font-bold text-[24px] leading-[29px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                        {collection.title}
                      </h3>
                      <p className='w-[389px] h-[72px] font-normal text-[20px] leading-[24px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                        {collection.description}
                      </p>
                    </div>

                    {/* Price and Buttons */}
                    <div className='flex flex-col items-start gap-[15px] w-[302px] h-[104px]'>
                      {/* Price */}
                      <p className=' h-[29px] font-bold text-[24px] leading-[29px] text-[#CB892A]'>
                        {collection.price}{' '}
                        <span className='text-[18px] leading-[100%] text-gray-400 font-semibold'>
                          {collection.perItem}
                        </span>
                      </p>

                      {/* Buttons Row */}
                      <div className='flex flex-row items-start gap-2 w-[302px] h-[60px]'>
                        {/* Order Button */}
                        <button
                          onClick={collection.onOrderClick}
                          className='flex flex-row justify-center items-center px-[37px] py-[18px] gap-[10px] w-[164px] h-[60px] bg-[#4C735D] rounded-[52px] flex-none order-0 flex-grow-0 hover:bg-[#3d5c4a] transition-colors'
                        >
                          <span className='w-[55px] h-[24px] font-extrabold text-[20px] leading-[24px] text-white'>
                            Order
                          </span>
                        </button>

                        {/* Play Button */}
                        <button
                          onClick={() => handlePlayClick(collection)}
                          className='flex flex-col justify-center items-center px-[18px] py-[12px] gap-[10px] w-[61px] h-[60px] bg-[rgba(17,17,17,0.1)] rounded-[200px] flex-none order-1 flex-grow-0 hover:bg-[rgba(17,17,17,0.15)] transition-colors'
                        >
                          <PlayIcon />
                        </button>

                        {/* Eye/View Button */}
                        <button
                          onClick={() => handleViewClick(collection)}
                          className='flex flex-col justify-center items-start px-[18px] py-[12px] gap-[10px] w-[61px] h-[60px] bg-[rgba(17,17,17,0.1)] rounded-[200px] flex-none order-2 flex-grow-0 hover:bg-[rgba(17,17,17,0.15)] transition-colors'
                        >
                          <EyeIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Audio Player Modal */}
      <AudioPlayerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isPDFModalOpen}
        onClose={handleClosePDFModal}
        item={selectedPDFItem}
      />
    </section>
  );
}
