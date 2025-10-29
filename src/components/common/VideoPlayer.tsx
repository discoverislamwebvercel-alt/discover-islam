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
  const [needsUserAction, setNeedsUserAction] = useState(false);

  useEffect(() => {
    if (!autoPlayOnView) return;
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              setNeedsUserAction(true);
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
        autoPlay
        controls
        preload='auto'
        poster={poster}
        onLoadedData={() => {
          const el = videoRef.current;
          if (!el) return;
          if (el.paused) {
            el.play().catch(() => {
              setNeedsUserAction(true);
            });
          }
        }}
      />
      {needsUserAction && (
        <button
          className='absolute inset-0 flex items-center justify-center bg-black/30 text-white text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-black/40 hover:scale-[1.02] active:scale-[0.98]'
          onClick={() => {
            const el = videoRef.current;
            if (!el) return;
            el.play()
              .then(() => setNeedsUserAction(false))
              .catch(() => setNeedsUserAction(true));
          }}
          aria-label='Play video'
        >
          Tap to Play
        </button>
      )}
    </div>
  );
}
