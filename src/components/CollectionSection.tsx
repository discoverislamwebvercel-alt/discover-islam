'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface CollectionItem {
  id: number;
  title: string;
  description: string;
  price: string;
  perItem: string;
  image: string;
  audioUrl?: string; // Audio file URL (to be provided later)
  pdfUrl?: string; // PDF file URL (to be provided later)
  onOrderClick?: () => void;
  onPlayClick?: () => void;
  onViewClick?: () => void;
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

// Play Icon Component
const PlayIcon = () => (
  <svg
    width='15.75'
    height='17.32'
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M3 2.5L13 8.5L3 14.5V2.5Z' fill='#2A2A2A' />
  </svg>
);

// Eye Icon Component
const EyeIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z'
      stroke='#2A2A2A'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle
      cx='12'
      cy='12'
      r='3'
      stroke='#2A2A2A'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// Close Icon Component
const CloseIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 4L4 12M4 4L12 12'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// Audio Player Modal Component
interface AudioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CollectionItem | null;
}

const AudioPlayerModal = ({ isOpen, onClose, item }: AudioPlayerModalProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / duration) * 100 || 0);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [duration]);

  useEffect(() => {
    if (!isOpen) {
      // Reset audio when modal closes
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
      }
    }
  }, [isOpen]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[445px] h-[622px] bg-white rounded-[20px] p-6 flex flex-col items-center gap-[21px]'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Content Container */}
            <div className='flex flex-col items-start gap-[14px] w-[397px]'>
              {/* Header */}
              <div className='flex flex-row items-center gap-[25px] w-[397px] h-[29px]'>
                <h3 className='w-[222px] h-[29px] font-bold text-[24px] leading-[29px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                  Hear It
                </h3>
                <button
                  onClick={onClose}
                  className='flex items-center justify-center w-7 h-7 bg-[#111111] rounded-full hover:opacity-80 transition-opacity ml-auto'
                  aria-label='Close modal'
                >
                  <CloseIcon />
                </button>
              </div>
              {/* Image */}
              <div className='relative w-[397px] h-[375px] rounded-[20px] overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover'
                  sizes='397px'
                />
              </div>

              {/* Title */}
              <h4 className='w-[397px] h-[24px] font-bold text-[20px] leading-[24px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                {item.title}
              </h4>

              {/* Audio Player */}
              <div className='flex flex-col items-start gap-[9px] w-[395px]'>
                {/* Progress Bar */}
                <div className='relative w-[394px] h-[3px] bg-[#F3F3F3] rounded-full overflow-hidden'>
                  <div
                    className='absolute left-0 top-0 h-full bg-[#4C735D] rounded-full transition-all duration-100'
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Time Display */}
                <div className='flex flex-row justify-between items-start w-[395px] h-[17px]'>
                  <span className='font-normal text-[14px] leading-[17px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                    {formatTime(currentTime)}
                  </span>
                  <span className='font-normal text-[14px] leading-[17px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Play Button - Centered */}
                <div className='flex justify-center w-full'>
                  <button
                    onClick={togglePlayPause}
                    className='w-[40px] h-[40px] bg-[#111111] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect x='4' y='2' width='3' height='12' fill='white' />
                        <rect x='9' y='2' width='3' height='12' fill='white' />
                      </svg>
                    ) : (
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M4 2L14 8L4 14V2Z' fill='white' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={item.audioUrl} preload='metadata' />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// PDF Viewer Modal Component
interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CollectionItem | null;
}

const PDFViewerModal = ({ isOpen, onClose, item }: PDFViewerModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1); // Will be updated when PDF is loaded
  const pdfRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleFullscreen = () => {
    // Fullscreen functionality will be implemented when PDF viewer is integrated
    // For now, this is a placeholder
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[636px] h-[1022px] bg-white rounded-[25px] p-[30px] flex flex-col items-center gap-[26px]'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex flex-row items-center gap-[31px] w-[558px] h-[35px]'>
              <h3 className='w-[280px] h-[29px] font-bold text-[24px] leading-[29px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                Read It
              </h3>
              <button
                onClick={onClose}
                className='flex items-center justify-center w-7 h-7 bg-[#111111] rounded-full hover:opacity-80 transition-opacity ml-auto'
                aria-label='Close modal'
              >
                <CloseIcon />
              </button>
            </div>

            {/* PDF Viewer Container */}
            <div className='flex flex-row items-start gap-[26px] w-[558px] h-[792px]'>
              <div className='relative w-[558px] h-[792px] bg-[#D9D9D9] rounded-lg overflow-hidden'>
                {/* Fullscreen/Zoom Icon */}
                <button
                  onClick={handleFullscreen}
                  className='absolute right-4 top-4 w-[36px] h-[36px] bg-black rounded flex items-center justify-center hover:opacity-80 transition-opacity z-10'
                  aria-label='Fullscreen'
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>

                {/* PDF Viewer - Placeholder for now */}
                {item.pdfUrl ? (
                  <iframe
                    ref={pdfRef}
                    src={`${item.pdfUrl}#page=${currentPage}`}
                    className='w-full h-full border-0'
                    title={`PDF Viewer - ${item.title}`}
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-500'>
                    <p>PDF will be loaded here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <h4 className='w-[558px] h-[29px] font-bold text-[24px] leading-[29px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
              {item.title}
            </h4>

            {/* Navigation Controls */}
            <div className='flex flex-row justify-between items-start gap-[26px] w-[558px] h-[24px]'>
              {/* Previous Page */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='flex flex-row items-center gap-2 w-[150px] h-[24px] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity'
              >
                <svg
                  width='19'
                  height='12'
                  viewBox='0 0 19 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 6L2 6M2 6L7 1M2 6L7 11'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span className='font-medium text-[20px] leading-[24px] tracking-[-0.03em] text-[#111111E5]'>
                  Previous Page
                </span>
              </button>

              {/* Next Page */}
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className='flex flex-row items-center gap-2 w-[114px] h-[24px] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity'
              >
                <span className='font-medium text-[20px] leading-[24px] tracking-[-0.03em] text-[rgba(17,17,17,0.9)]'>
                  Next Page
                </span>
                <svg
                  width='19'
                  height='12'
                  viewBox='0 0 19 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 6L17 6M17 6L12 1M17 6L12 11'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function CollectionSection({
  title = 'Shop from our collection',
  subtitle,
  items,
  className = '',
  id,
}: CollectionSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPDFItem, setSelectedPDFItem] = useState<CollectionItem | null>(
    null
  );
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const collections = items || [];
  const cardWidth = 397;
  const cardGap = 14;

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

  // Auto-scroll carousel
  useEffect(() => {
    if (collections.length <= 1) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % collections.length);
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [collections.length, isPaused]);

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
              className='flex flex-row items-center gap-[14px] transition-transform duration-700 ease-in-out'
              style={{
                transform: `translateX(calc(50vw - ${currentIndex * (cardWidth + cardGap) + cardWidth / 2}px))`,
              }}
            >
              {collections.map(collection => (
                <div
                  key={collection.id}
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
