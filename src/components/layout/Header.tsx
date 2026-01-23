import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { SearchModeToggle, type SearchMode } from '@/components/voice';

interface HeaderProps {
  showModeToggle?: boolean;
  searchMode?: SearchMode;
  onModeChange?: (mode: SearchMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  showModeToggle = false,
  searchMode = 'voice',
  onModeChange,
}) => {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-6"
      style={{
        background: 'hsl(30 25% 98% / 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, hsl(15 55% 70%), hsl(35 45% 75%))',
          }}
        >
          <span className="text-sm font-semibold" style={{ color: 'hsl(30 25% 98%)' }}>V</span>
        </div>
        <span 
          className="text-lg tracking-wide hidden sm:inline"
          style={{ color: 'hsl(30 20% 15%)' }}
        >
          Voyage
        </span>
      </Link>

      {/* Center: Search Mode Toggle (Desktop only) */}
      {showModeToggle && onModeChange && (
        <div className="hidden md:block">
          <SearchModeToggle mode={searchMode} onModeChange={onModeChange} />
        </div>
      )}

      {/* Auth buttons (Desktop only) */}
      <div className="hidden md:flex items-center gap-3">
        <Link 
          to="/auth"
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors hover:bg-black/5"
          style={{ color: 'hsl(30 15% 45%)' }}
        >
          <LogIn className="w-4 h-4" />
          Login
        </Link>
        <Link 
          to="/auth"
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors"
          style={{
            color: 'hsl(30 25% 98%)',
            background: 'hsl(15 55% 70%)',
          }}
        >
          <UserPlus className="w-4 h-4" />
          Join
        </Link>
      </div>

      {/* Mobile: Just show login icon */}
      <Link 
        to="/auth"
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-black/5"
        style={{ color: 'hsl(30 15% 45%)' }}
        aria-label="Login"
      >
        <LogIn className="w-5 h-5" />
      </Link>
    </header>
  );
};

export default Header;
