'use client';

import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/site-config';

export default function TechAnnouncement() {
  const [isVisible, setIsVisible] = useState(siteConfig.announcement.active);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-perkasa-red/90 to-perkasa-blue/90 text-white relative z-[60]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3 text-xs md:text-sm font-medium">
          <Zap size={14} className="text-yellow-300 fill-yellow-300 animate-pulse" />
          <span>
            <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded text-[10px] mr-2">{siteConfig.announcement.badge}</span>
            {siteConfig.announcement.text}
          </span>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
