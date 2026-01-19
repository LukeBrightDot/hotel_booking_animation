import React, { useState } from 'react';

interface LuxuryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
}

const aspectRatioStyles = {
  square: { paddingBottom: '100%' },
  video: { paddingBottom: '56.25%' },    // 16:9
  portrait: { paddingBottom: '133.33%' }, // 3:4
  wide: { paddingBottom: '66.67%' },      // 3:2
};

export function LuxuryImage({ 
  src, 
  alt, 
  aspectRatio = 'video',
  className = '',
  style,
  ...props 
}: LuxuryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={className}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'hsl(30 20% 94%)',
        ...aspectRatioStyles[aspectRatio],
        ...style
      }}
    >
      {/* Luxury Shimmer Placeholder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
          background: 'linear-gradient(135deg, hsl(30 20% 96%) 0%, hsl(30 25% 93%) 50%, hsl(30 20% 96%) 100%)',
        }}
      >
        {/* Shimmer overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, hsl(40 30% 95% / 0.6) 50%, transparent 100%)',
            animation: 'luxuryShimmer 2s ease-in-out infinite',
          }}
        />
        
        {/* Elegant icon */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            opacity: 0.4,
          }}
        >
          {/* Minimalist diamond/gem shape */}
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none"
            style={{ animation: 'luxuryPulse 2s ease-in-out infinite' }}
          >
            <path 
              d="M16 2L28 12L16 30L4 12L16 2Z" 
              stroke="hsl(40 45% 55%)" 
              strokeWidth="1.5"
              fill="none"
            />
            <path 
              d="M4 12H28" 
              stroke="hsl(40 45% 55%)" 
              strokeWidth="1.5"
            />
            <path 
              d="M16 2L12 12L16 30L20 12L16 2Z" 
              stroke="hsl(40 45% 55%)" 
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Actual Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(1.02)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'hsl(30 20% 94%)',
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            style={{ opacity: 0.3 }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="hsl(30 15% 60%)" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="hsl(30 15% 60%)"/>
            <path d="M21 15L16 10L11 15" stroke="hsl(30 15% 60%)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 18L11 15L6 20" stroke="hsl(30 15% 60%)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}

// Simple placeholder for skeleton grids (no image loading)
export function LuxuryImagePlaceholder({ 
  aspectRatio = 'video',
  className = '',
  style,
}: { 
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div 
      className={className}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'hsl(30 20% 94%)',
        borderRadius: '12px',
        ...aspectRatioStyles[aspectRatio],
        ...style
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, hsl(30 20% 96%) 0%, hsl(30 25% 93%) 50%, hsl(30 20% 96%) 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, hsl(40 30% 95% / 0.6) 50%, transparent 100%)',
            animation: 'luxuryShimmer 2s ease-in-out infinite',
          }}
        />
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none"
          style={{ 
            opacity: 0.35,
            animation: 'luxuryPulse 2s ease-in-out infinite',
          }}
        >
          <path 
            d="M16 2L28 12L16 30L4 12L16 2Z" 
            stroke="hsl(40 45% 55%)" 
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M4 12H28" stroke="hsl(40 45% 55%)" strokeWidth="1.5"/>
          <path 
            d="M16 2L12 12L16 30L20 12L16 2Z" 
            stroke="hsl(40 45% 55%)" 
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
