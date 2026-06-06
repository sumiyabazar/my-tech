import React, { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import ScrollFadeIn from '@/components/ScrollFadeIn';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-main">
        <ScrollFadeIn>
          <SectionHeading
            title="Холбоо барих"
            subtitle="Бидэнтэй холбогдож, мэргэжлийн зөвлөгөө аваарай"
          />
        </ScrollFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {/* Left: Contact Info + Form */}
          <ScrollFadeIn delay={0.1}>
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Хаяг</h4>
                    <p className="text-muted-text text-sm leading-relaxed">
                      Хан-Уул дүүрэг, Нарны гүүрний баруун талд, Four Seasons хотхоны 1-р давхар, урагшаа харсан хаалга
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Утас</h4>
                    <div className="flex flex-col gap-1">
                      <a href="tel:8964-6478" className="text-electric-blue text-sm hover:underline">
                        8964-6478
                      </a>
                      <a href="tel:8945-1414" className="text-electric-blue text-sm hover:underline">
                        8945-1414
                      </a>
                    </div>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#3B82F6">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Facebook</h4>
                    <a
                      href="https://www.facebook.com/MyTech19"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric-blue text-sm hover:underline"
                    >
                      facebook.com/MyTech19
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-5">Бидэнд мессеж илгээх</h4>
                {submitted ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mb-4">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Илгээгдлээ!</p>
                    <p className="text-muted-text text-sm mt-1">Бид тантай удахгүй холбогдох болно.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Нэр"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-muted-text focus:outline-none focus:border-electric-blue/50 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Утас"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-muted-text focus:outline-none focus:border-electric-blue/50 transition-colors"
                    />
                    <textarea
                      placeholder="Мессеж"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-muted-text focus:outline-none focus:border-electric-blue/50 transition-colors resize-none"
                    />
                    <button type="submit" className="btn-primary w-full">
                      Илгээх
                    </button>
                  </form>
                )}
              </div>
            </div>
          </ScrollFadeIn>

          {/* Right: Google Maps */}
          <ScrollFadeIn delay={0.2}>
            <div className="glass-card overflow-hidden p-0 h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85569.45925259285!2d106.7413!3d47.8864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96925f61a260d7%3A0x523795d42e583e3f!2sKhan%20Uul%2C%20Ulaanbaatar!5e0!3m2!1sen!2smn!4v1700000000000!5m2!1sen!2smn"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px', filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MyTech Location - Khan Uul, Ulaanbaatar"
              />
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
