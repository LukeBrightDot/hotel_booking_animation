import React, { useRef, useEffect, useCallback } from 'react';
import { 
  PARTICLE_CONFIG, 
  PARTICLE_COLORS, 
  hslColor, 
  lerp, 
  clamp,
  type VoiceActivityLevel 
} from '@/lib/animations';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: { h: number; s: number; l: number };
  alpha: number;
  phase: number;
}

interface ParticleVisualizationProps {
  activity?: VoiceActivityLevel;
  size?: number;
  className?: string;
}

export const ParticleVisualization: React.FC<ParticleVisualizationProps> = ({
  activity = 'idle',
  size = 400,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const activityRef = useRef<VoiceActivityLevel>(activity);

  // Update activity ref when prop changes
  useEffect(() => {
    activityRef.current = activity;
  }, [activity]);

  // Initialize particles
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const particles: Particle[] = [];
    const colors = [PARTICLE_COLORS.primary, PARTICLE_COLORS.secondary, PARTICLE_COLORS.accent];

    for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = PARTICLE_CONFIG.minRadius + Math.random() * (PARTICLE_CONFIG.baseRadius - PARTICLE_CONFIG.minRadius);
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Get activity parameters
  const getActivityParams = useCallback(() => {
    switch (activityRef.current) {
      case 'idle':
        return { expansion: 1, speed: 0.5, brightness: 0.7, jitter: 0.3 };
      case 'listening':
        return { expansion: 1.1, speed: 1, brightness: 0.85, jitter: 0.6 };
      case 'speaking':
        return { expansion: 1.3, speed: 1.5, brightness: 1, jitter: 1 };
      case 'processing':
        return { expansion: 1.15, speed: 2, brightness: 0.9, jitter: 0.8 };
      default:
        return { expansion: 1, speed: 0.5, brightness: 0.7, jitter: 0.3 };
    }
  }, []);

  // Animation loop
  const animate = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const params = getActivityParams();
    
    timeRef.current += 0.016 * params.speed;

    // Clear canvas with slight fade for trail effect
    ctx.fillStyle = 'hsla(30, 25%, 98%, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    // Draw connections between nearby particles
    ctx.strokeStyle = hslColor(15, 40, 70, 0.08);
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < PARTICLE_CONFIG.connectionDistance) {
          const alpha = (1 - dist / PARTICLE_CONFIG.connectionDistance) * 0.15 * params.brightness;
          ctx.strokeStyle = hslColor(15, 40, 70, alpha);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    for (const particle of particles) {
      // Calculate distance from center
      const dx = particle.baseX - centerX;
      const dy = particle.baseY - centerY;
      const baseDistance = Math.sqrt(dx * dx + dy * dy);
      
      // Breathing effect
      const breathe = Math.sin(timeRef.current * 0.8 + particle.phase) * 0.15 * params.expansion;
      const targetDistance = baseDistance * (1 + breathe);
      
      // Calculate target position
      const angle = Math.atan2(dy, dx);
      const targetX = centerX + Math.cos(angle) * targetDistance;
      const targetY = centerY + Math.sin(angle) * targetDistance;
      
      // Add jitter based on activity
      const jitterX = Math.sin(timeRef.current * 3 + particle.phase) * params.jitter * 2;
      const jitterY = Math.cos(timeRef.current * 3 + particle.phase * 1.5) * params.jitter * 2;
      
      // Smooth movement
      particle.x = lerp(particle.x, targetX + jitterX, 0.05);
      particle.y = lerp(particle.y, targetY + jitterY, 0.05);

      // Pulsing alpha
      const pulseAlpha = 0.5 + Math.sin(timeRef.current * 2 + particle.phase) * 0.3;
      const finalAlpha = clamp(particle.alpha * pulseAlpha * params.brightness, 0.2, 1);

      // Draw particle with glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 3
      );
      gradient.addColorStop(0, hslColor(particle.color.h, particle.color.s, particle.color.l, finalAlpha));
      gradient.addColorStop(0.4, hslColor(particle.color.h, particle.color.s, particle.color.l, finalAlpha * 0.5));
      gradient.addColorStop(1, hslColor(particle.color.h, particle.color.s, particle.color.l, 0));

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = hslColor(particle.color.h, particle.color.s, particle.color.l + 10, finalAlpha);
      ctx.fill();
    }

    // Central glow
    const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60 * params.expansion);
    centerGlow.addColorStop(0, hslColor(15, 50, 85, 0.15 * params.brightness));
    centerGlow.addColorStop(0.5, hslColor(25, 40, 80, 0.08 * params.brightness));
    centerGlow.addColorStop(1, hslColor(35, 30, 75, 0));
    
    ctx.fillStyle = centerGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60 * params.expansion, 0, Math.PI * 2);
    ctx.fill();

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  }, [getActivityParams]);

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    canvas.width = size;
    canvas.height = size;

    initParticles(canvas);
    animate(canvas, ctx);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, initParticles, animate]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="animate-breathe"
        style={{
          filter: 'blur(0.5px)',
        }}
      />
      {/* Soft outer glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 40%, hsl(30 25% 98%) 100%)',
        }}
      />
    </div>
  );
};

export default ParticleVisualization;
