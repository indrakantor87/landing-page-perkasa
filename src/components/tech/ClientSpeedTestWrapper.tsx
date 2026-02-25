'use client';

import dynamic from 'next/dynamic';

const TechSpeedTest = dynamic(() => import('./TechSpeedTest'), { ssr: false });

export default function ClientSpeedTestWrapper() {
  return <TechSpeedTest />;
}
