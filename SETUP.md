# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15+
- Prisma & Prisma Client
- Supabase client
- NextAuth.js
- Tailwind CSS v3 + shadcn/ui dependencies
- React Hook Form + Zod
- pdf-lib
- And more...

### 2. Set Up Supabase

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Wait for database to initialize

2. **Get Connection Strings**
   - Go to **Project Settings → API**
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   
3. **Get Database URL (Pooled)**
   - Go to **Project Settings → Database**
   - Under **Connection string**, select **Transaction mode**
   - Copy the connection string (port 6543)
   - Format: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`
   - This goes in `DATABASE_URL`

4. **Create Storage Buckets**
   - Go to **Storage** in Supabase Dashboard
   - Create bucket: `gallery` (make it public)
   - Create bucket: `files` (public or private as needed)

### 3. Create Environment File

Create `.env.local` in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# bKash (Sandbox)
BKASH_APP_KEY=your-bkash-app-key
BKASH_APP_SECRET=your-bkash-app-secret
BKASH_USERNAME=your-bkash-username
BKASH_PASSWORD=your-bkash-password
BKASH_BASE_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta
BKASH_CALLBACK_URL=http://localhost:3000/api/bkash/callback
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Initialize Database

```bash
# Push Prisma schema to Supabase
npm run db:push

# (Optional) Seed initial data
npm run db:seed
```

### 5. Install shadcn/ui Components

Install commonly used components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add table
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add sidebar
npx shadcn@latest add badge
```

### 6. Create Admin User

You can create an admin user via Prisma Studio:

```bash
npx prisma studio
```

Then:
1. Open `User` table
2. Click "Add record"
3. Fill in:
   - `email`: admin@example.com
   - `passwordHash`: Hash password with bcrypt (use online tool or script)
   - `name`: Admin Name
   - `role`: ADMIN

Or create a seed script in `prisma/seed.ts` to create admin user.

### 7. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 8. Access Admin Dashboard

- Go to http://localhost:3000/admin-login
- Login with admin credentials
- Access dashboard at http://localhost:3000/admin/dashboard

## Project Structure Notes

- **Public Routes**: `app/(public)/` - No authentication required
- **Admin Routes**: `app/admin/` - Protected by middleware, requires authentication
- **API Routes**: `app/api/` - Server-side API endpoints
- **Components**: `components/` - Reusable React components
- **Lib**: `lib/` - Utility functions and configurations
- **Prisma**: `prisma/` - Database schema and migrations

## Next Steps

1. ✅ Project setup complete
2. ⏭️ Build public pages (home, courses, gallery, notices)
3. ⏭️ Implement admin dashboard with CRUD operations
4. ⏭️ Add admission form with bKash payment integration
5. ⏭️ Implement PDF generation
6. ⏭️ Polish UI/UX and make responsive
7. ⏭️ Deploy to Vercel

## Troubleshooting

### Database Connection Issues
- Ensure `DATABASE_URL` uses port **6543** (pooled connection)
- Check Supabase project is active
- Verify password is correct

### Supabase Storage Issues
- Ensure buckets are created
- Check bucket policies allow public access (for gallery)
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct

### Auth Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your dev/prod URL
- Ensure admin user exists in database

### bKash Integration
- Start with sandbox credentials
- Test payment flow in development
- Update to production credentials when ready

