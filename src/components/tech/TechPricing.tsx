'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';
import { siteConfig, iconMap } from '@/data/site-config';

export default function TechPricing() {
  const activeTab = 'home'; // Force only 'home' package
  const HomeIcon = iconMap.Home;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#020617]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,102,255,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Pilih Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D00] to-[#FF9100]">Sesuai Kebutuhan</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Solusi internet terbaik untuk rumah, bisnis, hingga korporasi dengan kecepatan stabil dan harga terjangkau.
          </p>
        </div>

        {/* Package Description */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
            <HomeIcon className="w-5 h-5 text-perkasa-red" />
            <h3 className="text-xl font-semibold text-white tracking-wide">{siteConfig.packages[activeTab].title}</h3>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">{siteConfig.packages[activeTab].desc}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
          {siteConfig.packages[activeTab].plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={clsx(
                'relative p-8 rounded-3xl border flex flex-col transition-all duration-300 group',
                (plan as any).popular 
                  ? 'bg-gradient-to-b from-white/10 to-white/5 border-perkasa-red/40 shadow-2xl shadow-perkasa-red/10 scale-105 z-10' 
                  : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]'
              )}
            >
              {(plan as any).popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF3D00] to-[#FF9100] text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg ring-1 ring-white/20">
                  Rekomendasi
                </div>
              )}

              <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-gray-400 uppercase group-hover:text-white transition-colors">
                {plan.name}
              </h3>
              
              <div className="mb-6 pb-6 border-b border-white/5">
                <span className="text-5xl font-bold text-white tracking-tighter">{plan.speed}</span>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                {plan.price === 'Call Us' ? (
                   <span className="text-2xl font-bold text-white">Hubungi Kami</span>
                ) : (
                  <>
                    <span className="text-sm text-gray-400 font-medium">Rp</span>
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">{plan.price}</span>
                    <span className="text-sm text-gray-500 font-medium">/bln</span>
                  </>
                )}
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    <div className="p-1 rounded-full bg-perkasa-blue/10 shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-perkasa-blue" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/6281252000220?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(plan.name)}%20(${siteConfig.packages[activeTab].title})`}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'w-full py-4 rounded-xl font-bold transition-all text-center block tracking-wide text-sm relative overflow-hidden',
                  (plan as any).popular
                    ? 'bg-gradient-to-r from-[#FF4500] via-[#8A2BE2] to-[#0066FF] text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                )}
              >
                Pilih Paket
              </a>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              *Harga sudah termasuk PPN 11%. Syarat dan ketentuan berlaku. Kecepatan up to (hingga) sesuai paket yang dipilih.
              Ketersediaan jaringan fiber optic bergantung pada lokasi.
            </p>
        </div>
      </div>
    </section>
  );
}
