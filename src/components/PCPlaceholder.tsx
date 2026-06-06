import React from 'react';

interface PCPlaceholderProps {
  model: string;
  gpu?: string;
  cpu?: string;
}

const PCPlaceholder: React.FC<PCPlaceholderProps> = ({ model, gpu, cpu }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-deep-navy via-[#080c20] to-black flex flex-col items-center justify-center">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.15) 0%, rgba(124, 58, 237, 0.08) 40%, transparent 70%)',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-electric-blue/40 rounded-tl-lg" />
      <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-electric-blue/40 rounded-tr-lg" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-electric-blue/40 rounded-bl-lg" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-electric-blue/40 rounded-br-lg" />

      {/* PC Tower Icon */}
      <div className="relative z-10 mb-4">
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none" className="drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
          {/* Case outline */}
          <rect x="10" y="5" width="60" height="90" rx="4" stroke="url(#placeholderGrad)" strokeWidth="1.5" fill="rgba(0, 229, 255, 0.05)" />
          {/* Side panel line */}
          <line x1="50" y1="5" x2="50" y2="95" stroke="url(#placeholderGrad)" strokeWidth="0.5" opacity="0.5" />
          {/* Front fans */}
          <circle cx="30" cy="25" r="8" stroke="#00E5FF" strokeWidth="1" fill="none" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="48" r="8" stroke="#00E5FF" strokeWidth="1" fill="none" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="71" r="8" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* GPU text */}
          <rect x="18" y="55" width="28" height="8" rx="2" fill="rgba(0, 229, 255, 0.15)" stroke="#00E5FF" strokeWidth="0.5" />
          <text x="32" y="61" textAnchor="middle" fill="#00E5FF" fontSize="5" fontFamily="monospace" fontWeight="bold">{gpu || 'RTX'}</text>
          {/* Power button */}
          <circle cx="65" cy="18" r="3" stroke="#00E5FF" strokeWidth="0.8" fill="none" opacity="0.7" />
          {/* USB ports */}
          <rect x="58" y="28" width="4" height="2" rx="0.5" fill="#7C3AED" opacity="0.5" />
          <rect x="64" y="28" width="4" height="2" rx="0.5" fill="#7C3AED" opacity="0.5" />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="placeholderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand text */}
      <div className="relative z-10 text-center">
        <p
          className="text-xs font-medium tracking-[0.2em] mb-1"
          style={{
            background: 'linear-gradient(90deg, #00E5FF, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          MyTech
        </p>
        <p className="text-white font-bold text-xl tracking-wider">{model}</p>
        {cpu && (
          <p className="text-muted-text text-xs font-mono mt-1">{cpu}</p>
        )}
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #00E5FF, #7C3AED, transparent)',
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export default React.memo(PCPlaceholder);
