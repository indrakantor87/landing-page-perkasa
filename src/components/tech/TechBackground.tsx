'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function TechBackground() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="fixed inset-0 z-0">
      <Image
        src="/main-bg5.jpg"
        alt="Circuit Background"
        fill
        className={`object-cover transition-opacity duration-700 ease-out ${loaded ? 'opacity-90' : 'opacity-0'}`}
        priority
        sizes="100vw"
        quality={70}
        onLoadingComplete={() => setLoaded(true)}
      />
      {/* Fallback gradient while image fades in */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[#0a1a2b] to-[#0f172a] transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}
