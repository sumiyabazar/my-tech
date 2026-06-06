import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.7,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
    }

    gsap.from(ref.current, {
      ...fromVars,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollFadeIn;
