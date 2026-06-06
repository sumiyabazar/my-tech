import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import ScrollFadeIn from '@/components/ScrollFadeIn';

const testimonials = [
  {
    name: 'Бат-Эрдэнэ',
    role: 'Gamer',
    rating: 5,
    text: 'RTX 4070 Ti Gaming PC авсан. График маш сайн гарч байна, AAA тоглоомууд 4K-д ч асуудалгүй ажиллаж байна. MyTech-д баярлалаа!',
    avatar: 'https://placehold.co/60x60/0A0E27/00E5FF?text=БЭ',
  },
  {
    name: 'Сарангэрэл',
    role: 'График дизайнер',
    rating: 5,
    text: 'Office Elite PC + дэлгэц авсан. Adobe программууд маш хурдан ажиллаж байна. Угсарсан компьютерын чанар маш сайхан.',
    avatar: 'https://placehold.co/60x60/0A0E27/7C3AED?text=СГ',
  },
  {
    name: 'Энхболд',
    role: 'Стример',
    rating: 5,
    text: 'Стрим хийхэд зориулсан компьютер захиалсан. Мэргэжлийн зөвлөгөө өгч, төсөвт минь тааруулан угсарсан. Одоо 1080p 60fps стрим асуудалгүй!',
    avatar: 'https://placehold.co/60x60/0A0E27/A78BFA?text=ЭБ',
  },
];

const StarRating: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < count ? '#00E5FF' : 'none'}
          stroke={i < count ? '#00E5FF' : '#94A3B8'}
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple/5 to-transparent pointer-events-none" />

      <div className="container-main relative z-10">
        <ScrollFadeIn>
          <SectionHeading
            title="Хэрэглэгчдийн сэтгэгдэл"
            subtitle="Манай үйлчлүүлэгчид юу гэж хэлж байна вэ?"
          />
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <ScrollFadeIn key={index} delay={index * 0.1}>
              <div className="glass-card p-8 h-full flex flex-col">
                <StarRating count={testimonial.rating} />
                <p className="text-silver text-sm leading-relaxed mt-5 flex-1">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                    <p className="text-muted-text text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
