# Voice Assistant UI - Integration Checklist

Use this checklist to verify each step of the integration is working correctly.

## Pre-Flight Checks

### 1. ✅ Google Fonts Loaded

**Check:** Open browser DevTools → Network tab → filter by "fonts.googleapis"

**Expected:** You should see requests to:
- `Cormorant+Garamond` (serif font for headings/transcripts)
- `Inter` (sans-serif font for body text)

**If Missing:** Add this to your `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

### 2. ✅ CSS Variables Defined

**Check:** Open browser DevTools → Elements → select `<html>` → Computed styles → filter "background"

**Expected:** `--background` should resolve to `hsl(30 20% 6%)` (very dark brown)

**Quick Test:** Add this temporary element to your page:
```html
<div style="background: hsl(var(--background)); color: hsl(var(--foreground)); padding: 20px;">
  If you can read this on a dark brown background, CSS variables work!
</div>
```

**If Not Working:** Either:
1. Import `VOICE_ASSISTANT_STYLES.css` in your main entry file
2. OR add the CSS variables to your `index.css` `:root` block

---

### 3. ✅ Tailwind Config Updated

**Check:** Inspect any element using `bg-background` class

**Expected:** The element should have `background-color: hsl(var(--background))`

**If Not Working:** Your `tailwind.config.ts` needs the color extensions. Add to `theme.extend.colors`:
```ts
background: "hsl(var(--background))",
foreground: "hsl(var(--foreground))",
primary: {
  DEFAULT: "hsl(var(--primary))",
  foreground: "hsl(var(--primary-foreground))",
},
// ... etc
```

---

### 4. ✅ Fonts Rendering Correctly

**Visual Check:**
- Headings should appear in an elegant serif font (Cormorant Garamond)
- Body text should appear in a clean sans-serif (Inter)

**Test Element:**
```html
<h1 class="font-serif text-4xl">This should be elegant serif</h1>
<p class="font-sans">This should be clean sans-serif</p>
```

**If Both Look the Same:** Tailwind's `fontFamily` config is missing:
```ts
// tailwind.config.ts
fontFamily: {
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
},
```

---

### 5. ✅ Dark Background Rendering

**Visual Check:** The page background should be nearly black with a warm brown tint

**Expected Color:** `hsl(30 20% 6%)` = #12100e (very dark brown)

**If White/Light:** CSS variables aren't being applied. Import `VOICE_ASSISTANT_STYLES.css`

---

### 6. ✅ Animations Working

**Test:** Add an element with animation class:
```html
<div class="animate-float bg-primary w-16 h-16 rounded-full"></div>
```

**Expected:** Element should gently float up and down

**If Static:** Animation keyframes aren't loaded. Import `VOICE_ASSISTANT_STYLES.css`

---

### 7. ✅ Gold Accent Color

**Test:** Add an element with gold styling:
```html
<div class="bg-gold text-background p-4 rounded">Gold accent test</div>
```

**Expected:** Warm gold background (#c29a60 / hsl(38 65% 50%))

**If Gray/Default:** The `--gold` variable isn't defined

---

## Component-Specific Checks

### ParticleVisualization

**What to Look For:**
- Canvas element should be visible
- Particles should be warm gold/cream colors
- Particles should move and pulse
- Central glow effect visible

**If Invisible:** Check console for canvas errors

---

### AnimatedTranscript

**What to Look For:**
- Text appears word by word
- Font is elegant serif (Cormorant Garamond)
- Text is cream/off-white colored
- Smooth fade-in animation per word

**If Plain Text:** Animation keyframes missing

---

### FloatingLocations

**What to Look For:**
- Location names orbit around center
- Fade in/out smoothly
- Have glassmorphic background

**If Static:** Animation loop not running (check console)

---

### ResortCard

**What to Look For:**
- Dark card background
- Subtle border
- Hover effect lifts card
- Gold accent on price/rating

**If Flat/Unstyled:** CSS variables not applied

---

## Quick Diagnostic Commands

Paste these in browser console to diagnose issues:

```javascript
// Check if CSS variables are defined
console.log('Background:', getComputedStyle(document.documentElement).getPropertyValue('--background'));
console.log('Primary:', getComputedStyle(document.documentElement).getPropertyValue('--primary'));
console.log('Gold:', getComputedStyle(document.documentElement).getPropertyValue('--gold'));

// Check if fonts are loaded
document.fonts.ready.then(() => {
  console.log('Fonts loaded:', [...document.fonts].map(f => f.family));
});
```

---

## Troubleshooting Decision Tree

```
Page looks unstyled (white background, default fonts)
├── CSS variables missing?
│   └── Import VOICE_ASSISTANT_STYLES.css
├── Tailwind not processing custom colors?
│   └── Update tailwind.config.ts with color extensions
└── index.css not imported?
    └── Check main.tsx imports index.css first

Fonts look wrong (all same font)
├── Google Fonts not loading?
│   └── Add <link> to index.html
└── Tailwind fontFamily not configured?
    └── Add fontFamily to tailwind.config.ts

Animations not working
├── Keyframes not defined?
│   └── Import VOICE_ASSISTANT_STYLES.css
└── Animation classes not in Tailwind?
    └── Add animation extensions to tailwind.config.ts

Colors look wrong (gray instead of gold)
├── CSS variables using wrong format?
│   └── Must be HSL without hsl() wrapper: "38 65% 50%"
└── Tailwind not using hsl() wrapper?
    └── Colors must be: "hsl(var(--gold))"
```

---

## Nuclear Option: Full Reset

If nothing works, try the standalone CSS approach:

1. Delete any conflicting CSS variable definitions
2. Import `VOICE_ASSISTANT_STYLES.css` as the LAST import in `main.tsx`
3. Remove custom color classes from tailwind.config.ts
4. Use the utility classes from `VOICE_ASSISTANT_STYLES.css` directly

This bypasses Tailwind entirely for the voice assistant styling.
