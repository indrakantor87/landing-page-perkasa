import dynamic from 'next/dynamic';
import TechNavbar from '@/components/tech/TechNavbar';
import TechHero from '@/components/tech/TechHero';
import TechBackground from '@/components/tech/TechBackground';

// Dynamic imports for below-fold components
const TechFeatures = dynamic(() => import('@/components/tech/TechFeatures'));
const TechPricing = dynamic(() => import('@/components/tech/TechPricing'));
const TechFAQ = dynamic(() => import('@/components/tech/TechFAQ'));
const TechFooter = dynamic(() => import('@/components/tech/TechFooter'));
const WhatsAppButton = dynamic(() => import('@/components/tech/WhatsAppButton'));

export const metadata = {
  title: 'Perkasa Networks | Connect Your Future',
  description: 'Internet fiber optik berkecepatan tinggi dengan teknologi masa depan.',
  icons: {
    icon: [
      { url: '/logo-web.png' },
      { url: '/logo-web.png', sizes: '32x32' },
    ],
    shortcut: '/logo-web.png',
    apple: '/logo-web.png',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white selection:bg-perkasa-red/30 selection:text-white relative">
      {/* Global Background */}
      <TechBackground />

      <div className="relative z-10">
        <TechNavbar />
        <TechHero />
        <TechFeatures />
        <TechPricing />
        <TechFAQ />
        
        {/* CTA Section */}
        <section id="upgrade" className="py-20 relative overflow-hidden bg-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-blue-900/20" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">Siap untuk Upgrade?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Bergabunglah dengan jaringan masa depan, tersedia hari ini.
            </p>
            <a 
              href="https://wa.me/6281252000220?text=Halo,%20saya%20ingin%20berlangganan%20internet%20Perkasa%20Networks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#0B0F19] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-105"
            >
              Pasang Sekarang
            </a>
          </div>
        </section>

        <TechFooter />
      </div>
      <WhatsAppButton />
    </main>
  );
}
