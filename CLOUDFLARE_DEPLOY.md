# Cloudflare Pages Deployment Guide

## ⚠️ Important: Database Change Required

Your app currently uses **SQLite** (local file). Cloudflare Pages runs on **edge workers** which do NOT have filesystem access. You MUST switch to a cloud database.

### Option A: Turso (Recommended — Easiest with Prisma)

Turso provides SQLite over HTTP — works perfectly with Prisma on Cloudflare edge.

1. **Sign up** at [turso.tech](https://turso.tech) (free: 500 databases, 9GB)
2. **Create database**:
   ```bash
   # Install Turso CLI
   curl -sSfL https://get.turso.tech | bash

   # Login
   tursocl login

   # Create database
   tursocl db create braj-yatra

   # Get connection string
   tursocl db show braj-yatra --url
   # Output: libsql://braj-yatra-xxxx.turso.io
   ```
3. **Set environment variable** in Cloudflare dashboard:
   ```
   DATABASE_URL=libsql://braj-yatra-xxxx.turso.io?authToken=your-token
   ```
4. **Push schema** to Turso (run locally):
   ```bash
   DATABASE_URL="libsql://braj-yatra-xxxx.turso.io?authToken=your-token" bun run db:push
   ```
5. No code changes needed — Prisma works with Turso out of the box!

### Option B: Cloudflare D1 (Native, Free)

More complex — requires rewriting database queries (Prisma doesn't fully support D1 yet).

---

## Deployment Steps (Cloudflare Pages)

### Step 1: Push code to GitHub
Make sure your latest code is pushed to GitHub.

### Step 2: Create Cloudflare Pages project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
2. Click **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub repo: `Devloper2003/Shree-shyama-shyam-tour-travel`
4. Click **Begin setup**

### Step 3: Configure build settings

| Setting | Value |
|---------|-------|
| **Project name** | `shri-shyama-shyam-travels` |
| **Production branch** | `main` |
| **Framework preset** | `None` (custom) |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | (leave blank) |

### Step 4: Set Environment Variables

In the **Environment variables** section, add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `libsql://braj-yatra-xxxx.turso.io?authToken=your-token` (from Turso) |
| `ADMIN_DEFAULT_PASSWORD` | `vithika2026` (or your custom password) |
| `NEXT_PUBLIC_ON_CLOUDFLARE` | `1` |
| `RESEND_API_KEY` | `re_xxxxxxxx` (if using email notifications) |
| `ENQUIRY_NOTIFY_EMAIL` | `bookings@shrishyamashyamtravels.in` |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (testing) or verified domain email |

### Step 5: Set Compatibility Flags

In **Settings** → **Functions** → **Compatibility flags**:
- Add: `nodejs_compat`
- Compatibility date: `2024-09-01`

### Step 6: Deploy

Click **Save and Deploy**. First build takes 5-10 minutes.

### Step 7: Custom Domain (optional)

1. Go to **Custom domains** → **Set up a domain**
2. Enter: `shrishyamashyamtravels.in`
3. Cloudflare will automatically configure DNS (if domain is on Cloudflare)

---

## Alternative: Deploy via Wrangler CLI

If you prefer command line:

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build for Cloudflare
npx @cloudflare/next-on-pages@1

# Deploy
wrangler pages deploy .vercel/output/static --project-name=shri-shyama-shyam-travels
```

---

## Troubleshooting

### Build fails with Prisma error
- Ensure `postinstall` script runs (should be automatic)
- Check that `prisma generate` appears in build log
- If still failing, try adding `NODE_ENV=production` to env vars

### Database connection fails
- Verify Turso URL is correct (includes `?authToken=`)
- Run `bun run db:push` locally with the Turso URL to create tables
- Check Turso dashboard for database status

### API routes return 404
- Ensure `nodejs_compat` flag is set
- Check that `.vercel/output/static` directory exists after build
- Verify `_worker.js` file exists in output directory

### Images not loading
- Static images in `public/` should work automatically
- Uploaded images (blog uploads) won't persist — use cloud storage (R2, S3)

### File uploads don't work
- Cloudflare edge has no filesystem — `/api/upload` won't work
- Use Cloudflare R2 for file storage:
  1. Create R2 bucket in Cloudflare dashboard
  2. Update `/api/upload` route to save to R2 instead of local filesystem

---

## ⭐ Recommended: Use Vercel Instead

Vercel is MUCH easier for Next.js apps — no code changes needed:

1. Go to [vercel.com](https://vercel.com) → Import GitHub repo
2. Set environment variables (DATABASE_URL, etc.)
3. Click Deploy — done!

Vercel supports:
- ✅ Next.js natively (no adapter needed)
- ✅ Prisma with SQLite (or PostgreSQL via Neon)
- ✅ File uploads (via Vercel Blob)
- ✅ API routes
- ✅ Image optimization

**If you still want Cloudflare, follow the steps above.**
