'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';

export default function TechTestimonials() {
  return (
    <section className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Kata Mereka Tentang <span className="text-perkasa-red">Perkasa</span></h2>
        <p className="text-white drop-shadow-sm font-medium">Bergabung dengan ribuan pelanggan yang telah merasakan kecepatan internet sesungguhnya.</p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/20 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/20 to-transparent z-10" />
        
        <motion.div 
          className="flex gap-6 w-max will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 60 
          }}
        >
          {[...siteConfig.testimonials, ...siteConfig.testimonials].map((item, i) => (
            <div 
              key={i} 
              className="w-[350px] p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#00B4D8]/50 transition-colors shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm drop-shadow-sm">{item.name}</h4>
                    <p className="text-xs text-white font-medium">{item.role}</p>
                  </div>
                </div>
                <Quote size={20} className="text-[#00B4D8]/70" />
              </div>
              
              <p className="text-white text-sm leading-relaxed mb-4 font-medium drop-shadow-sm">"{item.text}"</p>
              
              <div className="flex gap-1">
                {[...Array(item.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
