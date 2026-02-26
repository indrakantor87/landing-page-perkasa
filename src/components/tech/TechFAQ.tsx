'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { siteConfig } from '@/data/site-config';

export default function TechFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
            Pertanyaan <span className="text-perkasa-red">Umum</span>
          </h2>
          <p className="text-gray-200 text-lg drop-shadow-sm font-medium">Jawaban untuk hal-hal yang sering ditanyakan</p>
        </div>

        <div className="space-y-4">
          {siteConfig.faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-black/40 border border-white/10 overflow-hidden backdrop-blur-md transition-colors hover:border-[#00B4D8]/50 shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
              >
                <span className={clsx("text-lg font-medium transition-colors drop-shadow-sm", openIndex === index ? "text-[#00B4D8]" : "text-gray-100")}>
                  {faq.question}
                </span>
                <span className={clsx("p-2 rounded-full bg-white/5 transition-colors", openIndex === index ? "text-[#00B4D8] bg-[#00B4D8]/10" : "text-gray-400")}>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-200 leading-relaxed font-medium drop-shadow-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
