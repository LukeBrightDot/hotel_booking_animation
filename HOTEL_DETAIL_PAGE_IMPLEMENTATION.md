# Hotel Detail Page - Complete Implementation Guide

This document provides precise specifications for implementing the luxury hotel detail page. All measurements, colors, and component structures are included for exact replication.

---

## Tech Stack Requirements

- **Framework**: React 18+ (works with Next.js App Router or Pages Router)
- **Styling**: Inline React.CSSProperties (for maximum portability) or Tailwind CSS
- **Icons**: `lucide-react` (install: `npm install lucide-react`)
- **Routing**: `react-router-dom` or Next.js `useRouter`
- **Fonts**: Google Fonts - Cormorant Garamond + Inter

---

## Design System - Color Palette (HSL)

All colors use HSL format for consistency.

### Primary Colors
```
Background:           hsl(30 25% 98%)      // Warm off-white
Foreground (dark):    hsl(30 20% 15%)      // Deep warm charcoal
Foreground (medium):  hsl(30 15% 45%)      // Muted warm gray
Foreground (light):   hsl(30 15% 55%)      // Light warm gray
```

### Accent Colors
```
Primary (coral/rose):     hsl(15 55% 70%)      // Primary buttons, accents
Primary (hover):          hsl(15 55% 65%)      // Hover state
Gold (stars/luxury):      hsl(42 65% 50%)      // Star ratings, luxury badge
Gold (light):             hsl(42 40% 85%)      // Gold borders
Green (positive):         hsl(160 45% 40%)     // Free cancellation, policies
Green (text):             hsl(160 45% 35%)     // Green text
```

### Surface Colors
```
Card background:          hsl(30 20% 96% / 0.5)   // Semi-transparent warm
Card background (hover):  hsl(30 20% 96% / 0.8)   // More opaque on hover
Border:                   hsl(30 15% 88% / 0.5)   // Subtle warm border
Border (hover):           hsl(15 55% 70% / 0.3)   // Coral tint on hover
Dark overlay:             hsl(30 20% 6% / 0.6)    // Image overlays
```

---

## Typography

