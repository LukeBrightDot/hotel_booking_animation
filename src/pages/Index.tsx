import React, { useState, useEffect } from 'react';
import { 
  StateToggle,
  SearchModeToggle,
  type DemoState,
  type SearchMode,
  type Resort 
} from '@/components/voice';
import { BookingForm, type BookingData } from '@/components/booking';
import { Header, BottomNav } from '@/components/layout';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { ParticleVisualization } from '@/components/voice/ParticleVisualization';
import { FloatingLocations } from '@/components/voice/FloatingLocations';
import { AnimatedTranscript } from '@/components/voice/AnimatedTranscript';
import { ResortCard } from '@/components/voice/ResortCard';
import { type VoiceActivityLevel } from '@/lib/animations';

// Demo transcripts for each state
const DEMO_TRANSCRIPTS: Record<DemoState, string> = {
  idle: '',
  listening: '',
  speaking: "Where would you like to escape to? I can help you discover the perfect destination tailored to your desires.",
  searching: '',
  results: "I found three exceptional retreats that match your preferences for a secluded beachfront experience.",
};

// Sample resort results
const SAMPLE_RESORTS: Resort[] = [
  {
    id: '1',
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    description: 'A sanctuary of serenity in the heart of Tokyo, offering panoramic city views and traditional Japanese hospitality.',
    pricePerNight: '$1,800',
    rating: 4.9,
    amenities: ['Spa', 'Fine Dining', 'City Views'],
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  },
  {
    id: '2',
    name: 'Soneva Fushi',
    location: 'Maldives',
    description: 'Barefoot luxury on a private island, where pristine beaches meet world-class sustainability.',
    pricePerNight: '$2,400',
    rating: 4.95,
    amenities: ['Private Beach', 'Overwater Villa', 'Observatory'],
    imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
  },
  {
    id: '3',
    name: 'Amanpuri',
    location: 'Phuket, Thailand',
    description: 'The original Aman resort, set in a coconut grove overlooking the Andaman Sea.',
    pricePerNight: '$1,500',
    rating: 4.85,
    amenities: ['Private Pool', 'Holistic Spa', 'Yacht Charter'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  },
];

const Index: React.FC = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>('voice');
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [transcript, setTranscript] = useState('');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [voiceIntensity, setVoiceIntensity] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [visibleResultCount, setVisibleResultCount] = useState(0);

  // Update transcript when state changes
  useEffect(() => {
    const newTranscript = DEMO_TRANSCRIPTS[demoState];
    if (newTranscript !== transcript) {
      setTranscript(newTranscript);
    }
  }, [demoState]);

  // Simulate voice waveform when speaking or listening
  useEffect(() => {
    if (demoState === 'speaking' || demoState === 'listening') {
      const interval = setInterval(() => {
        const baseWave = Math.sin(Date.now() * 0.008) * 0.3;
        const quickWave = Math.sin(Date.now() * 0.02) * 0.2;
        const noise = (Math.random() - 0.5) * 0.3;
        setVoiceIntensity(Math.max(0, Math.min(1, 0.4 + baseWave + quickWave + noise)));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setVoiceIntensity(0);
    }
  }, [demoState]);

  // Handle results animation
  useEffect(() => {
    if (demoState === 'results' && SAMPLE_RESORTS.length > 0) {
      setShowResults(false);
      setVisibleResultCount(0);
      setTimeout(() => {
        setShowResults(true);
        SAMPLE_RESORTS.forEach((_, index) => {
          setTimeout(() => {
            setVisibleResultCount(prev => prev + 1);
          }, index * 200);
        });
      }, 300);
    } else {
      setShowResults(false);
      setVisibleResultCount(0);
    }
  }, [demoState]);

  const getActivity = (): VoiceActivityLevel => {
    switch (demoState) {
      case 'idle': return 'idle';
      case 'listening': return 'listening';
      case 'speaking': return 'speaking';
      case 'searching': return 'processing';
      case 'results': return 'idle';
      default: return 'idle';
    }
  };

  const handleFormSearch = (data: BookingData) => {
    console.log('Form search:', data);
    // Could trigger results view here
  };

  const isCompact = demoState === 'results' && showResults;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'hsl(30 25% 98%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '4.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingBottom: '5rem', // Space for bottom nav on mobile
    }}>
      {/* Unified Header */}
      <Header 
        showModeToggle={true}
        searchMode={searchMode}
        onModeChange={setSearchMode}
      />

      {/* Bottom Navigation (Mobile only) */}
      <BottomNav 
        searchMode={searchMode}
        onModeChange={setSearchMode}
      />

      {/* Audio controls - fixed bottom right (only show in voice mode, above bottom nav on mobile) */}
      {searchMode === 'voice' && (
        <div className="fixed z-50 flex gap-3 bottom-20 right-4 md:bottom-6 md:right-6">
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 300ms',
              boxShadow: '0 4px 12px hsl(30 20% 15% / 0.1)',
              border: isMicMuted ? '1px solid hsl(0 70% 50% / 0.3)' : '1px solid hsl(30 15% 88%)',
              background: isMicMuted ? 'hsl(0 70% 50% / 0.2)' : 'hsl(30 20% 96%)',
              color: isMicMuted ? 'hsl(0 70% 50%)' : 'hsl(15 55% 70%)',
              cursor: 'pointer',
            }}
          >
            {isMicMuted ? <MicOff style={{ width: '1.25rem', height: '1.25rem' }} /> : <Mic style={{ width: '1.25rem', height: '1.25rem' }} />}
          </button>
          <button
            onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 300ms',
              boxShadow: '0 4px 12px hsl(30 20% 15% / 0.1)',
              border: isSpeakerMuted ? '1px solid hsl(0 70% 50% / 0.3)' : '1px solid hsl(30 15% 88%)',
              background: isSpeakerMuted ? 'hsl(0 70% 50% / 0.2)' : 'hsl(30 20% 96%)',
              color: isSpeakerMuted ? 'hsl(0 70% 50%)' : 'hsl(15 55% 70%)',
              cursor: 'pointer',
            }}
          >
            {isSpeakerMuted ? <VolumeX style={{ width: '1.25rem', height: '1.25rem' }} /> : <Volume2 style={{ width: '1.25rem', height: '1.25rem' }} />}
          </button>
        </div>
      )}

      {/* State toggle for demo (only in voice mode) */}
      {searchMode === 'voice' && (
        <StateToggle 
          currentState={demoState}
          onStateChange={setDemoState}
        />
      )}

      {/* Main content area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: searchMode === 'form' ? 'center' : (isCompact ? 'flex-start' : 'center'),
        width: '100%',
        maxWidth: '56rem',
        transition: 'all 500ms ease-out',
      }}>
        {searchMode === 'voice' ? (
          <>
            {/* Status indicator */}
            <div style={{ marginBottom: '1.5rem', transition: 'all 500ms' }}>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 200,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                color: 'hsl(30 15% 45%)',
              }}>
                {demoState === 'idle' && 'Ready'}
                {demoState === 'listening' && 'Listening...'}
                {demoState === 'speaking' && 'Speaking'}
                {demoState === 'searching' && 'Searching'}
                {demoState === 'results' && 'Found for you'}
              </span>
            </div>

            {/* Particle visualization */}
            <div style={{
              position: 'relative',
              transition: 'all 700ms ease-out',
              transform: isCompact ? 'scale(0.75)' : 'scale(1)',
              marginBottom: isCompact ? '-2rem' : 0,
            }}>
              <ParticleVisualization 
                activity={getActivity()} 
                voiceIntensity={voiceIntensity}
                size={350}
              />
              <FloatingLocations 
                isActive={demoState === 'searching'}
                radius={220}
              />
            </div>

            {/* Transcript area */}
            <div style={{
              maxWidth: '42rem',
              width: '100%',
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 500ms',
              marginTop: isCompact ? 0 : '2rem',
              marginBottom: isCompact ? '1.5rem' : '3rem',
            }}>
              {transcript && (
                <AnimatedTranscript 
                  text={transcript}
                  isActive={demoState === 'speaking'}
                  speed="medium"
                />
              )}
            </div>
          </>
        ) : (
          /* Booking Form */
          <BookingForm onSearch={handleFormSearch} />
        )}
      </main>

      {/* Results grid (voice mode only) */}
      {searchMode === 'voice' && (
        <div style={{
          width: '100%',
          maxWidth: '72rem',
          padding: '0 1rem 4rem',
          transition: 'all 700ms ease-out',
          opacity: showResults ? 1 : 0,
          transform: showResults ? 'translateY(0)' : 'translateY(2rem)',
          pointerEvents: showResults ? 'auto' : 'none',
        }}>
          {demoState === 'results' && SAMPLE_RESORTS.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {SAMPLE_RESORTS.slice(0, visibleResultCount).map((resort, index) => (
                <div 
                  key={resort.id}
                  style={{ 
                    animation: 'fadeRise 0.8s ease-out forwards',
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                  }}
                >
                  <ResortCard resort={resort} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtle branding */}
      <div style={{ 
        position: 'absolute', 
        bottom: '1.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)' 
      }}>
        <span style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 200,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          color: 'hsl(30 15% 45% / 0.4)',
        }}>
          Voyage AI
        </span>
      </div>
    </div>
  );
};

export default Index;
