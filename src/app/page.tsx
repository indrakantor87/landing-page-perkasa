import dynamic from 'next/dynamic';
import TechNavbar from '@/components/tech/TechNavbar';
import TechHero from '@/components/tech/TechHero';
import TechBackground from '@/components/tech/TechBackground';
import PopupBanner from '@/components/tech/PopupBanner';
// BottomActionBar di-nonaktifkan

// Dynamic imports for below-fold components with loading skeletons
const TechFeatures = dynamic(() => import('@/components/tech/TechFeatures'), {
  loading: () => <div className="h-[600px] w-full bg-white/5 animate-pulse" />
});
const TechPricing = dynamic(() => import('@/components/tech/TechPricing'), {
  loading: () => <div className="h-[800px] w-full bg-white/5 animate-pulse" />
});
const TechTestimonials = dynamic(() => import('@/components/tech/TechTestimonials'), {
  loading: () => <div className="h-[400px] w-full bg-white/5 animate-pulse" />
});
const TechFAQ = dynamic(() => import('@/components/tech/TechFAQ'), {
  loading: () => <div className="h-[500px] w-full bg-white/5 animate-pulse" />
});
const TechCTA = dynamic(() => import('@/components/tech/TechCTA'));
const TechFooter = dynamic(() => import('@/components/tech/TechFooter'));
// Client-only component for WhatsApp button to avoid hydration mismatch
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
    <main className="min-h-screen text-white selection:bg-perkasa-red/30 selection:text-white relative">
      {/* Global Background - DISABLED to use CSS background image */}
      {/* <TechBackground /> */}

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
