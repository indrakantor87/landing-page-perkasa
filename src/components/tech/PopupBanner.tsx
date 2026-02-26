'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PopupBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        role="dialog"
        aria-modal="true"
        onClick={close}
        onKeyDown={(e) => e.key === 'Escape' && close()}
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-[560px] rounded-[28px] shadow-[0_25px_80px_rgba(0,0,0,0.6)] ring-1 ring-white/10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="Tutup"
            onClick={close}
            className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition"
          >
            <X size={18} />
          </button>

          {/* Image wrapper - clean, no scroll */}
          <div className="relative w-full bg-gradient-to-b from-white/5 to-transparent">
            <Image
              src={'/pop%20up%20banner.jpeg'}
              alt="Promo Perkasa Networks"
              width={1120}
              height={1792}
              className="w-full h-auto max-h-[78vh] object-contain"
              sizes="(max-width: 640px) 90vw, 560px"
              priority
            />
          </div>

          {/* No bottom button for a cleaner look */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
