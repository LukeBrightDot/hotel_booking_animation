# Luxury Authentication Page Implementation Guide

Complete implementation guide for the luxury-styled Login/Signup page designed for **Next.js 16 (App Router)**, **Tailwind CSS 4.x**, and **React 19**.

---

## Overview

This authentication page features:
- **Dual-mode form**: Toggle between Login and Signup flows
- **Glassmorphic card design**: Frosted glass effect with backdrop blur
- **Ambient background**: Floating orbs with gentle animations
- **Toast notifications**: Form validation feedback
- **Luxury typography**: Cormorant Garamond (serif) + Inter (sans-serif)
- **Gold accent theming**: Warm champagne/cream palette

---

## Required Dependencies

```bash
npm install lucide-react sonner
```

**Icons used from lucide-react:**
- `Eye`, `EyeOff`, `Mail`, `Lock`, `User`, `ArrowRight`, `Sparkles`

---

## File Structure

```
src/
├── app/
│   ├── auth/
│   │   └── page.tsx          # Auth page component
│   └── globals.css           # CSS variables + keyframes
├── components/
│   └── ui/
│       ├── button.tsx        # shadcn button (or custom)
│       ├── input.tsx         # shadcn input (or custom)
│       ├── label.tsx         # shadcn label (or custom)
│       └── toaster.tsx       # Toast provider
└── hooks/
    └── use-toast.ts          # Toast hook (shadcn)
```

---

## Step 1: Add Google Fonts

In your `src/app/layout.tsx` or `globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400&display=swap');
```

---

## Step 2: Add CSS Variables & Keyframes

Add to `src/app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400&display=swap');

/* ============================================
   LUXURY THEME VARIABLES
   ============================================ */

:root {
  /* Background & Foreground */
  --background: 30 25% 98%;
  --foreground: 30 15% 15%;
  
  /* Card */
  --card: 30 20% 96%;
  --card-foreground: 30 15% 15%;
  
  /* Primary (Muted Rose/Champagne) */
  --primary: 15 45% 65%;
  --primary-foreground: 30 25% 98%;
  
  /* Secondary (Soft Cream) */
  --secondary: 35 30% 92%;
  --secondary-foreground: 30 15% 25%;
  
  /* Muted */
  --muted: 30 15% 90%;
  --muted-foreground: 30 10% 50%;
  
  /* Accent (Warm Champagne) */
  --accent: 35 50% 75%;
  --accent-foreground: 30 15% 15%;
  
  /* Gold Accent */
  --gold: 40 45% 55%;
  --gold-muted: 40 30% 75%;
  
  /* Border & Input */
  --border: 30 20% 88%;
  --input: 30 20% 88%;
  --ring: 15 45% 65%;
  
  /* Typography */
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  
  /* Shadows */
  --shadow-glow: 0 0 60px hsl(15 45% 65% / 0.15);
  --shadow-soft: 0 4px 20px hsl(30 15% 15% / 0.05);
}

/* ============================================
   BASE STYLES
   ============================================ */

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
}

/* ============================================
   UTILITY CLASSES
   ============================================ */

.text-luxury {
  font-family: var(--font-serif);
  font-weight: 300;
  letter-spacing: 0.025em;
}

.text-elegant {
  font-family: var(--font-sans);
  font-weight: 200;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

/* ============================================
   KEYFRAME ANIMATIONS
   ============================================ */

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-8px) translateX(3px);
  }
  50% {
    transform: translateY(-4px) translateX(-2px);
  }
  75% {
    transform: translateY(-10px) translateX(1px);
  }
}

@keyframes floatDelayed {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-8px) translateX(3px);
  }
  50% {
    transform: translateY(-4px) translateX(-2px);
  }
  75% {
    transform: translateY(-10px) translateX(1px);
  }
}

@keyframes pulseSoft {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

@keyframes fadeRise {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

/* Animation Classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatDelayed 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-pulse-soft {
  animation: pulseSoft 4s ease-in-out infinite;
}

.animate-fade-rise {
  animation: fadeRise 0.8s ease-out forwards;
}

.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
}
```

---

## Step 3: Create the Auth Page Component

