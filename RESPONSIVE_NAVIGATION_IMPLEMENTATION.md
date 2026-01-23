# Responsive Navigation Implementation Guide

A complete guide for implementing a mobile-first responsive navigation system featuring a unified header and bottom navigation bar. Designed for Next.js 16 (App Router), Tailwind CSS 4.x, and React 19.

---

## Architecture Overview

The navigation system consists of two components:

| Component | Purpose | Visibility |
|-----------|---------|------------|
| **Header** | Top bar with logo, mode toggle, auth buttons | Always visible (simplified on mobile) |
| **BottomNav** | Fixed bottom navigation with icon tabs | Mobile only (`md:hidden`) |

### Mobile Behavior
- Header shows only logo + single login icon
- Bottom nav provides Home/Voice/Profile navigation
- Audio controls position above bottom nav

### Desktop Behavior  
- Full header with logo, search mode toggle, Login/Join buttons
- Bottom nav hidden
- Audio controls at normal bottom-right position

---

## Dependencies

```bash
npm install lucide-react react-router-dom
# OR for Next.js
npm install lucide-react next
```

---

## Color Palette (HSL)

```css
/* Warm luxury palette */
--cream-bg: hsl(30 25% 98%);
--cream-bg-translucent: hsl(30 25% 98% / 0.8);
--text-dark: hsl(30 20% 15%);
--text-muted: hsl(30 15% 45%);
--text-muted-light: hsl(30 15% 50%);
--accent-rose: hsl(15 55% 70%);
--accent-rose-dark: hsl(15 55% 55%);
--accent-gold: hsl(35 45% 75%);
--border-light: hsl(30 15% 88%);
```

---

## Component 1: Header

**File: `components/layout/Header.tsx`**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';

// Import your SearchModeToggle component if using voice/form modes
// import { SearchModeToggle, type SearchMode } from '@/components/voice';

