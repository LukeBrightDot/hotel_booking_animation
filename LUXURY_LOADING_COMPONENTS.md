# Luxury Loading Components Implementation Guide

> Elegant loading indicators and image placeholders designed for a warm, sophisticated aesthetic. Built for **Next.js 16 (App Router)**, **Tailwind CSS 4.x**, and **React 19**.

---

## Table of Contents

1. [Overview](#overview)
2. [Required Files](#required-files)
3. [CSS Keyframes](#css-keyframes)
4. [Component: LuxuryLoader](#component-luxuryloader)
5. [Component: LuxuryImage](#component-luxuryimage)
6. [Installation Steps](#installation-steps)
7. [Usage Examples](#usage-examples)
8. [Props Reference](#props-reference)

---

## Overview

### Components Included

| Component | Purpose |
|-----------|---------|
| `LuxuryLoader` | Full-page and inline loading indicators with 3 variants: orb, dots, pulse |
| `LuxuryImage` | Image component with shimmer placeholder and fade-in transition on load |
| `LuxuryImagePlaceholder` | Static shimmer placeholder for skeleton grids |

### Design Specifications

- **Color Palette**: Warm cream/champagne (HSL 30-40 range) with gold accents
- **Typography**: Cormorant Garamond (serif), Inter (sans-serif)
- **Animation Style**: Soft, breathing motions with subtle scale transforms
- **Transition Timing**: 0.5s-2s ease-in-out curves

---

## Required Files

Create these files in your project:

```
src/
├── components/
│   └── ui/
│       ├── luxury-loader.tsx
│       └── luxury-image.tsx
└── app/
    └── globals.css (add keyframes)
```

---

## CSS Keyframes

Add these keyframes to your global CSS file. For **Tailwind 4.x**, add them directly in your `globals.css` (not in tailwind.config):

```css
/* ===========================================
   LUXURY LOADING ANIMATIONS
   Add to: src/app/globals.css
   =========================================== */

/* Loader Animations */
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
  }
  50% {
    transform: scale(1.05);
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

/* Image Placeholder Animations */
@keyframes luxuryShimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes luxuryPulse {
  0%, 100% {
    opacity: 0.35;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}
```

---

## Component: LuxuryLoader

### File: `src/components/ui/luxury-loader.tsx`

```tsx
"use client";

import React from 'react';

interface LuxuryLoaderProps {
  variant?: 'orb' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const sizeConfig = {
  sm: { orb: 24, dots: 6, pulse: 20, text: 10, gap: 4 },
  md: { orb: 40, dots: 8, pulse: 32, text: 12, gap: 6 },
  lg: { orb: 64, dots: 10, pulse: 48, text: 14, gap: 8 },
};

export function LuxuryLoader({ 
  variant = 'orb', 
  size = 'md', 
  text,
  className = '' 
}: LuxuryLoaderProps) {
  const config = sizeConfig[size];
  
  if (variant === 'orb') {
    return (
      <div 
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: config.gap * 2,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: config.orb * 2,
            height: config.orb * 2,
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle, hsl(40 45% 55% / 0.15) 0%, transparent 70%)',
              animation: 'luxuryBreathe 3s ease-in-out infinite',
            }}
          />
          
          {/* Main orb */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: config.orb,
              height: config.orb,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, hsl(35 50% 75%) 0%, hsl(40 45% 55%) 50%, hsl(35 40% 65%) 100%)',
              boxShadow: `
                0 0 ${config.orb / 2}px hsl(40 45% 55% / 0.3),
                inset 0 -${config.orb / 8}px ${config.orb / 4}px hsl(35 30% 50% / 0.3),
                inset 0 ${config.orb / 8}px ${config.orb / 4}px hsl(45 60% 80% / 0.4)
              `,
              animation: 'luxuryOrbPulse 2s ease-in-out infinite',
            }}
          >
            {/* Highlight */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '30%',
                height: '20%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, hsl(45 70% 90% / 0.8) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Orbiting particles */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: config.orb / 8,
                height: config.orb / 8,
                borderRadius: '50%',
                background: 'hsl(40 50% 70%)',
                boxShadow: `0 0 ${config.orb / 6}px hsl(40 50% 60% / 0.5)`,
                // @ts-ignore - CSS custom property
                '--orbit-radius': `${config.orb * 0.9}px`,
                animation: `luxuryOrbit ${4 + i}s linear infinite`,
                animationDelay: `${-i * 1.3}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {text && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: config.text,
              fontWeight: 300,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'hsl(30 15% 45%)',
              animation: 'luxuryTextPulse 2s ease-in-out infinite',
            }}
          >
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div 
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: config.gap * 2,
        }}
      >
        <div style={{ display: 'flex', gap: config.gap }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: config.dots,
                height: config.dots,
                borderRadius: '50%',
                background: `linear-gradient(135deg, hsl(35 50% 75%) 0%, hsl(40 45% 55%) 100%)`,
                boxShadow: `0 0 ${config.dots}px hsl(40 45% 55% / 0.3)`,
                animation: 'luxuryFloat 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {text && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: config.text,
              fontWeight: 300,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'hsl(30 15% 45%)',
              animation: 'luxuryTextPulse 2s ease-in-out infinite',
            }}
          >
            {text}
          </span>
        )}
      </div>
    );
  }

  // Pulse variant
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: config.gap * 2,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: config.pulse * 2,
          height: config.pulse * 2,
        }}
      >
        {/* Pulsing rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: config.pulse,
              height: config.pulse,
              borderRadius: '50%',
              border: `1px solid hsl(40 45% 55% / ${0.4 - i * 0.1})`,
              animation: 'luxuryRingPulse 2s ease-out infinite',
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: config.pulse / 3,
            height: config.pulse / 3,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, hsl(35 50% 75%) 0%, hsl(40 45% 55%) 100%)',
            boxShadow: `0 0 ${config.pulse / 2}px hsl(40 45% 55% / 0.4)`,
            animation: 'luxuryCorePulse 2s ease-in-out infinite',
          }}
        />
      </div>

      {text && (
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: config.text,
            fontWeight: 300,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'hsl(30 15% 45%)',
            animation: 'luxuryTextPulse 2s ease-in-out infinite',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
```

---

## Component: LuxuryImage

### File: `src/components/ui/luxury-image.tsx`

```tsx
"use client";

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
        
        {/* Elegant diamond icon */}
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

