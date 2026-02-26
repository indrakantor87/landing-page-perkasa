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
            <h3 className="text-xl font-semibold text-white tracking-wide drop-shadow-md">{siteConfig.packages[activeTab].title}</h3>
          </div>
          <p 
            className="text-lg max-w-xl mx-auto font-medium drop-shadow-md text-white shadow-black/50"
            style={{ color: '#ffffff', textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}
          >
            <span className="text-white" style={{ color: '#ffffff' }}>
              {siteConfig.packages[activeTab].desc}
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
          {siteConfig.packages[activeTab].plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 group hover:scale-105 hover:shadow-2xl ${
                (plan as any).popular 
                  ? 'bg-gradient-to-b from-perkasa-red/20 to-black/60 border-perkasa-red/50 shadow-lg shadow-perkasa-red/20' 
                  : 'bg-black/40 border-white/10 hover:border-perkasa-blue/50'
              }`}
            >
              {(plan as any).popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-perkasa-red text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-red-900/50">
                  PALING LARIS
                </div>
              )}

              <div className="mb-6 text-center">
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  plan.name === 'HOME BASIC' 
                    ? 'text-perkasa-red' 
                    : 'text-white group-hover:text-perkasa-blue'
                }`}>
                  {plan.name}
                </h3>
                <span className="text-4xl font-bold text-white drop-shadow-md">{plan.speed}</span>
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
                href={`https://wa.me/6281252000220?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(plan.name)}%20(${siteConfig.packages[activeTab].title})`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-lg font-bold text-center transition-all duration-300 ${
                  plan.name === 'HOME BASIC'
                    ? 'bg-perkasa-red text-white hover:bg-red-700 shadow-lg shadow-red-900/30'
                    : 'bg-white text-black group-hover:bg-perkasa-blue group-hover:text-white hover:shadow-lg hover:shadow-blue-900/30'
                }`}
              >
                Pilih Paket
              </a>
            </div>
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
