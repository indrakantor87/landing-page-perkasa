'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CoverageCheckModal from './CoverageCheckModal';
import { siteConfig } from '@/data/site-config';

export default function TechHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCoverageModalOpen, setIsCoverageModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % siteConfig.hero.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % siteConfig.hero.slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + siteConfig.hero.slides.length) % siteConfig.hero.slides.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden">
      {/* Animated Grid Overlay (Optional - kept for style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-perkasa-red"></span>
          </span>
          <span className="text-perkasa-red text-sm font-mono tracking-wider font-bold">{siteConfig.hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 select-none"
        >
          <motion.span 
            className="inline-block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            {siteConfig.hero.title.first}
          </motion.span>{" "}
          <motion.span 
            className="inline-block text-perkasa-red drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:drop-shadow-[0_0_35px_rgba(220,38,38,0.9)] transition-all duration-300 cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            {siteConfig.hero.title.second}
          </motion.span>{" "}
          <motion.span 
            className="inline-block text-perkasa-blue drop-shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:drop-shadow-[0_0_35px_rgba(37,99,235,0.9)] transition-all duration-300 cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            {siteConfig.hero.title.third}
          </motion.span>
        </motion.h1>

        {/* Hero Slideshow Component */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-5xl aspect-video md:h-[500px] rounded-2xl overflow-hidden mb-8 md:mb-12 border border-white/10 shadow-2xl shadow-blue-900/20 group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={siteConfig.hero.slides[currentSlide]}
                alt="Hero Slideshow"
                fill
                className="object-cover"
                priority

                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={85}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />
            </motion.div>
          </AnimatePresence>
          
          {/* Slideshow Controls */}
          <div className="absolute inset-0 z-20 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all backdrop-blur-sm border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all backdrop-blur-sm border border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slideshow Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {siteConfig.hero.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-perkasa-red w-6' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-200 max-w-2xl mb-12 leading-relaxed font-medium"
        >
          <span className="font-bold"><span className="text-perkasa-red">#</span><span className="text-perkasa-blue">juaranya</span><span className="text-perkasa-red">wifi</span></span> - Rasakan <span className="text-white font-bold">masa depan</span> internet dengan <span className="text-perkasa-red font-bold">Perkasa Networks</span>. <span className="text-white">Latensi rendah</span>, <span className="text-perkasa-blue font-bold">kecepatan simetris</span>, dan <span className="text-perkasa-red font-bold">enkripsi tingkat militer</span> untuk elit digital.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => setIsCoverageModalOpen(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-perkasa-red via-purple-600 to-perkasa-blue text-white font-bold rounded-lg overflow-hidden transition-all hover:scale-105 shadow-lg shadow-red-900/20 inline-block text-center cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              Cek Ketersediaan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

      </div>
      
      {/* Coverage Modal */}
      <CoverageCheckModal 
        isOpen={isCoverageModalOpen} 
        onClose={() => setIsCoverageModalOpen(false)} 
      />
    </section>
  );
}
