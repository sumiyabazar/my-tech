import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-deep-navy/50">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-semibold text-white mb-4"
              style={{
                textShadow: '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)',
              }}
            >
              MyTech
            </h3>
            <p className="text-muted-text text-sm leading-relaxed">
              Gaming болон Office компьютер худалдаа, угсралт, засвар, сайжруулалт. Улаанбаатар, Хан-Уул дүүрэг.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Цэс</h4>
            <ul className="space-y-2">
              {[
                { label: 'Нүүр', href: '#hero' },
                { label: 'Бэлэн компьютер', href: '#catalog' },
                { label: 'Үйлчилгээ', href: '#services' },
                { label: 'Холбоо барих', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-text text-sm hover:text-electric-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Холбоо барих</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-text text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Хан-Уул дүүрэг, Four Seasons хотхон
              </li>
              <li>
                <a href="tel:8964-6478" className="flex items-center gap-3 text-muted-text text-sm hover:text-electric-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  8964-6478
                </a>
              </li>
              <li>
                <a href="tel:8945-1414" className="flex items-center gap-3 text-muted-text text-sm hover:text-electric-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  8945-1414
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/MyTech19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-text text-sm hover:text-electric-blue transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#94A3B8">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                  facebook.com/MyTech19
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-muted-text text-sm">
            &copy; 2025 MyTech. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
