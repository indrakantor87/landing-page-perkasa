'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const plans = [
  {
    name: 'HOME LITE',
    speed: '12.5 Mbps',
    price: '125.000',
    features: ['Kuota Unlimited', '3 Perangkat', 'Bundling 3 Bulan Pasang Baru (Diskon Rp 25.000)'],
    popular: false,
  },
  {
    name: 'HOME BASIC',
    speed: '25 Mbps',
    price: '166.500',
    features: ['Kuota Unlimited', '6 Perangkat', 'Paling Laris'],
    popular: true,
  },
  {
    name: 'HOME STREAM',
    speed: '35 Mbps',
    price: '200.000',
    features: ['Kuota Unlimited', '10 Perangkat', 'Upload hingga 55 Mbps'],
    popular: true,
  },
  {
    name: 'HOME ENTERTAIN',
    speed: '60 Mbps',
    price: '260.000',
    features: ['Kuota Unlimited', '20 Perangkat', 'Siap Streaming 4K'],
    popular: false,
  },
  {
    name: 'HOME SMALL',
    speed: '100 Mbps',
    price: '325.000',
    features: ['Kuota Unlimited', '30 Perangkat', 'Optimal untuk Gaming'],
    popular: false,
  },
  {
    name: 'HOME ADVAN',
    speed: '125 Mbps',
    price: '465.000',
    features: ['Kuota Unlimited', '40 Perangkat', 'Performa Pro'],
    popular: false,
  },
];

export default function TechPricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.6),rgba(11,15,25,0.2))]" />
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-perkasa-red/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-perkasa-blue/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pilih Level <span className="text-perkasa-red">Kecepatan</span> <span className="text-perkasa-blue">Anda</span>
          </h2>
          <p className="text-gray-400 text-lg">Harga transparan. Tanpa biaya tersembunyi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={clsx(
                'relative p-8 rounded-2xl border backdrop-blur-md flex flex-col',
                plan.popular 
                  ? 'bg-white/10 border-perkasa-red/50 shadow-2xl shadow-red-900/20 scale-105 z-10' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-perkasa-red text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-lg shadow-red-500/40 text-center whitespace-nowrap">
                  Best Seller
                </div>
              )}

              <h3 className={clsx("text-lg font-bold tracking-widest mb-2", plan.popular ? "text-perkasa-red" : "text-gray-400")}>
                {plan.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-6">
                <div className="flex flex-col text-[10px] leading-tight font-medium text-gray-400 text-right">
                  <span>Up</span>
                  <span>to</span>
                </div>
                <span className="text-4xl font-bold text-white">{plan.speed}</span>
              </div>

              <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                <span className="text-sm text-gray-400">Rp</span>
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-gray-500">/bln</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-perkasa-blue shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/6281252000220?text=Halo,%20saya%20ingin%20berlangganan%20paket%20${encodeURIComponent(plan.name)}%20internet%20Perkasa%20Networks`}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'w-full py-4 rounded-xl font-bold transition-all relative overflow-hidden group block text-center',
                  plan.popular
                    ? 'bg-gradient-to-r from-perkasa-red via-purple-600 to-perkasa-blue text-white shadow-lg shadow-red-900/20 hover:shadow-red-900/40'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                )}
              >
                <div className={clsx("absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300", plan.popular ? "" : "hidden")} />
                <span className="relative">Pilih Paket</span>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Gratis Biaya Instalasi', sub: 'Senilai Rp 250.000' },
            { label: 'Harga Tetap & Flat', sub: 'Tanpa biaya tersembunyi' },
            { label: 'Sudah Termasuk Pajak', sub: 'PPN 11%' },
            { label: 'Modem WiFi Dipinjamkan', sub: 'Selama berlangganan' },
          ].map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               viewport={{ once: true }}
               className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors"
             >
               <div className="font-bold text-lg mb-1 text-white">{item.label}</div>
               <div className="text-sm text-gray-500">{item.sub}</div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
