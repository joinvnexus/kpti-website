# 🎨 KPTI Brand Design System

## Color Palette

### Light Mode 🌞

**Primary Blue** - Trust, Education, Technology
- Color: `#3B82F6` (hsl(217 91% 60%))
- Usage: Main CTAs, Navigation, Focus states
- Contrast: High (4.8:1 WCAG AAA)

**Secondary Teal** - Modern, Professional, Clear
- Color: `#06B6D4` (hsl(180 70% 50%))
- Usage: Secondary CTAs, Highlights, Accents
- Contrast: High

**Accent Green** - Growth, Success, Progress
- Color: `#10B981` (hsl(148 68% 45%))
- Usage: Success messages, Progress indicators, Badges
- Contrast: High

**Background White**
- Color: `#FFFFFF` (hsl(0 0% 100%))
- Neutral text-friendly background

**Text Dark**
- Color: `#1C2948` (hsl(217 32% 17%))
- Primary text color

**Light Gray**
- Color: `#F3F4F6` (hsl(220 14% 96%))
- Card backgrounds, Subtle separators

### Dark Mode 🌙

**Primary Blue** - Brighter for dark backgrounds
- Color: `#60A5FA` (hsl(219 83% 58%))
- Usage: Main CTAs, Navigation
- Maintains contrast on dark backgrounds

**Secondary Teal** - Enhanced brightness
- Color: `#22D3EE` (hsl(182 76% 53%))
- Usage: Secondary CTAs, Accents

**Accent Green** - Enhanced brightness
- Color: `#34D399` (hsl(151 80% 50%))
- Usage: Success states

**Background Navy Deep**
- Color: `#0F172A` (hsl(217 39% 11%))
- Main dark background

**Text Light**
- Color: `#F1F5F9` (hsl(210 40% 98%))
- Primary text color in dark mode

**Card Dark**
- Color: `#1E293B` (hsl(217 32% 17%))
- Card backgrounds

---

## Typography Scale

| Level | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| H1 | 36px (9xl) | 700 | 1.2 | Page titles, Hero section |
| H2 | 30px (8xl) | 700 | 1.25 | Section headers |
| H3 | 24px (6xl) | 600 | 1.33 | Subsection headers |
| H4 | 20px (5xl) | 600 | 1.4 | Card titles |
| Body | 16px | 400 | 1.6 | Main content |
| Small | 14px | 400 | 1.5 | Helper text, captions |
| Tiny | 12px | 400 | 1.4 | Labels, badges |

---

## Component Styling

### Buttons

**Primary Button (Light Mode)**
```
Background: #3B82F6 (Blue)
Text: White
Hover: Darker blue shadow
Border Radius: 8px
Padding: 12px 24px
```

**Primary Button (Dark Mode)**
```
Background: #60A5FA (Bright Blue)
Text: Dark Navy
Hover: Enhanced glow
Border Radius: 8px
```

### Cards

**Light Mode**
```
Background: White
Border: 1px solid #E5E7EB
Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover: Shadow increase + subtle scale
Radius: 12px
Padding: 24px
```

**Dark Mode**
```
Background: #1E293B
Border: 1px solid #334155
Shadow: 0 1px 3px rgba(0, 0, 0, 0.3)
Hover: Shadow + scale
Radius: 12px
```

### Navigation Bar

**Light Mode**
```
Background: White with 95% opacity backdrop blur
Border: Subtle bottom border
Sticky top
Height: 64px
```

**Dark Mode**
```
Background: #0F172A with 95% opacity backdrop blur
Border: Subtle dark border
Height: 64px
```

### Badge

**Success Badge**
```
Light: Green background, dark text
Dark: Bright green background, dark text
Radius: 6px
Padding: 4px 12px
Font: 12px, 500 weight
```

---

