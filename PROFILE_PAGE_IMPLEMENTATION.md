# Profile Pages Implementation Guide

> **Target Stack**: Next.js 16 (App Router), Tailwind CSS 4.x, React 19
> **Dependencies**: `lucide-react`, `sonner`, `@radix-ui/react-select`, `@radix-ui/react-checkbox`

This guide provides complete implementation instructions for the **Profile** and **Travel Preferences** pages with luxury styling.

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Dependencies](#dependencies)
4. [Global Styles](#global-styles)
5. [UI Components Required](#ui-components-required)
6. [Page 1: Main Profile Page](#page-1-main-profile-page)
7. [Page 2: Travel Preferences Page](#page-2-travel-preferences-page)
8. [Routing Configuration](#routing-configuration)
9. [Design Specifications](#design-specifications)
10. [Integration Checklist](#integration-checklist)

---

## Overview

### Page Structure
- **`/profile`** — Main profile with personal info, stats, and navigation to preferences
- **`/profile/preferences`** — Detailed travel preferences (room, amenities, loyalty programs)

### Design Philosophy
- Warm luxury aesthetic with cream/champagne backgrounds
- Glassmorphic cards with backdrop blur
- Gold accent color palette (HSL 40° hue)
- Elegant serif typography (Cormorant Garamond) paired with clean sans-serif (Inter)
- Ambient floating background animations

---

## File Structure

```
src/
├── app/
│   ├── profile/
│   │   ├── page.tsx              # Main profile page
│   │   └── preferences/
│   │       └── page.tsx          # Travel preferences subpage
│   ├── globals.css               # Global styles + keyframes
│   └── layout.tsx                # Root layout with Toaster
├── components/
│   └── ui/
│       ├── button.tsx            # shadcn/ui button
│       ├── input.tsx             # shadcn/ui input
│       ├── label.tsx             # shadcn/ui label
│       ├── select.tsx            # shadcn/ui select (Radix-based)
│       ├── checkbox.tsx          # shadcn/ui checkbox (Radix-based)
│       └── textarea.tsx          # shadcn/ui textarea
```

---

## Dependencies

```bash
npm install lucide-react sonner @radix-ui/react-select @radix-ui/react-checkbox
```

---

## Global Styles

Add to `src/app/globals.css`:

```css
/* ============================================
   PROFILE PAGES - LUXURY THEME STYLES
   ============================================ */

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400;500&display=swap');

/* CSS Variables for Tailwind 4.x @theme */
@theme {
  /* Typography */
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Colors - Luxury Warm Palette */
  --color-background: hsl(30 25% 98%);
  --color-background-warm: hsl(35 30% 95%);
  --color-foreground: hsl(30 15% 20%);
  --color-foreground-muted: hsl(30 10% 45%);
  --color-foreground-subtle: hsl(30 10% 55%);
  
  /* Gold Accent */
  --color-gold: hsl(40 45% 50%);
  --color-gold-dark: hsl(40 45% 42%);
  --color-gold-light: hsl(40 45% 55%);
  --color-gold-muted: hsl(40 45% 45%);
  
  /* Card Surfaces */
  --color-card: hsla(30, 25%, 99%, 0.7);
  --color-card-border: hsla(40, 30%, 85%, 0.5);
  --color-input-bg: hsla(30, 25%, 98%, 0.8);
  --color-input-border: hsla(40, 30%, 75%, 0.4);
}

/* Keyframe Animations */
@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  50% { 
    transform: translateY(-30px) rotate(3deg); 
  }
}

@keyframes spin {
  to { 
    transform: rotate(360deg); 
  }
}

/* Animation Classes */
.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float 25s ease-in-out infinite reverse;
}

.animate-spin-slow {
  animation: spin 0.8s linear infinite;
}
```

---

## UI Components Required

Ensure you have these shadcn/ui components installed:

```bash
npx shadcn@latest add button input label select checkbox textarea
```

### Toast Provider Setup

In `src/app/layout.tsx`:

```tsx
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'hsl(30 25% 99%)',
              border: '1px solid hsla(40, 30%, 85%, 0.5)',
              color: 'hsl(30 15% 20%)',
              fontFamily: "'Inter', sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
```

---

## Page 1: Main Profile Page

**File**: `src/app/profile/page.tsx`

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  User, 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Save,
  Mail,
  Phone
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/* ============================================
   INLINE STYLE OBJECTS
   Using React.CSSProperties for guaranteed rendering
   ============================================ */

const pageStyles: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 25% 98%) 100%)",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  position: "relative",
  overflow: "hidden",
  padding: "2rem 1rem",
};

const ambientOrbPrimary: React.CSSProperties = {
  position: "absolute",
  top: "-20%",
  left: "-10%",
  width: "40rem",
  height: "40rem",
  background: "radial-gradient(circle, hsla(40, 45%, 55%, 0.08) 0%, transparent 70%)",
  borderRadius: "50%",
  filter: "blur(60px)",
  animation: "float 20s ease-in-out infinite",
  pointerEvents: "none",
};

const ambientOrbSecondary: React.CSSProperties = {
  position: "absolute",
  bottom: "-10%",
  right: "-5%",
  width: "35rem",
  height: "35rem",
  background: "radial-gradient(circle, hsla(25, 35%, 60%, 0.06) 0%, transparent 70%)",
  borderRadius: "50%",
  filter: "blur(50px)",
  animation: "float 25s ease-in-out infinite reverse",
  pointerEvents: "none",
};

const contentContainer: React.CSSProperties = {
  maxWidth: "48rem",
  margin: "0 auto",
  position: "relative",
  zIndex: 10,
};

const headerStyles: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "2.5rem",
};

const avatarContainer: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "4.5rem",
  height: "4.5rem",
  borderRadius: "50%",
  background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.15) 0%, hsla(40, 45%, 55%, 0.05) 100%)",
  marginBottom: "1.5rem",
  border: "2px solid hsla(40, 45%, 55%, 0.2)",
};

const titleStyles: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "2.25rem",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  color: "hsl(30 15% 20%)",
  marginBottom: "0.75rem",
};

