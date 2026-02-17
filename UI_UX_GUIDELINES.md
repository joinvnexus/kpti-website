# 🎯 KPTI UI/UX Design Guidelines

## Overview

This document outlines the complete UI/UX strategy for KPTI Website in both Light and Dark modes, ensuring a user-friendly, professional, and consistent experience.

---

## 1. Light Mode Design 💡

### Visual Characteristics
- **Brightness**: High, clean, minimal
- **Contrast**: Strong contrast with dark text
- **Feel**: Professional, trustworthy, welcoming
- **Mood**: Calm, focused, educational

### Color Distribution (Light Mode)
| Element | Color | Usage Percentage |
|---------|-------|------------------|
| Background (White) | #FFFFFF | 50-60% |
| Text Dark | #1C2948 | 20-25% |
| Borders/Dividers | #E5E7EB | 10-15% |
| Primary Blue | #3B82F6 | 5-10% |
| Accent Colors | Green/Teal | 3-5% |

### Typography in Light Mode
- **Headlines**: Dark Navy (#1C2948) - Bold, confident
- **Body Text**: Dark Navy (#1C2948) - Clear, readable
- **Secondary Text**: Medium Gray (#6B7280) - Subtly prominent
- **Disabled Text**: Light Gray (#9CA3AF) - Depressed appearance

### Components Styling (Light)

#### Buttons
```
Primary:
  - Background: #3B82F6 (Blue)
  - Text: White
  - Hover: Darker shade with shadow
  - Active: Even darker shade
  - Disabled: Gray background, gray text

Secondary:
  - Background: Transparent
  - Border: #3B82F6
  - Text: #3B82F6
  - Hover: Light blue background
```

#### Cards
```
- Background: White (#FFFFFF)
- Border: 1px solid #E5E7EB
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: 
  - Shadow: 0 4px 8px rgba(0,0,0,0.12)
  - Scale: 1.02 (subtle)
  - Transition: 300ms smooth
```

#### Navigation Bar
```
- Background: White with 95% opacity
- Backdrop Blur: Yes
- Border Bottom: 1px solid #E5E7EB
- Height: 64px
- Text: Dark Navy
```

---

## 2. Dark Mode Design 🌙

### Visual Characteristics
- **Brightness**: Low, comfortable for eyes
- **Contrast**: Enhanced for readability
- **Feel**: Modern, sophisticated, premium
- **Mood**: Professional, immersive, comfortable

### Color Distribution (Dark Mode)
| Element | Color | Usage Percentage |
|---------|-------|------------------|
| Background (Navy) | #0F172A | 50-60% |
| Text Light | #F1F5F9 | 20-25% |
| Borders/Dividers | #334155 | 10-15% |
| Primary Blue (Bright) | #60A5FA | 5-10% |
| Accent Colors | Bright Green/Teal | 3-5% |

### Typography in Dark Mode
- **Headlines**: Bright White (#F1F5F9) - Bold, clear
- **Body Text**: Light Gray (#E2E8F0) - Maximum readability
- **Secondary Text**: Medium Gray (#CBD5E1) - Subtle prominence
- **Disabled Text**: Dark Gray (#64748B) - Reduced visibility

### Components Styling (Dark)

#### Buttons
```
Primary:
  - Background: #60A5FA (Bright Blue)
  - Text: Dark Navy (#1C2948)
  - Hover: Enhanced glow + shadow
  - Active: Slightly brighter
  - Disabled: Dark gray background

Secondary:
  - Background: Transparent
  - Border: #60A5FA
  - Text: #60A5FA
  - Hover: Glow effect
```

#### Cards
```
- Background: #1E293B (Dark Slate)
- Border: 1px solid #334155
- Shadow: 0 1px 3px rgba(0,0,0,0.3)
- Hover:
  - Shadow: 0 4px 8px rgba(0,0,0,0.4)
  - Scale: 1.02
  - Glow: Subtle blue glow
```

#### Navigation Bar
```
- Background: #0F172A with 95% opacity
- Backdrop Blur: Yes
- Border Bottom: 1px solid #334155
- Height: 64px
- Text: Bright White
```

---

## 3. Page-by-Page Design

### Home Page

#### Light Mode Hero
```
Background: Gradient from-blue-50 to-white
Title: Large, bold, dark navy
Subtitle: Medium, dark navy
Badges: Light blue background, dark text
CTA Buttons: Blue solid + outlined variant
Trust Icons: Blue accents
```

#### Dark Mode Hero
```
Background: Gradient from-slate-950 to-blue-950
Title: Large, bold, white
Subtitle: Medium, light gray
Badges: Dark background with light text, blue accents
CTA Buttons: Bright blue solid + outlined with glow
Trust Icons: Bright blue accents
```

### Courses Section

#### Light Mode
```
Cards: White background, subtle shadow
Hover: Shadow increase, slight scale up
Title: Bold dark navy
Price Badge: Blue background, white text
Duration Badge: Light gray background
Icon: Blue color
```

#### Dark Mode
```
Cards: Dark slate background
Hover: Enhanced glow, scale up
Title: Bright white
Price Badge: Blue background, dark text
Duration Badge: Dark gray background
Icon: Bright blue color
```

### Navigation Bar

#### Light Mode
```
Logo: Dark navy text
Links: Gray, underline on hover
Theme Toggle: Moon icon
Background: White with blur
```

#### Dark Mode
```
Logo: Bright white text
Links: Light gray, bright on hover
Theme Toggle: Sun icon (yellow tint)
Background: Navy with blur
```

---

## 4. Accessibility Standards

### WCAG 2.1 Compliance

#### Color Contrast
- **Normal text**: Minimum 4.5:1
- **Large text (18pt+)**: Minimum 3:1
- **UI Components**: Minimum 3:1

#### Focus States
```
- Visible ring: 2px solid primary color
- Offset: 4px from element
- Blur: 2px for smooth appearance
- Color: Clearly distinct from background
```

#### Touch Targets
- **Minimum size**: 44x44 pixels
- **Spacing**: 8px minimum between interactive elements
- **Mobile**: Larger touch targets on small screens

#### Text Readability
- **Font size**: Minimum 14px for body text
- **Line height**: 1.5 minimum
- **Letter spacing**: 0.02em minimum for headings
- **Font weight**: 400 for body, 600+ for headings

---

## 5. Interactive Elements

### Buttons

#### States
1. **Default**: Normal appearance
2. **Hover**: Darker shade, shadow increase, cursor pointer
3. **Active**: Pressed appearance
4. **Focus**: Focus ring visible
5. **Disabled**: Grayed out, cursor not-allowed

#### Animations
- Duration: 150-200ms
- Easing: ease-out
- Properties: background-color, box-shadow, transform

### Links

#### Light Mode
```
Default: Blue (#3B82F6), underlined
Hover: Darker blue, no underline
Visited: Purple (optional)
Active: Darker shade
```

#### Dark Mode
```
Default: Bright blue (#60A5FA), underlined
Hover: Brighter, no underline (with glow)
Visited: Light purple (optional)
Active: Even brighter
```

### Form Elements

#### Input Fields
```
Light Mode:
  - Background: White
  - Border: 1px solid #E5E7EB
  - Text: Dark navy
  - Placeholder: Gray
  - Focus: Blue border, blue ring

Dark Mode:
  - Background: #1E293B
  - Border: 1px solid #334155
  - Text: Light gray
  - Placeholder: Medium gray
  - Focus: Bright blue border, glow
```

---

## 6. Motion & Animations

### Standard Transitions
```
Duration: 200-300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1) (smooth)
Properties: 
  - background-color
  - box-shadow
  - transform
  - opacity
```

### Custom Animations

#### Fade In
- Duration: 500ms
- Direction: Upwards
- Usage: Page load, component entry

#### Float
- Duration: 3 seconds
- Direction: Vertical
- Usage: Hero elements, banners

#### Pulse Glow
- Duration: 2 seconds
- Pattern: Expanding circle
- Usage: CTAs, badges, notifications

#### Shimmer
- Duration: 2 seconds
- Direction: Left to right
- Usage: Loading skeletons

---

## 7. Responsive Design

### Breakpoints
```
Mobile: < 640px (sm)
Tablet: 640px - 1024px (md, lg)
Desktop: 1024px+ (xl, 2xl)
```

### Mobile First Approach
1. Design for phone first
2. Enhance for tablets
3. Optimize for desktop

### Touch-Friendly Elements
- Buttons: Minimum 44x44px
- Tap targets: 8px spacing
- Swipe gestures: 60px minimum drag
- Readable text: 16px minimum on mobile

---

## 8. Implementation Checklist

### Light Mode Setup
- [ ] Background colors set to white
- [ ] Text colors set to dark navy
- [ ] Border colors set to light gray
- [ ] Primary buttons in blue
- [ ] Cards with subtle shadows
- [ ] Icons rendered in blue

### Dark Mode Setup
- [ ] Background colors set to navy deep
- [ ] Text colors set to bright white/light gray
- [ ] Border colors set to dark gray
- [ ] Primary buttons in bright blue
- [ ] Cards with dark background
- [ ] Icons rendered in bright blue
- [ ] Glow effects enabled

### Cross-Mode Testing
- [ ] Theme toggle works on all pages
- [ ] Consistent colors across themes
- [ ] Animations work in both modes
- [ ] Text readable in both modes
- [ ] Images visible in both modes
- [ ] Form inputs accessible in both modes

---

## 9. Browser Compatibility

### Supported Browsers
- Chrome/Edge 88+
- Firefox 85+
- Safari 14.1+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Feature Support
- CSS Variables: ✅ All modern browsers
- Dark Mode Detection: ✅ All modern browsers
- CSS Grid: ✅ All modern browsers
- Backdrop Filter: ✅ Most modern browsers (fallback to blur)

---

## 10. Performance Optimization

### CSS
- Minimize color changes on theme switch
- Use CSS variables for dynamic theming
- Avoid redundant calculations

### Images
- Optimize for both modes (consider filter if needed)
- Use SVGs for icons (can be colored via CSS)
- Lazy load images below the fold

### Animations
- Use GPU-accelerated properties (transform, opacity)
- Avoid animating background-color on large elements
- Prefer will-change sparingly

---

## 11. User Preferences

### System Preference Detection
```javascript
// Automatically detect OS preference
prefers-color-scheme: dark | light
```

### Manual Override
- Users can toggle theme manually
- Selection persists in localStorage
- Override takes precedence over system preference

### Respecting User Preferences
- Honor prefers-reduced-motion for animations
- Honor prefers-color-scheme on first visit
- Provide explicit theme control in UI

---

## 12. Design Resources

### Colors
- Primary Blue: `#3B82F6` (Light) / `#60A5FA` (Dark)
- Secondary Teal: `#06B6D4` (Light) / `#22D3EE` (Dark)
- Accent Green: `#10B981` (Light) / `#34D399` (Dark)

### Typography
- Headlines: Bold (700) weight
- Body: Regular (400) weight
- Small text: Regular (400) weight

### Spacing
- Standard unit: 8px
- Multiples: 8px, 16px, 24px, 32px, 48px, 64px

---

## 13. Quality Assurance

### Testing Checklist
- [ ] Visual regression testing
- [ ] Accessibility testing (aXe, WAVE)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Performance testing (Lighthouse)
- [ ] User feedback collection

### Metrics to Track
- Page load time: < 3 seconds
- Theme switch delay: < 100ms
- Accessibility score: 95+
- Mobile score: 90+

---

## 14. Future Enhancements

- [ ] High contrast mode
- [ ] Custom brand color selector
- [ ] Animated theme transitions
- [ ] Advanced system preference detection
- [ ] Per-component theme overrides
- [ ] Automatic image optimization for dark mode

---

**Document Status**: Active  
**Last Updated**: February 17, 2026  
**Next Review**: May 2026
