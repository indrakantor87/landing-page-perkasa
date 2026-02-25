import dynamic from 'next/dynamic';
import TechNavbar from '@/components/tech/TechNavbar';
import TechBackground from '@/components/tech/TechBackground';
import TechAnnouncement from '@/components/tech/TechAnnouncement';

const TechFooter = dynamic(() => import('@/components/tech/TechFooter'));
const WhatsAppButton = dynamic(() => import('@/components/tech/WhatsAppButton'));
const AboutHero = dynamic(() => import('@/components/tech/AboutHero'));
const AboutContent = dynamic(() => import('@/components/tech/AboutContent'));

export const metadata = {
  title: 'Tentang Kami | Perkasa Networks',
  description: 'Profil Perusahaan PT Perkasa Networks Indonesia - Penyedia Layanan Internet Fiber Optic Terpercaya.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white selection:bg-perkasa-red/30 selection:text-white relative">
      <TechAnnouncement />
      <TechBackground />

      <div className="relative z-10">
        <TechNavbar />
        <AboutHero />
        <AboutContent />
        <TechFooter />
      </div>
      <WhatsAppButton />
    </main>
  );
}