Create `src/app/auth/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      toast.error("Email Required", {
        description: "Please enter your email address.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password Too Short", {
        description: "Password must be at least 6 characters.",
      });
      return false;
    }

    if (mode === "signup") {
      if (!formData.name.trim()) {
        toast.error("Name Required", {
          description: "Please enter your full name.",
        });
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords Don't Match", {
          description: "Please ensure both passwords are identical.",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call - Replace with actual auth logic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mode === "login") {
      toast.success("Welcome Back", {
        description: "You have successfully signed in.",
      });
    } else {
      toast.success("Account Created", {
        description: "Your account has been created successfully.",
      });
    }

    setIsLoading(false);
    router.push("/");
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  /* ============================================
     INLINE STYLE OBJECTS
     ============================================ */
  
  // Page background gradient
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 20% 96%) 100%)",
  };

  // Floating orb styles
  const orb1Style: React.CSSProperties = {
    position: "absolute",
    top: "15%",
    left: "10%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, hsl(40 45% 55% / 0.08) 0%, transparent 70%)",
    filter: "blur(40px)",
  };

  const orb2Style: React.CSSProperties = {
    position: "absolute",
    bottom: "20%",
    right: "15%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, hsl(15 45% 65% / 0.06) 0%, transparent 70%)",
    filter: "blur(50px)",
  };

  const orb3Style: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, hsl(35 50% 75% / 0.04) 0%, transparent 60%)",
    filter: "blur(60px)",
  };

  // Card container
  const cardStyle: React.CSSProperties = {
    background: "hsl(30 25% 98% / 0.85)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid hsl(30 20% 88% / 0.6)",
    boxShadow: "0 25px 80px hsl(30 15% 15% / 0.08), 0 10px 30px hsl(30 15% 15% / 0.04)",
    borderRadius: "1rem",
    padding: "2.5rem",
  };

  // Icon container
  const iconContainerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, hsl(40 45% 55% / 0.15) 0%, hsl(35 50% 75% / 0.1) 100%)",
    border: "1px solid hsl(40 45% 55% / 0.2)",
  };

  // Input field style
  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "48px",
    paddingLeft: "40px",
    paddingRight: "12px",
    fontSize: "0.95rem",
    background: "hsl(30 20% 96%)",
    color: "hsl(30 15% 15%)",
    border: "none",
    borderRadius: "0.5rem",
    outline: "none",
  };

  // Submit button style
  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "48px",
    fontSize: "0.875rem",
    fontWeight: 300,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    border: "none",
    borderRadius: "0.5rem",
    cursor: isLoading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    background: isLoading
      ? "hsl(30 15% 90%)"
      : "linear-gradient(135deg, hsl(40 45% 55%) 0%, hsl(35 50% 60%) 100%)",
    color: isLoading ? "hsl(30 10% 50%)" : "hsl(30 25% 98%)",
    boxShadow: isLoading ? "none" : "0 8px 25px hsl(40 45% 55% / 0.25)",
  };

  // Spinner style
  const spinnerStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    border: "2px solid hsl(30 10% 50%)",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={pageStyle}>
      {/* Ambient Background Elements */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div className="animate-float" style={orb1Style} />
        <div className="animate-float-delayed" style={orb2Style} />
        <div className="animate-pulse-soft" style={orb3Style} />

        {/* Decorative particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-breathe"
            style={{
              position: "absolute",
              top: `${20 + i * 12}%`,
              left: `${5 + i * 15}%`,
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "hsl(40 45% 55% / 0.4)",
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div
        className="animate-fade-rise"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "28rem",
          margin: "0 1rem",
        }}
      >
        <div style={cardStyle}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={iconContainerStyle}>
              <Sparkles
                style={{ width: "24px", height: "24px", color: "hsl(40 45% 55%)" }}
              />
            </div>
            <h1
              className="text-luxury"
              style={{ fontSize: "1.875rem", marginBottom: "0.5rem", color: "hsl(30 15% 15%)" }}
            >
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-elegant" style={{ color: "hsl(30 10% 50%)" }}>
              {mode === "login"
                ? "Sign in to continue your journey"
                : "Begin your luxury experience"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Name Field (Signup only) */}
            {mode === "signup" && (
              <div className="animate-fade-rise" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label className="text-elegant" style={{ color: "hsl(30 15% 25%)" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <User
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px",
                      height: "16px",
                      color: "hsl(30 10% 50%)",
                    }}
                  />
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label className="text-elegant" style={{ color: "hsl(30 15% 25%)" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "16px",
                    height: "16px",
                    color: "hsl(30 10% 50%)",
                  }}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label className="text-elegant" style={{ color: "hsl(30 15% 25%)" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "16px",
                    height: "16px",
                    color: "hsl(30 10% 50%)",
                  }}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: "16px", height: "16px", color: "hsl(30 10% 50%)" }} />
                  ) : (
                    <Eye style={{ width: "16px", height: "16px", color: "hsl(30 10% 50%)" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup only) */}
            {mode === "signup" && (
              <div className="animate-fade-rise" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label className="text-elegant" style={{ color: "hsl(30 15% 25%)" }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px",
                      height: "16px",
                      color: "hsl(30 10% 50%)",
                    }}
                  />
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (Login only) */}
            {mode === "login" && (
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => {
                    toast.info("Password Reset", {
                      description: "Check your email for reset instructions.",
                    });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "0.75rem",
                    color: "hsl(40 45% 55%)",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} style={buttonStyle}>
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={spinnerStyle} />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "hsl(30 20% 88%)" }} />
            <span className="text-elegant" style={{ fontSize: "0.75rem", color: "hsl(30 10% 50%)" }}>
              or
            </span>
            <div style={{ flex: 1, height: "1px", background: "hsl(30 20% 88%)" }} />
          </div>

          {/* Toggle Mode */}
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "hsl(30 10% 50%)" }}>
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              style={{
                background: "none",
                border: "none",
                fontWeight: 500,
                color: "hsl(40 45% 55%)",
                cursor: "pointer",
              }}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p
          className="text-elegant"
          style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.75rem", color: "hsl(30 10% 60%)" }}
        >
          By continuing, you agree to our Terms of Service
        </p>
      </div>

      {/* Spinner keyframe (add to global CSS or style tag) */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

---

## Step 4: Add Toast Provider

Ensure you have a toast provider in your layout. Using **Sonner**:

```tsx
// src/app/layout.tsx
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: "hsl(30 25% 98%)",
              border: "1px solid hsl(30 20% 88%)",
              color: "hsl(30 15% 15%)",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
