import loadDynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import TechNavbar from '@/components/tech/TechNavbar';
import PackageHero from '@/components/tech/PackageHero';
import PackageContent from '@/components/tech/PackageContent';
import { readSiteContent } from '@/lib/site-content';
import type { SiteContent } from '@/lib/site-content-shared';

const TechFooter = loadDynamic(() => import('@/components/tech/TechFooter'));
const WhatsAppButton = loadDynamic(() => import('@/components/tech/WhatsAppButton'));

type PackageConfig = {
  title: string
  desc: string
  icon: string
  plans: Array<{
    name: string
    speed: string
    price: string
    features: string[]
    popular?: boolean
  }>
}

export const dynamic = 'force-dynamic'

const getPackageData = (content: SiteContent, slug: string): PackageConfig | null => {
  if (!slug) return null;
  const packageKey = slug.toLowerCase();
  const v = (content.packages as Record<string, unknown>)[packageKey]
  return v ? (v as PackageConfig) : null;
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); // Ensure params are resolved
  const content = await readSiteContent();
  const pkg = getPackageData(content, slug);
  
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
  const content = await readSiteContent();
  const pkg = getPackageData(content, slug);

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen text-white selection:bg-perkasa-red/30 selection:text-white relative">
      {/* <TechBackground /> */}

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
