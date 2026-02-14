# 📋 TEXTKPTI ওয়েবসাইট - প্রফেশনাল প্রজেক্ট কমপ্লিশন প্ল্যান

## 🎯 প্রজেক্ট ওভারভিউ

**প্রজেক্ট নাম:** TEXTKPTI ওয়েবসাইট  
**ধরণ:** শিক্ষা প্রতিষ্ঠানের ওয়েবসাইট  
**টেক স্ট্যাক:** Next.js 15+, TypeScript, Supabase, Prisma, Tailwind CSS, shadcn/ui  
**সময়সীমা:** ২০-৩৩ দিন (৪টি ফেজ)  
**বর্তমান অবস্থা:** সেটআপ সম্পন্ন ✅ | ডেভেলপমেন্ট ফেজ

---

## 📐 প্রজেক্ট স্ট্রাকচার ও প্রয়োজনীয়তা

### মূল ডিজাইন সিদ্ধান্ত
- **ল্যান্ডিং পেজ:** সব কোর্স (সর্বোচ্চ ৬টি) একটি পেজেই দেখানো হবে
- **আলাদা কোর্স পেজ নেই:** কোর্সের বিস্তারিত তথ্য মডাল/একর্ডিয়নে দেখানো হবে
- **ভর্তি ফ্লো:** ল্যান্ডিং পেজের কোর্স কার্ড থেকে সরাসরি → ভর্তি ফর্ম → bKash পেমেন্ট

---

## 🗓️ ডেভেলপমেন্ট ফেজসমূহ

### **ফেজ ১: ফাউন্ডেশন ও পাবলিক পেজ** (৫-৮ দিন)
**অবস্থা:** 🟡 চলমান

#### দিন ১-২: ল্যান্ডিং পেজ (কোর্স সহ)
- [ ] Hero section ডিজাইন (ইনস্টিটিউট ব্র্যান্ডিং)
- [ ] কোর্স কার্ড কম্পোনেন্ট তৈরি (shadcn/ui Card)
- [ ] Prisma/Supabase থেকে কোর্স fetch করা
- [ ] সব কোর্স grid layout-এ দেখানো (responsive: 1/2/3 columns)
- [ ] কোর্স বিস্তারিত মডাল/একর্ডিয়ন যোগ করা (আলাদা পেজ নেই)
- [ ] প্রতিটি কোর্স কার্ডে "Enroll Now" বাটন → `/admission?course=slug`-এ redirect
- [ ] Quick stats section যোগ করা (মোট শিক্ষার্থী, কোর্স ইত্যাদি)

#### দিন ৩-৪: নেভিগেশন ও লেআউট
- [ ] Header কম্পোনেন্ট তৈরি (নেভিগেশন সহ)
- [ ] Footer কম্পোনেন্ট তৈরি (যোগাযোগ তথ্য, ম্যাপ লিংক)
- [ ] Responsive mobile menu তৈরি
- [ ] Smooth scroll behavior যোগ করা
- [ ] Public pages-এর জন্য layout wrapper

#### দিন ৫-৬: About ও Contact পেজ
- [ ] About পেজ: ইনস্টিটিউটের ইতিহাস, মিশন, ভিশন
- [ ] Contact পেজ: Contact form + Google Maps embed
- [ ] Form validation (react-hook-form + Zod)
- [ ] Contact form submission (Server Action)

#### দিন ৭-৮: Notices ও Gallery
- [ ] Notices পেজ: Database থেকে active notices দেখানো
- [ ] Gallery পেজ: Supabase Storage থেকে images দেখানো
- [ ] Image lightbox/modal যোগ করা
- [ ] Images-এর জন্য lazy loading

**ডেলিভারেবল:**
- ✅ সম্পূর্ণ ল্যান্ডিং পেজ (সব কোর্স সহ)
- ✅ সব public pages কাজ করছে
- ✅ Responsive design
- ✅ Supabase থেকে data fetching

---

### **ফেজ ২: Admin Dashboard ও Authentication** (৫-৮ দিন)
**অবস্থা:** ⏳ অপেক্ষমান

#### দিন ৯-১০: Authentication Setup
- [ ] NextAuth.js configuration সম্পন্ন করা
- [ ] Admin login page তৈরি (`/admin-login`)
- [ ] Credential-based authentication
- [ ] Session management
- [ ] Authentication flow টেস্ট করা

#### দিন ১১-১২: Admin Dashboard Layout
- [ ] Admin sidebar navigation তৈরি
- [ ] Admin header (user info + logout)
- [ ] Dashboard overview cards (stats)
- [ ] Protected route middleware
- [ ] Loading states যোগ করা