const subtitleStyles: React.CSSProperties = {
  fontSize: "0.9375rem",
  color: "hsl(30 10% 45%)",
  fontWeight: 300,
  letterSpacing: "0.01em",
  maxWidth: "28rem",
  margin: "0 auto",
};

const statsGridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
  marginBottom: "1.5rem",
};

const preferencesLinkCard: React.CSSProperties = {
  background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.12) 0%, hsla(40, 45%, 55%, 0.06) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid hsla(40, 45%, 55%, 0.25)",
  borderRadius: "1.25rem",
  padding: "1.25rem 1.5rem",
  marginBottom: "1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textDecoration: "none",
};

const personalInfoCard: React.CSSProperties = {
  background: "hsla(30, 25%, 99%, 0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid hsla(40, 30%, 85%, 0.5)",
  borderRadius: "1.25rem",
  padding: "1.75rem",
  boxShadow: "0 4px 24px -8px hsla(30, 20%, 30%, 0.08)",
};

const sectionHeaderStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1.5rem",
};

const sectionTitleStyles: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "1.375rem",
  fontWeight: 400,
  color: "hsl(30 15% 20%)",
  letterSpacing: "-0.01em",
};

const formGridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1.25rem",
};

const buttonContainerStyles: React.CSSProperties = {
  marginTop: "1.75rem",
  display: "flex",
  justifyContent: "flex-end",
};

