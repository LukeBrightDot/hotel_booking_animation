# Voice Assistant UI - Implementation Guide

This guide explains how to implement the voice assistant visualization UI in another React/Tailwind project, including complete layout structure, positioning, and sizing.

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

### Step 5: Layout Structure & Sizing

The layout uses a **fixed header + flexible main content + fixed controls** pattern:

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (fixed top, z-50, h-auto ~64px)                     │
│  ├── Logo (left)                                            │
│  └── Auth buttons (right)                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                   MAIN CONTENT AREA                         │
│                   (min-h-screen, pt-20)                     │
│                                                             │
│              ┌─────────────────────┐                        │
│              │  Status Indicator   │                        │
│              │   (text-elegant)    │                        │
│              └─────────────────────┘                        │
│                                                             │
│              ┌─────────────────────┐                        │
│              │                     │                        │
│              │  Particle Viz       │                        │
│              │  (350px default)    │                        │
│              │                     │                        │
│              └─────────────────────┘                        │
│                                                             │
│              ┌─────────────────────┐                        │
│              │  Transcript Area    │                        │
│              │  (max-w-2xl)        │                        │
│              └─────────────────────┘                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  RESULTS GRID (max-w-5xl, 1-3 columns responsive)   │    │
│  │  grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│                    [Voyage AI branding]                     │
│                    (absolute bottom-6)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                                              ┌───────────────┐
                                              │ Audio Controls│
                                              │ (fixed        │
                                              │  bottom-6     │
                                              │  right-6)     │
                                              └───────────────┘
```

#### Key Layout Classes

**Root Container:**
```tsx
<div className="min-h-screen bg-background flex flex-col items-center px-6 pt-20">
```
- `min-h-screen`: Full viewport height minimum
- `pt-20`: 80px top padding (clears fixed header)
- `px-6`: 24px horizontal padding

**Fixed Header:**
```tsx
<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm">
```
- `fixed top-0 left-0 right-0`: Spans full width at top
- `z-50`: Above all other content
- `py-4`: 16px vertical padding (~64px total height with content)
- `bg-background/80 backdrop-blur-sm`: Semi-transparent with blur

**Audio Controls:**
```tsx
<div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
  <button className="w-12 h-12 rounded-full ...">
```
- `fixed bottom-6 right-6`: 24px from bottom-right corner
- `w-12 h-12`: 48px circular buttons
- `gap-3`: 12px spacing between buttons

**Main Visualization Area:**
```tsx
<div className="relative flex flex-col items-center w-full max-w-4xl transition-all duration-700 ease-out
               ${isCompact ? 'flex-none' : 'flex-1 justify-center'}">
```
- `max-w-4xl`: 896px max width
- `flex-1 justify-center`: Centers vertically when not showing results
- `flex-none`: Shrinks when results appear

**Particle Visualization:**
```tsx
<ParticleVisualization 
  activity={getActivity()} 
  voiceIntensity={voiceIntensity}
  size={350}  // 350px canvas
/>
```
- Scales down to 75% (`scale-75`) when showing results

**Transcript Area:**
```tsx
<div className="max-w-2xl w-full min-h-[80px] flex items-center justify-center
               ${isCompact ? 'mt-0 mb-6' : 'mt-8 mb-12'}">
```
- `max-w-2xl`: 672px max width
- `min-h-[80px]`: Prevents layout shift

**Results Grid:**
```tsx
<div className="w-full max-w-5xl px-4 pb-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```
- `max-w-5xl`: 1024px max width
- `gap-6`: 24px grid gaps
- Responsive: 1 col → 2 cols (768px+) → 3 cols (1024px+)

**Bottom Branding:**
```tsx
<div className="absolute bottom-6 left-1/2 -translate-x-1/2">
```
- Centered horizontally, 24px from bottom

#### Z-Index Layering

| Element | Z-Index | Purpose |
|---------|---------|---------|
| Header | `z-50` | Always on top |
| Audio Controls | `z-50` | Always visible |
| State Toggle (optional) | `z-40` | Below header |
| Floating Locations | default | Within viz area |
| Particle Canvas | default | Base layer |

### Step 6: Basic Usage

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

### Step 7: Integrating with Real Voice API

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

### Page looks unstyled (white background, default fonts)

This is the **most common issue**. It means the CSS variables and fonts are not being loaded.

**Solution 1: Use the standalone CSS file**
1. Copy `VOICE_ASSISTANT_STYLES.css` to your `src/` directory
2. Import it in `main.tsx` or `App.tsx`:
   ```tsx
   import './VOICE_ASSISTANT_STYLES.css';
   ```

**Solution 2: Manual verification**
Run through the `INTEGRATION_CHECKLIST.md` to diagnose which piece is missing.

## Files to Copy (Quick Reference)

```
VOICE_ASSISTANT_STYLES.css        # NEW: Standalone CSS (use if styles don't work)
INTEGRATION_CHECKLIST.md          # NEW: Diagnostic checklist

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

---

## Claude Code Integration Prompt

Use this exact prompt to have Claude Code integrate the voice assistant UI:

```
## Task: Integrate Voice Assistant UI from hotel-booking-animation

I need you to integrate the Voice Assistant UI from this repository:
https://github.com/LukeBrightDot/hotel-booking-animation

### CRITICAL: This is a dark-themed, luxury-styled UI. The result must have:
- Near-black background with warm brown tint (NOT white)
- Elegant serif font (Cormorant Garamond) for headings
- Clean sans-serif font (Inter) for body text
- Warm gold accent colors
- Animated particle visualization
- Glassmorphic effects

### Step-by-Step Integration (FOLLOW IN ORDER):

**Step 1: Add Google Fonts to index.html**
Add this to the <head> section:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**VERIFY:** Open the page, go to DevTools → Network, filter by "fonts" - you should see font files loading.

**Step 2: Copy the standalone CSS file**
Copy `VOICE_ASSISTANT_STYLES.css` from the source repo to your `src/` directory.
Import it in `main.tsx` AFTER your existing imports:
```tsx
import './index.css';
import './VOICE_ASSISTANT_STYLES.css'; // Add this line
```

**VERIFY:** The page background should now be very dark brown/black, not white.

**Step 3: Update tailwind.config.ts**
Copy the theme extensions from the source repo's `tailwind.config.ts`, specifically:
- colors (background, foreground, primary, secondary, muted, accent, gold, etc.)
- fontFamily (serif: Cormorant Garamond, sans: Inter)
- borderRadius

**Step 4: Copy component files**
Copy these directories/files from the source repo:
- `src/components/voice/` (entire directory)
- `src/lib/animations.ts`

**Step 5: Verify the integration**
Run through `INTEGRATION_CHECKLIST.md` from the source repo.

### Expected Visual Result:
- Dark brown/black background
- Animated gold particles in the center
- Elegant serif text for transcripts
- Floating location names during search state
- Resort cards with hover effects
- Overall luxury hotel aesthetic

### If the page still looks unstyled:
1. Check browser console for CSS errors
2. Verify fonts are loading in Network tab
3. Check that CSS variables are defined (DevTools → Computed → filter "--background")
4. Make sure VOICE_ASSISTANT_STYLES.css is imported AFTER index.css

DO NOT consider this task complete until the visual result matches the source repository.
Take a screenshot of the source (https://hotel-booking-animation.lovable.app) and compare.
```

---

## Alternative: Fork in Lovable

If integration continues to fail, the easiest approach is:

1. Go to https://lovable.dev
2. Create a new project by importing: `https://github.com/LukeBrightDot/hotel-booking-animation`
3. This creates an exact working copy
4. Connect your own GitHub repository
5. Push changes to sync
