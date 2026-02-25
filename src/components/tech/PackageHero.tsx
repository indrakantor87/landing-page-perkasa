'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PackageHeroProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export default function PackageHero({ title, description, Icon }: PackageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-perkasa-red/10 to-[#0B0F19]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/10"
        >
          <Icon size={40} className="text-perkasa-red" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
