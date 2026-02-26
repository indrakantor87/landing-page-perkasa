'use client';

import { useState } from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import CoverageCheckModal from './CoverageCheckModal';

export default function BottomActionBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998] w-[92vw] max-w-2xl bg-[#0B0F19]/90 backdrop-blur border border-white/10 rounded-2xl shadow-2xl p-2 flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-perkasa-red to-perkasa-blue text-white font-bold hover:opacity-90 transition"
        >
          <MapPin className="w-5 h-5" />
          Cek Ketersediaan
        </button>
        <a
          href="https://wa.me/6281252000220?text=Halo%20Admin%20Perkasa%20Networks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition"
        >
          <MessageCircle className="w-5 h-5" />
          Chat
        </a>
      </div>

      <CoverageCheckModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

