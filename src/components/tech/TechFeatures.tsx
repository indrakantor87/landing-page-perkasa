'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Laptop, Tv, Upload, MessageCircle } from 'lucide-react';
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
    colSpan: 'md:col-span-1',
    bg: 'bg-blue-900/10',
    border: 'hover:border-blue-500/50',
  },
  {
    title: 'Support 24 Jam',
    description: 'Bantuan teknis siap sedia kapanpun. Klik untuk chat WhatsApp sekarang.',
    icon: MessageCircle,
    color: 'text-green-500',
    colSpan: 'md:col-span-1',
    bg: 'bg-green-900/10',
    border: 'hover:border-green-500/50 cursor-pointer',
    href: 'https://wa.me/6282225500100',
  },
];

export default function TechFeatures() {
  return (
    <section id="features" className="py-24 relative">
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
          {features.map((feature, index) => {
            const Component = (feature as any).href ? motion.a : motion.div;
            const hrefProps = (feature as any).href ? { href: (feature as any).href, target: '_blank', rel: 'noopener noreferrer' } : {};
            
            return (
              <Component
                key={feature.title}
                {...hrefProps}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={clsx(
                  'p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-black/40 transition-all duration-300 group h-full block shadow-lg hover:bg-black/60 will-change-transform',
                  feature.colSpan,
                  feature.border
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className={clsx('w-6 h-6', feature.color)} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">{feature.title}</h3>
                <p className="text-gray-200 leading-relaxed font-medium drop-shadow-sm">{feature.description}</p>
              </Component>
            );
          })}
        </div>
      </div>
    </section>
  );
}
