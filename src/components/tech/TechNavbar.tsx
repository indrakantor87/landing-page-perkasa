'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe, Wifi, ChevronDown, Building2, GraduationCap, Home, Server, Coffee } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TechNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const packages = [
    { name: 'Paket Home', icon: Home, desc: 'Internet rumah ultra-cepat', href: '/packages/home' },
    { name: 'Paket UMKM', icon: Building2, desc: 'Solusi bisnis berkembang', href: '/packages/umkm' },
    { name: 'Paket Sekolah', icon: GraduationCap, desc: 'Koneksi edukasi stabil', href: '/packages/school' },
    { name: 'Paket Dedicated', icon: Server, desc: 'Bandwidth prioritas 1:1', href: '/packages/dedicated' },
    { name: 'Paket Cafe', icon: Coffee, desc: 'WiFi kencang untuk pelanggan', href: '/packages/cafe' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20 will-change-transform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative h-full w-[200px] md:w-[300px]">
            <Image 
              src="/logo-perkasa-new.png" 
              alt="Perkasa Networks" 
              width={360} 
              height={120} 
              className="h-20 md:h-28 w-auto object-contain absolute top-1/2 -translate-y-1/2 left-0"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            
            {['Beranda', 'Tentang Kami', 'Pilihan Paket', 'FAQ', 'Kontak'].map((item) => {
              if (item === 'Pilihan Paket') {
                return (
                  <div 
                    key={item}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown('paket')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-base font-bold text-gray-100 hover:text-white transition-colors group-hover:text-perkasa-red py-4 drop-shadow-md">
                      {item}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'paket' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === 'paket' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-[#0F172A]/95 border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden p-4 grid grid-cols-2 gap-2 z-50 backdrop-blur-xl"
                        >
                          {packages.map((pkg) => (
                            <Link 
                              key={pkg.name} 
                              href={pkg.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                            >
                              <div className="p-2 rounded-lg bg-perkasa-red/10 text-perkasa-red group-hover/item:bg-perkasa-red group-hover/item:text-white transition-colors">
                                <pkg.icon size={20} />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white group-hover/item:text-perkasa-red transition-colors">{pkg.name}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{pkg.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item}
                  href={
                    item === 'Beranda' ? '/' : 
                    item === 'Tentang Kami' ? '/about' : 
                    `/#${item.toLowerCase() === 'faq' ? 'faq' : 'contact'}`
                  }
                  className="relative group"
                >
                  <motion.span 
                    className="inline-block text-base font-bold text-gray-100 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] drop-shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item}
                  </motion.span>
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-perkasa-red transition-all group-hover:w-full group-hover:left-0" />
                </Link>
              );
            })}
            
            <Link 
              href="#upgrade"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-perkasa-red to-perkasa-blue text-white font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300"
            >
              Mulai Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="pb-4 border-b border-white/10">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Menu Utama</div>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-gray-300 hover:text-white transition-colors px-2 py-2"
                >
                  Beranda
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-gray-300 hover:text-white transition-colors px-2 py-2"
                >
                  Tentang Kami
                </Link>
              </div>

              <div className="pb-4 border-b border-white/10">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Pilihan Paket</div>
                <div className="grid grid-cols-1 gap-1">
                  {packages.map((pkg) => (
                    <Link
                      key={pkg.name}
                      href={pkg.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <pkg.icon size={18} className="text-perkasa-red" />
                      <span className="font-medium">{pkg.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pb-4">
                <Link
                  href="/#faq"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-gray-300 hover:text-white transition-colors px-2 py-2"
                >
                  FAQ
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-gray-300 hover:text-white transition-colors px-2 py-2"
                >
                  Kontak
                </Link>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Link 
                  href="#upgrade"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-perkasa-red to-perkasa-blue text-white font-bold text-center shadow-lg shadow-red-500/20"
                >
                  Mulai Sekarang
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
