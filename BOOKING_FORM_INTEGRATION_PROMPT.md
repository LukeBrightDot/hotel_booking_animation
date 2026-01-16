# Hotel Booking Form - Next.js Integration Guide

## Overview

This guide provides step-by-step instructions to integrate a luxury hotel booking form UI into a Next.js application. The design uses a warm, elegant palette inspired by the "Her" movie aesthetic with inline styles for maximum portability.

**Design System Colors (HSL format):**
- Background: `hsl(30 25% 98%)` - Warm off-white
- Primary/Accent: `hsl(15 55% 70%)` - Warm coral/terracotta
- Secondary: `hsl(35 45% 75%)` - Warm sand
- Text Primary: `hsl(30 20% 15%)` - Deep warm brown
- Text Secondary: `hsl(30 15% 45%)` - Muted warm gray
- Border: `hsl(30 15% 88%)` - Light warm gray
- Input Background: `hsl(30 20% 96%)` - Very light warm gray

---

## Phase 1: Install Dependencies

```bash
npm install lucide-react date-fns
# If using shadcn/ui for Calendar and Popover:
npx shadcn@latest add calendar popover
```

---

## Phase 2: Create SearchModeToggle Component

**File: `components/booking/SearchModeToggle.tsx`**

```tsx
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
```

---

## Phase 3: Create BookingForm Component

