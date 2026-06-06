import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import ScrollFadeIn from '@/components/ScrollFadeIn';

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-purple)" strokeWidth="1.5">
        <defs>
          <linearGradient id="blue-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Байгууллага болон хувь хүнд олноор нийлүүлнэ',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-purple2)" strokeWidth="1.5">
        <defs>
          <linearGradient id="blue-purple2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Таны хэрэгцээ, төсөвт тохирсон угсралт',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-purple3)" strokeWidth="1.5">
        <defs>
          <linearGradient id="blue-purple3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
    title: 'Мэргэжлийн зөвлөгөө үнэгүй',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-purple4)" strokeWidth="1.5">
        <defs>
          <linearGradient id="blue-purple4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Борлуулалтын дараах баталгаат үйлчилгээ',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="section-padding relative">
      <div className="container-main">
        <ScrollFadeIn>
          <SectionHeading
            title="Яагаад MyTech?"
            subtitle="Бид таны компьютерын хэрэгцээг бүрэн шийдэхэд тань тусална"
          />
        </ScrollFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <ScrollFadeIn key={index} delay={index * 0.1}>
              <div className="glass-card p-8 text-center h-full flex flex-col items-center">
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-white font-medium text-base leading-snug">
                  {feature.title}
                </h3>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
