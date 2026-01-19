import React, { useState } from 'react';
import { LuxuryLoader } from '@/components/ui/luxury-loader';
import { LuxuryImage, LuxuryImagePlaceholder } from '@/components/ui/luxury-image';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoaderDemo: React.FC = () => {
  const navigate = useNavigate();
  const [imageKey, setImageKey] = useState(0);

  const reloadImages = () => {
    setImageKey(prev => prev + 1);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 20% 96%) 100%)',
        padding: '40px 20px',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto 60px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: 'hsl(30 15% 40%)',
            marginBottom: 24,
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 48,
            fontWeight: 300,
            color: 'hsl(30 15% 15%)',
            marginBottom: 12,
          }}
        >
          Luxury Loader
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'hsl(30 10% 50%)',
            maxWidth: 600,
          }}
        >
          Elegant loading indicators designed to match the warm, sophisticated aesthetic
          of the voice assistant experience.
        </p>
      </div>

      {/* Variants Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40,
        }}
      >
        {/* Orb Variant */}
        <div
          style={{
            background: 'hsl(30 20% 96%)',
            borderRadius: 24,
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            border: '1px solid hsl(30 20% 90%)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 400,
                color: 'hsl(30 15% 20%)',
                marginBottom: 8,
              }}
            >
              Orb
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: 'hsl(30 10% 50%)',
                letterSpacing: '0.05em',
              }}
            >
              Best for full-page loading states
            </p>
          </div>
          
          <div style={{ minHeight: 150, display: 'flex', alignItems: 'center' }}>
            <LuxuryLoader variant="orb" size="lg" text="Loading" />
          </div>
          
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'center' }}>
              <LuxuryLoader variant="orb" size="sm" />
              <span style={{ 
                display: 'block', 
                marginTop: 12, 
                fontSize: 11, 
                color: 'hsl(30 10% 50%)',
                fontFamily: "'Inter', sans-serif",
              }}>
                Small
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LuxuryLoader variant="orb" size="md" />
              <span style={{ 
                display: 'block', 
                marginTop: 12, 
                fontSize: 11, 
                color: 'hsl(30 10% 50%)',
                fontFamily: "'Inter', sans-serif",
              }}>
                Medium
              </span>
            </div>
          </div>
        </div>

        {/* Dots Variant */}
        <div
          style={{
            background: 'hsl(30 20% 96%)',
            borderRadius: 24,
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            border: '1px solid hsl(30 20% 90%)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 400,
                color: 'hsl(30 15% 20%)',
                marginBottom: 8,
              }}
            >
              Dots
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: 'hsl(30 10% 50%)',
                letterSpacing: '0.05em',
              }}
            >
              Ideal for inline or button loading
            </p>
          </div>
          
          <div style={{ minHeight: 150, display: 'flex', alignItems: 'center' }}>
            <LuxuryLoader variant="dots" size="lg" text="Searching" />
          </div>
          
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'center' }}>
              <LuxuryLoader variant="dots" size="sm" />
              <span style={{ 
                display: 'block', 
                marginTop: 12, 
                fontSize: 11, 
                color: 'hsl(30 10% 50%)',
                fontFamily: "'Inter', sans-serif",
              }}>
                Small
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LuxuryLoader variant="dots" size="md" />
              <span style={{ 
                display: 'block', 
                marginTop: 12, 
                fontSize: 11, 
                color: 'hsl(30 10% 50%)',
                fontFamily: "'Inter', sans-serif",
              }}>
                Medium
              </span>
            </div>
          </div>
        </div>

        {/* Pulse Variant */}
        <div
          style={{
            background: 'hsl(30 20% 96%)',
            borderRadius: 24,
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            border: '1px solid hsl(30 20% 90%)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 400,
                color: 'hsl(30 15% 20%)',
                marginBottom: 8,
              }}
            >
              Pulse
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: 'hsl(30 10% 50%)',
                letterSpacing: '0.05em',
              }}
            >
              Perfect for search or processing states
            </p>
          </div>
          
          <div style={{ minHeight: 150, display: 'flex', alignItems: 'center' }}>
            <LuxuryLoader variant="pulse" size="lg" text="Processing" />
          </div>
          
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'center' }}>
              <LuxuryLoader variant="pulse" size="sm" />
              <span style={{ 
                display: 'block', 
                marginTop: 12, 
                fontSize: 11, 
                color: 'hsl(30 10% 50%)',
                fontFamily: "'Inter', sans-serif",
              }}>
                Small
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LuxuryLoader variant="pulse" size="md" />
              <span style={{ 
                display: 'block', 
                marginTop: 12, 
                fontSize: 11, 
                color: 'hsl(30 10% 50%)',
                fontFamily: "'Inter', sans-serif",
              }}>
                Medium
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Placeholder Section */}
      <div style={{ maxWidth: 1200, margin: '80px auto 0' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 36,
            fontWeight: 300,
            color: 'hsl(30 15% 15%)',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Image Placeholders
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'hsl(30 10% 50%)',
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          Elegant shimmer placeholders for lazy-loaded images with smooth fade-in transitions.
        </p>

        {/* Placeholder Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div>
            <LuxuryImagePlaceholder aspectRatio="video" />
            <p style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: 'hsl(30 10% 50%)',
              marginTop: 12,
              textAlign: 'center',
            }}>
              Video (16:9)
            </p>
          </div>
          <div>
            <LuxuryImagePlaceholder aspectRatio="square" />
            <p style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: 'hsl(30 10% 50%)',
              marginTop: 12,
              textAlign: 'center',
            }}>
              Square (1:1)
            </p>
          </div>
          <div>
            <LuxuryImagePlaceholder aspectRatio="wide" />
            <p style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: 'hsl(30 10% 50%)',
              marginTop: 12,
              textAlign: 'center',
            }}>
              Wide (3:2)
            </p>
          </div>
        </div>

        {/* Live Image Loading Demo */}
        <div
          style={{
            background: 'hsl(30 20% 96%)',
            borderRadius: 24,
            padding: 32,
            border: '1px solid hsl(30 20% 90%)',
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24,
              fontWeight: 400,
              color: 'hsl(30 15% 20%)',
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            Live Loading Demo
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'hsl(30 10% 50%)',
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            Watch the elegant shimmer transition to real images
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <button
              onClick={reloadImages}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 12,
                border: '1px solid hsl(30 20% 85%)',
                background: 'hsl(30 25% 98%)',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: 'hsl(30 15% 40%)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'hsl(30 20% 95%)';
                e.currentTarget.style.borderColor = 'hsl(40 45% 55%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'hsl(30 25% 98%)';
                e.currentTarget.style.borderColor = 'hsl(30 20% 85%)';
              }}
            >
              <RotateCcw size={16} />
              Reload Images to See Animation
            </button>
          </div>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
            }}
          >
            <LuxuryImage 
              key={`img1-${imageKey}`}
              src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80&t=${imageKey}`}
              alt="Luxury resort pool"
              aspectRatio="square"
              style={{ borderRadius: 12 }}
            />
            <LuxuryImage 
              key={`img2-${imageKey}`}
              src={`https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80&t=${imageKey}`}
              alt="Hotel room"
              aspectRatio="square"
              style={{ borderRadius: 12 }}
            />
            <LuxuryImage 
              key={`img3-${imageKey}`}
              src={`https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80&t=${imageKey}`}
              alt="Resort view"
              aspectRatio="square"
              style={{ borderRadius: 12 }}
            />
            <LuxuryImage 
              key={`img4-${imageKey}`}
              src={`https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80&t=${imageKey}`}
              alt="Hotel exterior"
              aspectRatio="square"
              style={{ borderRadius: 12 }}
            />
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div
        style={{
          maxWidth: 800,
          margin: '80px auto 0',
          background: 'hsl(30 10% 12%)',
          borderRadius: 16,
          padding: 32,
          fontFamily: "'Fira Code', monospace",
          fontSize: 14,
          color: 'hsl(30 15% 75%)',
          overflow: 'auto',
        }}
      >
        <pre style={{ margin: 0 }}>
{`// Import the components
import { LuxuryLoader } from '@/components/ui/luxury-loader';
import { LuxuryImage, LuxuryImagePlaceholder } from '@/components/ui/luxury-image';

// Loader examples
<LuxuryLoader variant="orb" size="lg" text="Loading" />
<LuxuryLoader variant="dots" size="md" />

// Image with auto fade-in on load
<LuxuryImage 
  src="/hotel-photo.jpg" 
  alt="Hotel" 
  aspectRatio="video" 
/>

// Static placeholder for skeleton grids
<LuxuryImagePlaceholder aspectRatio="square" />`}
        </pre>
      </div>
    </div>
  );
};

export default LoaderDemo;
