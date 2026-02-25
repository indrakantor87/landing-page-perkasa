'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

// Dynamically import the map component to avoid SSR issues
const MapPicker = dynamic(() => import('./MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-perkasa-blue" />
    </div>
  ),
});

interface CoverageCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoverageCheckModal({ isOpen, onClose }: CoverageCheckModalProps) {
  const [step, setStep] = useState<'map' | 'checking' | 'result'>('map');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('Memuat lokasi...');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('map');
      // Set default location if not set yet (Pati, Jawa Tengah)
      if (!location) setLocation({ lat: -6.7490, lng: 111.0400 });
    }
  }, [isOpen]);

  const handleCheck = () => {
    setStep('checking');
    
    // Simulate checking process
    setTimeout(() => {
      setStep('result');
    }, 2000);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    // Basic sanitization/validation of coordinates
    const safeLat = typeof lat === 'number' && !isNaN(lat) ? lat : 0;
    const safeLng = typeof lng === 'number' && !isNaN(lng) ? lng : 0;
    
    setLocation({ lat: safeLat, lng: safeLng });
    setAddress(`${safeLat.toFixed(6)}, ${safeLng.toFixed(6)}`);
  };

  const whatsappLink = location 
    ? `https://wa.me/6281252000220?text=${encodeURIComponent(`Halo Admin Perkasa Networks, saya ingin cek ketersediaan internet di lokasi ini: https://maps.google.com/?q=${location.lat},${location.lng}`)}`
    : '#';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="text-perkasa-red" />
                  Cek Area Jangkauan
                </h3>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 relative min-h-[400px] bg-gray-50">
                {step === 'map' && (
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 relative">
                      <MapPicker onLocationSelect={handleLocationSelect} />
                      
                      {/* Floating Instruction */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-xs font-medium text-gray-700 z-[400] pointer-events-none">
                        Geser pin ke lokasi rumah Anda
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                      <div className="mb-4">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Koordinat Terpilih</label>
                        <div className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 truncate">
                          {address}
                        </div>
                      </div>
                      <button
                        onClick={handleCheck}
                        className="w-full py-3 bg-gradient-to-r from-perkasa-red to-perkasa-blue text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      >
                        <MapPin className="w-5 h-5" />
                        Cek Ketersediaan
                      </button>
                    </div>
                  </div>
                )}

                {step === 'checking' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-20">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
                      <div className="w-20 h-20 border-4 border-perkasa-red rounded-full animate-spin border-t-transparent absolute inset-0"></div>
                      <WifiIcon className="w-8 h-8 text-perkasa-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <h4 className="mt-6 text-xl font-bold text-gray-800 dark:text-white">Memindai Jaringan...</h4>
                    <p className="text-gray-500 mt-2 text-center px-8">Sistem sedang mengecek cakupan Fiber Optic di koordinat Anda.</p>
                  </div>
                )}

                {step === 'result' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8 text-center z-20">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Lokasi Terjangkau!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Kabar baik! Area Anda berada dalam rencana perluasan jaringan Perkasa Networks. Segera amankan slot pemasangan Anda.
                    </p>
                    
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl shadow-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 group"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.498.298-.997.644-1.496.446-.645 1.115-1.164 1.884-1.477.769-.313 1.593-.414 2.39-.297.797.117 1.543.463 2.14.996.597.533.996 1.255 1.165 2.059.169.804.068 1.629-.297 2.39-.365.769-.966 1.438-1.76 1.884-.794.446-1.76.594-2.733.42l-.297-.05c-1.53-.273-2.92-1.042-4.04-2.164-1.12-1.12-1.89-2.51-2.16-4.04l-.05-.297c-.174-.973-.026-1.939.42-2.733.446-.794 1.115-1.395 1.884-1.76.761-.365 1.586-.466 2.39-.297.804.169 1.526.568 2.059 1.165.533.597.879 1.343.996 2.14.117.797.016 1.621-.297 2.39-.313.769-.832 1.438-1.477 1.884-.499.346-.998.545-1.496.644-.199.04-.347.09-.497.149-.173.149-.387.313-.52.446-.149.133-.313.289-.606.13-.298-.173-1.271-.77-2.059-1.653-1.012-1.135-1.325-2.093-1.475-2.39-.148-.297-.124-.471.075-.644.198-.173.867-.743 1.164-.94.298-.199.249-.397.15-.67-.099-.272-.818-1.733-.967-2.03-.149-.297-.3-.26-.413-.26h-.413c-.361 0-1.094.136-1.666.763-.571.626-2.181 2.132-2.181 5.201 0 3.069 2.234 6.035 2.545 6.452.311.417 4.396 6.713 10.648 9.408 3.73 1.609 5.186 1.609 7.072 1.508 1.886-.101 4.545-1.857 5.186-3.651.64-1.794.64-3.332.449-3.651-.191-.319-.706-.511-1.487-.902z" />
                      </svg>
                      Kirim Lokasi ke Admin
                    </a>
                    <p className="mt-4 text-xs text-gray-400">
                      Koordinat lokasi Anda akan dikirimkan untuk verifikasi teknis lebih lanjut.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}
