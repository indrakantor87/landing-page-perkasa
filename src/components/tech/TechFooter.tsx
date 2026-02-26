import { Facebook, Instagram, MessageCircle, Video } from 'lucide-react';
import Image from 'next/image';

export default function TechFooter() {
  return (
    <footer id="contact" className="bg-[#0B0F19]/30 backdrop-blur-xl border-t border-white/10 relative z-10 pt-16 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-0">
          {/* Logo Section */}
          <div className="text-center md:text-left relative">
            <div className="w-80 h-32 md:w-[500px] md:h-[140px]" aria-hidden="true" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-0 md:translate-x-0 w-[360px] h-[150px] md:w-[650px] md:h-[220px]">
              <Image 
                src="/logo-mdp.png" 
                alt="Mega Data Perkasa" 
                fill 
                className="object-contain object-center md:object-left"
              />
            </div>
          </div>
          
          {/* Contact & Socials Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-1 text-sm text-gray-300">
            <a href="https://wa.me/6281252000220" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group whitespace-nowrap">
              <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-green-500/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-green-500">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <span>081252000220</span>
            </a>
            
            <a href="https://instagram.com/perkasa_networks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group whitespace-nowrap">
              <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-pink-500/20 transition-colors">
                <Instagram size={18} className="text-pink-500" />
              </div>
              <span>perkasa_networks</span>
            </a>

            <a href="https://facebook.com/perkasa.networks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group whitespace-nowrap">
              <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                <Facebook size={18} className="text-blue-500" />
              </div>
              <span>perkasa networks</span>
            </a>

            <a href="https://tiktok.com/@perkasa.networks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group whitespace-nowrap">
              <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-white">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 10-1 13.6 6.84 6.84 0 006.9-6.9V8a8.16 8.16 0 003.68 1.47v-3.44a4.85 4.85 0 01-1.35-.34z" />
                </svg>
              </div>
              <span>perkasa.networks</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 pb-0 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p className="mb-0">© 2020 PT Mega Data Perkasa. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-perkasa-red transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-perkasa-red transition-colors">Syarat Layanan</a>
          </div>
        </div>
      </div>

      {/* Large PERKASA Logo - Trae Style */}
      <div className="w-full overflow-hidden select-none pointer-events-none mt-0 leading-[0.75] relative h-[35vw] flex items-end justify-center">
        <div className="relative w-full h-full scale-[1.5] -translate-y-[15%] opacity-50 mix-blend-overlay">
          <Image 
            src="/footer-1.png" 
            alt="PERKASA" 
            fill 
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