#### দিন ১৩-১৪: Course Management (Admin)
- [ ] Course list page (DataTable - shadcn/ui)
- [ ] Create/Edit course form (Server Actions)
- [ ] Delete course functionality
- [ ] Image upload (যদি প্রয়োজন হয়)
- [ ] Form validation & error handling

#### দিন ১৫-১৬: Notice Management (Admin)
- [ ] Notice CRUD operations
- [ ] Active/inactive status toggle
- [ ] Rich text editor (ঐচ্ছিক)
- [ ] Preview functionality

#### দিন ১৭-১৮: Gallery Management (Admin)
- [ ] Supabase Storage-এ image upload
- [ ] Image upload component (preview সহ)
- [ ] Add/Delete gallery images
- [ ] Image captions যোগ করা
- [ ] Bulk upload support

**ডেলিভারেবল:**
- ✅ সম্পূর্ণ admin dashboard
- ✅ সব CRUD operations কাজ করছে
- ✅ Supabase Storage integration
- ✅ Secure authentication

---

### **ফেজ ৩: Admission ও Payment Integration** (৭-১২ দিন)
**অবস্থা:** ⏳ অপেক্ষমান

#### দিন ১৯-২১: Admission Form Enhancement
- [ ] Multi-step admission form (react-hook-form)
- [ ] Course selection (ল্যান্ডিং পেজ থেকে pre-filled)
- [ ] Form validation (Zod)
- [ ] Database-এ admission save করা (pending status)
- [ ] Course fee dynamically দেখানো
- [ ] Form progress indicator

#### দিন ২২-২৪: bKash Payment Integration
- [ ] bKash Checkout API implement করা (sandbox)
- [ ] Payment initiation endpoint (`/api/bkash/create`)
- [ ] Payment callback handle করা (`/api/bkash/callback`)
- [ ] Payment-এর পর admission status update
- [ ] Transaction ID store করা
- [ ] Error handling & retry logic
- [ ] Sandbox credentials দিয়ে test করা

#### দিন ২৫-২৭: Payment Flow ও Success Page
- [ ] bKash payment page-এ redirect
- [ ] Payment success/failure handle করা
- [ ] Success page তৈরি (`/admission-success`)
- [ ] Admission details দেখানো
- [ ] Payment confirmation দেখানো

#### দিন ২৮-৩০: PDF Generation
- [ ] Admission receipt PDF generate করা (pdf-lib)
- [ ] সব admission details যোগ করা
- [ ] Institute information যোগ করা
- [ ] Transaction details যোগ করা
- [ ] Success page-এ PDF download button
- [ ] PDF generation-এর জন্য Server Action

#### দিন ৩১-৩২: Admin Admission Management
- [ ] সব admissions দেখানো (DataTable)
- [ ] Status অনুযায়ী filter (pending, paid, confirmed, rejected)
- [ ] Admission status update করা
- [ ] Admission details দেখানো
- [ ] Admin panel থেকে PDF download
- [ ] Search & pagination

**ডেলিভারেবল:**
- ✅ সম্পূর্ণ admission flow
- ✅ bKash payment কাজ করছে (sandbox)
- ✅ PDF generation কাজ করছে
- ✅ Admin admission manage করতে পারছে

---

### **ফেজ ৪: Polish, Testing ও Deployment** (৩-৫ দিন)
**অবস্থা:** ⏳ অপেক্ষমান

#### দিন ৩৩-৩৪: UI/UX Polish
- [ ] Loading skeletons যোগ করা
- [ ] Error messages উন্নত করা
- [ ] Success/error toast notifications
- [ ] Images optimize করা (next/image)
- [ ] Animations যোগ করা (framer-motion - ঐচ্ছিক)
- [ ] Accessibility (a11y) নিশ্চিত করা
- [ ] Mobile responsiveness check

#### দিন ৩৫-৩৬: SEO ও Performance
- [ ] সব pages-এ metadata যোগ করা
- [ ] Open Graph tags implement করা
- [ ] sitemap.xml যোগ করা
- [ ] robots.txt যোগ করা
- [ ] Bundle size optimize করা
- [ ] Analytics যোগ করা (ঐচ্ছিক)
- [ ] Performance audit (Lighthouse)

#### দিন ৩৭-৩৮: Testing
- [ ] সব user flows test করা
- [ ] Payment flow test করা (sandbox)
- [ ] Admin operations test করা
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Bugs fix করা

#### দিন ৩৯-৪০: Deployment
- [ ] Vercel project setup
- [ ] Environment variables configure করা
- [ ] Production-এ deploy করা
- [ ] Production deployment test করা
- [ ] Custom domain setup (যদি প্রয়োজন হয়)
- [ ] Production-এ final testing

