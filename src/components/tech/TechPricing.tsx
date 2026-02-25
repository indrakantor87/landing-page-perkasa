'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';
import { siteConfig, iconMap } from '@/data/site-config';

export default function TechPricing() {
  const activeTab = 'home'; // Force only 'home' package

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#0B0F19]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.6),rgba(11,15,25,0.2))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pilih Paket <span className="text-perkasa-red">Sesuai Kebutuhan</span>
          </h2>
          <p className="text-gray-400 text-lg">Solusi internet terbaik untuk rumah, bisnis, hingga korporasi.</p>
        </div>

        {/* Package Description */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-white mb-2">{siteConfig.packages[activeTab].title}</h3>
          <p className="text-gray-400">{siteConfig.packages[activeTab].desc}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
          {siteConfig.packages[activeTab].plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={clsx(
                'relative p-8 rounded-2xl border backdrop-blur-md flex flex-col',
                (plan as any).popular 
                  ? 'bg-gradient-to-b from-white/10 to-transparent border-perkasa-red/50 shadow-2xl shadow-red-900/20 z-10 scale-105' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              )}
            >
              {(plan as any).popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-perkasa-red text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase shadow-lg">
                  Rekomendasi
                </div>
              )}

              <h3 className={clsx("text-lg font-bold tracking-widest mb-2 text-white")}>
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-perkasa-blue">{plan.speed}</span>
              </div>

              <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                {plan.price === 'Call Us' ? (
                   <span className="text-2xl font-bold text-white">Hubungi Kami</span>
                ) : (
                  <>
                    <span className="text-sm text-gray-400">Rp</span>
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-gray-500">/bln</span>
                  </>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-perkasa-red shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/6281252000220?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(plan.name)}%20(${siteConfig.packages[activeTab].title})`}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'w-full py-3 rounded-xl font-bold transition-all text-center block',
                  (plan as any).popular
                    ? 'bg-perkasa-red hover:bg-red-700 text-white shadow-lg shadow-red-900/40'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
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
              *Harga belum termasuk PPN 11%. Syarat dan ketentuan berlaku. Kecepatan up to (hingga) sesuai paket yang dipilih.
              Ketersediaan jaringan fiber optic bergantung pada lokasi.
            </p>
        </div>
      </div>
    </section>
  );
}
