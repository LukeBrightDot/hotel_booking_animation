import React, { useEffect, useState, useCallback } from 'react';
import { getOrbitPosition, staggerDelay } from '@/lib/animations';

const EXOTIC_LOCATIONS = [
  'Bali', 'Maldives', 'Santorini', 'Tokyo', 'Paris',
  'Sydney', 'New York', 'Marrakech', 'Iceland', 'Patagonia',
  'Amalfi Coast', 'Seychelles', 'Kyoto', 'Dubai', 'Cape Town',
  'Bora Bora', 'Venice', 'Swiss Alps', 'Maui', 'Tuscany'
];

interface FloatingLocation {
  id: number;
  name: string;
  position: { x: number; y: number; angle: number };
  opacity: number;
  scale: number;
  delay: number;
}

interface FloatingLocationsProps {
  isActive?: boolean;
  radius?: number;
  className?: string;
}

export const FloatingLocations: React.FC<FloatingLocationsProps> = ({
  isActive = true,
  radius = 200,
  className = '',
}) => {
  const [locations, setLocations] = useState<FloatingLocation[]>([]);
  const [key, setKey] = useState(0);

  const generateLocations = useCallback(() => {
    const shuffled = [...EXOTIC_LOCATIONS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    
    return selected.map((name, index) => ({
      id: Date.now() + index,
      name,
      position: getOrbitPosition(index, selected.length, radius, Math.random() * 0.5),
      opacity: 0.6 + Math.random() * 0.4,
      scale: 0.85 + Math.random() * 0.3,
      delay: staggerDelay(index, 200),
    }));
  }, [radius]);

  useEffect(() => {
    if (!isActive) {
      setLocations([]);
      return;
    }

    // Initial locations
    setLocations(generateLocations());

    // Refresh locations periodically
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
      setLocations(generateLocations());
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, generateLocations]);

  if (!isActive) return null;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      key={key}
    >
      {locations.map((location) => (
        <div
          key={location.id}
          className="absolute left-1/2 top-1/2 animate-location-fade"
          style={{
            transform: `translate(-50%, -50%) translate(${location.position.x}px, ${location.position.y}px) scale(${location.scale})`,
            animationDelay: `${location.delay}ms`,
          }}
        >
          <span 
            className="text-elegant text-xs tracking-[0.2em] text-muted-foreground/60 whitespace-nowrap"
            style={{ opacity: location.opacity }}
          >
            {location.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloatingLocations;
