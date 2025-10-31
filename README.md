# 🎓 YD7 LMS - Learning Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=black)

A modern, full-stack Learning Management System built with Next.js 16, featuring advanced authentication, course management, and rich text editing capabilities.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables) • [Scripts](#-scripts)

</div>

---

## ✨ Features

### 🔐 Authentication & Security

- **Multi-provider OAuth** - Google & GitHub authentication
- **Email OTP** - Passwordless login with one-time passwords
- **Google One Tap** - Streamlined sign-in experience
- **Rate Limiting** - Powered by Arcjet for API protection
- **Session Management** - Secure session handling with Better Auth

### 📚 Course Management

- **Course Creation** - Rich course creation interface
- **Drag & Drop** - Reorderable course content using DnD Kit
- **File Uploads** - S3-compatible storage for images and assets
- **Rich Text Editor** - TipTap editor with emoji support

### 🎨 User Interface

- **Modern Design** - Built with shadcn/ui components
- **Dark Mode** - System-aware theme switching
- **Responsive** - Mobile-first responsive design
- **Data Tables** - Advanced tables with TanStack Table
- **Charts** - Interactive visualizations with Recharts (using shadcn/ui)

### 📧 Email System

- **Transactional Emails** - React Email templates
- **Resend Integration** - Reliable email delivery
- **OTP Verification** - Email verification codes

---

## 🛠 Tech Stack

### Core

- **Framework:** Next.js v16 with Turbopack
- **Library:** React 19.2.0
- **Language:** TypeScript
- **Styling:** TailwindCSS

### Backend & Database

- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** Better Auth
- **File Storage:** AWS S3

### UI Components

- **Component Library:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React, Tabler Icons
- **Forms:** React Hook Form with Zod validation
- **Editor:** TipTap
- **Drag & Drop:** DnD Kit

### Developer Experience

- **Validation:** Zod
- **Environment:** T3 Env (For Validating Variables Environment)
- **Email Dev:** React Email with live preview
- **Linting:** ESLint with Next.js config

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database
- **AWS S3** or S3-compatible storage

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yousefdawood7/yd7-lms.git
   cd yd7-lms
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables))

4. **Set up the database**

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

### 🗄️ Database

```env
DATABASE_URL="postgresql://user:password@localhost:5432/yd7_lms"
```

### 🔐 Authentication

```env
# Better Auth Configuration
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key-min-32-characters"

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 📧 Email Service

```env
# Resend API Key
RESEND_SECRET_KEY="re_your-resend-api-key"
```

### 🛡️ Security

```env
# Arcjet (Rate Limiting & Security)
ARCJET_KEY="ajkey_your-arcjet-key"
```

### ☁️ File Storage (AWS S3)

```env
# AWS Credentials
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"

# S3 Configuration
AWS_ENDPOINT_URL_S3="https://s3.amazonaws.com"
AWS_ENDPOINT_URL_IAM="https://iam.amazonaws.com"
NEXT_PUBLIC_AWS_BUCKET_NAME="your-bucket-name"
```

### 📝 Environment Variable Notes

- **Required:** All variables listed above are required for the application to function
- **Secrets:** Use strong, random strings for `BETTER_AUTH_SECRET` (minimum 32 characters)
- **OAuth Setup:**
  - [Google Cloud Console](https://console.cloud.google.com/) for Google OAuth
  - [GitHub Developer Settings](https://github.com/settings/developers) for GitHub OAuth
- **Email:** Sign up at [Resend](https://resend.com) for the API key
- **Security:** Get your Arcjet key from [Arcjet Dashboard](https://app.arcjet.com)
- **Storage:** Use AWS S3 or any S3-compatible service (e.g., MinIO, DigitalOcean Spaces)

### 🎯 Type-Safe Environment Variables

This project uses **T3 Env** (`@t3-oss/env-nextjs`) for **100% type-safe environment variables**! 🎉

Check out `src/lib/env.ts` to see the magic:

```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    // ... all server-side variables with Zod validation
  },
  client: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_AWS_BUCKET_NAME: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_AWS_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  },
});
```

#### ✨ Why i used this:

- **🔒 Type Safety** - Full TypeScript autocomplete for all environment variables
- **✅ Runtime Validation** - Zod validates all env vars on startup
- **🚫 Build-Time Errors** - Missing or invalid env vars fail fast at build time
- **📚 Self-Documenting** - The schema IS the documentation
- **🎯 No Typos** - TypeScript prevents `proces.env` or `DATABSE_URL` mistakes
- **🔐 Server/Client Split** - Clear separation of server-only and public variables

---

## 📜 Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack

# Build
pnpm build            # Build for production with Turbopack
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors automatically
pnpm type:check       # TypeScript type checking

# Database
pnpm prisma generate  # Generate Prisma Client
pnpm prisma studio    # Open Prisma Studio
pnpm prisma db push   # Push schema changes to database

# Email Development
pnpm email            # Start email preview server
```

---

## 📂 Project Structure

```
yd7-lms/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── (auth)/           # Authentication pages
│   │   ├── (public)/         # Public pages
│   │   ├── dashboard/        # Protected dashboard
│   │   └── api/              # API routes
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── sidebar/         # Sidebar components
│   │   └── theme/           # Theme components
│   ├── features/            # Feature-based modules
│   │   ├── auth/           # Authentication features
│   │   ├── courses/        # Course management
│   │   ├── editor/         # Rich text editor
│   │   ├── emails/         # Email templates
│   │   └── imageUploader/  # Image upload functionality
│   ├── lib/                # Utility libraries
│   │   ├── auth.ts         # Auth configuration
│   │   ├── env.ts          # Environment validation
│   │   ├── s3.ts           # S3 client setup
│   │   └── utils.ts        # Utility functions
│   └── hooks/              # Custom React hooks
└── package.json
```

---

## 🎨 Features in Detail

### Course Editor

- **Rich Text Editing** with TipTap
- **Text Alignment** and formatting options
- **Emoji Support** for engaging content
- **Drag & Drop** content reordering
- **Auto-save** functionality

### File Upload System

- **Drag & Drop** file uploads
- **S3 Integration** for scalable storage
- **Image Preview** with zoom functionality
- **Progress Tracking** during uploads
- **File Type Validation**

### Dashboard

- **Interactive Charts** for analytics
- **Data Tables** with sorting and filtering
- **Course Management** interface
- **User Profile** management

---

## 🔒 Security Features

- **Rate Limiting** - Arcjet integration for API protection
- **CSRF Protection** - Built-in with Better Auth
- **Secure Sessions** - HTTPOnly cookies
- **Input Validation** - Zod schema validation
- **SQL Injection Protection** - Prisma ORM

---

## 📧 Email Templates

Email templates are built with React Email and located in `src/features/emails/components/`.

Preview and develop emails:

```bash
pnpm email
```

Access the preview server at `http://localhost:3001` (email preview)

---

## 👨‍💻 Author

**Yousef Dawood**

- GitHub: [@yousefdawood7](https://github.com/yousefdawood7)
- Website: [yousefdawood.me](https://yousefdawood.me)

---

<div align="center">
  
**Built with ❤️ using Next.js, React, and TypeScript**

</div>