export type SearchMode = 'voice' | 'form';

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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: 'hsl(30 25% 98% / 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      className="md:px-6"
    >
      {/* Logo */}
      <Link 
        href="/" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          textDecoration: 'none',
        }}
      >
        <div 
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, hsl(15 55% 70%), hsl(35 45% 75%))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span 
            style={{ 
              color: 'hsl(30 25% 98%)', 
              fontWeight: 600, 
              fontSize: '0.875rem' 
            }}
          >
            V
          </span>
        </div>
        {/* Hide brand name on mobile */}
        <span 
          style={{ 
            fontSize: '1.125rem', 
            letterSpacing: '0.05em', 
            color: 'hsl(30 20% 15%)',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
          className="hidden sm:inline"
        >
          Voyage
        </span>
      </Link>

      {/* Center: Search Mode Toggle (Desktop only) */}
      {showModeToggle && onModeChange && (
        <div className="hidden md:block">
          {/* Replace with your SearchModeToggle component */}
          <div style={{ 
            display: 'flex', 
            gap: '0.25rem',
            background: 'hsl(30 20% 96%)',
            borderRadius: '0.5rem',
            padding: '0.25rem',
          }}>
            <button
              onClick={() => onModeChange('voice')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: searchMode === 'voice' ? 'white' : 'transparent',
                color: searchMode === 'voice' ? 'hsl(15 55% 55%)' : 'hsl(30 15% 50%)',
                boxShadow: searchMode === 'voice' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              🎤 Voice
            </button>
            <button
              onClick={() => onModeChange('form')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: searchMode === 'form' ? 'white' : 'transparent',
                color: searchMode === 'form' ? 'hsl(15 55% 55%)' : 'hsl(30 15% 50%)',
                boxShadow: searchMode === 'form' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              🔍 Search
            </button>
          </div>
        </div>
      )}

      {/* Auth buttons (Desktop only) */}
      <div 
        className="hidden md:flex" 
        style={{ alignItems: 'center', gap: '0.75rem' }}
      >
        <Link 
          href="/auth"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            color: 'hsl(30 15% 45%)',
            background: 'transparent',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <LogIn style={{ width: '1rem', height: '1rem' }} />
          Login
        </Link>
        <Link 
          href="/auth"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            color: 'hsl(30 25% 98%)',
            background: 'hsl(15 55% 70%)',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'hsl(15 55% 65%)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'hsl(15 55% 70%)'}
        >
          <UserPlus style={{ width: '1rem', height: '1rem' }} />
          Join
        </Link>
      </div>

      {/* Mobile: Just show login icon */}
      <Link 
        href="/auth"
        className="md:hidden"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '9999px',
          color: 'hsl(30 15% 45%)',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        aria-label="Login"
      >
        <LogIn style={{ width: '1.25rem', height: '1.25rem' }} />
      </Link>
    </header>
  );
};

export default Header;
```

---

## Component 2: BottomNav

**File: `components/layout/BottomNav.tsx`**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mic, User } from 'lucide-react';

export type SearchMode = 'voice' | 'form';

interface BottomNavProps {
  searchMode?: SearchMode;
  onModeChange?: (mode: SearchMode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  searchMode = 'voice',
  onModeChange,
}) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isProfile = pathname?.startsWith('/profile');

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      href: '/',
      isActive: isHome && searchMode === 'form',
      onClick: () => onModeChange?.('form'),
    },
    { 
      icon: Mic, 
      label: 'Voice', 
      href: '/',
      isActive: isHome && searchMode === 'voice',
      onClick: () => onModeChange?.('voice'),
    },
    { 
      icon: User, 
      label: 'Profile', 
      href: '/profile',
      isActive: isProfile,
    },
  ];

  return (
    <nav 
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'hsl(30 25% 98% / 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid hsl(30 15% 88%)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '4rem',
          maxWidth: '28rem',
          margin: '0 auto',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                padding: '0.5rem 1rem',
                color: item.isActive ? 'hsl(15 55% 55%)' : 'hsl(30 15% 50%)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.75rem',
                  background: item.isActive 
                    ? 'linear-gradient(135deg, hsl(15 55% 70% / 0.15), hsl(35 45% 75% / 0.1))' 
                    : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon 
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    transform: item.isActive ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </div>
              <span 
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  opacity: item.isActive ? 1 : 0.7,
                  fontFamily: "'Inter', system-ui, sans-serif",
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
```

---

## Component 3: Index Export

**File: `components/layout/index.ts`**

```ts
export { Header, type SearchMode } from './Header';
export { BottomNav } from './BottomNav';
```

---

## Integration: Page Layout

### Main Page Example

**File: `app/page.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { Header, BottomNav, type SearchMode } from '@/components/layout';

export default function HomePage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('voice');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'hsl(30 25% 98%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '4.5rem',      // Space for fixed header
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingBottom: '5rem',      // Space for bottom nav on mobile
      }}
    >
      {/* Header with mode toggle */}
      <Header 
        showModeToggle={true}
        searchMode={searchMode}
        onModeChange={setSearchMode}
      />

      {/* Bottom Navigation (auto-hidden on desktop via md:hidden) */}
      <BottomNav 
        searchMode={searchMode}
        onModeChange={setSearchMode}
      />

      {/* Main Content */}
      <main style={{ width: '100%', maxWidth: '56rem' }}>
        {searchMode === 'voice' ? (
          <div>Voice Assistant Content</div>
        ) : (
          <div>Search Form Content</div>
        )}
      </main>
    </div>
  );
}
```

### Profile Page Example

**File: `app/profile/page.tsx`**

```tsx
'use client';

import React from 'react';
import { Header, BottomNav } from '@/components/layout';

export default function ProfilePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 25% 98%) 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingBottom: '6rem',  // Extra space for bottom nav
      }}
    >
      {/* Header (no mode toggle on profile) */}
      <Header />

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Profile Content */}
      <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <h1>My Profile</h1>
        {/* ... profile content ... */}
      </div>
    </div>
  );
}
```

---

## Positioning Audio Controls (Voice Mode)

If you have floating audio controls (mic/speaker buttons), position them above the bottom nav on mobile:

```tsx
{/* Audio controls - positioned above bottom nav on mobile */}
<div 
  className="fixed z-50 flex gap-3 bottom-20 right-4 md:bottom-6 md:right-6"
>
  <button
    onClick={() => setIsMicMuted(!isMicMuted)}
    style={{
      width: '3rem',
      height: '3rem',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px hsl(30 20% 15% / 0.1)',
      border: isMicMuted ? '1px solid hsl(0 70% 50% / 0.3)' : '1px solid hsl(30 15% 88%)',
      background: isMicMuted ? 'hsl(0 70% 50% / 0.2)' : 'hsl(30 20% 96%)',
      color: isMicMuted ? 'hsl(0 70% 50%)' : 'hsl(15 55% 70%)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
  >
    {isMicMuted ? <MicOff size={20} /> : <Mic size={20} />}
  </button>
  {/* Speaker button similar... */}
</div>
```

Key classes:
- `bottom-20` → 5rem from bottom (above 4rem bottom nav)
- `md:bottom-6` → 1.5rem on desktop (normal position)

---

## Tailwind CSS Configuration

If using Tailwind 4.x with `@theme` directive:

**File: `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  /* Responsive breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;

  /* Custom spacing for safe areas */
  --spacing-safe-bottom: env(safe-area-inset-bottom);
}

/* Safe area support for bottom nav */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

---

## File Structure

```
components/
└── layout/
    ├── index.ts           # Exports Header, BottomNav
    ├── Header.tsx         # Responsive top navigation
    └── BottomNav.tsx      # Mobile bottom tab bar

app/
├── page.tsx               # Home with mode toggle
├── profile/
│   └── page.tsx           # Profile with standard nav
└── auth/
    └── page.tsx           # Auth page
```

---

## Checklist

- [ ] Install dependencies (`lucide-react`)
- [ ] Create `components/layout/Header.tsx`
- [ ] Create `components/layout/BottomNav.tsx`
- [ ] Create `components/layout/index.ts`
- [ ] Add Header + BottomNav to each page
- [ ] Set proper padding on page containers:
  - `paddingTop: '4.5rem'` or `'5rem'` for header
  - `paddingBottom: '5rem'` or `'6rem'` for bottom nav
- [ ] Position floating elements (audio controls) with `bottom-20 md:bottom-6`
- [ ] Test on mobile viewport (Chrome DevTools → Toggle device toolbar)

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Bottom nav overlaps content | Add `paddingBottom: '5rem'` to page container |
| Header overlaps content | Add `paddingTop: '4.5rem'` to page container |
| Floating buttons hidden behind nav | Use `bottom-20 md:bottom-6` positioning |
| Bottom nav visible on desktop | Ensure `md:hidden` class is applied |
| Blur not working on iOS Safari | Add `WebkitBackdropFilter` alongside `backdropFilter` |
| Safe area not respected on iPhone | Use `env(safe-area-inset-bottom)` in paddingBottom |

---

## React Router DOM Variant

If using React Router instead of Next.js, replace:

```tsx
// Next.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// React Router
import { Link, useLocation } from 'react-router-dom';
const pathname = useLocation().pathname;
```

And change `href` to `to` on Link components.
