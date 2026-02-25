'use client';

import Image from 'next/image';

export default function TechBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Image
        src="/background-web.jpg"
        alt="Circuit Background"
        fill
        className="object-cover opacity-50"
        priority
        sizes="100vw"
        quality={60}
      />
      <div className="absolute inset-0 bg-[#0B0F19]/80 mix-blend-multiply" />
    </div>
  );
}
