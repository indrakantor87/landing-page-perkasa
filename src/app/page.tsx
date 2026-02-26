import dynamic from 'next/dynamic';
import TechNavbar from '@/components/tech/TechNavbar';
import TechHero from '@/components/tech/TechHero';
import TechBackground from '@/components/tech/TechBackground';
import TechAnnouncement from '@/components/tech/TechAnnouncement';

// Dynamic imports for below-fold components
const TechFeatures = dynamic(() => import('@/components/tech/TechFeatures'));
const TechPricing = dynamic(() => import('@/components/tech/TechPricing'));
const TechTestimonials = dynamic(() => import('@/components/tech/TechTestimonials'));
const TechFAQ = dynamic(() => import('@/components/tech/TechFAQ'));
const TechCTA = dynamic(() => import('@/components/tech/TechCTA'));
const TechFooter = dynamic(() => import('@/components/tech/TechFooter'));
const WhatsAppButton = dynamic(() => import('@/components/tech/WhatsAppButton'));
const PopupBanner = dynamic(() => import('@/components/tech/PopupBanner'), { ssr: false });

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
      <TechAnnouncement />
      {/* Global Background */}
      <TechBackground />

      <div className="relative z-10">
        <TechNavbar />
        <TechHero />
        <TechFeatures />
        <TechPricing />
        <TechTestimonials />
        <TechFAQ />
        
        {/* CTA Section */}
        <TechCTA />

        <TechFooter />
      </div>
      <WhatsAppButton />
      <PopupBanner />
    </main>
  );
}
