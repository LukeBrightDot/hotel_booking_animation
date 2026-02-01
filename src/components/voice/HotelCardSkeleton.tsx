import React from 'react';

interface HotelCardSkeletonProps {
  className?: string;
}

/**
 * Premium skeleton placeholder for hotel cards while loading.
 * Features:
 * - Elegant gold shimmer animation
 * - Glassmorphic card design
 * - Smooth breathing pulse
 */
export const HotelCardSkeleton: React.FC<HotelCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: '1rem',
        background: 'hsl(30 20% 96% / 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid hsl(30 15% 88% / 0.4)',
        animation: 'skeletonBreathe 3s ease-in-out infinite',
      }}
    >
      {/* Shimmer overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 0%, transparent 40%, hsl(var(--gold) / 0.08) 50%, transparent 60%, transparent 100%)',
          animation: 'skeletonShimmer 2.5s ease-in-out infinite',
          zIndex: 10,
        }}
      />

      {/* Image placeholder */}
      <div 
        style={{ 
          height: '13rem',
          background: 'linear-gradient(135deg, hsl(30 20% 94%) 0%, hsl(30 25% 91%) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diamond icon */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 32 32" 
            fill="none"
            style={{ 
              opacity: 0.25,
              animation: 'skeletonIconPulse 2.5s ease-in-out infinite',
            }}
          >
            <path 
              d="M16 2L28 12L16 30L4 12L16 2Z" 
              stroke="hsl(var(--gold))" 
              strokeWidth="1.5"
              fill="none"
            />
            <path 
              d="M4 12H28" 
              stroke="hsl(var(--gold))" 
              strokeWidth="1.5"
            />
            <path 
              d="M16 2L12 12L16 30L20 12L16 2Z" 
              stroke="hsl(var(--gold))" 
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Rating badge placeholder */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '3.5rem',
            height: '1.5rem',
            borderRadius: '9999px',
            background: 'hsl(30 15% 88% / 0.5)',
          }}
        />
      </div>

      {/* Content placeholder */}
      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        {/* Location placeholder */}
        <div
          style={{
            width: '5rem',
            height: '0.625rem',
            borderRadius: '0.25rem',
            background: 'hsl(30 20% 90%)',
            marginBottom: '0.75rem',
          }}
        />

        {/* Title placeholder */}
        <div
          style={{
            width: '70%',
            height: '1.25rem',
            borderRadius: '0.25rem',
            background: 'hsl(30 20% 88%)',
            marginBottom: '0.75rem',
          }}
        />

        {/* Description placeholder lines */}
        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{
              width: '100%',
              height: '0.625rem',
              borderRadius: '0.25rem',
              background: 'hsl(30 20% 92%)',
              marginBottom: '0.5rem',
            }}
          />
          <div
            style={{
              width: '80%',
              height: '0.625rem',
              borderRadius: '0.25rem',
              background: 'hsl(30 20% 92%)',
            }}
          />
        </div>

        {/* Amenity pills placeholder */}
        <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1rem' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: `${3.5 + i * 0.5}rem`,
                height: '1.375rem',
                borderRadius: '9999px',
                background: 'hsl(30 20% 92% / 0.6)',
              }}
            />
          ))}
        </div>

        {/* Price placeholder */}
        <div 
          style={{ 
            paddingTop: '0.875rem',
            borderTop: '1px solid hsl(30 15% 88% / 0.4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
            <div
              style={{
                width: '2rem',
                height: '0.5rem',
                borderRadius: '0.25rem',
                background: 'hsl(30 20% 92%)',
                marginBottom: '0.375rem',
              }}
            />
            <div
              style={{
                width: '5rem',
                height: '1rem',
                borderRadius: '0.25rem',
                background: 'hsl(30 20% 88%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
