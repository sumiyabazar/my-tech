import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';

interface NavigationProps {
  onCartClick: () => void;
}

const navLinks = [
  { label: 'Нүүр', href: '#hero' },
  { label: 'Бэлэн компьютер', href: '#catalog' },
  { label: 'Үйлчилгээ', href: '#services' },
  { label: 'Бидний тухай', href: '#features' },
  { label: 'Холбоо барих', href: '#contact' },
];

const Navigation: React.FC<NavigationProps> = ({ onCartClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [badgeKey, setBadgeKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate badge when count changes
  useEffect(() => {
    setBadgeKey(prev => prev + 1);
  }, [cartCount]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      // Animate mobile menu links
      const links = document.querySelectorAll('.mobile-nav-link');
      gsap.fromTo(
        links,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] transition-all duration-300 ${
          scrolled
            ? 'bg-deep-navy/85 backdrop-blur-[20px] border-b border-white/[0.08] shadow-nav'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-main h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-xl font-semibold text-white"
            style={{
              textShadow: '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 30px rgba(0, 229, 255, 0.8), 0 0 60px rgba(0, 229, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)';
            }}
          >
            MyTech
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-silver hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side: Cart + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-silver hover:text-white transition-colors"
              aria-label="Сагс"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span
                  key={badgeKey}
                  className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-electric-blue text-deep-navy text-[10px] font-bold rounded-full flex items-center justify-center animate-badge-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-silver hover:text-white transition-colors"
              aria-label="Цэс"
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] lg:hidden"
          style={{ background: 'rgba(10, 14, 39, 0.97)', backdropFilter: 'blur(30px)' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="mobile-nav-link text-2xl font-semibold text-silver hover:text-electric-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 p-2 text-silver hover:text-white"
            aria-label="Хаах"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(Navigation);
