'use client';

import { useState, useEffect } from 'react';
import FallingCardsMobile from './FallingCardsMobile';
import FallingCardsDesktop from './FallingCardsDesktop';

export default function ResponsiveFallingCards({
  cards,
  heading1,
  heading2,
}: {
  cards: any[];
  heading1: string;
  heading2: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1200); // lg breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Render mobile version for smaller screens
  if (isMobile) {
    return (
      <FallingCardsMobile
        cards={cards}
        heading1={heading1}
        heading2={heading2}
      />
    );
  }

  // Render desktop version for larger screens
  return (
    <FallingCardsDesktop
      cards={cards}
      heading1={heading1}
      heading2={heading2}
    />
  );
}
