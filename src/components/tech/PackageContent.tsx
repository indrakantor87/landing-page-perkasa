'use client';

import { Check } from 'lucide-react';
import { useSiteContent } from '@/lib/use-site-content';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface Plan {
  name: string;
  speed: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface PackageContentProps {
  plans: Plan[];
  title: string;
}

export default function PackageContent({ plans, title }: PackageContentProps) {
  const { content } = useSiteContent();
  const section = content.packageSection;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 group hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-b from-perkasa-red/20 to-black/60 border-perkasa-red/50 shadow-lg shadow-perkasa-red/20' 
                  : 'bg-black/40 border-white/10 hover:border-perkasa-blue/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-perkasa-red text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-red-900/50">
                  {section.popularBadge}
                </div>
              )}

              <div className="mb-6 text-center">
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  plan.name === 'HOME BASIC' 
                    ? 'text-perkasa-red' 
                    : 'text-white group-hover:text-perkasa-blue'
                }`}>
                  {plan.name}
                </h3>
                <span className="text-4xl font-bold text-white">{plan.speed}</span>
              </div>

              <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                {plan.price === 'Call Us' ? (
                   <span className="text-2xl font-bold text-white drop-shadow-md">{section.callUsLabel}</span>
                ) : (
                  <>
                    <span className="text-sm text-white font-medium">Rp</span>
                    <span className="text-3xl font-bold text-white drop-shadow-md">{plan.price}</span>
                    <span className="text-sm text-white font-medium">/bln</span>
                  </>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white font-medium text-sm drop-shadow-sm">
                    <Check className="w-5 h-5 text-[#00B4D8] shrink-0 mt-0.5 drop-shadow-[0_0_10px_rgba(0,180,216,0.5)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={buildWhatsAppUrl(content.company.phone, `Halo, saya tertarik dengan ${plan.name} (${title})`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-lg font-bold text-center transition-all duration-300 ${
                  plan.name === 'HOME BASIC'
                    ? 'bg-perkasa-red text-white hover:bg-red-700 shadow-lg shadow-red-900/30'
                    : 'bg-white text-black group-hover:bg-perkasa-blue group-hover:text-white hover:shadow-lg hover:shadow-blue-900/30'
                }`}
              >
                {section.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
            <p className="text-white text-sm max-w-2xl mx-auto font-medium drop-shadow-sm">
              {section.disclaimer}
            </p>
        </div>
      </div>
    </section>
  );
}