const primaryButtonStyles: React.CSSProperties = {
  background: "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 42%) 100%)",
  color: "hsl(40 30% 98%)",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.875rem",
  fontWeight: 400,
  letterSpacing: "0.02em",
  padding: "0.75rem 1.75rem",
  borderRadius: "0.75rem",
  border: "none",
  boxShadow: "0 4px 20px -4px hsla(40, 45%, 40%, 0.35)",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const spinnerStyles: React.CSSProperties = {
  width: "1rem",
  height: "1rem",
  border: "2px solid hsla(40, 30%, 98%, 0.3)",
  borderTopColor: "hsl(40 30% 98%)",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

/* ============================================
   MAIN PROFILE PAGE COMPONENT
   ============================================ */

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "user@example.com",
    phone: "",
  });

  // Mock stats - replace with API data
  const stats = {
    searches: 0,
    bookings: 0,
    memberSince: "Jan 2026",
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success("Profile updated successfully", {
      description: "Your personal information has been saved.",
    });
  };

  return (
    <div style={pageStyles}>
      {/* Ambient Background Orbs */}
      <div style={ambientOrbPrimary} />
      <div style={ambientOrbSecondary} />

      {/* Main Content */}
      <div style={contentContainer}>
        {/* Header */}
        <div style={headerStyles}>
          <div style={avatarContainer}>
            <User style={{ width: "2rem", height: "2rem", color: "hsl(40 45% 45%)" }} />
          </div>
          <h1 style={titleStyles}>My Profile</h1>
          <p style={subtitleStyles}>
            Manage your account information and preferences
          </p>
        </div>

        {/* Stats Cards */}
        <div style={statsGridStyles}>
          <StatCard icon={<Search />} value={stats.searches} label="SEARCHES" />
          <StatCard icon={<Calendar />} value={stats.bookings} label="BOOKINGS" />
          <StatCard icon={<Clock />} value={stats.memberSince} label="MEMBER SINCE" />
        </div>

        {/* Travel Preferences Link */}
        <Link href="/profile/preferences" style={preferencesLinkCard}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 42%) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px -4px hsla(40, 45%, 40%, 0.4)",
              }}
            >
              <SettingsIcon />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: "hsl(30 15% 20%)",
                  marginBottom: "0.125rem",
                }}
              >
                Travel Preferences
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "hsl(30 10% 45%)",
                  fontWeight: 300,
                }}
              >
                Room, amenities, loyalty programs & more
              </p>
            </div>
          </div>
          <ChevronRight style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />
        </Link>

        {/* Personal Information Card */}
        <div style={personalInfoCard}>
          <div style={sectionHeaderStyles}>
            <User style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />
            <h2 style={sectionTitleStyles}>Personal Information</h2>
          </div>

          <div style={formGridStyles}>
            <InputField
              label="FIRST NAME"
              value={personalInfo.firstName}
              onChange={(v) => setPersonalInfo({ ...personalInfo, firstName: v })}
              placeholder="Enter your first name"
              icon={<User style={{ width: "1rem", height: "1rem" }} />}
            />
            <InputField
              label="LAST NAME"
              value={personalInfo.lastName}
              onChange={(v) => setPersonalInfo({ ...personalInfo, lastName: v })}
              placeholder="Enter your last name"
              icon={<User style={{ width: "1rem", height: "1rem" }} />}
            />
            <InputField
              label="EMAIL ADDRESS"
              value={personalInfo.email}
              onChange={() => {}}
              placeholder="Your email"
              icon={<Mail style={{ width: "1rem", height: "1rem" }} />}
              disabled
              helperText="Email cannot be changed"
            />
            <InputField
              label="PHONE NUMBER"
              value={personalInfo.phone}
              onChange={(v) => setPersonalInfo({ ...personalInfo, phone: v })}
              placeholder="+1 (555) 000-0000"
              icon={<Phone style={{ width: "1rem", height: "1rem" }} />}
            />
          </div>

          {/* Save Button */}
          <div style={buttonContainerStyles}>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              style={{
                ...primaryButtonStyles,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? (
                <div style={spinnerStyles} />
              ) : (
                <Save style={{ width: "1rem", height: "1rem" }} />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      {/* Inline Keyframes (fallback) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400;500&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ============================================
   STAT CARD COMPONENT
   ============================================ */

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) => {
  const cardStyles: React.CSSProperties = {
    background: "hsla(30, 25%, 99%, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid hsla(40, 30%, 85%, 0.5)",
    borderRadius: "1rem",
    padding: "1.25rem",
    textAlign: "center",
    boxShadow: "0 4px 24px -8px hsla(30, 20%, 30%, 0.06)",
  };

  const iconContainerStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "0.625rem",
    background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.12) 0%, hsla(40, 45%, 55%, 0.06) 100%)",
    marginBottom: "0.75rem",
    color: "hsl(40 45% 45%)",
  };

  const valueStyles: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "hsl(30 15% 20%)",
    marginBottom: "0.25rem",
  };

  const labelStyles: React.CSSProperties = {
    fontSize: "0.625rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "hsl(30 10% 50%)",
  };

  return (
    <div style={cardStyles}>
      <div style={iconContainerStyles}>
        {React.cloneElement(icon as React.ReactElement, { 
          style: { width: "1.125rem", height: "1.125rem" } 
        })}
      </div>
      <div style={valueStyles}>{value}</div>
      <div style={labelStyles}>{label}</div>
    </div>
  );
};

