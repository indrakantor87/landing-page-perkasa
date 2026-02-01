'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Wifi } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CoverageCheckModal from './tech/CoverageCheckModal';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-white">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-perkasa-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-perkasa-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-perkasa-blue text-sm font-semibold mb-6 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-perkasa-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-perkasa-red"></span>
              </span>
              Jaringan Fiber Optic Tercepat
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Perkasa Networks <br />
            <span className="bg-gradient-to-r from-perkasa-red via-purple-600 to-perkasa-blue bg-clip-text text-transparent">Connect Your Future</span>
          </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              <span className="font-bold"><span className="text-perkasa-red">#</span><span className="text-perkasa-blue">juaranya</span><span className="text-perkasa-red">wifi</span></span> - Nikmati koneksi internet Fiber Optik berkecepatan tinggi yang stabil untuk streaming, gaming, dan bekerja.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-perkasa-red via-purple-600 to-perkasa-blue text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-red-500/20 group"
              >
                Cek Ketersediaan
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="#pricing" className="flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border border-gray-200 hover:bg-blue-50 transition-all hover:border-blue-300">
                Lihat Paket
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>Kuota Unlimited</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>Gratis Pemasangan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>Fiber Optik</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image / Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                {/* Placeholder Image - You should replace this */}
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <div className="text-center p-8">
                         <div className="w-24 h-24 bg-perkasa-blue rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl">
                            <Wifi className="h-12 w-12 text-white" />
                         </div>
                         <h3 className="text-2xl font-bold text-gray-800 mb-2">Perkasa Networks</h3>
                         <p className="text-gray-500">Menghubungkan duniamu</p>
                    </div>
                </div>
             </div>
             
             {/* Floating Stats Card */}
             <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4"
             >
                <div className="bg-green-100 p-3 rounded-lg text-green-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Uptime</p>
                    <p className="text-lg font-bold text-gray-900">99.9%</p>
                </div>
             </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
