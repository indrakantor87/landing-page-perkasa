'use client';

import { motion } from 'framer-motion';

export default function TechCTA() {
  return (
    <section id="upgrade" className="py-20 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-blue-900/20" />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Siap untuk <span className="text-perkasa-red drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Upgrade?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan jaringan masa depan, tersedia hari ini. Rasakan kecepatan tanpa batas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://wa.me/6281252000220?text=Halo,%20saya%20ingin%20berlangganan%20internet%20Perkasa%20Networks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-perkasa-red to-perkasa-blue text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
          >
            Pasang Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
