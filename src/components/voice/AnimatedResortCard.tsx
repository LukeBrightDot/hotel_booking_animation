import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuxuryImage } from '@/components/ui/luxury-image';

export interface Resort {
  id: string;
  name: string;
  location: string;
  description: string;
  pricePerNight: string;
  rating: number;
  amenities: string[];
  imageUrl?: string;
}

interface AnimatedResortCardProps {
  resort: Resort;
  index?: number;
  className?: string;
  isNewlyLoaded?: boolean; // True when this card just arrived from API
}

export const AnimatedResortCard: React.FC<AnimatedResortCardProps> = ({
  resort,
  index = 0,
  className = '',
  isNewlyLoaded = false,
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(!isNewlyLoaded);
  const [showContent, setShowContent] = useState(!isNewlyLoaded);

  useEffect(() => {
    if (isNewlyLoaded) {
      // Staggered reveal: card frame appears first, then content
      const frameDelay = index * 120; // Stagger between cards
      const contentDelay = frameDelay + 200; // Content reveals after frame

      const frameTimer = setTimeout(() => setIsVisible(true), frameDelay);
      const contentTimer = setTimeout(() => setShowContent(true), contentDelay);

      return () => {
        clearTimeout(frameTimer);
        clearTimeout(contentTimer);
      };
    }
  }, [isNewlyLoaded, index]);

  const handleClick = () => {
    navigate(`/hotel/${resort.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer ${className}`}
      style={{
        borderRadius: '1rem',
        transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        background: 'hsl(30 20% 96% / 0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid hsl(30 15% 88% / 0.5)',
        overflow: 'hidden',
      }}
    >
      {/* Card glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, hsl(var(--gold) / 0.08) 0%, transparent 60%)',
          borderRadius: '1rem',
        }}
      />

      {/* Image section with luxury loading */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          height: '13rem',
          transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        {resort.imageUrl ? (
          <div className="w-full h-full overflow-hidden">
            <LuxuryImage
              src={resort.imageUrl}
              alt={resort.name}
              aspectRatio="wide"
              className="w-full h-full transition-transform duration-700 group-hover:scale-110"
              style={{ height: '100%', paddingBottom: 0 }}
            />
          </div>
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'hsl(30 15% 92%)' }}
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none"
              style={{ opacity: 0.35 }}
            >
              <path 
                d="M16 2L28 12L16 30L4 12L16 2Z" 
                stroke="hsl(var(--gold))" 
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        )}
        
        {/* Premium gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'linear-gradient(to top, hsl(30 20% 6% / 0.65), transparent 50%)',
          }} 
        />

        {/* Rating badge - appears with content */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.375rem 0.625rem',
            borderRadius: '9999px',
            background: 'hsl(30 20% 10% / 0.7)',
            backdropFilter: 'blur(8px)',
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'all 400ms ease-out 200ms',
          }}
        >
          <span style={{ color: 'hsl(var(--gold))', fontSize: '0.75rem' }}>★</span>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 400, 
            color: 'hsl(30 20% 95%)',
            fontFamily: "var(--font-sans)",
          }}>
            {resort.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div 
        style={{ 
          padding: '1.25rem 1.5rem 1.5rem',
          transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        {/* Location tag with animated underline */}
        <div style={{ marginBottom: '0.5rem' }}>
          <span 
            className="relative inline-block"
            style={{ 
              fontFamily: "var(--font-sans)",
              fontWeight: 200,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              color: 'hsl(var(--gold))',
            }}
          >
            {resort.location}
            <span 
              className="absolute bottom-0 left-0 h-px bg-current transition-all duration-500 group-hover:w-full"
              style={{ width: 0 }}
            />
          </span>
        </div>

        {/* Name with hover effect */}
        <h3 
          className="transition-colors duration-300 group-hover:text-[hsl(var(--gold))]"
          style={{ 
            fontFamily: "var(--font-serif)",
            fontSize: '1.35rem',
            fontWeight: 300,
            color: 'hsl(30 20% 15%)',
            marginBottom: '0.625rem',
            lineHeight: 1.25,
          }}
        >
          {resort.name}
        </h3>

        {/* Description with fade */}
        <p 
          style={{ 
            fontFamily: "var(--font-sans)",
            fontSize: '0.8rem',
            fontWeight: 300,
            color: 'hsl(30 15% 50%)',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '0.875rem',
          }}
        >
          {resort.description}
        </p>

        {/* Amenities with staggered reveal */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.375rem', 
          marginBottom: '1rem',
        }}>
          {resort.amenities.slice(0, 3).map((amenity, i) => (
            <span 
              key={i}
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.625rem',
                borderRadius: '9999px',
                background: 'hsl(30 20% 92% / 0.6)',
                color: 'hsl(30 25% 30%)',
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                transition: 'all 300ms ease-out',
                transitionDelay: `${i * 50}ms`,
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(4px)',
              }}
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Price footer with reveal animation */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'space-between', 
            paddingTop: '0.875rem',
            borderTop: '1px solid hsl(30 15% 88% / 0.4)',
          }}
        >
          <div>
            <span 
              style={{ 
                fontFamily: "var(--font-sans)",
                fontWeight: 200,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                color: 'hsl(30 15% 55%)',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              From
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              <span 
                style={{ 
                  fontFamily: "var(--font-serif)",
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: 'hsl(30 20% 15%)',
                }}
              >
                {resort.pricePerNight}
              </span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: 'hsl(30 15% 50%)',
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
              }}>
                / night
              </span>
            </div>
          </div>
          
          {/* View button - appears on hover */}
          <div
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0"
            style={{
              transform: 'translateX(-8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              color: 'hsl(var(--gold))',
              fontSize: '0.75rem',
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              letterSpacing: '0.05em',
            }}
          >
            <span>View</span>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedResortCard;
