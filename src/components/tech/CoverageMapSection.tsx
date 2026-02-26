'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle2, Loader2, WifiIcon } from 'lucide-react';

// Dynamically import the map component to avoid SSR issues
const MapPicker = dynamic(() => import('./MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100/10 rounded-lg animate-pulse">
      <Loader2 className="w-8 h-8 animate-spin text-perkasa-blue" />
    </div>
  ),
});

export default function CoverageMapSection() {
  const [step, setStep] = useState<'map' | 'checking' | 'result'>('map');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('Pilih lokasi pada peta...');

  // Set default location on mount
  useEffect(() => {
    if (!location) setLocation({ lat: -6.7490, lng: 111.0400 });
  }, []);

  const handleCheck = () => {
    setStep('checking');
    
    // Simulate checking process
    setTimeout(() => {
      setStep('result');
    }, 2000);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
    setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  };

  const whatsappLink = location 
    ? `https://wa.me/6281252000220?text=Halo%20Admin%20Perkasa%20Networks,%20saya%20ingin%20cek%20ketersediaan%20internet%20di%20lokasi%20ini:%20https://maps.google.com/?q=${location.lat},${location.lng}`
    : '#';

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative min-h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
          <MapPin className="text-perkasa-red" />
          Cek Area Jangkauan Fiber Optic
        </h3>
      </div>

      {/* Body */}
      <div className="relative h-[450px] md:h-[500px]">
        <AnimatePresence mode="wait">
          {step === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex-1 relative w-full h-full">
                <MapPicker onLocationSelect={handleLocationSelect} />
                
                {/* Floating Instruction */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-xs font-medium text-gray-800 z-[400] pointer-events-none drop-shadow-sm whitespace-nowrap">
                  Geser pin ke lokasi rumah Anda
                </div>
              </div>
              
              <div className="p-4 md:p-6 bg-black/60 w-full flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 backdrop-blur-sm z-10">
                <div className="w-full md:w-auto flex-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Koordinat Terpilih</label>
                  <div className="text-sm font-mono bg-white/10 text-white p-2.5 rounded-lg border border-white/10 truncate w-full">
                    {address}
                  </div>
                </div>
                
                <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2">
                  <p className="text-xs text-gray-400 text-center md:text-right leading-tight max-w-xs hidden md:block">
                    Verifikasi coverage fiber optic di lokasi Anda.
                  </p>
                  <button
                    onClick={handleCheck}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-perkasa-red to-perkasa-blue text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    <MapPin className="w-5 h-5" />
                    Cek Ketersediaan
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'checking' && (
            <motion.div 
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 border-4 border-white/10 rounded-full"></div>
                <div className="w-24 h-24 border-4 border-perkasa-red rounded-full animate-spin border-t-transparent absolute inset-0"></div>
                <WifiIcon className="w-10 h-10 text-perkasa-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Memindai Jaringan...</h4>
              <p className="text-gray-300 text-center px-8 max-w-md">Sistem sedang mengecek cakupan Fiber Optic di koordinat Anda.</p>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-8 text-center z-20"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce border border-green-500/30">
                <CheckCircle2 className="w-12 h-12 text-green-400 drop-shadow-lg" />
              </div>
              <h4 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
                Lokasi Terjangkau!
              </h4>
              <p className="text-gray-300 mb-8 leading-relaxed max-w-lg text-lg">
                Kabar baik! Area Anda berada dalam rencana perluasan jaringan Perkasa Networks. Segera amankan slot pemasangan Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={() => setStep('map')}
                  className="flex-1 py-3 px-6 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Cek Lokasi Lain
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-6 bg-[#25D366] text-white font-bold rounded-xl shadow-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Daftar via WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}