'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { siteConfig, iconMap } from '@/data/site-config';

export default function TechFeatures() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
            {siteConfig.features.title} <span className="text-perkasa-red drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">{siteConfig.features.highlight}</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg drop-shadow-md font-medium">
            {siteConfig.features.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.features.items.map((feature, index) => {
            const Component = (feature as any).href ? motion.a : motion.div;
            const hrefProps = (feature as any).href ? { href: (feature as any).href, target: '_blank', rel: 'noopener noreferrer' } : {};
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <Component
                key={feature.title}
                {...hrefProps}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={clsx(
                  'p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-black/40 transition-all duration-300 group h-full block shadow-lg hover:bg-black/60 will-change-transform',
                  feature.colSpan,
                  feature.border
                )}
              >
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-white/5 backdrop-blur-sm">
                  {Icon && <Icon className={clsx('w-8 h-8', feature.color)} />}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">{feature.title}</h3>
                <p className="text-white leading-relaxed font-medium drop-shadow-sm">{feature.description}</p>
              </Component>
            );
          })}
        </div>
      </div>
    </section>
  );
}