### Font Imports (add to HTML head or CSS)
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400&display=swap" rel="stylesheet">
```

### Font Families
```
Serif (headings):  'Cormorant Garamond', Georgia, serif
Sans (body/UI):    'Inter', system-ui, sans-serif
```

### Text Styles

| Element | Font Family | Size | Weight | Tracking | Transform |
|---------|-------------|------|--------|----------|-----------|
| H1 (Hotel Name) | Serif | 2.5rem (40px) | 300 | normal | none |
| H2 (Section Title) | Serif | 1.75rem (28px) | 300 | normal | none |
| H3 (Card Title) | Serif | 1.25rem (20px) | 400 | normal | none |
| Body | Sans | 0.9375rem (15px) | 400 | normal | none |
| Small text | Sans | 0.875rem (14px) | 400 | normal | none |
| Label (uppercase) | Sans | 0.75rem (12px) | 200 | 0.1em | uppercase |
| Micro label | Sans | 0.7rem (11px) | 200 | 0.1em | uppercase |
| Price (large) | Serif | 2rem (32px) | 400 | normal | none |
| Price (medium) | Serif | 1.5rem (24px) | 400 | normal | none |

---

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ FIXED HEADER (z-index: 50)                                  │
│ height: auto, padding: 1rem 1.5rem                          │
│ background: hsl(30 25% 98% / 0.8) + blur(8px)               │
├─────────────────────────────────────────────────────────────┤
│ MAIN CONTENT (padding-top: 4.5rem)                          │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ IMAGE GALLERY SECTION                                   │ │
│ │ max-width: 80rem, margin: 0 auto, padding: 0 1.5rem     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────┬───────────────┐ │
│ │ LEFT COLUMN (flex: 1)                   │ RIGHT COLUMN  │ │
│ │                                         │ width: 360px  │ │
│ │ • Chain Name + Luxury Badge             │ sticky        │ │
│ │ • Hotel Name (H1)                       │ top: 5.5rem   │ │
│ │ • Star Rating                           │               │ │
│ │ • Location                              │ BOOKING       │ │
│ │ • Description Card                      │ SUMMARY       │ │
│ │ • Luxury Programs Card                  │ CARD          │ │
│ │ • Amenities Card                        │               │ │
│ └─────────────────────────────────────────┴───────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ROOMS SECTION                                           │ │
│ │ grid: repeat(auto-fill, minmax(350px, 1fr))             │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Types (TypeScript)

```typescript
interface HotelAddress {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface HotelAmenity {
  code: string;
  description: string;
}

interface RoomType {
  roomType: string;
  description: string;
  currencyCode: string;
  rateCount: number;
  amountBeforeTax: number;
  amountAfterTax: number;
  bedType: string;
  maxOccupancy: number;
  guarantee: string;
  cancellation: string;
}

interface Hotel {
  hotelName: string;
  chainName?: string;
  starRating: number;
  description: string;
  address: HotelAddress;
  distance?: number;
  thumbnail?: string;
  images?: string[];
  amenities: HotelAmenity[];
  roomTypes: RoomType[];
  luxuryPrograms?: string[];
  isLuxury?: boolean;
}
```

---

## Component 1: Fixed Header

### Specifications
- **Position**: fixed, top: 0, left: 0, right: 0
- **Z-index**: 50
- **Padding**: 1rem 1.5rem (16px 24px)
- **Background**: hsl(30 25% 98% / 0.8)
- **Backdrop-filter**: blur(8px)
- **Layout**: flex, justify-content: space-between, align-items: center

### Elements

#### Back Button (left)
```css
display: flex;
align-items: center;
gap: 0.5rem;
padding: 0.5rem 1rem;
background: transparent;
border: none;
border-radius: 0.5rem;
color: hsl(30 15% 25%);
font-size: 0.875rem;
cursor: pointer;
```
- **Hover**: background: hsl(30 20% 92%)
- **Icon**: ArrowLeft (lucide-react), 1rem × 1rem
- **Text**: "Back to results"

#### Action Buttons (right)
```css
padding: 0.5rem;
background: transparent;
border: none;
border-radius: 0.5rem;
color: hsl(30 15% 45%);
cursor: pointer;
```
- **Icons**: Share2, Heart (lucide-react), 1.25rem × 1.25rem
- **Gap between buttons**: 0.5rem

---

## Component 2: Image Gallery

### Main Container
```css
display: grid;
grid-template-columns: 2fr 1fr;
gap: 0.5rem;
height: 28rem; /* 448px */
```

### Main Image (left, 2fr)
```css
position: relative;
border-radius: 1rem 0 0 1rem;
overflow: hidden;
cursor: pointer;
```

#### Image
```css
width: 100%;
height: 100%;
object-fit: cover;
```

#### Gradient Overlay
```css
position: absolute;
inset: 0;
background: linear-gradient(to top, hsl(30 20% 6% / 0.4), transparent 40%);
```

#### "View all photos" Button
```css
position: absolute;
bottom: 1rem;
right: 1rem;
padding: 0.5rem 1rem;
background: hsl(30 20% 6% / 0.6);
backdrop-filter: blur(8px);
border: 1px solid hsl(30 25% 98% / 0.2);
border-radius: 0.5rem;
color: hsl(30 25% 98%);
font-size: 0.875rem;
display: flex;
align-items: center;
gap: 0.5rem;
```
- **Icon**: Expand (lucide-react), 1rem × 1rem

### Side Thumbnails (right, 1fr)
```css
display: flex;
flex-direction: column;
gap: 0.5rem;
```

#### Individual Thumbnail
```css
flex: 1;
position: relative;
overflow: hidden;
cursor: pointer;
opacity: 0.8; /* 1 if active */
transition: opacity 300ms;
```
- **Border radius**: First: `0 1rem 0 0`, Last: `0 0 1rem 0`, Middle: `0`

#### "+N more" Overlay (on last thumbnail if > 4 images)
```css
position: absolute;
inset: 0;
background: hsl(30 20% 6% / 0.6);
display: flex;
align-items: center;
justify-content: center;
color: hsl(30 25% 98%);
font-size: 1.125rem;
font-weight: 300;
```

### Fullscreen Modal
```css
position: fixed;
inset: 0;
z-index: 100;
background: hsl(30 20% 6% / 0.95);
display: flex;
align-items: center;
justify-content: center;
```

#### Close Button
```css
position: absolute;
top: 1.5rem;
right: 1.5rem;
padding: 0.75rem;
background: hsl(30 25% 98% / 0.1);
border: none;
border-radius: 9999px;
color: hsl(30 25% 98%);
```
- **Icon**: X, 1.5rem × 1.5rem

#### Nav Buttons (Prev/Next)
```css
position: absolute;
left: 1.5rem; /* or right for next */
padding: 1rem;
background: hsl(30 25% 98% / 0.1);
border: none;
border-radius: 9999px;
color: hsl(30 25% 98%);
```
- **Icons**: ChevronLeft, ChevronRight, 1.5rem × 1.5rem

#### Fullscreen Image
```css
max-width: 85vw;
max-height: 85vh;
object-fit: contain;
border-radius: 0.5rem;
```

#### Bottom Thumbnails Strip
```css
position: absolute;
bottom: 1.5rem;
display: flex;
gap: 0.5rem;
padding: 0.75rem;
background: hsl(30 20% 6% / 0.6);
backdrop-filter: blur(8px);
border-radius: 0.75rem;
```

#### Each Thumbnail in Strip
```css
width: 4rem;
height: 3rem;
border-radius: 0.375rem;
overflow: hidden;
cursor: pointer;
border: 2px solid transparent; /* hsl(15 55% 70%) if active */
opacity: 0.6; /* 1 if active */
transition: all 200ms;
```

---

## Component 3: Hotel Info Section

### Container
```css
padding: 2rem 1.5rem;
max-width: 80rem;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr 360px;
gap: 2rem;
```

### Left Column
```css
display: flex;
flex-direction: column;
gap: 2rem;
```

---

## Component 3a: Hotel Header (inside left column)

### Chain Name + Luxury Badge Row
```css
display: flex;
align-items: center;
gap: 1rem;
margin-bottom: 0.75rem;
```

#### Chain Name
```css
font-family: 'Inter', system-ui, sans-serif;
font-weight: 200;
letter-spacing: 0.1em;
text-transform: uppercase;
font-size: 0.75rem;
color: hsl(30 15% 45%);
```

#### Luxury Badge (conditional: only if isLuxury === true)
```css
display: flex;
align-items: center;
gap: 0.375rem;
padding: 0.25rem 0.625rem;
background: linear-gradient(135deg, hsl(42 65% 50%), hsl(35 50% 55%));
border-radius: 9999px;
font-size: 0.7rem;
font-weight: 500;
color: hsl(30 25% 98%);
text-transform: uppercase;
letter-spacing: 0.05em;
```
- **Icon**: Crown, 0.75rem × 0.75rem

### Hotel Name (H1)
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 2.5rem;
font-weight: 300;
color: hsl(30 20% 15%);
margin-bottom: 0.75rem;
```

### Star Rating Row
```css
display: flex;
align-items: center;
gap: 1rem;
margin-bottom: 1rem;
```

#### Stars Container
```css
display: flex;
gap: 0.125rem;
```

#### Each Star Icon
```css
width: 1rem;
height: 1rem;
fill: hsl(42 65% 50%); /* or transparent if not filled */
color: hsl(42 65% 50%); /* or hsl(30 15% 80%) if not filled */
```
- **Icon**: Star (lucide-react)

#### Star Text
```css
font-size: 0.875rem;
color: hsl(30 15% 45%);
```
- **Format**: "{N}-Star Hotel"

### Location Row
```css
display: flex;
align-items: flex-start;
gap: 0.5rem;
color: hsl(30 15% 45%);
```

#### MapPin Icon
```css
width: 1rem;
height: 1rem;
margin-top: 0.125rem;
flex-shrink: 0;
```

#### Address Text
```css
font-size: 0.875rem;
margin-bottom: 0.25rem;
```

#### Distance Text (conditional)
```css
font-size: 0.75rem;
color: hsl(30 15% 55%);
```
- **Format**: "{N} miles from search location"

---

## Component 3b: Description Card

```css
padding: 1.5rem;
background: hsl(30 20% 96% / 0.5);
border-radius: 1rem;
border: 1px solid hsl(30 15% 88% / 0.5);
```

### Title (H2)
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 1.25rem;
font-weight: 400;
color: hsl(30 20% 15%);
margin-bottom: 1rem;
```

### Description Text
```css
font-size: 0.9375rem;
color: hsl(30 15% 35%);
line-height: 1.8;
```

---

## Component 3c: Luxury Programs Card (conditional)

Only render if `luxuryPrograms` array exists and has items.

```css
padding: 1.5rem;
background: linear-gradient(135deg, hsl(42 30% 96%), hsl(30 20% 96%));
border-radius: 1rem;
border: 1px solid hsl(42 40% 85%);
```

### Header Row
```css
display: flex;
align-items: center;
gap: 0.5rem;
margin-bottom: 1rem;
```

#### Award Icon
```css
width: 1.25rem;
height: 1.25rem;
color: hsl(42 65% 45%);
```

#### Title (H3)
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 1.125rem;
font-weight: 400;
color: hsl(30 20% 15%);
```

### Programs Container
```css
display: flex;
flex-wrap: wrap;
gap: 0.5rem;
```

### Each Program Chip
```css
padding: 0.375rem 0.875rem;
background: hsl(30 25% 98%);
border: 1px solid hsl(42 40% 80%);
border-radius: 9999px;
font-size: 0.8125rem;
color: hsl(30 20% 25%);
```

---

## Component 3d: Amenities Card

```css
background: hsl(30 20% 96% / 0.5);
backdrop-filter: blur(8px);
border: 1px solid hsl(30 15% 88% / 0.5);
border-radius: 1rem;
padding: 1.5rem;
```

### Title (H3)
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 1.25rem;
font-weight: 400;
color: hsl(30 20% 15%);
margin-bottom: 1.25rem;
```

### Amenities Grid
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 1rem;
```
- **Max items shown**: 12

### Each Amenity Item
```css
display: flex;
align-items: center;
gap: 0.75rem;
padding: 0.75rem;
background: hsl(30 25% 98% / 0.5);
border-radius: 0.5rem;
transition: all 200ms;
```
- **Hover**: background: hsl(30 25% 98%)

#### Icon Container
```css
width: 2.5rem;
height: 2.5rem;
border-radius: 0.5rem;
background: hsl(15 55% 70% / 0.1);
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
```

#### Icon
```css
width: 1.25rem;
height: 1.25rem;
color: hsl(15 55% 65%);
```

#### Description Text
```css
font-size: 0.875rem;
color: hsl(30 15% 25%);
line-height: 1.4;
```

### Icon Mapping Logic
Map amenity descriptions to icons:
- wifi/internet → Wifi
- parking/valet → Car
- pool/swim → Waves
- gym/fitness → Dumbbell
- restaurant/dining → Utensils
- breakfast/coffee → Coffee
- spa/wellness → Sparkles
- airport/shuttle → Plane
- safe/security → Shield
- concierge/service → Heart
- air/conditioning → Wind
- tv/entertainment → Tv
- bath/jacuzzi → Bath
- pet → PawPrint
- child/family → Baby
- business/meeting → Briefcase
- default → Sparkles

### "+N more" Button (if > 12 amenities)
```css
margin-top: 1rem;
padding: 0.5rem 1rem;
background: transparent;
border: 1px solid hsl(30 15% 88%);
border-radius: 0.5rem;
color: hsl(30 15% 45%);
font-size: 0.875rem;
cursor: pointer;
```
- **Hover**: border-color: hsl(15 55% 70%), color: hsl(15 55% 70%)

---

## Component 4: Booking Summary Card (right column)

### Container
```css
position: sticky;
top: 5.5rem;
align-self: start;
```

### Card
```css
background: hsl(30 20% 96% / 0.8);
backdrop-filter: blur(8px);
border: 1px solid hsl(30 15% 88%);
border-radius: 1rem;
padding: 1.5rem;
box-shadow: 0 4px 20px hsl(30 15% 15% / 0.05);
```

### Price + Rating Row
```css
display: flex;
align-items: baseline;
justify-content: space-between;
margin-bottom: 1.25rem;
padding-bottom: 1.25rem;
border-bottom: 1px solid hsl(30 15% 88% / 0.5);
```

#### "Starting from" Label
```css
font-family: 'Inter', system-ui, sans-serif;
font-weight: 200;
letter-spacing: 0.1em;
text-transform: uppercase;
font-size: 0.7rem;
color: hsl(30 15% 45%);
display: block;
margin-bottom: 0.25rem;
```

#### Price
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 2rem;
color: hsl(30 20% 15%);
```

#### "/ night" suffix
```css
font-size: 0.875rem;
color: hsl(30 15% 45%);
```

#### Rating Badge
```css
display: flex;
align-items: center;
gap: 0.25rem;
padding: 0.25rem 0.5rem;
background: hsl(42 65% 50% / 0.1);
border-radius: 0.375rem;
```

#### Star Icon in Badge
```css
width: 0.875rem;
height: 0.875rem;
fill: hsl(42 65% 50%);
color: hsl(42 65% 50%);
```

#### Rating Number
```css
font-size: 0.875rem;
font-weight: 500;
color: hsl(42 50% 35%);
```

### Info Text
```css
font-size: 0.875rem;
color: hsl(30 15% 45%);
margin-bottom: 1.25rem;
line-height: 1.5;
```
- **Format**: "{N} room type(s) available. Select a room below to continue your booking."

### CTA Button
```css
width: 100%;
padding: 1rem;
background: hsl(15 55% 70%);
border: none;
border-radius: 0.75rem;
color: hsl(30 25% 98%);
font-size: 1rem;
font-weight: 400;
cursor: pointer;
transition: all 200ms;
```
- **Hover**:
  - background: hsl(15 55% 65%)
  - transform: translateY(-2px)
  - box-shadow: 0 8px 24px hsl(15 55% 70% / 0.3)
- **Text**: "View Available Rooms"
- **onClick**: Smooth scroll to rooms section

---

## Component 5: Room Cards Section

### Section Container
```css
padding: 2rem 1.5rem 4rem;
max-width: 80rem;
margin: 0 auto;
```
- **id**: "rooms-section" (for scroll targeting)

### Section Title (H2)
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 1.75rem;
font-weight: 300;
color: hsl(30 20% 15%);
margin-bottom: 1.5rem;
```

### Cards Grid
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
gap: 1.5rem;
```

---

## Component 5a: Room Card

### Container
```css
background: hsl(30 20% 96% / 0.5);
backdrop-filter: blur(8px);
border: 1px solid hsl(30 15% 88% / 0.5);
border-radius: 1rem;
padding: 1.5rem;
display: flex;
flex-direction: column;
gap: 1rem;
transition: all 300ms ease;
animation: fadeRise 0.6s ease-out forwards;
animation-delay: {index * 100}ms;
opacity: 0; /* initial, animated to 1 */
```
- **Hover**:
  - background: hsl(30 20% 96% / 0.8)
  - border-color: hsl(15 55% 70% / 0.3)
  - box-shadow: 0 0 40px hsl(15 55% 70% / 0.1)

### Room Type Name (H3)
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 1.25rem;
font-weight: 400;
color: hsl(30 20% 15%);
margin-bottom: 0.5rem;
```

### Room Description
```css
font-size: 0.875rem;
color: hsl(30 15% 45%);
line-height: 1.6;
```

### Features Row
```css
display: flex;
flex-wrap: wrap;
gap: 1rem;
```

#### Feature Item
```css
display: flex;
align-items: center;
gap: 0.5rem;
```

#### Feature Icon
```css
width: 1rem;
height: 1rem;
color: hsl(30 15% 45%);
```
- **Icons**: Bed (for bedType), Users (for maxOccupancy)

#### Feature Text
```css
font-size: 0.875rem;
color: hsl(30 15% 45%);
```

### Policies Row
```css
display: flex;
flex-wrap: wrap;
gap: 0.75rem;
```

#### Policy Badge (guarantee)
```css
display: flex;
align-items: center;
gap: 0.375rem;
padding: 0.375rem 0.75rem;
background: hsl(160 45% 40% / 0.1);
border-radius: 9999px;
font-size: 0.75rem;
color: hsl(160 45% 35%);
```
- **Icon**: Shield, 0.875rem × 0.875rem

#### Policy Badge (cancellation)
Same as above, but:
- If cancellation includes "free": green styling (hsl(160...))
- Otherwise: neutral styling:
  - background: hsl(30 20% 92% / 0.5)
  - color: hsl(30 15% 45%)
- **Icon**: X, 0.875rem × 0.875rem

### Footer (Price + CTA)
```css
display: flex;
align-items: flex-end;
justify-content: space-between;
padding-top: 1rem;
border-top: 1px solid hsl(30 15% 88% / 0.3);
margin-top: auto;
```

#### Rates Label
```css
font-family: 'Inter', system-ui, sans-serif;
font-weight: 200;
letter-spacing: 0.1em;
text-transform: uppercase;
font-size: 0.7rem;
color: hsl(30 15% 45%);
display: block;
margin-bottom: 0.25rem;
```
- **Format**: "{N} rate(s) available"

#### Price
```css
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: 1.5rem;
color: hsl(30 20% 15%);
```

#### "/ night" suffix
```css
font-size: 0.75rem;
color: hsl(30 15% 45%);
```

#### "Before tax" Price (conditional: if different from after tax)
```css
font-size: 0.75rem;
color: hsl(30 15% 55%);
```

#### Select Room Button
```css
padding: 0.75rem 1.5rem;
background: hsl(15 55% 70%);
border: none;
border-radius: 0.5rem;
color: hsl(30 25% 98%);
font-size: 0.875rem;
font-weight: 400;
cursor: pointer;
transition: all 200ms;
```
- **Hover**:
  - background: hsl(15 55% 65%)
  - transform: translateY(-1px)

---

## Required Animation Keyframes

Add to your CSS:

```css
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
```

---

## Responsive Considerations

For mobile (< 768px), consider:
1. Image gallery: single column, main image only with swipe
2. Grid layout: single column (1fr)
3. Booking summary: move to bottom or make it a fixed bottom bar
4. Room cards grid: single column

---

## File Structure

```
src/
├── types/
│   └── hotel.ts                 // TypeScript interfaces
├── components/
│   └── hotel/
│       ├── index.ts             // Exports
│       ├── HotelImageGallery.tsx
│       ├── HotelAmenities.tsx
│       └── RoomCard.tsx
└── pages/
    └── HotelDetail.tsx          // Main page component
```

---

## Implementation Checklist

- [ ] Install dependencies: `lucide-react`
- [ ] Add Google Fonts to document head
- [ ] Create TypeScript interfaces
- [ ] Create HotelImageGallery component with fullscreen modal
- [ ] Create HotelAmenities component with icon mapping
- [ ] Create RoomCard component with policies and pricing
- [ ] Create HotelDetail page with all sections
- [ ] Add fadeRise keyframe animation
- [ ] Add route: `/hotel/:hotelId`
- [ ] Connect to real data source
- [ ] Test hover states and transitions
- [ ] Test fullscreen gallery navigation
- [ ] Test smooth scroll to rooms section
- [ ] Add responsive styles for mobile

---

## Price Formatting Helper

```typescript
const formatPrice = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};
```

---

## Notes

1. All colors use HSL format with space syntax: `hsl(30 25% 98%)` not `hsl(30, 25%, 98%)`
2. For Tailwind projects, convert inline styles to utility classes
3. Backdrop-filter requires `-webkit-` prefix for Safari: `WebkitBackdropFilter`
4. Star ratings should show 5 stars total, filled based on `starRating` value
5. The booking summary uses `position: sticky` - ensure parent has proper height
