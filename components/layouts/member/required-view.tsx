'use client';

import React, { useEffect, useState } from 'react';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';

const MobileOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === null) return null; 

  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pb-24 gap-4 text-center px-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {LABELS.mobileView.banner}
        </h1>
        <ICONS.phone className="w-16 h-16 text-gray-500" />
        <p className="text-lg text-gray-600">
          {LABELS.mobileView.sub}
        </p>
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400" />
        </div>
      </div>
    );
  }

  return <div className='px-10 pt-6'>{children}</div>;
};

export default MobileOnly;