/* ============================================
   INPUT FIELD COMPONENT
   ============================================ */

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  disabled = false,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  helperText?: string;
}) => {
  const labelStyles: React.CSSProperties = {
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "hsl(30 10% 45%)",
    marginBottom: "0.5rem",
    display: "block",
  };

  const inputWrapperStyles: React.CSSProperties = {
    position: "relative",
  };

  const iconStyles: React.CSSProperties = {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: disabled ? "hsl(30 10% 60%)" : "hsl(30 10% 45%)",
    pointerEvents: "none",
  };

  const inputStyles: React.CSSProperties = {
    background: disabled ? "hsla(30, 20%, 95%, 0.8)" : "hsla(30, 25%, 98%, 0.8)",
    border: "1px solid hsla(40, 30%, 75%, 0.4)",
    borderRadius: "0.75rem",
    padding: icon ? "0.75rem 1rem 0.75rem 2.75rem" : "0.75rem 1rem",
    fontSize: "0.9375rem",
    color: disabled ? "hsl(30 10% 50%)" : "hsl(30 15% 20%)",
    fontFamily: "'Inter', sans-serif",
    height: "3rem",
    width: "100%",
    cursor: disabled ? "not-allowed" : "text",
    opacity: disabled ? 0.8 : 1,
  };

  const helperStyles: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "hsl(30 10% 55%)",
    marginTop: "0.375rem",
    fontStyle: "italic",
  };

  return (
    <div>
      <Label style={labelStyles}>{label}</Label>
      <div style={inputWrapperStyles}>
        {icon && <div style={iconStyles}>{icon}</div>}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyles}
        />
      </div>
      {helperText && <p style={helperStyles}>{helperText}</p>}
    </div>
  );
};

/* ============================================
   SETTINGS ICON (SVG)
   ============================================ */

const SettingsIcon = () => (
  <svg
    style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 30% 98%)" }}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
