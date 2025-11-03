'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    __DI_CURRENT_VIDEO?: HTMLVideoElement | null;
  }
}

type VideoPlayerProps = {
  src: string;
  className?: string;
  poster?: string;
  autoPlayOnView?: boolean;
  roundedClassName?: string;
  // Optional playlist support; when provided, arrows appear and videos auto-advance
  playlist?: string[];
};

export default function VideoPlayer({
  src,
  className = '',
  poster,
  autoPlayOnView = true,
  roundedClassName,
  playlist,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const sources = playlist && playlist.length > 0 ? playlist : [src];
  const [sourceIndex, setSourceIndex] = useState(0);
  const activeSrc = sources[sourceIndex] ?? src;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Overlay visibility follows playback state
    const onPlay = () => {
      // Pause any other video that is currently playing
      if (typeof window !== 'undefined') {
        const current = window.__DI_CURRENT_VIDEO;
        if (current && current !== el) {
          try {
            current.pause();
          } catch {}
        }
        window.__DI_CURRENT_VIDEO = el;
      }
      setShowOverlay(false);
    };
    const onPause = () => {
      setShowOverlay(true);
      if (typeof window !== 'undefined' && window.__DI_CURRENT_VIDEO === el) {
        window.__DI_CURRENT_VIDEO = null;
      }
    };
    const onEnded = () => {
      setShowOverlay(true);
      // Auto-advance to next video in playlist, if available
      if (sources.length > 1) {
        setSourceIndex(i => (i + 1) % sources.length);
      }
      if (typeof window !== 'undefined' && window.__DI_CURRENT_VIDEO === el) {
        window.__DI_CURRENT_VIDEO = null;
      }
    };
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
      if (typeof window !== 'undefined' && window.__DI_CURRENT_VIDEO === el) {
        window.__DI_CURRENT_VIDEO = null;
      }
    };
  }, []);

  // When the active source changes (or index changes), restart and play
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    // Reset to start even if src is identical
    try {
      el.currentTime = 0;
    } catch {}
    // Ensure the updated src is loaded before attempting to play
    el.load();
    el.play()
      .then(() => setShowOverlay(false))
      .catch(() => setShowOverlay(true));
  }, [activeSrc, sourceIndex]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            // Always pause when out of view
            el.pause();
          } else if (autoPlayOnView) {
            // Optionally autoplay when in view
            el.play().catch(() => {
              setShowOverlay(true);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlayOnView]);

  return (
    <div className={`relative ${roundedClassName ?? ''}`}>
      <video
        ref={videoRef}
        key={sourceIndex}
        className={className}
        src={activeSrc}
        playsInline
        controls
        preload='auto'
        poster={poster}
      />
      {sources.length > 1 && (
        <>
          <button
            className='absolute left-3 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 shadow flex items-center justify-center cursor-pointer hover:bg-white'
            aria-label='Previous video'
            onClick={() =>
              setSourceIndex(i => (i - 1 + sources.length) % sources.length)
            }
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
                stroke='#111111'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            className='absolute right-3 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 shadow flex items-center justify-center cursor-pointer hover:bg-white'
            aria-label='Next video'
            onClick={() => setSourceIndex(i => (i + 1) % sources.length)}
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
                stroke='#111111'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </>
      )}
      {showOverlay && (
        <button
          className='absolute inset-0 grid place-items-center bg-black/30 transition-colors duration-200 hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer'
          onClick={() => {
            const el = videoRef.current;
            if (!el) return;
            el.play().catch(() => {
              // If playback fails, keep overlay
              setShowOverlay(true);
            });
          }}
          aria-label='Play video'
        >
          <span className='inline-flex items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md w-20 h-20 sm:w-24 sm:h-24 cursor-pointer'>
            <svg
              width='36'
              height='36'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M8 5l12 7-12 7V5z' />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
