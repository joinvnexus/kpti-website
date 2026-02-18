# 🎯 UI/UX Implementation Guide - Code Examples

## Quick Reference: Component Usage

### 1️⃣ Buttons

#### Primary Button (CTAs, Main Actions)
```tsx
<button className="btn-primary">
  Enroll Now
</button>

// With Icon
<button className="btn-primary">
  <Check className="w-5 h-5" />
  Confirmed
</button>

// Loading State
<button className="btn-primary disabled:opacity-50">
  {isLoading ? (
    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
  ) : (
    "Submit"
  )}
</button>
```

#### Secondary Button (Alternative Actions)
```tsx
<button className="btn-secondary">
  Learn More
</button>
```

#### Outline Button (Tertiary Actions)
```tsx
<button className="btn-outline">
  Cancel
</button>
```

#### Ghost Button (Minimal Style)
```tsx
<button className="btn-ghost">
  View Details
</button>
```

#### Destructive Button (Delete, Logout)
```tsx
<button className="btn-destructive">
  Delete Account
</button>
```

#### Size Variants
```tsx
<button className="btn-primary btn-sm">Small</button>
<button className="btn-primary">Regular</button>
<button className="btn-primary btn-lg">Large</button>
```

---

### 2️⃣ Cards

#### Basic Card
```tsx
<div className="card-base">
  <h3 className="text-lg font-semibold mb-2">Course Title</h3>
  <p className="text-muted-foreground mb-4">Course description</p>
  <button className="btn-primary">Enroll</button>
</div>
```

#### Elevated Card (High Focus)
```tsx
<div className="card-elevated hover:-translate-y-1">
  <div className="aspect-video bg-muted rounded-lg mb-4" />
  <h3 className="text-lg font-semibold">Featured Course</h3>
  <p className="text-sm text-muted-foreground">Premium offering</p>
</div>
```

#### Outlined Card
```tsx
<div className="card-outlined">
  <div className="font-semibold text-primary">Special Offer</div>
  <p className="text-sm">20% discount on all courses</p>
</div>
```

#### Filled Card
```tsx
<div className="card-filled">
  <p className="text-sm text-muted-foreground">Background info section</p>
</div>
```

#### Card Grid Layout
```tsx
<div className="grid-responsive">
  {courses.map((course) => (
    <div key={course.id} className="card-base">
      {/* Content */}
    </div>
  ))}
</div>
```

---

### 3️⃣ Forms & Inputs

#### Text Input
```tsx
<div className="flex flex-col gap-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    placeholder="your@email.com"
    className="input-base"
  />
</div>
```

#### Textarea
```tsx
<div className="flex flex-col gap-2">
  <label htmlFor="message" className="text-sm font-medium">
    Message
  </label>
  <textarea
    id="message"
    placeholder="Your message..."
    rows={5}
    className="input-base"
  />
</div>
```

#### Input Sizes
```tsx
<input placeholder="Small" className="input-base input-sm" />
<input placeholder="Default" className="input-base" />
<input placeholder="Large" className="input-base input-lg" />
```

#### Input with Error
```tsx
<input
  type="email"
  className={`input-base ${error ? "border-destructive focus:ring-destructive" : ""}`}
  placeholder="Email"
/>
{error && <p className="text-xs text-destructive mt-1">{error}</p>}
```

#### Form Group
```tsx
<form className="space-y-6">
  <div className="flex flex-col gap-2">
    <label htmlFor="name" className="text-sm font-medium">
      Full Name *
    </label>
    <input
      id="name"
      type="text"
      className="input-base"
      required
    />
  </div>

  <div className="flex flex-col gap-2">
    <label htmlFor="email" className="text-sm font-medium">
      Email Address *
    </label>
    <input
      id="email"
      type="email"
      className="input-base"
      required
    />
  </div>

  <button type="submit" className="btn-primary w-full">
    Submit
  </button>
</form>
```

---

### 4️⃣ Badges

