'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'perkasa_popup_banner_dismissed_at';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function PopupBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts < ONE_DAY_MS) {
          return; // recently dismissed
        }
      }
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    } catch {
      // ignore storage errors
      setOpen(true);
    }
  }, []);

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[880px] bg-[#0B0F19] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        <button
          aria-label="Tutup"
          onClick={close}
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full p-2 bg-black/40 text-white hover:bg-black/60 transition"
        >
          <X size={18} />
        </button>

        {/* Image wrapper keeps aspect ratio and responsiveness */}
        <div className="relative w-full h-auto">
          {/* Next/Image requires URL encoding for spaces in public filenames */}
          <Image
            src={'/pop%20up%20banner.jpeg'}
            alt="Promo Perkasa Networks"
            width={1600}
            height={900}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="flex items-center justify-end gap-3 px-4 py-3 bg-black/30">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

