'use client';

import dynamic from 'next/dynamic';

const ClientMap = dynamic(() => import('./ClientMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg animate-pulse">
      <p className="text-gray-400">Loading Map...</p>
    </div>
  ),
});

export default function MapPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  return <ClientMap onLocationSelect={onLocationSelect} />;
}
