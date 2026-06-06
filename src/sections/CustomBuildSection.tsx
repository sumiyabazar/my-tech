import React from 'react';
import ScrollFadeIn from '@/components/ScrollFadeIn';

const CustomBuildSection: React.FC = () => {
  const handleScrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="custom-build" className="section-padding relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, rgba(124, 58, 237, 0.2) 40%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <ScrollFadeIn>
          <div className="glass-card p-10 md:p-16 text-center max-w-4xl mx-auto border-electric-blue/20">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-electric-blue/20 to-purple/20 border border-electric-blue/30 mb-8">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#build-grad)" strokeWidth="1.5">
                <defs>
                  <linearGradient id="build-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            </div>

            <h2 className="gradient-text text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-tight mb-4">
              Таны хэрэгцээ, төсөвт тохирсон компьютер угсруулъя
            </h2>

            <p className="text-silver text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
              Gaming, Office, эсвэл тусгай зориулалтын компьютер — бид таны шаардлагад нийцүүлэн хамгийн сайн угсралтын шийдлийг санал болгоно.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/10 border border-success/30 mb-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-success">
                Мэргэжлийн зөвлөгөө үнэгүй
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={handleScrollToContact} className="btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
                Угсралт захиалах
              </button>
              <a
                href="https://www.facebook.com/MyTech19"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Facebook-р холбогдох
              </a>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
};

export default CustomBuildSection;
