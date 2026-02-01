'use client';

import { Check } from 'lucide-react';
import clsx from 'clsx';

const plans = [
  {
    name: 'Home Lite',
    speed: 'Hingga 12.5 Mbps',
    price: '125.000',
    description: 'Paket hemat untuk kebutuhan dasar dan browsing ringan.',
    features: [
      'Kuota Unlimited',
      'Efektif untuk 3 perangkat',
      'Bundling 3 bulan: Rp 350rb',
      'Support 24/7'
    ],
    popular: false,
  },
  {
    name: 'Home Basic',
    speed: 'Hingga 25 Mbps',
    price: '166.500',
    description: 'Cocok untuk penggunaan sehari-hari dan sosial media.',
    features: [
      'Kuota Unlimited',
      'Efektif untuk 6 perangkat',
      'Stabil untuk WFH',
      'Gratis Router WiFi'
    ],
    popular: true,
  },
  {
    name: 'Home Stream',
    speed: 'Hingga 35 Mbps',
    price: '200.000',
    description: 'Optimal untuk streaming film dan upload konten.',
    features: [
      'Download Hingga 35 Mbps',
      'Upload Hingga 55 Mbps',
      'Efektif untuk 10 perangkat',
      'Streaming HD Lancar'
    ],
    popular: true,
  },
  {
    name: 'Home Entertain',
    speed: 'Hingga 60 Mbps',
    price: '260.000',
    description: 'Nikmati hiburan tanpa batas, 4K streaming lancar.',
    features: [
      'Kuota Unlimited',
      'Efektif untuk 20 perangkat',
      'Streaming 4K Lancar',
      'Prioritas Support'
    ],
    popular: false,
  },
  {
    name: 'Home Small',
    speed: 'Hingga 100 Mbps',
    price: '325.000',
    description: 'Performa tinggi untuk rumah dengan banyak perangkat.',
    features: [
      'Kuota Unlimited',
      'Efektif untuk 30 perangkat',
      'Gaming & Streaming',
      'Gratis Router Dual Band'
    ],
    popular: false,
  },
  {
    name: 'Home Advan',
    speed: 'Hingga 125 Mbps',
    price: '465.000',
    description: 'Kecepatan maksimal untuk profesional dan konten kreator.',
    features: [
      'Kuota Unlimited',
      'Efektif untuk 40 perangkat',
      'Latensi Rendah',
      'Upload Cepat'
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Paket Internet Hemat</h2>
          <p className="text-gray-600 text-lg">
            Harga transparan. Tanpa biaya tersembunyi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={clsx(
                'relative bg-white rounded-2xl shadow-xl overflow-hidden border transition-transform hover:-translate-y-1',
                plan.popular ? 'border-perkasa-blue ring-2 ring-perkasa-blue ring-opacity-50' : 'border-gray-100'
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-perkasa-red to-perkasa-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Paling Laris
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-perkasa-blue">{plan.speed}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 h-10">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-sm text-gray-400">Mulai dari</span>
                  <div className="flex items-baseline">
                    <span className="text-sm font-semibold text-gray-900 align-top">Rp</span>
                    <span className="text-4xl font-bold text-perkasa-blue">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/bulan</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-perkasa-blue shrink-0 mr-3" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={clsx(
                    'w-full py-3 px-4 rounded-xl font-semibold transition-all',
                    plan.popular
                      ? 'bg-gradient-to-r from-perkasa-red via-purple-600 to-perkasa-blue text-white hover:opacity-90 shadow-lg shadow-red-500/20'
                      : 'bg-blue-50 text-perkasa-blue hover:bg-blue-100'
                  )}
                >
                  Pilih Paket
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Keuntungan Berlangganan</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Check className="h-6 w-6 text-perkasa-blue shrink-0 mr-3" />
              <span className="text-gray-700">Support 24 Jam</span>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-perkasa-blue shrink-0 mr-3" />
              <span className="text-gray-700">Biaya berlangganan flat</span>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-perkasa-blue shrink-0 mr-3" />
              <span className="text-gray-700">Hanya bayar paket bulanan</span>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-perkasa-blue shrink-0 mr-3" />
              <span className="text-gray-700">Harga sudah termasuk PPN 11%</span>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-perkasa-blue shrink-0 mr-3" />
              <span className="text-gray-700">Tidak ada denda keterlambatan</span>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-perkasa-blue shrink-0 mr-3" />
              <span className="text-gray-700">Modem dipinjamkan selama berlangganan</span>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-perkasa-red font-bold text-xl mb-2">GRATIS Biaya Pasang</div>
              <p className="text-gray-500 text-sm">Hemat Rp 250.000 untuk instalasi awal</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-gray-100">
              <div className="text-perkasa-blue font-bold text-xl mb-2">Harga Flat & PPN 11%</div>
              <p className="text-gray-500 text-sm">Biaya bulanan tetap dan sudah termasuk pajak</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-gray-100">
              <div className="text-gray-900 font-bold text-xl mb-2">Modem Dipinjamkan</div>
              <p className="text-gray-500 text-sm">Perangkat dipinjamkan selama berlangganan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
