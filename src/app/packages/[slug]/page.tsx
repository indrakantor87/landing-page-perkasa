import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import TechNavbar from '@/components/tech/TechNavbar';
import TechBackground from '@/components/tech/TechBackground';
import TechAnnouncement from '@/components/tech/TechAnnouncement';
import { siteConfig } from '@/data/site-config';
import PackageHero from '@/components/tech/PackageHero';
import PackageContent from '@/components/tech/PackageContent';

const TechFooter = dynamic(() => import('@/components/tech/TechFooter'));
const WhatsAppButton = dynamic(() => import('@/components/tech/WhatsAppButton'));

// Helper to get package data
const getPackageData = (slug: string) => {
  if (!slug) return null;
  const packageKey = slug.toLowerCase();
  // @ts-ignore
  return siteConfig.packages[packageKey];
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); // Ensure params are resolved
  const pkg = getPackageData(slug);
  
  if (!pkg) {
    return {
      title: 'Paket Tidak Ditemukan | Perkasa Networks',
    };
  }

  return {
    title: `${pkg.title} | Perkasa Networks`,
    description: pkg.desc,
  };
}

export default async function PackagePage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); // Ensure params are resolved
  const pkg = getPackageData(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white selection:bg-perkasa-red/30 selection:text-white relative">
      <TechAnnouncement />
      <TechBackground />

      <div className="relative z-10">
        <TechNavbar />
        <PackageHero title={pkg.title} description={pkg.desc} iconName={pkg.icon} />
        <PackageContent plans={pkg.plans} title={pkg.title} />
        <TechFooter />
      </div>
      <WhatsAppButton />
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(siteConfig.packages).map((slug) => ({
    slug,
  }));
}
