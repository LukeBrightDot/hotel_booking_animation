import React from 'react';
import { ParticleVisualization } from './ParticleVisualization';
import { AnimatedTranscript } from './AnimatedTranscript';
import { FloatingLocations } from './FloatingLocations';
import { ResortCard, type Resort } from './ResortCard';
import { type VoiceActivityLevel } from '@/lib/animations';

export type DemoState = 'idle' | 'listening' | 'speaking' | 'searching' | 'results';

interface VoiceAssistantLayoutProps {
  state: DemoState;
  transcript: string;
  results?: Resort[];
  className?: string;
}

export const VoiceAssistantLayout: React.FC<VoiceAssistantLayoutProps> = ({
  state,
  transcript,
  results = [],
  className = '',
}) => {
  const getActivity = (): VoiceActivityLevel => {
    switch (state) {
      case 'idle':
        return 'idle';
      case 'listening':
        return 'listening';
      case 'speaking':
        return 'speaking';
      case 'searching':
        return 'processing';
      case 'results':
        return 'idle';
      default:
        return 'idle';
    }
  };

  return (
    <div className={`min-h-screen bg-background flex flex-col items-center justify-center px-6 pt-20 ${className}`}>
      {/* Main visualization area */}
      <div className="relative flex flex-col items-center justify-center flex-1 w-full max-w-4xl">
        
        {/* Status indicator */}
        <div className="mb-8">
          <span className="text-elegant text-muted-foreground animate-pulse-soft">
            {state === 'idle' && 'Ready'}
            {state === 'listening' && 'Listening...'}
            {state === 'speaking' && 'Speaking'}
            {state === 'searching' && 'Searching'}
            {state === 'results' && 'Found for you'}
          </span>
        </div>

        {/* Particle visualization with floating locations */}
        <div className="relative">
          <ParticleVisualization 
            activity={getActivity()} 
            size={350}
            className="animate-float"
          />
          
          {/* Floating locations during search */}
          <FloatingLocations 
            isActive={state === 'searching'}
            radius={220}
          />
        </div>

        {/* Transcript area */}
        <div className="mt-8 mb-12 max-w-2xl w-full min-h-[100px] flex items-center justify-center">
          {transcript && (
            <AnimatedTranscript 
              text={transcript}
              isActive={state === 'speaking'}
              speed="medium"
            />
          )}
        </div>

        {/* Results grid */}
        {state === 'results' && results.length > 0 && (
          <div className="w-full max-w-5xl px-4 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((resort, index) => (
                <ResortCard 
                  key={resort.id} 
                  resort={resort}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtle branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="text-elegant text-muted-foreground/40 tracking-[0.3em]">
          Voyage AI
        </span>
      </div>
    </div>
  );
};

export default VoiceAssistantLayout;
