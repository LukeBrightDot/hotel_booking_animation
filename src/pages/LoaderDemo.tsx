import React from 'react';
import { LuxuryLoader } from '@/components/ui/luxury-loader';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoaderDemo: React.FC = () => {
  const navigate = useNavigate();

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
{`// Import the component
import { LuxuryLoader } from '@/components/ui/luxury-loader';

// Usage examples
<LuxuryLoader variant="orb" size="lg" text="Loading" />
<LuxuryLoader variant="dots" size="md" />
<LuxuryLoader variant="pulse" size="sm" text="Processing" />`}
        </pre>
      </div>
    </div>
  );
};

export default LoaderDemo;
