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
**Status:** 🟡 In Progress

#### Day 1-2: Landing Page with Courses
- [ ] Design hero section with institute branding
- [ ] Create course card component (shadcn/ui Card)
- [ ] Fetch courses from Prisma/Supabase
- [ ] Display all courses in grid layout (responsive: 1/2/3 columns)
- [ ] Add course details modal/accordion (no separate page)
- [ ] Add "Enroll Now" button on each course card → redirects to `/admission?course=slug`
- [ ] Add quick stats section (total students, courses, etc.)

#### Day 3-4: Navigation & Layout
- [ ] Create Header component with navigation
- [ ] Create Footer component with contact info, map link
- [ ] Implement responsive mobile menu
- [ ] Add smooth scroll behavior
- [ ] Create layout wrapper for public pages

#### Day 5-6: About & Contact Pages
- [ ] About page: Institute history, mission, vision
- [ ] Contact page: Contact form + Google Maps embed
- [ ] Add form validation (react-hook-form + Zod)
- [ ] Implement contact form submission (Server Action)

#### Day 7-8: Notices & Gallery
- [ ] Notices page: List active notices from database
- [ ] Gallery page: Display images from Supabase Storage
- [ ] Add image lightbox/modal for gallery
- [ ] Implement lazy loading for images

**Deliverables:**
- ✅ Complete landing page with all courses
- ✅ All public pages functional
- ✅ Responsive design
- ✅ Data fetching from Supabase

---

### **Phase 2: Admin Dashboard & Authentication** (5-8 days)
**Status:** ⏳ Pending

#### Day 9-10: Authentication Setup
- [ ] Complete NextAuth.js configuration
- [ ] Create admin login page (`/admin-login`)
- [ ] Implement credential-based authentication
- [ ] Add session management
- [ ] Test authentication flow

#### Day 11-12: Admin Dashboard Layout
- [ ] Create admin sidebar navigation
- [ ] Create admin header with user info & logout
- [ ] Design dashboard overview cards (stats)
- [ ] Implement protected route middleware
- [ ] Add loading states

#### Day 13-14: Course Management (Admin)
- [ ] Course list page with DataTable (shadcn/ui)
- [ ] Create/Edit course form (Server Actions)
- [ ] Delete course functionality
- [ ] Image upload for course (if needed)
- [ ] Form validation & error handling

#### Day 15-16: Notice Management (Admin)
- [ ] Notice CRUD operations
- [ ] Toggle active/inactive status
- [ ] Rich text editor for notice content (optional)
- [ ] Preview functionality

#### Day 17-18: Gallery Management (Admin)
- [ ] Upload images to Supabase Storage
- [ ] Image upload component with preview
- [ ] Add/Delete gallery images
- [ ] Add captions to images
- [ ] Bulk upload support

**Deliverables:**
- ✅ Fully functional admin dashboard
- ✅ All CRUD operations working
- ✅ Supabase Storage integration
- ✅ Secure authentication

---

### **Phase 3: Admission & Payment Integration** (7-12 days)
**Status:** ⏳ Pending

#### Day 19-21: Admission Form Enhancement
- [ ] Multi-step admission form (react-hook-form)
- [ ] Course selection (pre-filled from landing page)
- [ ] Form validation with Zod
- [ ] Save admission to database (pending status)
- [ ] Show course fee dynamically
- [ ] Add form progress indicator

#### Day 22-24: bKash Payment Integration
- [ ] Implement bKash Checkout API (sandbox)
- [ ] Create payment initiation endpoint (`/api/bkash/create`)
- [ ] Handle payment callback (`/api/bkash/callback`)
- [ ] Update admission status after payment
- [ ] Store transaction ID
- [ ] Error handling & retry logic
- [ ] Test with sandbox credentials

#### Day 25-27: Payment Flow & Success Page
- [ ] Redirect to bKash payment page
- [ ] Handle payment success/failure
- [ ] Create success page (`/admission-success`)
- [ ] Display admission details
- [ ] Show payment confirmation

#### Day 28-30: PDF Generation
- [ ] Generate admission receipt PDF (pdf-lib)
- [ ] Include all admission details
- [ ] Add institute information
- [ ] Add transaction details
- [ ] Download PDF button on success page
- [ ] Server Action for PDF generation

#### Day 31-32: Admin Admission Management
- [ ] View all admissions (DataTable)
- [ ] Filter by status (pending, paid, confirmed, rejected)
- [ ] Update admission status
- [ ] View admission details
- [ ] Download PDF from admin panel
- [ ] Search & pagination

**Deliverables:**
- ✅ Complete admission flow
- ✅ bKash payment working (sandbox)
- ✅ PDF generation functional
- ✅ Admin can manage admissions

---

### **Phase 4: Polish, Testing & Deployment** (3-5 days)
**Status:** ⏳ Pending

#### Day 33-34: UI/UX Polish
- [ ] Add loading skeletons
- [ ] Improve error messages
- [ ] Add success/error toast notifications
- [ ] Optimize images (next/image)
- [ ] Add animations (framer-motion optional)
- [ ] Ensure accessibility (a11y)
- [ ] Mobile responsiveness check

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

### Development
- [ ] Landing page with courses
- [ ] Public pages (About, Contact, Notices, Gallery)
- [ ] Admin authentication
- [ ] Admin dashboard
- [ ] Course management (admin)
- [ ] Notice management (admin)
- [ ] Gallery management (admin)
- [ ] Admission form
- [ ] bKash payment integration
- [ ] PDF generation
- [ ] Admission management (admin)

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

**Last Updated:** [Current Date]  
**Project Status:** Phase 1 - In Progress  
**Next Milestone:** Complete Landing Page with Courses

