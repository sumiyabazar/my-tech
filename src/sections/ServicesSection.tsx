import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import ScrollFadeIn from '@/components/ScrollFadeIn';

const services = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Компьютер засвар үйлчилгээ',
    description: 'Мэргэжлийн инженерүүд таны компьютерыг оношлон, хамгийн богино хугацаанд засварлана.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    title: 'Гүн цэвэрлэгээ, арчилгаа',
    description: 'Тоос шороо, бохирдлыг бүрэн цэвэрлэн, халууны зуухаа шинэчлэн компьютерын ажиллагааг сайжруулна.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Гүйцэтгэл сайжруулалт (Upgrade)',
    description: 'RAM, SSD, GPU зэрэг эд ангиудыг шинэчлэн компьютерын хурд, хүчин чадлыг нэмэгдүүлнэ.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
    title: 'Оношилгоо, зөвлөгөө',
    description: 'Үнэгүй оношилгоо хийж, таны хэрэгцээнд хамгийн тохирох шийдлийг зөвлөнө.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section-padding relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent pointer-events-none" />

      <div className="container-main relative z-10">
        <ScrollFadeIn>
          <SectionHeading
            title="Борлуулалтын дараах үйлчилгээ"
            subtitle="Бид зөвхөн борлуулаад өнгөрдөггүй — таны компьютерыг урт хугацаанд асуудалгүй ажиллуулахад тань тусална"
          />
        </ScrollFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <ScrollFadeIn key={index} delay={index * 0.1}>
              <div className="glass-card p-8 text-center h-full flex flex-col items-center">
                <div className="mb-5 p-4 rounded-2xl bg-electric-blue/5 border border-electric-blue/20">
                  {service.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
