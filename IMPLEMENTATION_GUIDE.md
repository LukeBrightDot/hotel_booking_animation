# Voice Assistant UI - Implementation Guide

This guide explains how to implement the voice assistant visualization UI in another React/Tailwind project.

## Prerequisites

Your target project needs:
- React 18+
- Tailwind CSS
- TypeScript (recommended)
- lucide-react for icons

## Required Dependencies

```bash
npm install lucide-react class-variance-authority clsx tailwind-merge
```

## File Structure

Copy these files maintaining the structure:

```
src/
├── components/
│   └── voice/
│       ├── index.ts                    # Barrel export
│       ├── VoiceAssistantLayout.tsx    # Main layout component
│       ├── ParticleVisualization.tsx   # Canvas-based particle animation
│       ├── FloatingLocations.tsx       # Orbiting location labels
│       ├── AnimatedTranscript.tsx      # Word-by-word text animation
│       ├── ResortCard.tsx              # Result card component
│       └── StateToggle.tsx             # Demo state switcher (optional)
├── lib/
│   └── animations.ts                   # Animation utilities & constants
└── index.css                           # CSS variables & custom styles
```

## Step-by-Step Implementation

### Step 1: Add Animation Utilities

Create `src/lib/animations.ts` with these exports:

```typescript
// Particle configuration
export const PARTICLE_CONFIG = {
  count: 150,
  baseRadius: 120,
  maxRadius: 160,
  minRadius: 80,
  speed: 0.002,
  connectionDistance: 50,
  pulseSpeed: 0.03,
} as const;

// Voice activity levels
export type VoiceActivityLevel = 'idle' | 'listening' | 'speaking' | 'processing';

// Animation timing presets
export const TIMING = {
  slow: 800,
  medium: 400,
  fast: 200,
  extraSlow: 1200,
} as const;

// Easing functions
export const EASING = {
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  gentle: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Generate staggered delay for list items
export const staggerDelay = (index: number, baseDelay = 100): number => {
  return index * baseDelay;
};

// Interpolate between two values
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

// Generate HSL color string
export const hslColor = (h: number, s: number, l: number, a = 1): string => {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

// Particle color palette
export const PARTICLE_COLORS = {
  primary: { h: 15, s: 55, l: 70 },
  secondary: { h: 35, s: 45, l: 75 },
  accent: { h: 25, s: 50, l: 72 },
  gold: { h: 40, s: 50, l: 55 },
} as const;

// Text animation helpers
export const splitTextIntoWords = (text: string): string[] => {
  return text.split(' ').filter(word => word.length > 0);
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
```

### Step 2: Add Required CSS Variables

Add these to your `index.css` or global styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Core colors */
  --background: 30 15% 6%;
  --foreground: 40 30% 92%;
  
  /* Card/surface colors */
  --card: 30 12% 10%;
  --card-foreground: 40 30% 92%;
  
  /* Primary accent */
  --primary: 35 65% 55%;
  --primary-foreground: 30 15% 6%;
  
  /* Secondary */
  --secondary: 30 10% 18%;
  --secondary-foreground: 40 25% 85%;
  
  /* Muted */
  --muted: 30 8% 15%;
  --muted-foreground: 35 15% 55%;
  
  /* Accent */
  --accent: 25 45% 25%;
  --accent-foreground: 40 30% 92%;
  
  /* Destructive */
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  
  /* Border */
  --border: 30 15% 20%;
  
  /* Radius */
  --radius: 0.75rem;
}

/* Custom utility classes */
@layer utilities {
  .text-luxury {
    @apply tracking-wide;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  
  .text-elegant {
    @apply text-xs uppercase tracking-[0.2em] font-light;
  }
  
  .shadow-glow {
    box-shadow: 0 0 40px -10px hsl(var(--primary) / 0.3);
  }
  
  .shadow-soft {
    box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.3);
  }
  
  .text-gold {
    color: hsl(40, 65%, 55%);
  }
}

/* Card entrance animation */
@keyframes card-entrance {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-card-entrance {
  animation: card-entrance 0.6s ease-out forwards;
  opacity: 0;
}

/* Pulse glow animation */
@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}
```

### Step 3: Update Tailwind Config

Add these to your `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### Step 4: Copy Components

