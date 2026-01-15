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
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <div className="flex items-center gap-1 p-1.5 bg-card/80 backdrop-blur-xl rounded-full border border-border/50 shadow-soft">
        {STATES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onStateChange(value)}
            className={`px-4 py-2 rounded-full text-xs font-light tracking-wide transition-all duration-300
              ${currentState === value 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StateToggle;