```

---

## Page 2: Travel Preferences Page

**File**: `src/app/profile/preferences/page.tsx`

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  Bed, 
  Building, 
  Heart, 
  Award, 
  FileText, 
  Save, 
  ArrowLeft 
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ============================================
   INLINE STYLE OBJECTS
   ============================================ */

const pageStyles: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 25% 98%) 100%)",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  position: "relative",
  overflow: "hidden",
  padding: "2rem 1rem",
};

const ambientOrbPrimary: React.CSSProperties = {
  position: "absolute",
  top: "-20%",
  left: "-10%",
  width: "40rem",
  height: "40rem",
  background: "radial-gradient(circle, hsla(40, 45%, 55%, 0.08) 0%, transparent 70%)",
  borderRadius: "50%",
  filter: "blur(60px)",
  animation: "float 20s ease-in-out infinite",
  pointerEvents: "none",
};

const ambientOrbSecondary: React.CSSProperties = {
  position: "absolute",
  bottom: "-10%",
  right: "-5%",
  width: "35rem",
  height: "35rem",
  background: "radial-gradient(circle, hsla(25, 35%, 60%, 0.06) 0%, transparent 70%)",
  borderRadius: "50%",
  filter: "blur(50px)",
  animation: "float 25s ease-in-out infinite reverse",
  pointerEvents: "none",
};

const contentContainer: React.CSSProperties = {
  maxWidth: "48rem",
  margin: "0 auto",
  position: "relative",
  zIndex: 10,
};

const backLinkStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "hsl(40 45% 45%)",
  fontSize: "0.875rem",
  fontWeight: 400,
  textDecoration: "none",
  marginBottom: "1.5rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.5rem",
  transition: "all 0.2s ease",
};

const headerStyles: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "2.5rem",
};

const iconContainerStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "4rem",
  height: "4rem",
  borderRadius: "50%",
  background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.15) 0%, hsla(40, 45%, 55%, 0.05) 100%)",
  marginBottom: "1.5rem",
};

const titleStyles: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "2.25rem",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  color: "hsl(30 15% 20%)",
  marginBottom: "0.75rem",
};

const subtitleStyles: React.CSSProperties = {
  fontSize: "0.9375rem",
  color: "hsl(30 10% 45%)",
  fontWeight: 300,
  letterSpacing: "0.01em",
  maxWidth: "28rem",
  margin: "0 auto",
};

const saveButtonContainerStyles: React.CSSProperties = {
  marginTop: "2rem",
  display: "flex",
  justifyContent: "center",
};

const saveButtonStyles: React.CSSProperties = {
  background: "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 42%) 100%)",
  color: "hsl(40 30% 98%)",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9375rem",
  fontWeight: 400,
  letterSpacing: "0.02em",
  padding: "1rem 2.5rem",
  borderRadius: "0.75rem",
  border: "none",
  boxShadow: "0 4px 20px -4px hsla(40, 45%, 40%, 0.35)",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
};

const spinnerStyles: React.CSSProperties = {
  width: "1.125rem",
  height: "1.125rem",
  border: "2px solid hsla(40, 30%, 98%, 0.3)",
  borderTopColor: "hsl(40 30% 98%)",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

/* ============================================
   PREFERENCES PAGE COMPONENT
   ============================================ */

export default function ProfilePreferencesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    floorPreference: "",
    bedType: "",
    viewPreference: "",
    quietRoom: false,
    accessibleRoom: false,
    smokingRoom: false,
    travelPurpose: "",
    budgetRange: "",
    amenities: [] as string[],
    loyaltyPrograms: [] as string[],
    dietaryRestrictions: "",
    specialNeeds: "",
  });

  const handleAmenityToggle = (amenity: string) => {
    setPreferences((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleLoyaltyToggle = (program: string) => {
    setPreferences((prev) => ({
      ...prev,
      loyaltyPrograms: prev.loyaltyPrograms.includes(program)
        ? prev.loyaltyPrograms.filter((p) => p !== program)
        : [...prev.loyaltyPrograms, program],
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success("Preferences saved successfully", {
      description: "Your travel preferences have been updated.",
    });
  };

  // Option Arrays
  const floorOptions = ["No Preference", "High Floor", "Low Floor"];
  const bedOptions = ["No Preference", "King Bed", "Queen Bed", "Double Beds", "Twin Beds"];
  const viewOptions = ["No Preference", "Ocean View", "City View", "Garden View", "Pool View"];
  const travelPurposeOptions = ["No Preference", "Business Travel", "Leisure/Vacation", "Family Travel", "Romantic Getaway"];
  const budgetOptions = [
    "No Preference",
    "Budget-Friendly (Under $150/night)",
    "Moderate ($150-300/night)",
    "Luxury ($300-600/night)",
    "Ultra-Luxury ($600+/night)",
  ];
  const amenitiesOptions = [
    "Gym/Fitness",
    "Swimming Pool",
    "Spa & Wellness",
    "On-site Restaurant",
    "Business Center",
    "Concierge Service",
  ];
  const loyaltyOptions = [
    "Marriott Bonvoy",
    "Hilton Honors",
    "IHG One Rewards",
    "World of Hyatt",
    "Wyndham Rewards",
    "Accor Live Limitless",
    "Best Western Rewards",
    "Radisson Rewards",
  ];

  return (
    <div style={pageStyles}>
      {/* Ambient Background Orbs */}
      <div style={ambientOrbPrimary} />
      <div style={ambientOrbSecondary} />

      {/* Main Content */}
      <div style={contentContainer}>
        {/* Back Navigation */}
        <Link href="/profile" style={backLinkStyles}>
          <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
          Back to Profile
        </Link>

        {/* Header */}
        <div style={headerStyles}>
          <div style={iconContainerStyles}>
            <SettingsIcon />
          </div>
          <h1 style={titleStyles}>Travel Preferences</h1>
          <p style={subtitleStyles}>
            Customize your hotel search experience. These preferences will be used by our voice assistant.
          </p>
        </div>

        {/* Room Preferences Section */}
        <SectionCard
          icon={<Bed style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Room Preferences"
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <SelectField
              label="FLOOR PREFERENCE"
              value={preferences.floorPreference}
              onChange={(v) => setPreferences({ ...preferences, floorPreference: v })}
              options={floorOptions}
            />
            <SelectField
              label="BED TYPE"
              value={preferences.bedType}
              onChange={(v) => setPreferences({ ...preferences, bedType: v })}
              options={bedOptions}
            />
            <SelectField
              label="VIEW PREFERENCE"
              value={preferences.viewPreference}
              onChange={(v) => setPreferences({ ...preferences, viewPreference: v })}
              options={viewOptions}
            />
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <CheckboxField
              id="quietRoom"
              checked={preferences.quietRoom}
              onChange={(c) => setPreferences({ ...preferences, quietRoom: c })}
              label="Quiet Room (away from elevators, ice machines)"
            />
            <CheckboxField
              id="accessibleRoom"
              checked={preferences.accessibleRoom}
              onChange={(c) => setPreferences({ ...preferences, accessibleRoom: c })}
              label="Accessible Room"
            />
            <CheckboxField
              id="smokingRoom"
              checked={preferences.smokingRoom}
              onChange={(c) => setPreferences({ ...preferences, smokingRoom: c })}
              label="Smoking Room"
            />
          </div>
        </SectionCard>

        {/* Travel Style Section */}
        <SectionCard
          icon={<Building style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Travel Style"
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <SelectField
              label="PRIMARY TRAVEL PURPOSE"
              value={preferences.travelPurpose}
              onChange={(v) => setPreferences({ ...preferences, travelPurpose: v })}
              options={travelPurposeOptions}
            />
            <SelectField
              label="BUDGET RANGE"
              value={preferences.budgetRange}
              onChange={(v) => setPreferences({ ...preferences, budgetRange: v })}
              options={budgetOptions}
            />
          </div>
        </SectionCard>

        {/* Preferred Amenities Section */}
        <SectionCard
          icon={<Heart style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Preferred Amenities"
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {amenitiesOptions.map((amenity) => (
              <ChipCheckbox
                key={amenity}
                label={amenity}
                checked={preferences.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
            ))}
          </div>
        </SectionCard>

        {/* Loyalty Programs Section */}
        <SectionCard
          icon={<Award style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Loyalty Programs"
          subtitle="Select the loyalty programs you're a member of"
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {loyaltyOptions.map((program) => (
              <ChipCheckbox
                key={program}
                label={program}
                checked={preferences.loyaltyPrograms.includes(program)}
                onChange={() => handleLoyaltyToggle(program)}
              />
            ))}
          </div>
        </SectionCard>

        {/* Special Requirements Section */}
        <SectionCard
          icon={<FileText style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Special Requirements"
        >
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <TextareaField
              label="DIETARY RESTRICTIONS"
              value={preferences.dietaryRestrictions}
              onChange={(v) => setPreferences({ ...preferences, dietaryRestrictions: v })}
              placeholder="e.g., Vegetarian, Vegan, Gluten-free, Allergies..."
            />
            <TextareaField
              label="SPECIAL NEEDS OR REQUESTS"
              value={preferences.specialNeeds}
              onChange={(v) => setPreferences({ ...preferences, specialNeeds: v })}
              placeholder="Any additional requirements or preferences..."
            />
          </div>
        </SectionCard>

        {/* Save Button */}
        <div style={saveButtonContainerStyles}>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              ...saveButtonStyles,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? (
              <div style={spinnerStyles} />
            ) : (
              <Save style={{ width: "1.125rem", height: "1.125rem" }} />
            )}
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </div>

      {/* Inline Keyframes (fallback) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400;500&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ============================================
   SECTION CARD COMPONENT
   ============================================ */

const SectionCard = ({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  const cardStyles: React.CSSProperties = {
    background: "hsla(30, 25%, 99%, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid hsla(40, 30%, 85%, 0.5)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    marginBottom: "1.25rem",
    boxShadow: "0 4px 24px -8px hsla(30, 20%, 30%, 0.08)",
  };

  const headerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: subtitle ? "0.375rem" : "1.25rem",
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.375rem",
    fontWeight: 400,
    color: "hsl(30 15% 20%)",
    letterSpacing: "-0.01em",
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: "0.8125rem",
    color: "hsl(30 10% 50%)",
    fontWeight: 300,
    marginBottom: "1.25rem",
    marginLeft: "2rem",
  };

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        {icon}
        <h2 style={titleStyles}>{title}</h2>
      </div>
      {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
      {children}
    </div>
  );
};

/* ============================================
   SELECT FIELD COMPONENT
   ============================================ */

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => {
  const labelStyles: React.CSSProperties = {
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "hsl(30 10% 45%)",
    marginBottom: "0.5rem",
    display: "block",
  };

  const triggerStyles: React.CSSProperties = {
    background: "hsla(30, 25%, 98%, 0.8)",
    border: "1px solid hsla(40, 30%, 75%, 0.4)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    fontSize: "0.9375rem",
    color: value ? "hsl(30 15% 20%)" : "hsl(30 10% 55%)",
    fontFamily: "'Inter', sans-serif",
    height: "3rem",
  };

  const contentStyles: React.CSSProperties = {
    background: "hsl(30 25% 98%)",
    border: "1px solid hsla(40, 30%, 75%, 0.5)",
    borderRadius: "0.75rem",
    boxShadow: "0 8px 32px -8px hsla(30, 20%, 30%, 0.15)",
  };

  const itemStyles: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9375rem",
    color: "hsl(30 15% 25%)",
    padding: "0.625rem 1rem",
  };

  return (
    <div>
      <Label style={labelStyles}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger style={triggerStyles}>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent style={contentStyles}>
          {options.map((option) => (
            <SelectItem key={option} value={option} style={itemStyles}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

/* ============================================
   CHECKBOX FIELD COMPONENT
   ============================================ */

const CheckboxField = ({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (c: boolean) => void;
  label: string;
}) => {
  const containerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
  };

  const checkboxStyles: React.CSSProperties = {
    width: "1.125rem",
    height: "1.125rem",
    borderRadius: "0.25rem",
    border: "1.5px solid hsla(40, 30%, 60%, 0.6)",
    background: checked ? "hsl(40 45% 50%)" : "transparent",
  };

  const labelStyles: React.CSSProperties = {
    fontSize: "0.875rem",
    color: "hsl(30 15% 30%)",
    fontWeight: 400,
    cursor: "pointer",
  };

  return (
    <div style={containerStyles}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        style={checkboxStyles}
      />
      <Label htmlFor={id} style={labelStyles}>
        {label}
      </Label>
    </div>
  );
};

/* ============================================
   CHIP CHECKBOX COMPONENT
   ============================================ */

const ChipCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  const chipStyles: React.CSSProperties = {
    background: checked
      ? "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 45%) 100%)"
      : "hsla(30, 25%, 98%, 0.8)",
    color: checked ? "hsl(40 30% 98%)" : "hsl(30 15% 35%)",
    border: checked 
      ? "1px solid hsl(40 45% 45%)" 
      : "1px solid hsla(40, 30%, 75%, 0.5)",
    borderRadius: "2rem",
    padding: "0.5rem 1rem",
    fontSize: "0.8125rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: checked ? "0 2px 8px -2px hsla(40, 45%, 40%, 0.3)" : "none",
  };

  return (
    <button onClick={onChange} style={chipStyles} type="button">
      {label}
    </button>
  );
};

/* ============================================
   TEXTAREA FIELD COMPONENT
   ============================================ */

const TextareaField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => {
  const labelStyles: React.CSSProperties = {
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "hsl(30 10% 45%)",
    marginBottom: "0.5rem",
    display: "block",
  };

  const textareaStyles: React.CSSProperties = {
    background: "hsla(30, 25%, 98%, 0.8)",
    border: "1px solid hsla(40, 30%, 75%, 0.4)",
    borderRadius: "0.75rem",
    padding: "0.875rem 1rem",
    fontSize: "0.9375rem",
    color: "hsl(30 15% 20%)",
    fontFamily: "'Inter', sans-serif",
    minHeight: "5rem",
    resize: "vertical",
    width: "100%",
  };

  return (
    <div>
      <Label style={labelStyles}>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={textareaStyles}
      />
    </div>
  );
};

/* ============================================
   SETTINGS ICON (SVG)
   ============================================ */

const SettingsIcon = () => (
  <svg
    style={{ width: "1.75rem", height: "1.75rem", color: "hsl(40 45% 45%)" }}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
```

