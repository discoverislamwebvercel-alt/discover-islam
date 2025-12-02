'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import type { CollectionItem } from './AudioPlayerModal';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CollectionItem | null;
}

const PDFViewerModal = ({ isOpen, onClose, item }: PDFViewerModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pdfRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(1);
    } else if (isOpen && item?.pdfUrl) {
      // Reset to page 1 when modal opens with a new PDF
      setCurrentPage(1);
    }
  }, [isOpen, item?.pdfUrl]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    // Allow navigation - if we go beyond actual pages, browser PDF viewer will handle it
    setCurrentPage(prev => prev + 1);
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

                {/* PDF Viewer */}
                {item.pdfUrl ? (
                  <iframe
                    key={`pdf-${item.pdfUrl}-page-${currentPage}`}
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
                className='flex flex-row items-center gap-2 w-[114px] h-[24px] hover:opacity-80 transition-opacity'
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

export default PDFViewerModal;