```

---

## Design Specifications

### Dimensions

| Element | Size |
|---------|------|
| Card max-width | `28rem` (448px) |
| Card padding | `2.5rem` (40px) |
| Card border-radius | `1rem` (16px) |
| Input height | `48px` |
| Input border-radius | `0.5rem` (8px) |
| Button height | `48px` |
| Icon container | `56px × 56px` |
| Field icons | `16px × 16px` |
| Header icon | `24px × 24px` |
| Particle dots | `4px × 4px` |

### Typography

| Element | Font | Weight | Size | Letter Spacing |
|---------|------|--------|------|----------------|
| Page title | Cormorant Garamond | 300 | `1.875rem` (30px) | `0.025em` |
| Subtitle | Inter | 200 | `0.75rem` (12px) | `0.1em` |
| Labels | Inter | 200 | `0.75rem` (12px) | `0.1em` |
| Input text | Inter | 400 | `0.95rem` (15px) | normal |
| Button text | Inter | 300 | `0.875rem` (14px) | `0.1em` |
| Body text | Inter | 400 | `0.875rem` (14px) | normal |

### Color Palette (HSL)

| Token | HSL Value | Usage |
|-------|-----------|-------|
| Background | `30 25% 98%` | Page background, card |
| Foreground | `30 15% 15%` | Primary text |
| Gold | `40 45% 55%` | Accent, buttons, links |
| Gold Muted | `40 30% 75%` | Secondary gold |
| Primary | `15 45% 65%` | Rose/champagne accent |
| Card | `30 20% 96%` | Input backgrounds |
| Muted | `30 10% 50%` | Secondary text |
| Border | `30 20% 88%` | Borders, dividers |

### Shadows

| Element | Box Shadow |
|---------|------------|
| Card | `0 25px 80px hsl(30 15% 15% / 0.08), 0 10px 30px hsl(30 15% 15% / 0.04)` |
| Button | `0 8px 25px hsl(40 45% 55% / 0.25)` |
| Glow | `0 0 60px hsl(15 45% 65% / 0.15)` |

### Animations

| Animation | Duration | Easing |
|-----------|----------|--------|
| Float | `6s` | ease-in-out, infinite |
| Pulse Soft | `4s` | ease-in-out, infinite |
| Fade Rise | `0.8s` | ease-out, forwards |
| Breathe | `4s` | ease-in-out, infinite |
| Spin (loader) | `1s` | linear, infinite |

---

## Background Elements

### Floating Orbs

Three gradient orbs create ambient depth:

1. **Orb 1** (Gold): 
   - Position: `top: 15%, left: 10%`
   - Size: `300px × 300px`
   - Gradient: `hsl(40 45% 55% / 0.08)` → transparent
   - Blur: `40px`

2. **Orb 2** (Rose):
   - Position: `bottom: 20%, right: 15%`
   - Size: `400px × 400px`
   - Gradient: `hsl(15 45% 65% / 0.06)` → transparent
   - Blur: `50px`

3. **Orb 3** (Champagne):
   - Position: centered
   - Size: `600px × 600px`
   - Gradient: `hsl(35 50% 75% / 0.04)` → transparent
   - Blur: `60px`

### Particle Dots

6 small dots distributed diagonally:
- Size: `4px × 4px`
- Color: `hsl(40 45% 55% / 0.4)`
- Animation: breathe with staggered delays

---

## Form Validation Rules

| Field | Validation |
|-------|------------|
| Email | Required, valid email format |
| Password | Required, minimum 6 characters |
| Name (signup) | Required, non-empty |
| Confirm Password (signup) | Must match password |

---

## Accessibility Considerations

1. All form inputs have associated labels
2. Password visibility toggle has button semantics
3. Form uses semantic HTML (`<form>`, `<label>`, `<button>`)
4. Color contrast meets WCAG AA standards
5. Focus states should be added for keyboard navigation

---

## Integration Checklist

- [ ] Install dependencies: `lucide-react`, `sonner`
- [ ] Add Google Fonts import
- [ ] Add CSS variables to globals.css
- [ ] Add keyframe animations to globals.css
- [ ] Create auth page component
- [ ] Add Toaster to layout
- [ ] Replace mock auth logic with actual implementation
- [ ] Add focus styles for accessibility
- [ ] Test responsive layout on mobile