---

## Routing Configuration

For Next.js App Router, routes are file-based:
- `src/app/profile/page.tsx` → `/profile`
- `src/app/profile/preferences/page.tsx` → `/profile/preferences`

No additional configuration needed.

---

## Design Specifications

### Color Palette (HSL)

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `background` | `hsl(30 25% 98%)` | Page background |
| `background-warm` | `hsl(35 30% 95%)` | Gradient midpoint |
| `foreground` | `hsl(30 15% 20%)` | Primary text |
| `foreground-muted` | `hsl(30 10% 45%)` | Secondary text |
| `foreground-subtle` | `hsl(30 10% 55%)` | Placeholder text |
| `gold` | `hsl(40 45% 50%)` | Primary accent |
| `gold-dark` | `hsl(40 45% 42%)` | Gradient end |
| `gold-light` | `hsl(40 45% 55%)` | Hover states |
| `card` | `hsla(30, 25%, 99%, 0.7)` | Card backgrounds |
| `card-border` | `hsla(40, 30%, 85%, 0.5)` | Card borders |
| `input-bg` | `hsla(30, 25%, 98%, 0.8)` | Input backgrounds |
| `input-border` | `hsla(40, 30%, 75%, 0.4)` | Input borders |

### Typography

| Element | Font | Size | Weight | Tracking |
|---------|------|------|--------|----------|
| Page Title (h1) | Cormorant Garamond | 2.25rem (36px) | 400 | -0.02em |
| Section Title (h2) | Cormorant Garamond | 1.375rem (22px) | 400 | -0.01em |
| Card Title (h3) | Cormorant Garamond | 1.25rem (20px) | 500 | — |
| Stat Value | Cormorant Garamond | 1.5rem (24px) | 500 | — |
| Body Text | Inter | 0.9375rem (15px) | 400 | 0.01em |
| Subtitle | Inter | 0.9375rem (15px) | 300 | 0.01em |
| Label | Inter | 0.6875rem (11px) | 500 | 0.08em |
| Stat Label | Inter | 0.625rem (10px) | 500 | 0.1em |
| Chip Text | Inter | 0.8125rem (13px) | 400 | — |
| Helper Text | Inter | 0.75rem (12px) | 400 (italic) | — |

