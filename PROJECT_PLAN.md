# 📋 TEXTKPTI Website - Professional Project Completion Plan

## 🎯 Project Overview

**Project Name:** TEXTKPTI Website  
**Type:** Educational Institute Website  
**Tech Stack:** Next.js 15+, TypeScript, Supabase, Prisma, Tailwind CSS, shadcn/ui  
**Timeline:** 20-33 days (4 phases)  
**Status:** Setup Complete ✅ | Development Phase

---

## 📐 Project Structure & Requirements

### Key Design Decision
- **Landing Page:** All courses (max 6) displayed on single landing page
- **No Separate Course Pages:** Course details shown in modal/collapsible sections
- **Admission Flow:** Direct from landing page course cards → Admission form → bKash payment

---

## 🗓️ Development Phases

### **Phase 1: Foundation & Public Pages** (5-8 days)
**Status:** ✅ Complete

#### Day 1-2: Landing Page with Courses
- [x] Design hero section with institute branding
- [x] Create course card component (shadcn/ui Card)
- [x] Fetch courses from Prisma/Supabase
- [x] Display all courses in grid layout (responsive: 1/2/3 columns)
- [x] Add course details modal/accordion (no separate page)
- [x] Add "Enroll Now" button on each course card → redirects to `/admission?course=slug`
- [x] Add quick stats section (total students, courses, etc.)

#### Day 3-4: Navigation & Layout
- [x] Create Header component with navigation
- [x] Create Footer component with contact info, map link
- [x] Implement responsive mobile menu
- [x] Add smooth scroll behavior
- [x] Create layout wrapper for public pages

#### Day 5-6: About & Contact Pages
- [x] About page: Institute history, mission, vision
- [x] Contact page: Contact form + Google Maps embed
- [x] Add form validation (react-hook-form + Zod)
- [x] Implement contact form submission (Server Action)

#### Day 7-8: Notices & Gallery
- [x] Notices page: List active notices from database
- [x] Gallery page: Display images from Supabase Storage
- [x] Add image lightbox/modal for gallery
- [x] Implement lazy loading for images

**Deliverables:**
- ✅ Complete landing page with all courses
- ✅ All public pages functional
- ✅ Responsive design
- ✅ Data fetching from Supabase

---

### **Phase 2: Admin Dashboard & Authentication** (5-8 days)
**Status:** 🟢 Mostly Complete

#### Day 9-10: Authentication Setup
- [x] Complete NextAuth.js configuration
- [x] Create admin login page (`/admin-login`)
- [x] Implement credential-based authentication
- [x] Add session management
- [x] Test authentication flow

#### Day 11-12: Admin Dashboard Layout
- [x] Create admin sidebar navigation
- [x] Create admin header with user info & logout
- [x] Design dashboard overview cards (stats)
- [x] Implement protected route middleware
- [x] Add loading states

#### Day 13-14: Course Management (Admin)
- [x] Course list page with DataTable (shadcn/ui)
- [x] Create/Edit course form (Server Actions)
- [x] Delete course functionality
- [x] Image upload for course (if needed)
- [x] Form validation & error handling

#### Day 15-16: Notice Management (Admin)
- [x] Notice CRUD operations
- [x] Toggle active/inactive status
- [x] Rich text editor for notice content (optional)
- [x] Preview functionality

#### Day 17-18: Gallery Management (Admin)
- [x] Upload images to Supabase Storage
- [ ] Image upload component with preview (needs work)
- [x] Add/Delete gallery images
- [ ] Add captions to images
- [ ] Bulk upload support

**Deliverables:**
- ✅ Fully functional admin dashboard
- ✅ All CRUD operations working
- ✅ Supabase Storage integration
- ✅ Secure authentication

---

### **Phase 3: Admission & Payment Integration** (7-12 days)
**Status:** 🟢 Mostly Complete

#### Day 19-21: Admission Form Enhancement
- [x] Multi-step admission form (react-hook-form)
- [x] Course selection (pre-filled from landing page)
- [x] Form validation with Zod
- [x] Save admission to database (pending status)
- [x] Show course fee dynamically
- [x] Add form progress indicator

#### Day 22-24: bKash Payment Integration
- [x] Implement bKash Checkout API (sandbox)
- [x] Create payment initiation endpoint (`/api/bkash/create`)
- [x] Handle payment callback (`/api/bkash/callback`)
- [x] Update admission status after payment
- [x] Store transaction ID
- [x] Error handling & retry logic
- [x] Test with sandbox credentials

#### Day 25-27: Payment Flow & Success Page
- [x] Redirect to bKash payment page
- [x] Handle payment success/failure
- [x] Create success page (`/admission-success`)
- [x] Display admission details
- [x] Show payment confirmation

#### Day 28-30: PDF Generation
- [x] Generate admission receipt PDF (pdf-lib)
- [x] Include all admission details
- [x] Add institute information
- [x] Add transaction details
- [x] Download PDF button on success page
- [x] Server Action for PDF generation

#### Day 31-32: Admin Admission Management
- [x] View all admissions (DataTable)
- [x] Filter by status (pending, paid, confirmed, rejected)
- [x] Update admission status
- [x] View admission details
- [x] Download PDF from admin panel
- [x] Search & pagination

**Deliverables:**
- ✅ Complete admission flow
- ✅ bKash payment working (sandbox)
- ✅ PDF generation functional
- ✅ Admin can manage admissions

