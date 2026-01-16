import React from 'react';
import { type DemoState } from './VoiceAssistantLayout';

interface StateToggleProps {
  currentState: DemoState;
  onStateChange: (state: DemoState) => void;
  className?: string;
}

const STATES: { value: DemoState; label: string }[] = [
  { value: 'idle', label: 'Idle' },
  { value: 'listening', label: 'Listening' },
  { value: 'speaking', label: 'Speaking' },
  { value: 'searching', label: 'Searching' },
  { value: 'results', label: 'Results' },
];

export const StateToggle: React.FC<StateToggleProps> = ({
  currentState,
  onStateChange,
  className = '',
}) => {
  return (
    <div 
      className={className}
      style={{
        position: 'fixed',
        top: '5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.375rem',
          background: 'hsl(30 20% 96% / 0.8)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '9999px',
          border: '1px solid hsl(30 15% 88% / 0.5)',
          boxShadow: '0 4px 20px hsl(30 20% 15% / 0.05)',
        }}
      >
        {STATES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onStateChange(value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 300,
              letterSpacing: '0.05em',
              transition: 'all 300ms',
              border: 'none',
              cursor: 'pointer',
              background: currentState === value ? 'hsl(15 55% 70%)' : 'transparent',
              color: currentState === value ? 'hsl(30 25% 98%)' : 'hsl(30 15% 45%)',
              boxShadow: currentState === value ? '0 2px 8px hsl(15 55% 70% / 0.3)' : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StateToggle;
