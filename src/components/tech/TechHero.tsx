'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/site-config';

// Lazy load map section
const CoverageMapSection = dynamic(() => import('./CoverageMapSection'), {
  loading: () => <div className="w-full h-[500px] bg-white/5 animate-pulse rounded-2xl" />
});

export default function TechHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % siteConfig.hero.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % siteConfig.hero.slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + siteConfig.hero.slides.length) % siteConfig.hero.slides.length);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden">
      {/* Animated Grid Overlay (Optional - kept for style) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm mb-8"
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
          className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 select-none drop-shadow-lg will-change-transform"
        >
          <motion.span 
            className="inline-block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-default will-change-transform"
            whileHover={{ scale: 1.05 }}
          >
            {siteConfig.hero.title.first}
          </motion.span>{" "}
          <motion.span 
            className="inline-block text-perkasa-red drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:drop-shadow-[0_0_35px_rgba(220,38,38,0.9)] transition-all duration-300 cursor-default will-change-transform"
            whileHover={{ scale: 1.05 }}
          >
            {siteConfig.hero.title.second}
          </motion.span>{" "}
          <motion.span 
            className="inline-block text-perkasa-blue drop-shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:drop-shadow-[0_0_35px_rgba(37,99,235,0.9)] transition-all duration-300 cursor-default will-change-transform"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
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
          className="text-xl text-white max-w-2xl mb-12 leading-relaxed font-medium drop-shadow-sm"
        >
          <span className="font-bold"><span className="text-perkasa-red drop-shadow-md">#</span><span className="text-perkasa-blue drop-shadow-md">juaranya</span><span className="text-perkasa-red drop-shadow-md">wifi</span></span> - Rasakan <span className="text-white font-bold drop-shadow-md">masa depan</span> internet dengan <span className="text-perkasa-red font-bold drop-shadow-md">Perkasa Networks</span>. Latensi rendah, <span className="text-perkasa-blue font-bold drop-shadow-md">kecepatan simetris</span>, dan <span className="text-perkasa-red font-bold drop-shadow-md">enkripsi tingkat militer</span> untuk elit digital.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full"
        >
          <CoverageMapSection />
        </motion.div>

      </div>
    </section>
  );
}