**File: `components/booking/BookingForm.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Users, Home, Search, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface BookingFormProps {
  onSearch?: (data: BookingData) => void;
  className?: string;
}

export interface BookingData {
  destination: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  rooms: number;
  guests: number;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSearch, className = '' }) => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const handleSearch = () => {
    onSearch?.({
      destination,
      checkIn,
      checkOut,
      rooms,
      guests,
    });
  };

  const inputContainerStyle: React.CSSProperties = {
    background: 'hsl(30 20% 96%)',
    border: '1px solid hsl(30 15% 88%)',
    borderRadius: '12px',
    padding: '14px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'hsl(30 15% 45%)',
    marginBottom: '4px',
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: 'hsl(30 20% 15%)',
  };

  const placeholderStyle: React.CSSProperties = {
    ...valueStyle,
    color: 'hsl(30 15% 60%)',
  };

  const iconStyle: React.CSSProperties = {
    width: '18px',
    height: '18px',
    color: 'hsl(15 55% 70%)',
    flexShrink: 0,
  };

  return (
    <div className={className} style={{
      width: '100%',
      maxWidth: '800px',
    }}>
      {/* Main Form Card */}
      <div style={{
        background: 'hsl(30 25% 98%)',
        border: '1px solid hsl(30 15% 90%)',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 8px 32px hsl(30 20% 15% / 0.08)',
      }}>
        {/* Form Title */}
        <h2 style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '22px',
          fontWeight: 300,
          letterSpacing: '0.02em',
          color: 'hsl(30 20% 15%)',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          Find Your Perfect Stay
        </h2>

        {/* Form Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '20px',
        }}>
          {/* Destination Input */}
          <div style={{ gridColumn: 'span 2' }}>
            <div 
              style={inputContainerStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'hsl(15 55% 70%)';
                e.currentTarget.style.boxShadow = '0 2px 8px hsl(15 55% 70% / 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <MapPin style={iconStyle} />
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Destination</div>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City or hotel name"
                  style={{
                    ...valueStyle,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Check In */}
          <Popover>
            <PopoverTrigger asChild>
              <div 
                style={inputContainerStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(15 55% 70%)';
                  e.currentTarget.style.boxShadow = '0 2px 8px hsl(15 55% 70% / 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Calendar style={iconStyle} />
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Check In</div>
                  <div style={checkIn ? valueStyle : placeholderStyle}>
                    {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'}
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0" 
              align="start"
              style={{
                background: 'hsl(30 25% 98%)',
                border: '1px solid hsl(30 15% 88%)',
                borderRadius: '12px',
              }}
            >
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Check Out */}
          <Popover>
            <PopoverTrigger asChild>
              <div 
                style={inputContainerStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(15 55% 70%)';
                  e.currentTarget.style.boxShadow = '0 2px 8px hsl(15 55% 70% / 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Calendar style={iconStyle} />
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Check Out</div>
                  <div style={checkOut ? valueStyle : placeholderStyle}>
                    {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0" 
              align="start"
              style={{
                background: 'hsl(30 25% 98%)',
                border: '1px solid hsl(30 15% 88%)',
                borderRadius: '12px',
              }}
            >
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Rooms */}
          <div style={{ position: 'relative' }}>
            <div 
              style={inputContainerStyle}
              onClick={() => {
                setShowRoomsDropdown(!showRoomsDropdown);
                setShowGuestsDropdown(false);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'hsl(15 55% 70%)';
                e.currentTarget.style.boxShadow = '0 2px 8px hsl(15 55% 70% / 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Home style={iconStyle} />
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Rooms</div>
                <div style={valueStyle}>{rooms} {rooms === 1 ? 'Room' : 'Rooms'}</div>
              </div>
              <ChevronDown style={{ ...iconStyle, color: 'hsl(30 15% 60%)' }} />
            </div>
            
            {showRoomsDropdown && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: 'hsl(30 25% 98%)',
                border: '1px solid hsl(30 15% 88%)',
                borderRadius: '10px',
                padding: '6px',
                zIndex: 50,
                boxShadow: '0 4px 16px hsl(30 20% 15% / 0.1)',
              }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      setRooms(num);
                      setShowRoomsDropdown(false);
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      ...valueStyle,
                      background: rooms === num ? 'hsl(15 55% 70% / 0.15)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (rooms !== num) {
                        e.currentTarget.style.background = 'hsl(30 20% 94%)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = rooms === num ? 'hsl(15 55% 70% / 0.15)' : 'transparent';
                    }}
                  >
                    {num} {num === 1 ? 'Room' : 'Rooms'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guests */}
          <div style={{ position: 'relative' }}>
            <div 
              style={inputContainerStyle}
              onClick={() => {
                setShowGuestsDropdown(!showGuestsDropdown);
                setShowRoomsDropdown(false);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'hsl(15 55% 70%)';
                e.currentTarget.style.boxShadow = '0 2px 8px hsl(15 55% 70% / 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Users style={iconStyle} />
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Guests</div>
                <div style={valueStyle}>{guests} {guests === 1 ? 'Guest' : 'Guests'}</div>
              </div>
              <ChevronDown style={{ ...iconStyle, color: 'hsl(30 15% 60%)' }} />
            </div>
            
            {showGuestsDropdown && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: 'hsl(30 25% 98%)',
                border: '1px solid hsl(30 15% 88%)',
                borderRadius: '10px',
                padding: '6px',
                zIndex: 50,
                boxShadow: '0 4px 16px hsl(30 20% 15% / 0.1)',
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      setGuests(num);
                      setShowGuestsDropdown(false);
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      ...valueStyle,
                      background: guests === num ? 'hsl(15 55% 70% / 0.15)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (guests !== num) {
                        e.currentTarget.style.background = 'hsl(30 20% 94%)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = guests === num ? 'hsl(15 55% 70% / 0.15)' : 'transparent';
                    }}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            width: '100%',
            padding: '16px 28px',
            background: 'linear-gradient(135deg, hsl(15 55% 70%) 0%, hsl(25 50% 65%) 100%)',
            border: 'none',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px hsl(15 55% 70% / 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px hsl(15 55% 70% / 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px hsl(15 55% 70% / 0.3)';
          }}
        >
          <Search style={{ width: '18px', height: '18px', color: 'hsl(30 25% 98%)' }} />
          <span style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: 'hsl(30 25% 98%)',
          }}>
            Search Hotels
          </span>
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
```

---

## Phase 4: Create Exports

**File: `components/booking/index.ts`**

```ts
export { BookingForm } from './BookingForm';
export type { BookingData } from './BookingForm';
export { SearchModeToggle, type SearchMode } from './SearchModeToggle';
```

---

## Phase 5: Create Header Component

**File: `components/booking/Header.tsx`**