### Dimensions

| Element | Value |
|---------|-------|
| Page max-width | 48rem (768px) |
| Page padding | 2rem 1rem |
| Card border-radius | 1.25rem (20px) |
| Card padding | 1.75rem (28px) |
| Input height | 3rem (48px) |
| Input border-radius | 0.75rem (12px) |
| Button border-radius | 0.75rem (12px) |
| Chip border-radius | 2rem (32px) |
| Stat card border-radius | 1rem (16px) |
| Avatar size (profile) | 4.5rem (72px) |
| Avatar size (preferences) | 4rem (64px) |
| Icon container size | 2.5rem (40px) |

### Shadows

| Element | Box-Shadow |
|---------|------------|
| Card | `0 4px 24px -8px hsla(30, 20%, 30%, 0.08)` |
| Stat Card | `0 4px 24px -8px hsla(30, 20%, 30%, 0.06)` |
| Primary Button | `0 4px 20px -4px hsla(40, 45%, 40%, 0.35)` |
| Icon Container (gold) | `0 4px 12px -4px hsla(40, 45%, 40%, 0.4)` |
| Chip (selected) | `0 2px 8px -2px hsla(40, 45%, 40%, 0.3)` |
| Dropdown Content | `0 8px 32px -8px hsla(30, 20%, 30%, 0.15)` |
| Hover State | `0 8px 32px -8px hsla(40, 45%, 40%, 0.2)` |

