import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, LogIn, UserPlus } from 'lucide-react';
import { ParticleVisualization } from './ParticleVisualization';
import { AnimatedTranscript } from './AnimatedTranscript';
import { FloatingLocations } from './FloatingLocations';
import { ResortCard, type Resort } from './ResortCard';
import { type VoiceActivityLevel } from '@/lib/animations';
import { Button } from '@/components/ui/button';

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
  const [voiceIntensity, setVoiceIntensity] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [visibleResultCount, setVisibleResultCount] = useState(0);
  const prevStateRef = useRef<DemoState>(state);
  const animationRef = useRef<number>(0);

  // Simulate voice waveform when speaking or listening
  useEffect(() => {
    if (state === 'speaking' || state === 'listening') {
      const interval = setInterval(() => {
        // Create a pseudo-random waveform pattern
        const baseWave = Math.sin(Date.now() * 0.008) * 0.3;
        const quickWave = Math.sin(Date.now() * 0.02) * 0.2;
        const noise = (Math.random() - 0.5) * 0.3;
        setVoiceIntensity(Math.max(0, Math.min(1, 0.4 + baseWave + quickWave + noise)));
      }, 50);

      return () => clearInterval(interval);
    } else {
      // Smoothly fade out voice intensity
      const fadeOut = () => {
        setVoiceIntensity(prev => {
          if (prev <= 0.01) return 0;
          return prev * 0.9;
        });
        if (voiceIntensity > 0.01) {
          animationRef.current = requestAnimationFrame(fadeOut);
        }
      };
      fadeOut();
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [state]);

  // Handle results animation - staggered appearance
  useEffect(() => {
    if (state === 'results' && results.length > 0) {
      // If coming from a non-results state, animate in
      if (prevStateRef.current !== 'results') {
        setShowResults(false);
        setVisibleResultCount(0);
        
        // Start showing results after a brief delay
        setTimeout(() => {
          setShowResults(true);
          
          // Stagger each result
          results.forEach((_, index) => {
            setTimeout(() => {
              setVisibleResultCount(prev => prev + 1);
            }, index * 200);
          });
        }, 300);
      } else {
        // Already in results, just update (no animation)
        setShowResults(true);
        setVisibleResultCount(results.length);
      }
    } else {
      setShowResults(false);
      setVisibleResultCount(0);
    }
    
    prevStateRef.current = state;
  }, [state, results]);

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

  // Determine if visualization should be in "compact" mode (when showing results)
  const isCompact = state === 'results' && showResults;

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  return (
    <div className={`min-h-screen bg-background flex flex-col items-center px-6 pt-20 ${className}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm">
        {/* Logo placeholder - left */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-display text-sm font-semibold">V</span>
          </div>
          <span className="font-display text-lg tracking-wide text-foreground">Voyage</span>
        </div>

        {/* Auth buttons - right */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Join
          </Button>
        </div>
      </header>

      {/* Audio controls - fixed bottom right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsMicMuted(!isMicMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 
                     ${isMicMuted 
                       ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' 
                       : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
          aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                     ${isSpeakerMuted 
                       ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' 
                       : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
          aria-label={isSpeakerMuted ? 'Unmute speaker' : 'Mute speaker'}
        >
          {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Main visualization area - moves up smoothly when results appear */}
      <div 
        className={`relative flex flex-col items-center w-full max-w-4xl transition-all duration-700 ease-out
                   ${isCompact ? 'flex-none' : 'flex-1 justify-center'}`}
      >
        
        {/* Status indicator */}
        <div className="mb-6 transition-all duration-500">
          <span className={`text-elegant text-muted-foreground transition-opacity duration-300
                          ${state === 'searching' ? 'animate-pulse' : 'animate-pulse-soft'}`}>
            {state === 'idle' && 'Ready'}
            {state === 'listening' && 'Listening...'}
            {state === 'speaking' && 'Speaking'}
            {state === 'searching' && 'Searching'}
            {state === 'results' && 'Found for you'}
          </span>
        </div>

        {/* Particle visualization with floating locations */}
        <div 
          className={`relative transition-all duration-700 ease-out
                     ${isCompact ? 'scale-75 -mb-8' : 'scale-100'}`}
        >
          <ParticleVisualization 
            activity={getActivity()} 
            voiceIntensity={voiceIntensity}
            size={350}
          />
          
          {/* Floating locations during search */}
          <FloatingLocations 
            isActive={state === 'searching'}
            radius={220}
          />
        </div>

        {/* Transcript area */}
        <div 
          className={`max-w-2xl w-full min-h-[80px] flex items-center justify-center transition-all duration-500
                     ${isCompact ? 'mt-0 mb-6' : 'mt-8 mb-12'}`}
        >
          {transcript && (
            <AnimatedTranscript 
              text={transcript}
              isActive={state === 'speaking'}
              speed="medium"
            />
          )}
        </div>
      </div>

      {/* Results grid - animates in from below */}
      <div 
        className={`w-full max-w-5xl px-4 pb-16 transition-all duration-700 ease-out
                   ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
      >
        {state === 'results' && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.slice(0, visibleResultCount).map((resort, index) => (
              <div 
                key={resort.id}
                className="animate-fade-rise"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ResortCard 
                  resort={resort}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle branding */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="text-elegant text-muted-foreground/40 tracking-[0.3em]">
          Voyage AI
        </span>
      </div>
    </div>
  );
};

export default VoiceAssistantLayout;
