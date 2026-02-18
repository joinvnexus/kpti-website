# 🎨 KPTI Website - UI/UX Design System & Guidelines

## 📋 Table of Contents
1. [Color Palette & Brand Identity](#color-palette--brand-identity)
2. [Responsive Design System](#responsive-design-system)
3. [Interactive Elements & Animations](#interactive-elements--animations)
4. [Global CSS Architecture](#global-css-architecture)
5. [Toggle Mode Implementation](#toggle-mode-implementation)
6. [Typography & Spacing](#typography--spacing)
7. [Component Guidelines](#component-guidelines)
8. [User Experience Principles](#user-experience-principles)

---

## 🎨 Color Palette & Brand Identity

### Primary Color Scheme: Blue (Trust, Education, Technology)
**Purpose:** Primary actions, headers, CTAs, brand elements

- **Light Mode:** `#5BA3E8` (HSL: 217° 91% 60%)
- **Dark Mode:** `#5BA3E8` (HSL: 219° 83% 58%)
- **Foreground:** White `#FFFFFF` (Light) / Dark Slate `#1A1E2B` (Dark)

```css
/* Usage in Tailwind */
bg-primary
text-primary
border-primary
```

### Secondary Color: Teal (Modern, Clear, Professional)
**Purpose:** Secondary actions, highlights, supporting elements

- **Light Mode:** `#40D4C8` (HSL: 180° 70% 50%)
- **Dark Mode:** `#43E7DC` (HSL: 182° 76% 53%)
- **Foreground:** Dark Slate `#1A1E2B`

```css
bg-secondary
text-secondary-foreground
hover:bg-secondary/80
```

### Accent Color: Green (Growth, Success, Achievement)
**Purpose:** Success messages, badges, positive feedback

- **Light Mode:** `#4FBF81` (HSL: 148° 68% 45%)
- **Dark Mode:** `#5CD99A` (HSL: 151° 80% 50%)
- **Foreground:** White (Light) / Dark (Dark)

```css
bg-accent
text-accent-foreground
badge-success
```

### Supporting Colors

| Color | Light Mode | Dark Mode | Purpose |
|-------|-----------|-----------|---------|
| **Destructive** | `#E63946` (0° 84% 60%) | `#E63946` | Errors, Warnings, Dangerous Actions |
| **Warning** | `#F59E0B` (44° 97% 56%) | `#F59E0B` | Alerts, Important Info |
| **Info** | `#0EA5E9` (200° 98% 51%) | `#06B6D4` | Information, Help Text |
| **Muted** | `#F5F5F7` (220° 14% 96%) | `#2D2F39` | Secondary Text, Disabled States |

---

## 📱 Responsive Design System

### Breakpoints (Tailwind Standard)
```
sm: 640px   - Small phones
md: 768px   - Tablets & larger phones
lg: 1024px  - Desktops
xl: 1280px  - Large desktops
2xl: 1536px - Extra large screens
```

### Mobile-First Approach

#### 1. **Mobile Layout (< 640px)**
- Single column layout
- Full-width components with 16px padding
- Touch-friendly buttons (min 48px height)
- Stacked navigation in sidebar/drawer
- Font sizes increased by 2-4px for readability
- Simplified hero sections

```tsx
// Example: Mobile-first Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6 lg:p-8">
  {/* Content */}
</div>
```

#### 2. **Tablet Layout (640px - 1024px)**
- Two column layouts where appropriate
- Increased spacing (24px - 32px)
- Hero section with moderate height
- Card-based layouts for content

#### 3. **Desktop Layout (1024px+)**
- Multi-column layouts
- Enhanced spacing & breathing room
- Sidebar navigation fully visible
- Optimized for mouse interactions

#### 4. **Large Desktop (1536px+)**
- Maximum content width (1200px - 1400px)
- Center content with max-w-7xl
- Enhanced whitespace

### Container & Spacing Grid
```typescript
/* Global spacing scale */
- xs: 4px
- sm: 8px
- base: 16px
- md: 24px
- lg: 32px
- xl: 48px
- 2xl: 64px
- 3xl: 80px

/* Usage */
p-4    /* 16px padding */
gap-6  /* 24px gap */
mb-8   /* 32px bottom margin */
```

---

## ✨ Interactive Elements & Animations

### Button Interactions

#### Primary Button
```tsx
<button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200">
  Enroll Now
</button>
```

**States:**
- **Default:** Primary color with smooth shadow
- **Hover:** 90% opacity with lift effect
- **Active:** Scale down (95%) for tactile feedback
- **Disabled:** 50% opacity, cursor-not-allowed

#### Secondary Button
```tsx
<button className="border-2 border-secondary text-secondary hover:bg-secondary/10 transition-all">
  Learn More
</button>
```

### Hover Effects
- **Cards:** `hover:shadow-lg hover:-translate-y-1 transition-all`
- **Links:** `hover:text-primary underline-offset-2`
- **Icons:** `hover:scale-110 transition-transform`

### Loading States
```tsx
// Skeleton loading
<div className="animate-pulse h-6 bg-muted rounded w-full" />

// Spinner
<div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
```

### Transitions & Delays
```css
/* Global transitions */
transition-all duration-200   /* Fast interactions */
transition-all duration-300   /* Standard animations */
transition-all duration-500   /* Slower transitions */

/* Specific properties */
transition-colors duration-200
transition-transform duration-300
transition-opacity duration-200
```

### Page Transitions
```tsx
// Use framer-motion or next.js transitions
- Fade in on page load
- Slide in from left/right for route changes
- Scale animations for modals
```

---

## 🎯 Global CSS Architecture

### CSS Layer Structure

```css
/* app/globals.css */

/* 1. RESET & VARIABLES */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. COLOR VARIABLES (Light & Dark) */
@layer base {
  :root {
    /* Primary, Secondary, Accent colors */
    /* Semantic colors (background, foreground, border) */
    /* Chart colors for data visualization */
  }
  
  .dark {
    /* Dark mode color overrides */
  }
}

/* 3. GLOBAL COMPONENTS */
@layer components {
  .btn-primary { @apply px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all; }
  .btn-secondary { @apply px-4 py-2 rounded-lg border-2 border-secondary hover:bg-secondary/10; }
  .card-base { @apply bg-card text-card-foreground rounded-lg shadow-sm p-6; }
  .input-base { @apply bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all; }
}

/* 4. CUSTOM UTILITIES */
@layer utilities {
  .scrollbar-hide { scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
}
```

### File Organization
```
app/
├── globals.css              /* Base styles, colors, utilities */
├── layout.tsx               /* Root layout with theme provider */
└── (routes)/
    └── layout.tsx           /* Route-specific styles if needed */

components/
├── providers/
│   └── ThemeProvider.tsx    /* next-themes setup */
├── ui/
│   ├── button.tsx           /* Shadcn button component */
│   ├── card.tsx             /* Shadcn card component */
│   └── ...                  /* Other shadcn components */
└── home/
    ├── HeroContent.tsx      /* Hero specific styles */
    └── ...
```

---

## 🌓 Toggle Mode Implementation

### Light/Dark Mode Architecture

#### 1. **Theme Provider Setup** (Already Configured)
```tsx
// components/providers/ThemeProvider.tsx
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

#### 2. **Theme Toggle Component**
```tsx
// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}
```

#### 3. **Color Transition Strategy**
```css
/* Smooth color transitions on mode switch */
@layer utilities {
  * {
    @apply transition-colors duration-300;
  }
  
  /* Exception: Transitions on interactive elements */
  button, a, input {
    @apply transition-all duration-200;
  }
}
```

#### 4. **Light Mode Colors**
```css
:root {
  --primary: 217 91% 60%;        /* Blue */
  --secondary: 180 70% 50%;      /* Teal */
  --accent: 148 68% 45%;         /* Green */
  --background: 0 0% 100%;       /* White */
  --foreground: 217 32% 17%;     /* Dark Slate */
  --card: 0 0% 100%;             /* White */
  --muted: 220 14% 96%;          /* Light Gray */
  --border: 220 14% 90%;         /* Light Border */
}
```

#### 5. **Dark Mode Colors**
```css
.dark {
  --primary: 219 83% 58%;        /* Bright Blue */
  --secondary: 182 76% 53%;      /* Bright Teal */
  --accent: 151 80% 50%;         /* Bright Green */
  --background: 217 39% 11%;     /* Deep Navy */
  --foreground: 210 40% 98%;     /* Off White */
  --card: 217 32% 17%;           /* Dark Card */
  --muted: 217 32% 26%;          /* Muted Dark */
  --border: 217 32% 26%;         /* Dark Border */
}
```

#### 6. **System Preference Detection**
```tsx
// Respects OS theme preference if user hasn't set preference
<ThemeProvider 
  attribute="class" 
  defaultTheme="light" 
  enableSystem={true}              /* Respects OS preference */
  storageKey="kpti-theme"
>
  {children}
</ThemeProvider>
```

---

## 📝 Typography & Spacing

### Font Stack
```css
/* Primary Font: Inter (System Font Fallback) */
font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif;

/* Monospace: JetBrains Mono */
font-mono: "JetBrains Mono", Courier New, monospace;
```

### Type Scale
```
Display:  text-4xl md:text-5xl lg:text-6xl (Bold)
Heading1: text-3xl md:text-4xl (Bold)
Heading2: text-2xl md:text-3xl (Bold)
Heading3: text-xl md:text-2xl (Semibold)
Heading4: text-lg md:text-xl (Semibold)
Body:     text-base (Regular) - 16px
Small:    text-sm (Regular) - 14px
Caption:  text-xs (Regular) - 12px
```

### Line Height & Letter Spacing
```css
h1, h2: leading-tight (1.2)
h3, h4: leading-snug (1.375)
body:   leading-relaxed (1.625)
code:   tracking-tight letter-spacing reduces readability
```

### Spacing Scale
```
Layout sections:     gap-12 md:gap-16 lg:gap-20
Component sections:  gap-6 md:gap-8
Component internals: gap-4
Dense components:    gap-2
Padding:             p-4 md:p-6 lg:p-8
```

---

## 🧩 Component Guidelines

### Card Component
```tsx
<div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
  {/* Content */}
</div>

/* Variants */
- elevated:    shadow-md/lg with subtle border
- outlined:    border-2 border-primary with no shadow
- filled:      bg-muted with no border
```

### Input Components
```tsx
<input 
  className="
    w-full
    bg-input
    border border-border
    rounded-lg
    px-4 py-2
    text-base
    placeholder:text-muted-foreground
    focus:outline-none
    focus:ring-2
    focus:ring-primary
    focus:border-transparent
    disabled:opacity-50
    disabled:cursor-not-allowed
    transition-all duration-200
  "
/>
```

### Button Component Variants
```tsx
/* Primary */
bg-primary text-primary-foreground hover:bg-primary/90

/* Secondary */
border-2 border-secondary hover:bg-secondary/10

/* Outline */
border-2 border-border hover:bg-muted

/* Ghost */
hover:bg-muted text-foreground

/* Destructive */
bg-destructive text-destructive-foreground hover:bg-destructive/90
```

### Navigation Components
```tsx
/* Active Link */
text-primary border-b-2 border-primary

/* Inactive Link */
text-muted-foreground hover:text-foreground

/* Mobile Menu */
Fixed sidebar with overlay
Touch-friendly spacing
Clear hierarchy
```

---

## 💡 User Experience Principles

### 1. **Accessibility (a11y)**
- ✅ Minimum contrast ratio: 4.5:1 for text
- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation support
- ✅ Screen reader friendly (ARIA labels)
- ✅ Focus indicators visible (ring styles)
- ✅ Form labels properly associated

```tsx
<button 
  aria-label="Toggle navigation menu"
  className="focus:ring-2 focus:ring-primary"
>
  Menu
</button>
```

### 2. **Performance**
- ✅ Lazy load images (LCP optimization)
- ✅ Code splitting by route
- ✅ Memoized components
- ✅ Optimize bundle size
- ✅ Use next/image for automatic optimization

```tsx
import Image from "next/image";

<Image 
  src="/course.jpg"
  alt="Course image"
  width={400}
  height={300}
  loading="lazy"
/>
```

### 3. **User Feedback**
- ✅ Loading states for async operations
- ✅ Success messages after form submission
- ✅ Error states with helpful messages
- ✅ Form validation feedback
- ✅ Empty states with helpful guidance

```tsx
{isLoading && <LoadingSpinner />}
{isSuccess && <SuccessAlert message="Changes saved!" />}
{error && <ErrorAlert message={error.message} />}
```

### 4. **Mobile-First Considerations**
- ✅ Thumb-friendly button placement (bottom 48px area)
- ✅ Adequate touch targets (48px minimum)
- ✅ Swipe gestures for navigation
- ✅ Simplified forms (3-4 fields per screen)
- ✅ Fast-loading pages (< 3 seconds)

### 5. **Consistency & Hierarchy**
- ✅ Consistent button styles across app
- ✅ Card designs consistent
- ✅ Icon usage standardized (Lucide icons)
- ✅ Color usage semantic (success = green, error = red)
- ✅ Visual hierarchy clear (size, color, weight)

### 6. **Brand Alignment (Educational Institution)**
- ✅ Professional, trustworthy appearance
- ✅ Blue primary color (trust, education)
- ✅ Green accent (growth, success)
- ✅ Clean, minimal design
- ✅ Clear call-to-actions for admissions

---

## 🎬 Implementation Checklist

### Phase 1: Core Setup (Already Done ✅)
- [x] Tailwind CSS configuration
- [x] Color variables in globals.css
- [x] Theme provider with next-themes
- [x] Light/dark mode toggle

### Phase 2: Component Library
- [ ] Standardize all button variants
- [ ] Create input component wrapper
- [ ] Build card component variants
- [ ] Create modal/dialog components
- [ ] Build form components with validation

### Phase 3: Page-Level Design
- [ ] Apply responsive design to all pages
- [ ] Add animations/transitions
- [ ] Implement loading states
- [ ] Add error boundaries
- [ ] Create empty states

### Phase 4: Refinement
- [ ] Test accessibility (a11y audit)
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] User testing & feedback

### Phase 5: Polish
- [ ] Micro-interactions refinement
- [ ] Animation polish
- [ ] Brand asset integration
- [ ] OG image optimization
- [ ] SEO meta tags

---

## 📊 Design System Tokens

### Shadow System
```css
shadow-none:  box-shadow: none;
shadow-sm:    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
shadow-md:    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
shadow-lg:    box-shadow: 0 10px 15px rgba(0,0,0,0.15);
shadow-xl:    box-shadow: 0 20px 25px rgba(0,0,0,0.2);
```

### Radius System
```css
rounded-none:  border-radius: 0;
rounded-sm:    border-radius: 0.25rem;  /* 4px */
rounded-base:  border-radius: 0.5rem;   /* 8px */
rounded-md:    border-radius: 0.75rem;  /* 12px */
rounded-lg:    border-radius: 1rem;     /* 16px */
rounded-xl:    border-radius: 1.5rem;   /* 24px */
rounded-full:  border-radius: 9999px;
```

### Opacity Levels
```css
Primary hover state:     opacity-90   (10% fade)
Disabled state:          opacity-50   (50% fade)
Subtle text:             opacity-75   (25% fade)
Ghost/muted:             opacity-60   (40% fade)
```

---

## 🔗 Resources & Tools

### Design Tools
- Figma: Component library
- Color Picker: https://www.colourhexa.com/
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- a11y Audit: https://wave.webaim.org/

### Documentation
- Tailwind CSS: https://tailwindcss.com/
- Shadcn/ui: https://ui.shadcn.com/
- Next.js: https://nextjs.org/
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/

### Fonts
- Inter (System): Already included
- JetBrains Mono: Code display

---

## 📞 Support & Questions

For UI/UX questions or design decisions, refer to:
1. This document for system guidelines
2. Existing component implementations in `/components`
3. Tailwind documentation for utility alternatives
4. Shadcn/ui for pre-built component patterns

---

**Last Updated:** February 18, 2026  
**Version:** 1.0 - Complete Design System
