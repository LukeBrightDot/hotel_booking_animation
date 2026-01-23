import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Mic, User } from 'lucide-react';
import { type SearchMode } from '@/components/voice';

interface BottomNavProps {
  searchMode?: SearchMode;
  onModeChange?: (mode: SearchMode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  searchMode = 'voice',
  onModeChange,
}) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProfile = location.pathname.startsWith('/profile');

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      to: '/',
      isActive: isHome && searchMode === 'form',
      onClick: () => onModeChange?.('form'),
    },
    { 
      icon: Mic, 
      label: 'Voice', 
      to: '/',
      isActive: isHome && searchMode === 'voice',
      onClick: () => onModeChange?.('voice'),
    },
    { 
      icon: User, 
      label: 'Profile', 
      to: '/profile',
      isActive: isProfile,
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'hsl(30 25% 98% / 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid hsl(30 15% 88%)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all"
              style={{
                color: item.isActive ? 'hsl(15 55% 55%)' : 'hsl(30 15% 50%)',
              }}
            >
              <div 
                className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all"
                style={{
                  background: item.isActive 
                    ? 'linear-gradient(135deg, hsl(15 55% 70% / 0.15), hsl(35 45% 75% / 0.1))' 
                    : 'transparent',
                }}
              >
                <Icon 
                  className="w-5 h-5 transition-transform"
                  style={{
                    transform: item.isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              </div>
              <span 
                className="text-xs font-medium transition-all"
                style={{
                  opacity: item.isActive ? 1 : 0.7,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
