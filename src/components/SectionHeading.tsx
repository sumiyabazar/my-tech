import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="gradient-text text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-text text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default React.memo(SectionHeading);
