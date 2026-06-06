import React, { useRef, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';

const TunnelEffect = lazy(() => import('@/components/TunnelEffect'));

const HeroSection: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for tunnel to load then animate text
    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      }
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
      }
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToCatalog = () => {
    const el = document.querySelector('#catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToBuild = () => {
    const el = document.querySelector('#custom-build');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0E27 0%, #000000 50%, #0A0E27 100%)' }}
    >
      {/* WebGL Tunnel Background */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-deep-navy flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <TunnelEffect />
      </Suspense>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 via-deep-navy/40 to-transparent z-[2]" />

      {/* Text Content */}
      <div
        ref={textRef}
        className="relative z-[10] container-main py-32"
      >
        <div className="max-w-3xl">
          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white opacity-0"
          >
            Хүсэл мөрөөдлийн{' '}
            <span className="gradient-text">компьютерээ</span>{' '}
            MyTech-ээс
          </h1>

          {/* Subheading */}
          <p
            ref={subRef}
            className="mt-6 text-lg md:text-xl text-silver leading-relaxed opacity-0"
          >
            Gaming болон Office компьютер • Угсралт • Засвар • Сайжруулалт
          </p>

          {/* Slogan Badge */}
          <div ref={badgeRef} className="mt-8 opacity-0">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-electric-blue/10 border border-electric-blue/30">
              <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
              <span className="text-sm font-medium text-electric-blue tracking-wide">
                НЭГ ДОР БҮХ ШИЙДЭЛ — ХУДАЛДАА • ЗАСВАР • САЙЖРУУЛАЛТ
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 opacity-0">
            <button onClick={handleScrollToCatalog} className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Дэлгүүр үзэх
            </button>
            <button onClick={handleScrollToBuild} className="btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
              Угсралт захиалах
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-navy to-transparent z-[5]" />
    </section>
  );
};

export default HeroSection;
