'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Laptop, Tv, Upload, Globe, Cpu } from 'lucide-react';
import clsx from 'clsx';

const features = [
  {
    title: 'Optimal untuk Gaming',
    description: 'Routing prioritas untuk server game populer. Ping rendah, tanpa packet loss.',
    icon: Gamepad2,
    color: 'text-perkasa-red',
    colSpan: 'md:col-span-2',
    bg: 'bg-red-900/10',
    border: 'hover:border-red-500/50',
  },
  {
    title: 'Kecepatan Simetris',
    description: 'Kecepatan upload setara dengan download. Sempurna untuk kreator.',
    icon: Upload,
    color: 'text-perkasa-blue',
    colSpan: 'md:col-span-1',
    bg: 'bg-blue-900/10',
    border: 'hover:border-blue-500/50',
  },
  {
    title: 'Streaming 4K/8K',
    description: 'Streaming tanpa buffering untuk Netflix, YouTube, dan lainnya.',
    icon: Tv,
    color: 'text-perkasa-red',
    colSpan: 'md:col-span-1',
    bg: 'bg-red-900/10',
    border: 'hover:border-red-500/50',
  },
  {
    title: 'Bandwidth Terdedikasi',
    description: 'Tidak dibagi dengan tetangga. Kecepatan Anda terjamin 24/7.',
    icon: Laptop,
    color: 'text-perkasa-blue',
    colSpan: 'md:col-span-2',
    bg: 'bg-blue-900/10',
    border: 'hover:border-blue-500/50',
  },
];

export default function TechFeatures() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Dirancang untuk <span className="text-perkasa-red">Performa</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Infrastruktur kami dibangun dengan teknologi fiber optic generasi terbaru untuk memberikan koneksi paling andal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={clsx(
                'p-8 rounded-2xl border border-white/5 backdrop-blur-sm transition-all duration-300 group h-full',
                feature.colSpan,
                feature.bg,
                feature.border
              )}
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className={clsx('w-6 h-6', feature.color)} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
