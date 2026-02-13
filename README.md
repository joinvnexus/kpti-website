# TEXTKPTI Website

A modern, full-stack website for TEXTKPTI (Technical Education & Training Institute) built with Next.js 15+, TypeScript, Supabase, and Prisma.

## 🚀 Tech Stack

- **Framework**: Next.js 15+ (App Router, Server Components/Actions)
- **Language**: TypeScript (full type-safety)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase PostgreSQL + Prisma ORM (pooled connection via Supavisor)
- **Auth**: NextAuth.js (credentials for admin dashboard only)
- **Storage**: Supabase Storage (gallery images, uploaded files)
- **Payment**: bKash Checkout API
- **PDF Generation**: pdf-lib (server-side)
- **Forms**: react-hook-form + Zod
- **Icons**: lucide-react
- **Deployment**: Vercel

## 📁 Project Structure

```
kpti-website/
├── app/                          # App Router
│   ├── (public)/                 # Public routes (no auth)
│   │   ├── layout.tsx            # Header, footer, nav
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx
│   │   ├── courses/
│   │   │   ├── [slug]/page.tsx   # Dynamic course detail
│   │   │   └── page.tsx          # List
│   │   ├── admission/page.tsx    # Form + bKash flow
│   │   ├── gallery/page.tsx
│   │   ├── notices/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/                    # Protected routes
│   │   ├── layout.tsx            # Sidebar + header
│   │   ├── dashboard/page.tsx
│   │   ├── admissions/page.tsx   # List + status update
│   │   ├── notices/page.tsx      # CRUD
│   │   ├── courses/page.tsx
│   │   ├── gallery/page.tsx      # Upload to Supabase Storage
│   │   └── settings/page.tsx
│   ├── api/
│   │   └── bkash/
│   │       ├── create/route.ts   # Init payment
│   │       └── callback/route.ts # Handle callback
│   ├── admission-success/page.tsx # Success + PDF download
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn components
│   ├── layout/                   # Header/Footer/Sidebar
│   ├── forms/                    # Forms
│   └── shared/                   # Cards, grids
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── supabase.ts               # Supabase client (for storage)
│   ├── auth.ts                   # Auth.js config
│   ├── pdf.ts                    # PDF generator
│   └── bkash.ts                  # bKash helpers
├── prisma/
│   └── schema.prisma
├── public/                       # Static assets
├── types/
├── middleware.ts                 # Protect admin routes
└── .env.local                    # Environment variables
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account (free tier works)
- bKash merchant account (sandbox for testing)

### 2. Clone & Install

```bash
git clone <repository-url>
cd kpti-website
npm install
```

### 3. Supabase Setup

1. Create a new project in [Supabase Dashboard](https://supabase.com)
2. Go to **Project Settings → API** and copy:
   - Project URL
   - Anon Key
3. Go to **Project Settings → Database** and get connection string
4. Use **Transaction mode (port 6543)** for pooled connection:
   ```
   postgresql://postgres.[project-ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `DATABASE_URL` - Supabase pooled connection string (port 6543)
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `BKASH_*` - bKash API credentials (sandbox for testing)

### 5. Database Setup

```bash
# Push schema to database
npm run db:push

# (Optional) Seed initial data
npm run db:seed
```

### 6. Supabase Storage Setup

1. Go to **Storage** in Supabase Dashboard
2. Create buckets:
   - `gallery` (public)
   - `files` (public or private as needed)
3. Set bucket policies if needed

### 7. Install shadcn/ui Components

```bash
# Install a component (example: button)
npx shadcn@latest add button

# Install commonly used components
npx shadcn@latest add card table form input label textarea select dialog dropdown-menu
```

### 8. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📝 Database Schema

- **Course**: Course information (title, description, duration, fee)
- **Admission**: Student admission applications with payment status
- **Notice**: Public notices/announcements
- **GalleryImage**: Gallery images stored in Supabase Storage
- **User**: Admin users for dashboard access

## 🔐 Admin Access

1. Create admin user via Prisma Studio or seed script:
   ```bash
   npx prisma studio
   ```
2. Hash password with bcrypt before saving
3. Login at `/admin-login`

## 💳 bKash Integration

1. Get sandbox credentials from [bKash Developer Portal](https://developer.bka.sh)
2. Update `.env.local` with bKash credentials
3. Test payment flow in sandbox mode
4. Update `BKASH_BASE_URL` to production URL when ready

## 📦 Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel automatically:
- Detects Next.js
- Sets up HTTPS
- Provides preview URLs for PRs
- Optimizes builds

## 🗺️ Development Phases

- **Phase 1** (5-8 days): Setup, public pages, data fetching
- **Phase 2** (5-8 days): Admin dashboard, auth, CRUD, storage upload
- **Phase 3** (7-12 days): Admission form, bKash integration, PDF generation
- **Phase 4** (3-5 days): Polish, responsive design, SEO, deployment

## 📄 License

Private project for TEXTKPTI