**ডেলিভারেবল:**
- ✅ Production-ready website
- ✅ Vercel-এ deployed
- ✅ সব features tested
- ✅ SEO optimized

---

## 🎨 ডিজাইন স্পেসিফিকেশন

### ল্যান্ডিং পেজ লেআউট
```
┌─────────────────────────────────────┐
│         Header (Nav)                │
├─────────────────────────────────────┤
│         Hero Section                │
│    (Institute Name + Tagline)      │
├─────────────────────────────────────┤
│      Quick Stats (3-4 cards)       │
├─────────────────────────────────────┤
│      সব কোর্স Grid (2-3 cols)      │
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

### কোর্স কার্ড ডিজাইন
- **Title** (কোর্সের নাম)
- **Duration** (যেমন: "360 hours")
- **Fee** (BDT amount)
- **Short Description** (২-৩ লাইন)
- **"View Details"** button (মডাল/একর্ডিয়ন খোলে)
- **"Enroll Now"** button (admission-এ redirect করে)

### কোর্স বিস্তারিত মডাল/একর্ডিয়ন
- সম্পূর্ণ description
- Syllabus (যদি থাকে)
- Duration details
- Fee breakdown
- Requirements
- "Enroll Now" button

---

## 📦 প্রয়োজনীয় Components (shadcn/ui)

### ইতিমধ্যে প্রয়োজন:
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

### অতিরিক্ত Components ইনস্টল করতে হবে:
- [ ] Accordion (কোর্স details-এর জন্য)
- [ ] Tabs (admin dashboard-এর জন্য)
- [ ] Toast (notifications-এর জন্য)
- [ ] Skeleton (loading states-এর জন্য)
- [ ] Separator
- [ ] Avatar (admin profile-এর জন্য)
- [ ] Dropdown Menu
- [ ] Sheet (mobile menu-এর জন্য)

---

## 🗄️ Database Schema অবস্থা

✅ **সম্পূর্ণ Models:**
- Course
- Admission
- Notice
- GalleryImage
- User

**কোনো পরিবর্তন প্রয়োজন নেই** - Schema ready!

---

## 🔧 টেকনিক্যাল টাস্ক চেকলিস্ট

### Setup ✅
- [x] Next.js 15+ project initialized
- [x] TypeScript configured
- [x] Prisma + Supabase connected
- [x] shadcn/ui configured
- [x] Tailwind CSS v3 setup
- [x] NextAuth.js configured
- [x] Environment variables documented

### Development
- [ ] ল্যান্ডিং পেজ (কোর্স সহ)
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
- [ ] Unit tests (ঐচ্ছিক)
- [ ] Integration tests
- [ ] E2E testing
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Vercel deployment

---

## 🚀 Quick Start Commands

```bash
# Dependencies install করা
npm install

# shadcn/ui components install করা
npx shadcn@latest add button card input label textarea form table dialog select badge accordion tabs toast skeleton separator avatar dropdown-menu sheet

# Database setup
npm run db:push

# Development server চালু করা
npm run dev

# Production-এর জন্য build
npm run build
```

---

## 📝 নোটস ও বিবেচ্য বিষয়

1. **কোর্স Display:** সব কোর্স ল্যান্ডিং পেজে, আলাদা detail pages নেই
2. **Max Courses:** সর্বোচ্চ ৬টি কোর্স
3. **Payment:** প্রথমে bKash sandbox, তারপর production
4. **Storage:** Gallery images-এর জন্য Supabase Storage ব্যবহার
5. **Responsive:** Mobile-first approach
6. **Performance:** Images optimize করা, Next.js Image component ব্যবহার
7. **Accessibility:** WCAG guidelines follow করা
8. **SEO:** Proper metadata, sitemap, structured data যোগ করা

---

## 🎯 সাকসেস ক্রাইটেরিয়া

- [ ] সব ৬টি কোর্স ল্যান্ডিং পেজে দেখানো হচ্ছে
- [ ] Admission form end-to-end কাজ করছে
- [ ] bKash payment integration কাজ করছে
- [ ] PDF generation কাজ করছে
- [ ] Admin সব content manage করতে পারছে
- [ ] Website responsive
- [ ] Vercel-এ deployed
- [ ] Performance score > 90 (Lighthouse)

---

## 📞 সাপোর্ট ও রিসোর্স

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **bKash API:** https://developer.bka.sh

---

**সর্বশেষ আপডেট:** [বর্তমান তারিখ]  
**প্রজেক্ট অবস্থা:** Phase 1 - চলমান  
**পরবর্তী মাইলস্টোন:** ল্যান্ডিং পেজ সম্পন্ন করা (কোর্স সহ)