## Spacing System

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
```

---

## Animations & Transitions

### Standard Transitions
- Default: 200-300ms ease-out
- Hover effects: 150ms ease
- Page transitions: 300ms ease

### Custom Animations
- Fade In Up: 500ms ease-out
- Float: 3s infinite ease-in-out
- Pulse Glow: 2s infinite

---

## Accessibility (WCAG 2.1 AAA)

✅ **Color Contrast Ratios**
- Primary text on background: 4.8:1
- Secondary text: 4.5:1
- UI components: 3:1 minimum

✅ **Focus States**
- Visible focus ring: 2px solid primary color
- 4px offset, 2px blur

✅ **Responsive Text**
- Minimum font size: 14px
- Scales up on larger screens
- Line height: 1.5 minimum

---

## Light Mode Experience 💡

### Key Principles
- **Clean & Minimal**: White backgrounds with spacious layouts
- **Professional**: Blue-dominant color scheme
- **Readable**: High contrast dark text on light backgrounds
- **Modern**: Subtle shadows and rounded corners

### Hero Section (Light)
- Background: Light blue gradient (`from-blue-50 to-white`)
- Title: Dark navy text
- CTA Buttons: Solid blue + outlined variant
- Trust badges: Light blue background with dark text

### Card Layout (Light)
- White background with subtle shadow
- Hover: Shadow increases, slight scale up
- Text: Dark primary for headings, gray for secondary
- Accent elements: Blue or green

### Overall Feel
Professional, trustworthy, clean, welcoming

---

## Dark Mode Experience 🌙

### Key Principles
- **Comfortable**: Deep navy backgrounds reduce eye strain
- **Professional**: Brighter blues stand out clearly
- **Modern**: Elevated cards with defined layers
- **Accessible**: High contrast colors for readability

### Hero Section (Dark)
- Background: Deep navy gradient (`from-slate-950 to-blue-950`)
- Title: Bright white text
- CTA Buttons: Bright blue with enhanced glow on hover
- Trust badges: Subtle dark background with light text

### Card Layout (Dark)
- Dark navy/slate background with subtle borders
- Hover: Enhanced glow effect, scale up
- Text: White/light gray for clarity
- Accent elements: Bright blue, teal, or green

### Overall Feel
Modern, sophisticated, easy on the eyes, premium

---

## Brand Voice

### Typography Tone
- **Headlines**: Bold, confident, clear
- **Body text**: Friendly, professional, informative
- **CTAs**: Action-oriented, encouraging

### Design Tone
- **Interactive elements**: Responsive, smooth, delightful
- **Icons**: Clean, modern, consistent
- **Spacing**: Generous, breathing room

---

## Implementation Guidelines

### Light Mode URL
`website.com` (default)

### Dark Mode URL
`website.com` (automatically detected via OS preference)

### Theme Toggle
- Located in navbar
- Sun icon for light mode
- Moon icon for dark mode
- Smooth 300ms transition

### Browser Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14.1+

---

## Color Reference

| Name | Light | Dark | Use |
|------|-------|------|-----|
| Primary | #3B82F6 | #60A5FA | CTAs, Links |
| Secondary | #06B6D4 | #22D3EE | Highlights |
| Accent | #10B981 | #34D399 | Success, Growth |
| Background | #FFFFFF | #0F172A | Main BG |
| Card | #FFFFFF | #1E293B | Component BG |
| Border | #E5E7EB | #334155 | Dividers |
| Text Primary | #1C2948 | #F1F5F9 | Headings |
| Text Secondary | #6B7280 | #CBD5E1 | Body text |

---

## Quick Start

1. **For Light Mode**: Colors are used as-is
2. **For Dark Mode**: Use `dark:` prefix in Tailwind classes
3. **For Custom**: Use CSS variables `var(--primary)`, `var(--background)`, etc.

Example:
```tsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  Content here
</div>
```

---

## Design Resources

- Figma: [Link to design file]
- Color Accessibility: https://www.tpgi.com/color-contrast-checker/
- Typography Scale: https://www.designsystems.com/

---

**Last Updated**: February 17, 2026  
**Version**: 1.0  
**Maintainer**: KPTI Design Team
