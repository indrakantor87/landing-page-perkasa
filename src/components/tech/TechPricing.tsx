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
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,180,216,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
            Pilih Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D00] to-[#FF9100] drop-shadow-[0_0_15px_rgba(255,61,0,0.5)]">Sesuai Kebutuhan</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto font-medium drop-shadow-md">
            Solusi internet terbaik untuk rumah, bisnis, hingga korporasi dengan kecepatan stabil dan harga terjangkau.
          </p>
        </div>

        {/* Package Description */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm mb-4">
            <HomeIcon className="w-5 h-5 text-perkasa-red" />
            <h3 className="text-xl font-semibold text-white tracking-wide">{siteConfig.packages[activeTab].title}</h3>
          </div>
          <p 
            className="text-lg max-w-xl mx-auto font-medium drop-shadow-md text-white"
            style={{ color: '#ffffff' }}
          >
            <span className="text-white" style={{ color: '#ffffff' }}>
              {siteConfig.packages[activeTab].desc}
            </span>
          </p>
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
                'relative p-8 rounded-3xl border flex flex-col transition-all duration-300 group backdrop-blur-sm',
                (plan as any).popular 
                  ? 'bg-black/30 border-[#00B4D8]/50 shadow-[0_0_30px_rgba(0,180,216,0.2)] scale-105 z-10 will-change-transform' 
                  : 'bg-black/20 border-white/10 hover:border-[#00B4D8]/30 hover:bg-black/30'
              )}
            >
              {(plan as any).popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF3D00] to-[#FF9100] text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg ring-1 ring-white/20">
                  Rekomendasi
                </div>
              )}

              <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-white uppercase group-hover:text-white transition-colors">
                {plan.name}
              </h3>
              
              <div className="mb-6 pb-6 border-b border-white/5">
                <span className="text-5xl font-bold text-white tracking-tighter">{plan.speed}</span>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                {plan.price === 'Call Us' ? (
                   <span className="text-2xl font-bold text-white drop-shadow-md">Hubungi Kami</span>
                ) : (
                  <>
                    <span className="text-sm text-white font-medium">Rp</span>
                    <span className="text-4xl font-bold text-white drop-shadow-md">{plan.price}</span>
                    <span className="text-sm text-white font-medium">/bln</span>
                  </>
                )}
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white text-sm group-hover:text-white transition-colors font-medium drop-shadow-sm">
                    <div className="p-1 rounded-full bg-[#00B4D8]/20 shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#00B4D8]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/6281252000220?text=Halo,%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(plan.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'w-full py-3 rounded-xl font-bold transition-all text-center block shadow-lg',
                  (plan as any).popular
                    ? 'bg-gradient-to-r from-[#FF3D00] to-[#FF9100] hover:from-[#E63600] hover:to-[#E68200] text-white shadow-[#FF3D00]/30 hover:shadow-[#FF3D00]/50'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30'
                )}
              >
                Pilih Paket
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-white text-sm max-w-2xl mx-auto font-medium drop-shadow-sm">
              *Harga sudah termasuk PPN 11%. Syarat dan ketentuan berlaku. Kecepatan up to (hingga) sesuai paket yang dipilih.
              Ketersediaan jaringan fiber optic bergantung pada lokasi.
            </p>
        </div>
      </div>
    </section>
  );
}
