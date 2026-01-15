/**
 * Animation utilities and constants for the voice assistant UI
 * Reusable across different components and projects
 */

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

// Generate random position within bounds
export const randomPosition = (
  centerX: number,
  centerY: number,
  radius: number
): { x: number; y: number } => {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * radius;
  return {
    x: centerX + Math.cos(angle) * r,
    y: centerY + Math.sin(angle) * r,
  };
};

// Interpolate between two values
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

// Generate HSL color string
export const hslColor = (h: number, s: number, l: number, a = 1): string => {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

// Particle color palette (warm, luxurious tones)
export const PARTICLE_COLORS = {
  primary: { h: 15, s: 55, l: 70 },    // Muted rose
  secondary: { h: 35, s: 45, l: 75 },  // Champagne
  accent: { h: 25, s: 50, l: 72 },     // Warm coral
  gold: { h: 40, s: 50, l: 55 },       // Gold accent
} as const;

// Voice activity color mapping
export const getActivityColor = (activity: VoiceActivityLevel) => {
  switch (activity) {
    case 'idle':
      return { intensity: 0.3, pulse: 0.5 };
    case 'listening':
      return { intensity: 0.6, pulse: 1.0 };
    case 'speaking':
      return { intensity: 1.0, pulse: 1.5 };
    case 'processing':
      return { intensity: 0.8, pulse: 2.0 };
    default:
      return { intensity: 0.3, pulse: 0.5 };
  }
};

// Text animation helpers
export const splitTextIntoWords = (text: string): string[] => {
  return text.split(' ').filter(word => word.length > 0);
};

// Generate orbit positions for location labels
export const getOrbitPosition = (
  index: number,
  total: number,
  radius: number,
  offset = 0
): { x: number; y: number; angle: number } => {
  const angle = (index / total) * Math.PI * 2 + offset;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    angle: angle * (180 / Math.PI),
  };
};

// Smooth step function
export const smoothStep = (x: number): number => {
  return x * x * (3 - 2 * x);
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
