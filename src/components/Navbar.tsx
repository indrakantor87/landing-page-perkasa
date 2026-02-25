'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Paket Internet', href: '#pricing' },
    { name: 'Cek Area', href: '#coverage' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <Image 
              src="/logo-perkasa-new.png" 
              alt="Perkasa Networks" 
              width={240} 
              height={80} 
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-perkasa-blue transition-colors font-medium">Keunggulan</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-perkasa-blue transition-colors font-medium">Paket</Link>
            <Link href="#contact" className="text-gray-600 hover:text-perkasa-blue transition-colors font-medium">Hubungi Kami</Link>
            <Link href="/tech" className="text-perkasa-blue hover:text-perkasa-red transition-colors font-bold flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-perkasa-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-perkasa-red"></span>
              </span>
              Preview Versi Tech
            </Link>
            <button className="bg-gradient-to-r from-perkasa-red via-purple-600 to-perkasa-blue text-white px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg shadow-red-500/20">
              Masuk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-perkasa-blue focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-perkasa-blue hover:bg-blue-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <button className="w-full bg-perkasa-blue text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors">
                  Login Klien
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
