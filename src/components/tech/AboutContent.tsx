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
            className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <Calendar className="w-12 h-12 text-perkasa-red mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-2">{siteConfig.company.foundedYear}</h3>
            <p className="text-gray-400">Tahun Berdiri</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <Users className="w-12 h-12 text-perkasa-blue mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-2">{siteConfig.company.customers}</h3>
            <p className="text-gray-400">Pelanggan Aktif</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-2">Resmi</h3>
            <p className="text-gray-400">Berizin Kominfo</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-perkasa-red pl-4">Visi & Misi</h2>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3">Visi</h3>
              <p className="text-gray-300 leading-relaxed">{siteConfig.company.vision}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Misi</h3>
              <ul className="space-y-3">
                {siteConfig.company.mission.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-perkasa-blue shrink-0 mt-1" />
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
            className="bg-white/5 border border-white/10 rounded-2xl p-8 h-fit"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Legalitas Perusahaan</h2>
            <ul className="space-y-4">
              {siteConfig.company.licenses.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>{item}</span>
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
          <h2 className="text-3xl font-bold text-center text-white mb-12">Hubungi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-perkasa-red" />
              </div>
              <h3 className="font-bold text-white mb-2">Kantor Pusat</h3>
              <p className="text-gray-400 text-sm px-4">{siteConfig.company.address}</p>
              <a href={siteConfig.company.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-perkasa-blue text-sm mt-2 inline-block hover:underline">
                Lihat di Google Maps
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Phone className="text-perkasa-red" />
              </div>
              <h3 className="font-bold text-white mb-2">Telepon / WhatsApp</h3>
              <p className="text-gray-400 text-sm">{siteConfig.company.phone}</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-perkasa-red" />
              </div>
              <h3 className="font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 text-sm">{siteConfig.company.email}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