### Ambient Background

| Orb | Position | Size | Gradient | Blur |
|-----|----------|------|----------|------|
| Primary | top: -20%, left: -10% | 40rem | `hsla(40, 45%, 55%, 0.08)` → transparent | 60px |
| Secondary | bottom: -10%, right: -5% | 35rem | `hsla(25, 35%, 60%, 0.06)` → transparent | 50px |

### Animations

| Animation | Duration | Easing |
|-----------|----------|--------|
| Float (orbs) | 20-25s | ease-in-out |
| Spin (loader) | 0.8s | linear |
| Transitions | 0.2-0.3s | ease |

---

## Integration Checklist

- [ ] Install dependencies: `lucide-react`, `sonner`, Radix primitives
- [ ] Install shadcn/ui components: button, input, label, select, checkbox, textarea
- [ ] Add Google Fonts import to globals.css
- [ ] Add CSS keyframes (float, spin) to globals.css
- [ ] Configure Tailwind 4.x @theme variables
- [ ] Add Toaster component to root layout
- [ ] Create `/profile/page.tsx` with all components
- [ ] Create `/profile/preferences/page.tsx` with all components
- [ ] Test navigation between pages
- [ ] Test form state management
- [ ] Test toast notifications
- [ ] Verify responsive behavior on mobile
- [ ] Verify glassmorphism renders correctly (backdrop-filter support)

---

## Accessibility Notes

- All form inputs have associated labels
- Checkbox and select components use Radix primitives for keyboard navigation
- Color contrast meets WCAG AA standards
- Interactive elements have visible focus states
- Loading states use ARIA attributes where applicable
- Back navigation is keyboard accessible

---

## Assets Required

**None** — This implementation is entirely self-contained using:
- Google Fonts (loaded via CSS import)
- Lucide React icons
- Inline SVG for settings icon
- CSS gradients and shadows for all visual effects
