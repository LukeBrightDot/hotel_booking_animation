import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

interface HotelImageGalleryProps {
  images: string[];
  hotelName: string;
}

export const HotelImageGallery: React.FC<HotelImageGalleryProps> = ({ images, hotelName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const displayImages = images.length > 0 ? images : ['/placeholder.svg'];

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <>
      {/* Main Gallery */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', height: '28rem' }}>
        {/* Main Image */}
        <div 
          style={{ 
            position: 'relative', 
            borderRadius: '1rem 0 0 1rem',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => setIsFullscreen(true)}
        >
          <img 
            src={displayImages[activeIndex]} 
            alt={`${hotelName} - Main view`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, hsl(30 20% 6% / 0.4), transparent 40%)',
          }} />
          <button
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              padding: '0.5rem 1rem',
              background: 'hsl(30 20% 6% / 0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid hsl(30 25% 98% / 0.2)',
              borderRadius: '0.5rem',
              color: 'hsl(30 25% 98%)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Expand style={{ width: '1rem', height: '1rem' }} />
            View all photos
          </button>
        </div>

        {/* Side Thumbnails */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {displayImages.slice(1, 4).map((img, idx) => (
            <div 
              key={idx}
              style={{ 
                flex: 1, 
                position: 'relative',
                overflow: 'hidden',
                borderRadius: idx === 0 ? '0 1rem 0 0' : idx === 2 ? '0 0 1rem 0' : '0',
                cursor: 'pointer',
                opacity: activeIndex === idx + 1 ? 1 : 0.8,
                transition: 'opacity 300ms',
              }}
              onClick={() => setActiveIndex(idx + 1)}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = activeIndex === idx + 1 ? '1' : '0.8'}
            >
              <img 
                src={img} 
                alt={`${hotelName} - View ${idx + 2}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {idx === 2 && displayImages.length > 4 && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'hsl(30 20% 6% / 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(30 25% 98%)',
                  fontSize: '1.125rem',
                  fontWeight: 300,
                }}>
                  +{displayImages.length - 4} more
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'hsl(30 20% 6% / 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.75rem',
              background: 'hsl(30 25% 98% / 0.1)',
              border: 'none',
              borderRadius: '9999px',
              color: 'hsl(30 25% 98%)',
              cursor: 'pointer',
            }}
          >
            <X style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{
              position: 'absolute',
              left: '1.5rem',
              padding: '1rem',
              background: 'hsl(30 25% 98% / 0.1)',
              border: 'none',
              borderRadius: '9999px',
              color: 'hsl(30 25% 98%)',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>

          <img 
            src={displayImages[activeIndex]} 
            alt={hotelName}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '85vw', 
              maxHeight: '85vh', 
              objectFit: 'contain',
              borderRadius: '0.5rem',
            }}
          />

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{
              position: 'absolute',
              right: '1.5rem',
              padding: '1rem',
              background: 'hsl(30 25% 98% / 0.1)',
              border: 'none',
              borderRadius: '9999px',
              color: 'hsl(30 25% 98%)',
              cursor: 'pointer',
            }}
          >
            <ChevronRight style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>

          {/* Thumbnails */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            display: 'flex',
            gap: '0.5rem',
            padding: '0.75rem',
            background: 'hsl(30 20% 6% / 0.6)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
          }}>
            {displayImages.map((img, idx) => (
              <div
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                style={{
                  width: '4rem',
                  height: '3rem',
                  borderRadius: '0.375rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeIndex === idx ? '2px solid hsl(15 55% 70%)' : '2px solid transparent',
                  opacity: activeIndex === idx ? 1 : 0.6,
                  transition: 'all 200ms',
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
