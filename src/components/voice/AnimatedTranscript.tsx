import React, { useEffect, useState } from 'react';
import { splitTextIntoWords, staggerDelay, TIMING } from '@/lib/animations';

interface AnimatedTranscriptProps {
  text: string;
  isActive?: boolean;
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
}

export const AnimatedTranscript: React.FC<AnimatedTranscriptProps> = ({
  text,
  isActive = true,
  className = '',
  speed = 'medium',
}) => {
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const words = splitTextIntoWords(text);

  const speedMs = {
    slow: 150,
    medium: 80,
    fast: 40,
  };

  useEffect(() => {
    if (!isActive) {
      setVisibleWords(0);
      return;
    }

    setVisibleWords(0);
    const interval = setInterval(() => {
      setVisibleWords(prev => {
        if (prev >= words.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs[speed]);

    return () => clearInterval(interval);
  }, [text, isActive, words.length, speed]);

  return (
    <div className={`text-luxury text-center ${className}`}>
      <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`inline-block mx-1 transition-all duration-500 ${
              index < visibleWords
                ? 'opacity-100 translate-y-0 blur-0'
                : 'opacity-0 translate-y-2 blur-sm'
            }`}
            style={{
              transitionDelay: `${staggerDelay(index, 30)}ms`,
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

interface StaticTranscriptProps {
  text: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'muted';
}

export const StaticTranscript: React.FC<StaticTranscriptProps> = ({
  text,
  className = '',
  variant = 'primary',
}) => {
  const variantStyles = {
    primary: 'text-foreground/90',
    secondary: 'text-foreground/70',
    muted: 'text-muted-foreground',
  };

  return (
    <div className={`text-luxury text-center ${className}`}>
      <p className={`text-2xl md:text-3xl leading-relaxed ${variantStyles[variant]}`}>
        {text}
      </p>
    </div>
  );
};

export default AnimatedTranscript;
