import React from 'react';
import { cn } from '@/lib/utils';

interface LuxuryLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'orb' | 'dots' | 'pulse';
  text?: string;
  className?: string;
}

/**
 * Luxury Loading Indicator
 * Matches the warm, elegant aesthetic of the voice assistant
 * 
 * Variants:
 * - orb: Breathing orb with glow effect (default, best for full-page loading)
 * - dots: Staggered floating dots (good for inline/button loading)
 * - pulse: Concentric rings pulse outward (good for search/processing states)
 */
export const LuxuryLoader: React.FC<LuxuryLoaderProps> = ({
  size = 'md',
  variant = 'orb',
  text,
  className,
}) => {
  const sizeMap = {
    sm: { container: 40, orb: 16, dot: 6, ring: 24 },
    md: { container: 80, orb: 32, dot: 8, ring: 48 },
    lg: { container: 120, orb: 48, dot: 10, ring: 72 },
  };

  const dimensions = sizeMap[size];

  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center gap-4', className)}>
        <div 
          className="flex items-center justify-center gap-2"
          style={{ height: dimensions.container / 2 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: dimensions.dot,
                height: dimensions.dot,
                background: `linear-gradient(135deg, 
                  hsla(15, 55%, 70%, ${0.6 + i * 0.1}) 0%, 
                  hsla(35, 45%, 75%, ${0.8 + i * 0.05}) 50%,
                  hsla(40, 50%, 55%, ${0.5 + i * 0.1}) 100%)`,
                boxShadow: `0 0 ${8 + i * 2}px hsla(25, 50%, 72%, 0.4)`,
                animation: `luxuryFloat 1.8s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        {text && (
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
              color: 'hsla(20, 15%, 40%, 0.8)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              animation: 'luxuryTextPulse 2s ease-in-out infinite',
            }}
          >
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center gap-4', className)}>
        <div
          className="relative flex items-center justify-center"
          style={{
            width: dimensions.container,
            height: dimensions.container,
          }}
        >
          {/* Concentric rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: dimensions.ring + i * 20,
                height: dimensions.ring + i * 20,
                border: `1.5px solid hsla(25, 50%, 72%, ${0.4 - i * 0.1})`,
                animation: `luxuryRingPulse 2.4s ease-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
          {/* Center dot */}
          <div
            className="absolute rounded-full"
            style={{
              width: dimensions.dot * 1.5,
              height: dimensions.dot * 1.5,
              background: 'linear-gradient(135deg, hsla(15, 55%, 70%, 1) 0%, hsla(40, 50%, 55%, 1) 100%)',
              boxShadow: '0 0 20px hsla(25, 50%, 72%, 0.6)',
              animation: 'luxuryCorePulse 2.4s ease-in-out infinite',
            }}
          />
        </div>
        {text && (
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
              color: 'hsla(20, 15%, 40%, 0.8)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              animation: 'luxuryTextPulse 2s ease-in-out infinite',
            }}
          >
            {text}
          </span>
        )}
      </div>
    );
  }

  // Default: orb variant
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div
        className="relative flex items-center justify-center"
        style={{
          width: dimensions.container,
          height: dimensions.container,
        }}
      >
        {/* Outer glow rings */}
        <div
          className="absolute rounded-full"
          style={{
            width: dimensions.orb * 2.5,
            height: dimensions.orb * 2.5,
            background: 'radial-gradient(circle, hsla(25, 50%, 72%, 0.15) 0%, transparent 70%)',
            animation: 'luxuryBreathe 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: dimensions.orb * 2,
            height: dimensions.orb * 2,
            background: 'radial-gradient(circle, hsla(35, 45%, 75%, 0.2) 0%, transparent 70%)',
            animation: 'luxuryBreathe 3s ease-in-out infinite 0.5s',
          }}
        />
        
        {/* Floating particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = dimensions.orb * 0.9;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 3 + (i % 2),
                height: 3 + (i % 2),
                background: `hsla(${15 + i * 5}, ${50 + i * 2}%, ${65 + i * 3}%, 0.8)`,
                boxShadow: `0 0 ${6 + i}px hsla(${25 + i * 3}, 50%, 72%, 0.5)`,
                animation: `luxuryOrbit 4s linear infinite`,
                animationDelay: `${i * -0.67}s`,
                transformOrigin: 'center',
                left: '50%',
                top: '50%',
                marginLeft: -2,
                marginTop: -2,
                // Custom property for orbit radius
                ['--orbit-radius' as string]: `${radius}px`,
              }}
            />
          );
        })}
        
        {/* Main orb */}
        <div
          className="relative rounded-full"
          style={{
            width: dimensions.orb,
            height: dimensions.orb,
            background: `linear-gradient(
              135deg,
              hsla(15, 55%, 70%, 0.9) 0%,
              hsla(35, 45%, 75%, 0.85) 40%,
              hsla(25, 50%, 72%, 0.9) 70%,
              hsla(40, 50%, 55%, 0.95) 100%
            )`,
            boxShadow: `
              0 0 ${dimensions.orb * 0.5}px hsla(25, 50%, 72%, 0.4),
              0 0 ${dimensions.orb}px hsla(35, 45%, 75%, 0.2),
              inset 0 0 ${dimensions.orb * 0.3}px hsla(40, 50%, 55%, 0.3)
            `,
            animation: 'luxuryOrbPulse 3s ease-in-out infinite',
          }}
        >
          {/* Inner highlight */}
          <div
            className="absolute rounded-full"
            style={{
              width: dimensions.orb * 0.4,
              height: dimensions.orb * 0.4,
              top: dimensions.orb * 0.15,
              left: dimensions.orb * 0.15,
              background: 'radial-gradient(circle, hsla(40, 60%, 85%, 0.6) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
      
      {text && (
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
            color: 'hsla(20, 15%, 40%, 0.8)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            animation: 'luxuryTextPulse 2s ease-in-out infinite',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

// CSS Keyframes - add to your global CSS or index.css
export const luxuryLoaderStyles = `
@keyframes luxuryBreathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
}

@keyframes luxuryOrbPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 
      0 0 20px hsla(25, 50%, 72%, 0.4),
      0 0 40px hsla(35, 45%, 75%, 0.2),
      inset 0 0 10px hsla(40, 50%, 55%, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 
      0 0 30px hsla(25, 50%, 72%, 0.6),
      0 0 60px hsla(35, 45%, 75%, 0.3),
      inset 0 0 15px hsla(40, 50%, 55%, 0.4);
  }
}

@keyframes luxuryOrbit {
  from {
    transform: translate(-50%, -50%) rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
  }
}

@keyframes luxuryFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-8px) scale(1.1);
    opacity: 1;
  }
}

@keyframes luxuryRingPulse {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes luxuryCorePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes luxuryTextPulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
`;

export default LuxuryLoader;
