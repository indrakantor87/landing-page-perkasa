import dynamic from 'next/dynamic';
import TechNavbar from '@/components/tech/TechNavbar';
import TechHero from '@/components/tech/TechHero';
import PopupBanner from '@/components/tech/PopupBanner';
// BottomActionBar di-nonaktifkan

// Lazy load components that are not immediately visible
const TechFeatures = dynamic(() => import('@/components/tech/TechFeatures'), {
  loading: () => <div className="h-96 w-full bg-transparent" />
});
const TechPricing = dynamic(() => import('@/components/tech/TechPricing'), {
  loading: () => <div className="h-96 w-full bg-transparent" />
});
const TechTestimonials = dynamic(() => import('@/components/tech/TechTestimonials'), {
  loading: () => <div className="h-96 w-full bg-transparent" />
});
const TechFAQ = dynamic(() => import('@/components/tech/TechFAQ'), {
  loading: () => <div className="h-96 w-full bg-transparent" />
});
const TechCTA = dynamic(() => import('@/components/tech/TechCTA'));
const TechFooter = dynamic(() => import('@/components/tech/TechFooter'));
const TechBackground = dynamic(() => import('@/components/tech/TechBackground'));
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
