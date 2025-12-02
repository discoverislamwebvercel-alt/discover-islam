'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';

export interface CollectionItem {
  id: number;
  title: string;
  description: string;
  price: string;
  perItem: string;
  image: string;
  audioUrl?: string;
  pdfUrl?: string;
  onOrderClick?: () => void;
  onPlayClick?: () => void;
  onViewClick?: () => void;
}

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const current = audio.currentTime;
      const total = audio.duration;

      if (isFinite(current) && current >= 0) {
        setCurrentTime(current);
      }

      if (isFinite(total) && total > 0) {
        setDuration(total);
        const progressPercent = (current / total) * 100;
        setProgress(isFinite(progressPercent) ? progressPercent : 0);
      }
    };

    const updateDuration = () => {
      const total = audio.duration;
      if (isFinite(total) && total > 0) {
        setDuration(total);
        setIsLoading(false);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      const total = audio.duration;
      if (isFinite(total) && total > 0) {
        setDuration(total);
      }
    };

    const handleError = () => {
      setIsLoading(false);
      console.error('Error loading audio');
    };

    // Add all event listeners
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', updateDuration);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Try to load duration if already available
    if (audio.readyState >= 1) {
      const total = audio.duration;
      if (isFinite(total) && total > 0) {
        setDuration(total);
        setIsLoading(false);
      }
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', updateDuration);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isOpen, item?.audioUrl]);

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
        setDuration(0);
        setIsLoading(true);
      }
    } else if (isOpen && item?.audioUrl) {
      // When modal opens, try to load the audio
      const audio = audioRef.current;
      if (audio) {
        audio.load();
      }
    }
  }, [isOpen, item?.audioUrl]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !item?.audioUrl) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        // Ensure audio is loaded before playing
        if (audio.readyState < 2) {
          await audio.load();
        }
        await audio.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || seconds < 0 || isNaN(seconds)) {
      return '00:00';
    }
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
                    disabled={isLoading && !item?.audioUrl}
                    className='w-[40px] h-[40px] bg-[#111111] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
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
            <audio
              ref={audioRef}
              src={item.audioUrl}
              preload='metadata'
              onLoadedMetadata={e => {
                const audio = e.currentTarget;
                if (isFinite(audio.duration) && audio.duration > 0) {
                  setDuration(audio.duration);
                  setIsLoading(false);
                }
              }}
              onTimeUpdate={e => {
                const audio = e.currentTarget;
                const current = audio.currentTime;
                const total = audio.duration;

                if (isFinite(current) && current >= 0) {
                  setCurrentTime(current);
                }

                if (isFinite(total) && total > 0) {
                  const progressPercent = (current / total) * 100;
                  setProgress(isFinite(progressPercent) ? progressPercent : 0);
                }
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                setCurrentTime(0);
                setProgress(0);
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AudioPlayerModal;