#### Badge Variants
```tsx
<span className="badge-primary">Premium</span>
<span className="badge-secondary">Featured</span>
<span className="badge-success">Active</span>
<span className="badge-destructive">Urgent</span>
<span className="badge-muted">Archived</span>
```

#### With Icon
```tsx
<span className="badge-primary flex items-center gap-1">
  <CheckCircle className="w-3 h-3" />
  Enrolled
</span>
```

---

### 5️⃣ Alerts

#### Alert Box Variants
```tsx
{/* Info Alert */}
<div className="alert-info">
  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="font-semibold">Information</h4>
    <p className="text-sm opacity-90">This is an informational message</p>
  </div>
</div>

{/* Success Alert */}
<div className="alert-success">
  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="font-semibold">Success</h4>
    <p className="text-sm opacity-90">Your submission was successful</p>
  </div>
</div>

{/* Warning Alert */}
<div className="alert-warning">
  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="font-semibold">Warning</h4>
    <p className="text-sm opacity-90">Please review before proceeding</p>
  </div>
</div>

{/* Error Alert */}
<div className="alert-error">
  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="font-semibold">Error</h4>
    <p className="text-sm opacity-90">Something went wrong</p>
  </div>
</div>
```

---

### 6️⃣ Links & Text

#### Link Variants
```tsx
<a href="#" className="link-primary">
  Primary Link
</a>
<a href="#" className="link-secondary">
  Secondary Link
</a>
<a href="#" className="link-muted">
  Muted Link
</a>
```

#### Text Utilities
```tsx
{/* Truncate multi-line text */}
<p className="truncate-2">Long text that will be truncated...</p>
<p className="truncate-3">Another long text...</p>

{/* Gradient Text */}
<h1 className="text-gradient text-4xl font-bold">
  Welcome to KPTI
</h1>
```

---

### 7️⃣ Layout Patterns

#### Responsive Grid
```tsx
{/* Auto-responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
<div className="grid-responsive">
  {items.map((item) => (
    <div key={item.id} className="card-base">
      {item.content}
    </div>
  ))}
</div>

{/* Two column responsive */}
<div className="grid-responsive-2">
  {items.map((item) => (
    <div key={item.id} className="card-base">
      {item.content}
    </div>
  ))}
</div>
```

#### Flex Center
```tsx
{/* Flex center both axes */}
<div className="flex-center h-64">
  <div>Centered content</div>
</div>

{/* Flex between (space-between) */}
<div className="flex-between">
  <span>Left</span>
  <span>Right</span>
</div>

{/* Flex column center */}
<div className="flex-col-center gap-4">
  <h2>Centered Heading</h2>
  <p>Centered paragraph</p>
</div>
```

#### Section Padding
```tsx
<section className="section-padding">
  <h2>Section Title</h2>
  <p>Content here</p>
</section>

{/* Small padding */}
<section className="section-padding-sm">
  Compact section
</section>

{/* Large padding */}
<section className="section-padding-lg">
  Hero or feature section
</section>
```

#### Container
```tsx
<div className="container-base">
  <h1>Responsive Container</h1>
  <p>Max width with responsive padding</p>
</div>
```

---

### 8️⃣ Dividers

#### Horizontal Divider
```tsx
<div className="space-y-4">
  <p>Content above</p>
  <div className="divider" />
  <p>Content below</p>
</div>
```

#### Vertical Divider
```tsx
<div className="flex gap-4">
  <div>Left</div>
  <div className="divider-vertical" />
  <div>Right</div>
</div>
```

---

### 9️⃣ Animations

#### Fade In
```tsx
<div className="animate-fade-in-up">
  Animates fade in from bottom
</div>

<div className="animate-fade-in-down">
  Animates fade in from top
</div>
```

#### Float
```tsx
<div className="animate-float">
  <img src="icon.svg" alt="Floating icon" />
</div>
```

#### Pulse Glow
```tsx
<button className="animate-pulse-glow rounded-full bg-primary">
  Featured Button
</button>
```

