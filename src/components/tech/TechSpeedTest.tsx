'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gauge, Download, Upload, Activity } from 'lucide-react';

export default function TechSpeedTest() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ download: number; upload: number; ping: number } | null>(null);

  const startTest = () => {
    setIsTesting(true);
    setProgress(0);
    setResult(null);

    // Simulate speed test
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsTesting(false);
        setResult({
          download: Math.floor(Math.random() * (150 - 90) + 90), // Random 90-150 Mbps
          upload: Math.floor(Math.random() * (150 - 90) + 90),   // Symmetric
          ping: Math.floor(Math.random() * (5 - 1) + 1)          // Low ping 1-5ms
        });
      }
    }, 50);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-perkasa-red text-white p-4 rounded-full shadow-lg shadow-red-900/40 hover:scale-110 transition-transform group border border-white/10"
        title="Test Speed"
      >
        <Gauge className="w-6 h-6 group-hover:animate-spin" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0B0F19] border border-white/10 rounded-2xl w-full max-w-4xl h-[80vh] relative shadow-2xl shadow-red-900/20 overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0B0F19]">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Gauge className="text-perkasa-red" />
                  Speed Test
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 bg-black relative">
                <iframe 
                  src="//openspeedtest.com/Get-widget.php" 
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
