'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/site-config';

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-perkasa-red/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg shadow-black/50">
            Tentang <span className="text-perkasa-red drop-shadow-lg shadow-black/50">Kami</span>
          </h1>
          <div className="text-xl text-white max-w-3xl mx-auto leading-relaxed space-y-6 drop-shadow-md shadow-black/80 font-medium">
            {(Array.isArray(siteConfig.company.description) 
              ? siteConfig.company.description 
              : [siteConfig.company.description]
            ).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
