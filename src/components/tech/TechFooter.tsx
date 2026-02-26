'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig, iconMap } from '@/data/site-config';
import clsx from 'clsx';

export default function TechFooter() {
  return (
    <footer id="contact" className="bg-black/20 backdrop-blur-md border-t border-white/10 relative z-10 pt-8 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          {/* Logo Section */}
          <div className="text-center md:text-left relative">
            <div className="w-60 h-24 md:w-[400px] md:h-[100px]" aria-hidden="true" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-0 md:translate-x-0 w-[280px] h-[120px] md:w-[500px] md:h-[160px]">
              <Image 
                src="/logo-mdp.png" 
                alt="Mega Data Perkasa" 
                fill 
                className="object-contain object-center md:object-left"
              />
            </div>
          </div>
          
          {/* Contact & Socials Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-3 md:gap-y-1 text-xs text-white drop-shadow-md shadow-black/50">
            {siteConfig.footer.socials.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              const isTikTok = social.link.includes('tiktok');

              return (
                <a 
                  key={social.name}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 hover:text-white transition-colors group whitespace-nowrap"
                >
                  <div className={clsx(
                    "p-2 rounded-full bg-white/10 transition-colors border border-white/20 shadow-sm",
                    social.bgHover
                  )}>
                    {isTikTok ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className={clsx("w-5 h-5 drop-shadow-md", social.color)}>
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 10-1 13.6 6.84 6.84 0 006.9-6.9V8a8.16 8.16 0 003.68 1.47v-3.44a4.85 4.85 0 01-1.35-.34z" />
                      </svg>
                    ) : (
                      Icon && <Icon size={20} className={clsx("drop-shadow-md", social.color)} />
                    )}
                  </div>
                  <span className="font-medium drop-shadow-md">{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 pb-0 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white font-medium drop-shadow-md shadow-black/50">
          <p className="mb-0">{siteConfig.footer.copyright}</p>
          <div className="flex gap-6">
            {siteConfig.footer.links.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-perkasa-red transition-colors">{link.name}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Large PERKASA Logo - Trae Style */}
      <div className="w-full overflow-hidden select-none mt-0 leading-[0.75] relative h-20 md:h-[20vw] flex items-end justify-center pointer-events-auto">
        <motion.div 
          className="relative w-full h-full scale-[2.5] md:scale-[3.5] -translate-y-[10%] opacity-50 mix-blend-overlay cursor-pointer"
          whileHover={{ 
            opacity: 1,
            scale: [1.2, 1.25, 1.22, 1.28, 1.25], // Significantly reduced Jiggle effect scale
            filter: [
              "brightness(1.5) drop-shadow(0 0 20px rgba(255,0,0,0.5)) hue-rotate(0deg)",
              "brightness(2) drop-shadow(0 0 40px rgba(0,0,255,0.8)) hue-rotate(90deg)",
              "brightness(1.5) drop-shadow(0 0 20px rgba(255,0,0,0.5)) hue-rotate(0deg)"
            ],
            x: [0, -2, 2, -1, 1, 0], // Shake/Glitch movement
          }}
          transition={{ 
            duration: 0.5,
            scale: { duration: 0.2 },
            filter: { repeat: Infinity, duration: 1 }, // Looping color shift
            x: { repeat: Infinity, duration: 0.2 } // Fast shake
          }}
        >
          <Image 
            src="/footer-1.png" 
            alt="PERKASA" 
            fill 
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
      </div>
    </footer>
  );
}