```tsx
'use client';

import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { SearchModeToggle, type SearchMode } from './SearchModeToggle';

interface HeaderProps {
  searchMode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
  showModeToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchMode, 
  onModeChange, 
  showModeToggle = true 
}) => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.5rem',
      background: 'hsl(30 25% 98% / 0.8)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, hsl(15 55% 70%), hsl(35 45% 75%))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ color: 'hsl(30 25% 98%)', fontWeight: 600, fontSize: '0.875rem' }}>V</span>
        </div>
        <span style={{ fontSize: '1.125rem', letterSpacing: '0.05em', color: 'hsl(30 20% 15%)' }}>Voyage</span>
      </div>

      {/* Center: Search Mode Toggle */}
      {showModeToggle && (
        <SearchModeToggle mode={searchMode} onModeChange={onModeChange} />
      )}

      {/* Auth buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          color: 'hsl(30 15% 45%)',
          background: 'transparent',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}>
          <LogIn style={{ width: '1rem', height: '1rem' }} />
          Login
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          color: 'hsl(30 25% 98%)',
          background: 'hsl(15 55% 70%)',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}>
          <UserPlus style={{ width: '1rem', height: '1rem' }} />
          Join
        </button>
      </div>
    </header>
  );
};

export default Header;
```

---

## Phase 6: Create Main Page Layout

**File: `app/page.tsx` (or `pages/index.tsx` for Pages Router)**

```tsx
'use client';

import React, { useState } from 'react';
import { BookingForm, type BookingData, type SearchMode } from '@/components/booking';
import { Header } from '@/components/booking/Header';

export default function HomePage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('form');

  const handleFormSearch = (data: BookingData) => {
    console.log('Search data:', data);
    // Handle search - navigate to results, call API, etc.
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'hsl(30 25% 98%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5rem 1.5rem 0',
    }}>
      {/* Header */}
      <Header 
        searchMode={searchMode} 
        onModeChange={setSearchMode}
        showModeToggle={true}
      />

      {/* Main content area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '56rem',
        transition: 'all 500ms ease-out',
      }}>
        <BookingForm onSearch={handleFormSearch} />
      </main>

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
}
```

---

## Phase 7: Calendar Component Styling (Critical)

The shadcn Calendar component needs custom styling to match the warm theme. Update your calendar styles:

**Add to `globals.css` or component styles:**

```css
/* Calendar warm theme overrides */
.rdp {
  --rdp-cell-size: 40px;
  --rdp-accent-color: hsl(15 55% 70%);
  --rdp-background-color: hsl(15 55% 70% / 0.15);
}

.rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
  background-color: hsl(30 20% 94%);
}

.rdp-day_selected,
.rdp-day_selected:hover {
  background-color: hsl(15 55% 70%);
  color: hsl(30 25% 98%);
}

.rdp-day_today:not(.rdp-day_selected) {
  border: 1px solid hsl(15 55% 70%);
}
```

---

## Verification Checklist

After implementation, verify:

1. **Header renders correctly:**
   - Logo with gradient background
   - Voice/Search toggle (if enabled)
   - Login/Join buttons

2. **Form card displays:**
   - Rounded corners (20px)
   - Subtle shadow
   - Warm off-white background

3. **Input fields work:**
   - Destination text input
   - Check In date picker opens calendar
   - Check Out date picker (disabled dates before Check In)
   - Rooms dropdown (1-5)
   - Guests dropdown (1-8)

4. **Hover effects:**
   - Inputs get coral border on hover
   - Subtle glow shadow on hover
   - Search button lifts on hover

5. **Search button:**
   - Coral gradient background
   - White text and icon
   - Hover lift animation

6. **Dropdowns:**
   - Proper z-index (appear above other elements)
   - Selected item highlighted
   - Close on selection

---

## Common Issues & Solutions

### Issue: Calendar not appearing in popover
**Solution:** Add `pointer-events-auto` to Calendar className:
```tsx
<CalendarComponent className="p-3 pointer-events-auto" />
```

### Issue: Dropdowns appearing behind other elements
**Solution:** Ensure dropdown container has `zIndex: 50`

### Issue: Fonts not loading
**Solution:** Add Inter font to your `layout.tsx`:
```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

### Issue: Hover styles not working in Next.js
**Solution:** The inline `onMouseEnter`/`onMouseLeave` handlers should work. If not, use CSS modules or styled-components.

---

## File Structure

```
components/
  booking/
    BookingForm.tsx      # Main form component
    SearchModeToggle.tsx # Voice/Search toggle
    Header.tsx           # Page header
    index.ts             # Exports
app/
  page.tsx               # Main page using components
```

---

## Notes

- All styles use inline React.CSSProperties for maximum portability
- HSL colors are used consistently for the warm palette
- The design matches the voice assistant UI for seamless integration
- Calendar requires shadcn/ui Popover and Calendar components
- All hover effects use JavaScript event handlers (no CSS required)
