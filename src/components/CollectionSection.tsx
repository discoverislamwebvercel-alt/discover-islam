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
  const cardWidth =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 397;
  const cardGap =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 14;
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
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-extrabold leading-tight text-center mb-2 sm:mb-3 md:mb-4'>
            {title}
          </h2>
          {subtitle && (
            <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-[60px] font-bold leading-tight text-center'>
              {subtitle}
            </h3>
          )}
        </motion.div>

        {/* Carousel Container */}
        <div
          className='overflow-hidden relative w-full min-h-[500px] sm:min-h-[550px] md:min-h-[630px]'
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
                  className='flex flex-col items-start gap-3 sm:gap-4 md:gap-[19px] flex-none w-[280px] sm:w-[320px] md:w-[397px]'
                >
                  {/* Image Container */}
                  <div className='relative w-[280px] sm:w-[320px] md:w-[397px] h-[265px] sm:h-[300px] md:h-[375px] rounded-[16px] sm:rounded-[18px] md:rounded-[22.01px] overflow-hidden'>
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className='object-cover'
                      sizes='397px'
                    />
                  </div>

                  {/* Content Section */}
                  <div className='flex flex-col items-start gap-4 sm:gap-5 md:gap-[27px] w-[280px] sm:w-[320px] md:w-[397px] flex-none self-stretch flex-grow-0'>
                    {/* Title and Description */}
                    <div className='flex flex-col items-start gap-1 w-full'>
                      <h3 className='w-full font-bold text-lg sm:text-xl md:text-[24px] leading-tight tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                        {collection.title}
                      </h3>
                      <p className='w-full font-normal text-sm sm:text-base md:text-[20px] leading-snug tracking-[-0.03em] text-[rgba(17,17,17,0.9)] line-clamp-3'>
                        {collection.description}
                      </p>
                    </div>

                    {/* Price and Buttons */}
                    <div className='flex flex-col items-start gap-3 sm:gap-4 md:gap-[15px] w-full'>
                      {/* Price */}
                      <p className='font-bold text-lg sm:text-xl md:text-[24px] leading-tight text-[#CB892A]'>
                        {collection.price}{' '}
                        <span className='text-sm sm:text-base md:text-[18px] leading-[100%] text-gray-400 font-semibold'>
                          {collection.perItem}
                        </span>
                      </p>

                      {/* Buttons Row */}
                      <div className='flex flex-row items-start gap-2 w-full max-w-[302px]'>
                        {/* Order Button */}
                        <button
                          onClick={collection.onOrderClick}
                          className='flex flex-row justify-center items-center px-6 sm:px-8 md:px-[37px] py-3 sm:py-4 md:py-[18px] gap-2 w-auto sm:w-[140px] md:w-[164px] h-[48px] sm:h-[54px] md:h-[60px] bg-[#4C735D] rounded-[40px] sm:rounded-[46px] md:rounded-[52px] flex-none order-0 flex-grow-0 hover:bg-[#3d5c4a] transition-colors'
                        >
                          <span className='font-extrabold text-base sm:text-lg md:text-[20px] leading-tight text-white whitespace-nowrap'>
                            Order
                          </span>
                        </button>

                        {/* Play Button */}
                        <button
                          onClick={() => handlePlayClick(collection)}
                          className='flex flex-col justify-center items-center px-3 sm:px-4 md:px-[18px] py-2 sm:py-3 md:py-[12px] gap-2 w-[48px] sm:w-[54px] md:w-[61px] h-[48px] sm:h-[54px] md:h-[60px] bg-[rgba(17,17,17,0.1)] rounded-full flex-none order-1 flex-grow-0 hover:bg-[rgba(17,17,17,0.15)] transition-colors'
                        >
                          <PlayIcon />
                        </button>

                        {/* Eye/View Button */}
                        <button
                          onClick={() => handleViewClick(collection)}
                          className='flex flex-col justify-center items-center px-3 sm:px-4 md:px-[18px] py-2 sm:py-3 md:py-[12px] gap-2 w-[48px] sm:w-[54px] md:w-[61px] h-[48px] sm:h-[54px] md:h-[60px] bg-[rgba(17,17,17,0.1)] rounded-full flex-none order-2 flex-grow-0 hover:bg-[rgba(17,17,17,0.15)] transition-colors'
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
