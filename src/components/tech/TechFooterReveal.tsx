'use client';

import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TechFooterReveal() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end']
  });

  return (
    <div 
      ref={container}
      className="relative h-[800px]" 
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full">
        <div className="bg-[#0B0F19] h-full flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          
          {/* Main Content */}
          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Left: Brand & Info */}
            <div>
              <div className="w-64 h-24 relative mb-8">
                <Image 
                  src="/logo-mdp.png" 
                  alt="Mega Data Perkasa" 
                  fill 
                  className="object-contain object-left"
                />
              </div>
              <p className="text-gray-400 text-lg max-w-md mb-8">
                Menghadirkan konektivitas masa depan untuk Indonesia yang lebih maju. Cepat, Stabil, dan Terpercaya.
              </p>
              <div className="flex gap-6">
                <SocialLink href="https://wa.me/6281252000220" icon={<WhatsAppIcon />} />
                <SocialLink href="https://instagram.com/perkasa_networks" icon={<Instagram size={24} />} />
                <SocialLink href="https://facebook.com/perkasa.networks" icon={<Facebook size={24} />} />
                <SocialLink href="https://tiktok.com/@perkasa.networks" icon={<TikTokIcon />} />
              </div>
            </div>

            {/* Right: Quick Links */}
            <div className="grid grid-cols-2 gap-8 text-gray-400">
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">Layanan</h4>
                <ul className="space-y-4">
                  <li><a href="/packages/home" className="hover:text-perkasa-red transition-colors">Internet Rumah</a></li>
                  <li><a href="/packages/umkm" className="hover:text-perkasa-red transition-colors">Bisnis & UMKM</a></li>
                  <li><a href="/packages/dedicated" className="hover:text-perkasa-red transition-colors">Dedicated Corporate</a></li>
                  <li><a href="/packages/school" className="hover:text-perkasa-red transition-colors">Pendidikan</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">Perusahaan</h4>
                <ul className="space-y-4">
                  <li><a href="/about" className="hover:text-perkasa-red transition-colors">Tentang Kami</a></li>
                  <li><a href="/#contact" className="hover:text-perkasa-red transition-colors">Hubungi Kami</a></li>
                  <li><a href="#" className="hover:text-perkasa-red transition-colors">Karir</a></li>
                  <li><a href="#" className="hover:text-perkasa-red transition-colors">Blog</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Giant Typography - TRAE Style */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden select-none pointer-events-none">
            <h1 className="text-[18vw] font-black text-[#1A1F2E] leading-[0.8] text-center tracking-tighter whitespace-nowrap">
              PERKASA
            </h1>
          </div>

          {/* Copyright Bar */}
          <div className="relative z-10 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 PT Mega Data Perkasa. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 hover:bg-perkasa-red hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-perkasa-red hover:scale-110"
    >
      {icon}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 10-1 13.6 6.84 6.84 0 006.9-6.9V8a8.16 8.16 0 003.68 1.47v-3.44a4.85 4.85 0 01-1.35-.34z" />
    </svg>
  );
}