// Static placeholder for skeleton grids (no image loading)
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
```

---

## Installation Steps

### Step 1: Add Required Fonts

In your `src/app/layout.tsx` or global CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400&display=swap');
```

### Step 2: Add CSS Keyframes

Copy the keyframes from the [CSS Keyframes](#css-keyframes) section into your `src/app/globals.css`.

### Step 3: Create Component Files

1. Create `src/components/ui/luxury-loader.tsx`
2. Create `src/components/ui/luxury-image.tsx`

### Step 4: Verify Animations Work

Test by adding a loader to any page:

```tsx
import { LuxuryLoader } from '@/components/ui/luxury-loader';

export default function TestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LuxuryLoader variant="orb" size="lg" text="Loading" />
    </div>
  );
}
```

---

## Usage Examples

### Full-Page Loading State

```tsx
"use client";

import { LuxuryLoader } from '@/components/ui/luxury-loader';

export default function LoadingPage() {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'hsl(30 25% 98%)',
      }}
    >
      <LuxuryLoader variant="orb" size="lg" text="Preparing your experience" />
    </div>
  );
}
```

### Image Grid with Lazy Loading

```tsx
"use client";

import { LuxuryImage } from '@/components/ui/luxury-image';

const images = [
  { src: '/hotel-1.jpg', alt: 'Luxury suite' },
  { src: '/hotel-2.jpg', alt: 'Pool area' },
  { src: '/hotel-3.jpg', alt: 'Restaurant' },
];

export function ImageGallery() {
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}
    >
      {images.map((img, i) => (
        <LuxuryImage
          key={i}
          src={img.src}
          alt={img.alt}
          aspectRatio="video"
          style={{ borderRadius: '12px' }}
        />
      ))}
    </div>
  );
}
```

### Skeleton Loading State

```tsx
"use client";

import { LuxuryImagePlaceholder } from '@/components/ui/luxury-image';

export function SkeletonGrid() {
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
      }}
    >
      {[...Array(8)].map((_, i) => (
        <LuxuryImagePlaceholder key={i} aspectRatio="square" />
      ))}
    </div>
  );
}
```

### Button Loading State

```tsx
"use client";

import { useState } from 'react';
import { LuxuryLoader } from '@/components/ui/luxury-loader';

export function SubmitButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={() => setLoading(true)}
      disabled={loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '16px 32px',
        minWidth: '160px',
        background: 'hsl(40 45% 55%)',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        cursor: loading ? 'wait' : 'pointer',
      }}
    >
      {loading ? (
        <LuxuryLoader variant="dots" size="sm" />
      ) : (
        'Book Now'
      )}
    </button>
  );
}
```

---

## Props Reference

### LuxuryLoader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'orb' \| 'dots' \| 'pulse'` | `'orb'` | Animation style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `text` | `string` | `undefined` | Optional status text below loader |
| `className` | `string` | `''` | Additional CSS classes |

#### Variant Recommendations

| Variant | Best For |
|---------|----------|
| `orb` | Full-page loading, initial app load |
| `dots` | Inline loading, buttons, search |
| `pulse` | Processing states, form submission |

### LuxuryImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Image source URL |
| `alt` | `string` | required | Image alt text |
| `aspectRatio` | `'square' \| 'video' \| 'portrait' \| 'wide'` | `'video'` | Container aspect ratio |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `undefined` | Inline styles |

#### Aspect Ratios

| Value | Ratio | Use Case |
|-------|-------|----------|
| `square` | 1:1 | Profile images, thumbnails |
| `video` | 16:9 | Hero images, banners |
| `portrait` | 3:4 | Cards, gallery items |
| `wide` | 3:2 | Featured images |

### LuxuryImagePlaceholder

Same props as `LuxuryImage` except `src` and `alt` are not needed.

---

## Design Tokens Reference

These HSL values are used throughout the components:

```css
/* Backgrounds */
--cream-light: hsl(30 20% 96%);
--cream-base: hsl(30 20% 94%);
--cream-gradient: linear-gradient(135deg, hsl(30 20% 96%) 0%, hsl(30 25% 93%) 50%, hsl(30 20% 96%) 100%);

/* Gold Accents */
--gold-primary: hsl(40 45% 55%);
--gold-light: hsl(35 50% 75%);
--gold-glow: hsl(40 45% 55% / 0.3);

/* Text */
--text-muted: hsl(30 15% 45%);
--text-subtle: hsl(30 10% 50%);

/* Shimmer */
--shimmer-highlight: hsl(40 30% 95% / 0.6);
```

---

## Troubleshooting

### Animations Not Playing

1. Verify keyframes are in `globals.css` (not a module CSS file)
2. Check browser DevTools → Elements → Computed → look for `animation` property
3. Ensure no CSS that could override animations (e.g., `animation: none`)

### Components Not Rendering

1. Add `"use client"` directive at top of component file
2. Verify import paths match your project structure

### TypeScript Errors

The `--orbit-radius` CSS custom property may show a TS error. Use the `as React.CSSProperties` cast as shown in the component code.

---

## File Checklist

- [ ] `src/components/ui/luxury-loader.tsx` - Created
- [ ] `src/components/ui/luxury-image.tsx` - Created  
- [ ] `src/app/globals.css` - Keyframes added
- [ ] Google Fonts import added
- [ ] Test component renders correctly
