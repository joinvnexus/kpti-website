# KPTI Website

A modern Next.js 14 web application for KPTI (Kishoreganj Polytechnic Institute) with admin panel, admission management, and payment integration.

## Features

- **Public Pages**: Home, About, Courses, Gallery, Notices, Contact, Admission
- **Admin Dashboard**: Manage admissions, courses, gallery, notices, and settings
- **Authentication**: NextAuth.js with role-based access (admin/user)
- **Database**: Prisma ORM with SQLite (easily switchable to PostgreSQL/MySQL)
- **Payment Integration**: bKash payment gateway support
- **PDF Generation**: Generate admission confirmation PDFs
- **Responsive Design**: Mobile-friendly UI with modern styling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: bKash API
- **PDF**: Custom PDF generation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure your database URL, NextAuth secret, and API keys in `.env`.

3. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── (admin)/              # Admin panel routes
│   ├── dashboard/        # Admin dashboard
│   ├── admissions/       # Manage admissions
│   ├── courses/          # Manage courses
│   ├── gallery/          # Manage gallery
│   ├── notices/          # Manage notices
│   └── settings/         # Admin settings
├── (public)/             # Public website routes
│   ├── about/           # About page
│   ├── admission/        # Admission form
│   ├── contact/          # Contact page
│   ├── courses/          # Course listings
│   ├── gallery/          # Public gallery
│   └── notices/          # Public notices
├── admin-login/          # Admin login page
├── api/                  # API routes
│   ├── admission/        # Admission endpoints
│   ├── auth/             # Authentication endpoints
│   └── bkash/            # Payment endpoints
└── admission-success/    # Payment success page
```

## Admin Credentials

Default admin credentials (after seeding):
- **Email**: admin@textkpti.local
- **Password**: admin@123

## API Endpoints

- `POST /api/admission` - Submit admission form
- `POST /api/admission/pdf` - Generate admission PDF
- `POST /api/bkash/create` - Create payment
- `POST /api/bkash/callback` - Payment callback

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)

## License

MIT
