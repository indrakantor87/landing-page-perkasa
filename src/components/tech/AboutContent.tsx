'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/site-config';
import { CheckCircle2, MapPin, Phone, Mail, Users, Calendar, Award } from 'lucide-react';

export default function AboutContent() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-black/40 border border-white/10 text-center backdrop-blur-sm shadow-lg will-change-transform"
          >
            <Calendar className="w-12 h-12 text-perkasa-red mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-4xl font-bold text-white mb-2 drop-shadow-sm">{siteConfig.company.foundedYear}</h3>
            <p className="text-white font-medium">Tahun Berdiri</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-black/40 border border-white/10 text-center backdrop-blur-sm shadow-lg will-change-transform"
          >
            <Users className="w-12 h-12 text-perkasa-blue mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-4xl font-bold text-white mb-2 drop-shadow-sm">{siteConfig.company.customers}</h3>
            <p className="text-white font-medium">Pelanggan Aktif</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-black/40 border border-white/10 text-center backdrop-blur-sm shadow-lg will-change-transform"
          >
            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-4xl font-bold text-white mb-2 drop-shadow-sm">Resmi</h3>
            <p className="text-white font-medium">Berizin Kominfo</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm shadow-lg will-change-transform"
          >
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-perkasa-red pl-4 drop-shadow-md">Visi & Misi</h2>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-sm">Visi</h3>
              <p className="text-white leading-relaxed font-medium drop-shadow-sm">{siteConfig.company.vision}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-sm">Misi</h3>
              <ul className="space-y-3">
                {siteConfig.company.mission.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white font-medium drop-shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#00B4D8] shrink-0 mt-1 drop-shadow-md" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Legalitas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 h-fit backdrop-blur-sm shadow-lg will-change-transform"
          >
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Legalitas Perusahaan</h2>
            <ul className="space-y-4">
              {siteConfig.company.licenses.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-white font-medium p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#00B4D8]/30 hover:bg-[#00B4D8]/10 transition-colors shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#00B4D8] shadow-[0_0_8px_#00B4D8]" />
                  <span className="drop-shadow-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-16"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12 drop-shadow-md">Hubungi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#00B4D8]/50 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <MapPin className="text-perkasa-red drop-shadow-md" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg drop-shadow-sm">Kantor Pusat</h3>
              <p className="text-white text-sm px-4 font-medium leading-relaxed">{siteConfig.company.address}</p>
              <a href={siteConfig.company.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] text-sm mt-3 inline-block hover:underline font-bold drop-shadow-sm">
                Lihat di Google Maps
              </a>
            </div>

            <div className="text-center p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#00B4D8]/50 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Phone className="text-perkasa-red drop-shadow-md" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg drop-shadow-sm">Telepon / WhatsApp</h3>
              <p className="text-white text-sm font-medium">{siteConfig.company.phone}</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#00B4D8]/50 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Mail className="text-perkasa-red drop-shadow-md" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg drop-shadow-sm">Email</h3>
              <p className="text-white text-sm font-medium">{siteConfig.company.email}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
