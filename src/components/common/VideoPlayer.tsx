'use client';

import { useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
  src: string;
  className?: string;
  poster?: string;
  autoPlayOnView?: boolean;
  roundedClassName?: string;
};

export default function VideoPlayer({
  src,
  className = '',
  poster,
  autoPlayOnView = true,
  roundedClassName,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Overlay visibility follows playback state
    const onPlay = () => setShowOverlay(false);
    const onPause = () => setShowOverlay(true);
    const onEnded = () => setShowOverlay(true);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    if (!autoPlayOnView) return;
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              // If browser blocks autoplay, keep overlay until user clicks
              setShowOverlay(true);
            });
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlayOnView]);

  return (
    <div className={`relative ${roundedClassName ?? ''}`}>
      <video
        ref={videoRef}
        className={className}
        src={src}
        playsInline
        controls
        preload='auto'
        poster={poster}
      />
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