---

### **Phase 4: Polish, Testing & Deployment** (3-5 days)
**Status:** 🟡 In Progress

#### Day 33-34: UI/UX Polish
- [x] Add loading skeletons
- [x] Improve error messages
- [x] Add success/error toast notifications
- [x] Optimize images (next/image)
- [x] Add animations (framer-motion optional)
- [x] Ensure accessibility (a11y)
- [x] Mobile responsiveness check

#### Day 35-36: SEO & Performance
- [ ] Add metadata for all pages
- [ ] Implement Open Graph tags
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Optimize bundle size
- [ ] Add analytics (optional)
- [ ] Performance audit (Lighthouse)

#### Day 37-38: Testing
- [ ] Test all user flows
- [ ] Test payment flow (sandbox)
- [ ] Test admin operations
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Fix any bugs

#### Day 39-40: Deployment
- [ ] Setup Vercel project
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Test production deployment
- [ ] Setup custom domain (if needed)
- [ ] Final testing on production

**Deliverables:**
- ✅ Production-ready website
- ✅ Deployed on Vercel
- ✅ All features tested
- ✅ SEO optimized

---

## 🎨 Design Specifications

### Landing Page Layout
```
┌─────────────────────────────────────┐
│         Header (Nav)                │
├─────────────────────────────────────┤
│         Hero Section                │
│    (Institute Name + Tagline)      │
├─────────────────────────────────────┤
│      Quick Stats (3-4 cards)       │
├─────────────────────────────────────┤
│      All Courses Grid (2-3 cols)    │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Course│ │Course│ │Course│        │
│  │ Card │ │ Card │ │ Card │        │
│  └──────┘ └──────┘ └──────┘        │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Course│ │Course│ │Course│        │
│  │ Card │ │ Card │ │ Card │        │
│  └──────┘ └──────┘ └──────┘        │
├─────────────────────────────────────┤
│    Latest Notices (3-4 items)      │
├─────────────────────────────────────┤
│         Footer                      │
└─────────────────────────────────────┘
```

### Course Card Design
- **Title** (Course name)
- **Duration** (e.g., "360 hours")
- **Fee** (BDT amount)
- **Short Description** (2-3 lines)
- **"View Details"** button (opens modal/accordion)
- **"Enroll Now"** button (redirects to admission)

### Course Details Modal/Accordion
- Full description
- Syllabus (if available)
- Duration details
- Fee breakdown
- Requirements
- "Enroll Now" button

---

## 📦 Required Components (shadcn/ui)

### Already Needed:
- [x] Button
- [x] Card
- [x] Input
- [x] Label
- [x] Textarea
- [x] Form
- [x] Table
- [x] Dialog
- [x] Select
- [x] Badge

### Additional Components to Install:
- [ ] Accordion (for course details)
- [ ] Tabs (for admin dashboard)
- [ ] Toast (for notifications)
- [ ] Skeleton (for loading states)
- [ ] Separator
- [ ] Avatar (for admin profile)
- [ ] Dropdown Menu
- [ ] Sheet (for mobile menu)

---

## 🗄️ Database Schema Status

✅ **Complete Models:**
- Course
- Admission
- Notice
- GalleryImage
- User

**No changes needed** - Schema is ready!

---

## 🔧 Technical Tasks Checklist

### Setup ✅
- [x] Next.js 15+ project initialized
- [x] TypeScript configured
- [x] Prisma + Supabase connected
- [x] shadcn/ui configured
- [x] Tailwind CSS v3 setup
- [x] NextAuth.js configured
- [x] Environment variables documented

### Development ✅
- [x] Landing page with courses
- [x] Public pages (About, Contact, Notices, Gallery)
- [x] Admin authentication
- [x] Admin dashboard
- [x] Course management (admin)
- [x] Notice management (admin)
- [ ] Gallery management (admin) - needs refinement
- [x] Admission form
- [x] bKash payment integration
- [x] PDF generation
- [x] Admission management (admin)

### Testing & Deployment
- [ ] Unit tests (optional)
- [ ] Integration tests
- [ ] E2E testing
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Vercel deployment

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Install shadcn/ui components
npx shadcn@latest add button card input label textarea form table dialog select badge accordion tabs toast skeleton separator avatar dropdown-menu sheet

# Setup database
npm run db:push

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📝 Notes & Considerations

1. **Course Display:** All courses on landing page, no separate detail pages
2. **Max Courses:** 6 courses maximum
3. **Payment:** Start with bKash sandbox, then move to production
4. **Storage:** Use Supabase Storage for gallery images
5. **Responsive:** Mobile-first approach
6. **Performance:** Optimize images, use Next.js Image component
7. **Accessibility:** Follow WCAG guidelines
8. **SEO:** Add proper metadata, sitemap, structured data

---

## 🎯 Success Criteria

- [ ] All 6 courses displayed on landing page
- [ ] Admission form works end-to-end
- [ ] bKash payment integration functional
- [ ] PDF generation working
- [ ] Admin can manage all content
- [ ] Website is responsive
- [ ] Deployed on Vercel
- [ ] Performance score > 90 (Lighthouse)

---

## 📞 Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **bKash API:** https://developer.bka.sh

---

**Last Updated:** February 18, 2026  
**Project Status:** Phase 3 - Mostly Complete, Phase 4 - In Progress  
**Next Milestone:** SEO Optimization & Final Testing

