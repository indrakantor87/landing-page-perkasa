'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  speed: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface PackageContentProps {
  plans: Plan[];
  title: string;
}

export default function PackageContent({ plans, title }: PackageContentProps) {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                'relative p-6 md:p-8 rounded-2xl border backdrop-blur-sm flex flex-col shadow-lg transition-all duration-300',
                plan.popular 
                  ? 'bg-black/30 border-[#00B4D8]/50 shadow-[0_0_30px_rgba(0,180,216,0.2)] z-10 md:scale-105 will-change-transform' 
                  : 'bg-black/20 border-white/10 hover:border-[#00B4D8]/30 hover:bg-black/30 hover:shadow-[0_0_20px_rgba(0,180,216,0.1)]'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-perkasa-red text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase shadow-lg shadow-red-900/50">
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
                   <span className="text-2xl font-bold text-white drop-shadow-md">Hubungi Kami</span>
                ) : (
                  <>
                    <span className="text-sm text-gray-200 font-medium">Rp</span>
                    <span className="text-3xl font-bold text-white drop-shadow-md">{plan.price}</span>
                    <span className="text-sm text-gray-200 font-medium">/bln</span>
                  </>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-100 font-medium text-sm drop-shadow-sm">
                    <Check className="w-5 h-5 text-[#00B4D8] shrink-0 mt-0.5 drop-shadow-[0_0_10px_rgba(0,180,216,0.5)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/6281252000220?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(plan.name)}%20(${title})`}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'w-full py-3 rounded-xl font-bold transition-all text-center block shadow-lg',
                  plan.popular
                    ? 'bg-perkasa-red hover:bg-red-700 text-white shadow-red-900/40'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30'
                )}
              >
                Pilih Paket
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              *Harga sudah termasuk PPN 11%. Syarat dan ketentuan berlaku. Kecepatan up to (hingga) sesuai paket yang dipilih.
              Ketersediaan jaringan fiber optic bergantung pada lokasi.
            </p>
        </div>
      </div>
    </section>
  );
}
