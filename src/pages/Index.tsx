import React, { useState, useEffect } from 'react';
import { 
  VoiceAssistantLayout, 
  StateToggle,
  type DemoState,
  type Resort 
} from '@/components/voice';

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
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [transcript, setTranscript] = useState('');

  // Update transcript when state changes
  useEffect(() => {
    const newTranscript = DEMO_TRANSCRIPTS[demoState];
    if (newTranscript !== transcript) {
      setTranscript(newTranscript);
    }
  }, [demoState]);

  return (
    <>
      {/* State toggle for demo purposes */}
      <StateToggle 
        currentState={demoState}
        onStateChange={setDemoState}
      />

      {/* Main voice assistant layout */}
      <VoiceAssistantLayout
        state={demoState}
        transcript={transcript}
        results={demoState === 'results' ? SAMPLE_RESORTS : []}
      />
    </>
  );
};

export default Index;