#### Gradient Shift
```tsx
<div className="animate-gradient-shift h-2 rounded-full" />
```

#### Shimmer Loading
```tsx
<div className="h-12 bg-muted animate-shimmer rounded-lg" />
```

#### Loading Spinner
```tsx
<div className="flex items-center justify-center">
  <div className="animate-spin w-8 h-8 border-4 border-muted border-t-primary rounded-full" />
</div>
```

---

### 🔟 Accessibility Features

#### Focus Ring
```tsx
<button className="btn-primary focus-ring">
  Accessible Button
</button>

<a href="#" className="focus-ring rounded px-2">
  Accessible Link
</a>
```

#### ARIA Labels
```tsx
<button
  aria-label="Toggle dark mode"
  onClick={toggleTheme}
  className="btn-ghost"
>
  <Moon className="w-5 h-5" />
</button>

<div role="status" aria-live="polite">
  {isLoading && <p>Loading...</p>}
</div>
```

#### Screen Reader Text
```tsx
<button>
  <span className="sr-only">Close menu</span>
  <X className="w-5 h-5" />
</button>
```

#### Form Labels
```tsx
<label htmlFor="email" className="text-sm font-medium">
  Email Address
  <span className="text-destructive" aria-label="required">*</span>
</label>
<input id="email" type="email" className="input-base" required />
```

---

## 📐 Responsive Breakpoints Reference

### Common Patterns

```tsx
// Mobile first approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

// Single column to grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <div key={item.id}>{item}</div>
  ))}
</div>

// Hidden on mobile
<div className="hidden md:block">
  Desktop only content
</div>

// Visible on mobile only
<div className="max-md:flex hidden">
  Mobile only content
</div>

// Responsive padding
<section className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
  Content
</section>
```

---

## 🌓 Dark Mode Implementation

### Automatic Dark Mode Styles

The global CSS automatically applies dark mode styles when the `.dark` class is present. No need for special syntax in components:

```tsx
// This component works in both light and dark modes automatically
export function Card() {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-4">
      {/* Background and text color automatically adapt */}
    </div>
  );
}

// Manual dark mode override if needed
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Custom dark mode styling
</div>
```

---

## 🎬 Complete Page Example

```tsx
import { HeroContent } from "@/components/home/HeroContent";
import { CoursesGrid } from "@/components/home/CoursesGrid";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-base flex-between py-4">
          <h1 className="text-2xl font-bold text-gradient">KPTI</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding-lg bg-gradient-subtle">
        <div className="container-base">
          <HeroContent />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-base">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Choose KPTI?
          </h2>
          <div className="grid-responsive">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card-elevated">
                <div className="w-12 h-12 bg-primary rounded-lg mb-4" />
                <h3 className="font-semibold mb-2">Feature Title</h3>
                <p className="text-sm text-muted-foreground">
                  Feature description
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding bg-card">
        <div className="container-base">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Courses</h2>
          <CoursesGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary-to-secondary">
        <div className="container-base flex-col-center text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl">
            Join thousands of students learning at KPTI
          </p>
          <button className="btn-primary bg-white text-primary hover:bg-white/90">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card">
        <div className="container-base py-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2026 KPTI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

## ✅ Best Practices Checklist

- [ ] Use semantic HTML elements (`<button>`, `<a>`, `<form>`)
- [ ] Always include `aria-label` for icon-only buttons
- [ ] Use `for` attribute on `<label>` tags linked to `id` on inputs
- [ ] Ensure color contrast ratio ≥ 4.5:1 for text
- [ ] Provide loading states for async operations
- [ ] Include error messages with clear guidance
- [ ] Use mobile-first responsive design
- [ ] Test with keyboard navigation
- [ ] Test with screen readers
- [ ] Use focus indicators (already included in btn-* classes)
- [ ] Lazy load images for better performance
- [ ] Combine independent utility classes efficiently

---

**Last Updated:** February 18, 2026  
**Version:** 1.0 - Complete Implementation Examples
