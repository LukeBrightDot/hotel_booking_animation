import React from 'react';
import { Mic, Search } from 'lucide-react';

export type SearchMode = 'voice' | 'form';

interface SearchModeToggleProps {
  mode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
}

export const SearchModeToggle: React.FC<SearchModeToggleProps> = ({ mode, onModeChange }) => {
  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '10px',
    fontSize: '13px',
    fontFamily: '"Inter", system-ui, sans-serif',
    fontWeight: 500,
    letterSpacing: '0.02em',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    background: isActive ? 'hsl(30 25% 98%)' : 'transparent',
    color: isActive ? 'hsl(15 55% 70%)' : 'hsl(30 15% 55%)',
    boxShadow: isActive ? '0 2px 8px hsl(30 20% 15% / 0.08)' : 'none',
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px',
      background: 'hsl(30 20% 94%)',
      borderRadius: '14px',
      border: '1px solid hsl(30 15% 88%)',
    }}>
      <button
        onClick={() => onModeChange('voice')}
        style={buttonStyle(mode === 'voice')}
      >
        <Mic style={{ width: '16px', height: '16px' }} />
        Voice
      </button>
      <button
        onClick={() => onModeChange('form')}
        style={buttonStyle(mode === 'form')}
      >
        <Search style={{ width: '16px', height: '16px' }} />
        Search
      </button>
    </div>
  );
};

export default SearchModeToggle;