Copy all files from `src/components/voice/` to your project.

**Key files and their purposes:**

| File | Purpose |
|------|---------|
| `VoiceAssistantLayout.tsx` | Main container with header, controls, and layout logic |
| `ParticleVisualization.tsx` | Canvas-based animated particle system |
| `FloatingLocations.tsx` | Orbiting location labels during search |
| `AnimatedTranscript.tsx` | Word-by-word reveal animation for transcripts |
| `ResortCard.tsx` | Result card with hover effects |
| `StateToggle.tsx` | Optional: demo controls to switch states |

### Step 5: Basic Usage

```tsx
import { VoiceAssistantLayout } from '@/components/voice';

// State types
type VoiceState = 'idle' | 'listening' | 'speaking' | 'searching' | 'results';

function App() {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState([]);

  return (
    <VoiceAssistantLayout
      state={state}
      transcript={transcript}
      results={results}
    />
  );
}
```

### Step 6: Integrating with Real Voice API

Replace the demo states with your actual voice SDK:

```tsx
import { useVoiceSDK } from 'your-voice-sdk';

function VoiceApp() {
  const { 
    state,           // Map to: idle | listening | speaking | searching | results
    transcript,      // Current transcript text
    isProcessing,    // Use for 'searching' state
  } = useVoiceSDK();

  // Map your SDK state to layout state
  const layoutState = useMemo(() => {
    if (isProcessing) return 'searching';
    if (state === 'recording') return 'listening';
    if (state === 'playing') return 'speaking';
    return 'idle';
  }, [state, isProcessing]);

  return (
    <VoiceAssistantLayout
      state={layoutState}
      transcript={transcript}
      results={searchResults}
    />
  );
}
```

## Component API Reference

### VoiceAssistantLayout

| Prop | Type | Description |
|------|------|-------------|
| `state` | `'idle' \| 'listening' \| 'speaking' \| 'searching' \| 'results'` | Current voice assistant state |
| `transcript` | `string` | Text to display (animates word-by-word) |
| `results` | `Resort[]` | Array of result cards to display |
| `className` | `string` | Additional CSS classes |

### ParticleVisualization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activity` | `VoiceActivityLevel` | `'idle'` | Animation intensity |
| `voiceIntensity` | `number` | `0` | 0-1 value for voice amplitude |
| `size` | `number` | `300` | Canvas size in pixels |

### AnimatedTranscript

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Text to animate |
| `isActive` | `boolean` | `true` | Whether to animate |
| `speed` | `'slow' \| 'medium' \| 'fast'` | `'medium'` | Animation speed |

## Customization

### Changing Colors

Modify the CSS variables in `:root` to change the color scheme:

```css
:root {
  --primary: 220 70% 50%;  /* Blue theme */
  --background: 220 20% 10%;
  /* ... */
}
```

### Adjusting Particle Animation

Modify `PARTICLE_CONFIG` in `animations.ts`:

```typescript
export const PARTICLE_CONFIG = {
  count: 200,        // More particles
  baseRadius: 150,   // Larger visualization
  speed: 0.003,      // Faster movement
  // ...
};
```

### Custom Result Cards

Replace `ResortCard` with your own component matching your data structure.

## Troubleshooting

### Particles not showing
- Ensure canvas has explicit width/height
- Check that `VoiceActivityLevel` is being passed correctly

### Animations choppy
- Reduce `PARTICLE_CONFIG.count`
- Check for CSS conflicts with `will-change` properties

### Colors not applying
- Verify CSS variables are defined in `:root`
- Ensure Tailwind config includes the color definitions
- Check HSL format (no `hsl()` wrapper in CSS vars)

## Files to Copy (Quick Reference)

```
src/lib/animations.ts
src/components/voice/VoiceAssistantLayout.tsx
src/components/voice/ParticleVisualization.tsx
src/components/voice/FloatingLocations.tsx
src/components/voice/AnimatedTranscript.tsx
src/components/voice/ResortCard.tsx
src/components/voice/StateToggle.tsx (optional)
src/components/voice/index.ts
```

Plus CSS additions to `index.css` and `tailwind.config.ts`.
