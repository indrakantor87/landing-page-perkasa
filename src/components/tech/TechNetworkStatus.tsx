'use client';

import { Activity } from 'lucide-react';

export default function TechNetworkStatus() {
  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">
        All Systems Operational
      </span>
    </div>
  );
}
