# Deployment Guide — Shri Shyama Shyam Tour & Travels

This guide covers deploying the Braj Yatra website to **Vercel**, **Cloudflare Pages**,
**Hostinger**, and other hosting platforms.

---

## Prerequisites

- GitHub repository: `https://github.com/Devloper2003/Shree-shyama-shyam-tour-travel`
- Node.js 18+ or Bun runtime
- A hosting account (Vercel / Cloudflare / Hostinger / etc.)

---

## 1. Vercel (Recommended — Easiest)

Vercel is the recommended platform for Next.js apps. It handles everything automatically.

### Steps:
1. Go to [vercel.com](https://vercel.com) and sign up / log in
2. Click **"Add New Project"** → Import your GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. **Environment Variables** → Add:
   ```
   DATABASE_URL=file:./db/custom.db
   ```
5. Click **Deploy**
6. After deploy, go to **Settings → Functions** and ensure serverless functions are enabled

### Database for Vercel:
SQLite works for development but **for production on Vercel**, use a persistent database:
- **Option A**: Use [Turso](https://turso.tech) (SQLite at the edge, free tier)
  - Set `DATABASE_URL` to your Turso connection string
  - Change Prisma datasource to `sqlite` with Turso URL
- **Option B**: Use [PlanetScale](https://planetscale.com) or [Neon](https://neon.tech) (MySQL/PostgreSQL)
  - Update `prisma/schema.prisma` datasource provider
  - Run `prisma db push`

### Custom Domain:
- Go to **Settings → Domains** → Add your domain (e.g., `shrishyamashyamtravels.in`)
- Follow DNS instructions (add CNAME/A record)

---

## 2. Cloudflare Pages

Cloudflare Pages supports Next.js via the `@cloudflare/next-on-pages` adapter.

### Steps:
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create a project** → Connect GitHub repo
3. Framework preset: **Next.js**
4. Build command: `npx @cloudflare/next-on-pages`
5. Output directory: `.vercel/output/static`
6. **Environment Variables** → Add `DATABASE_URL`
7. Click **Deploy**

### Note:
Cloudflare Pages runs on edge workers. SQLite may not work directly — use
[Turso](https://turso.tech) (edge SQLite) or [Cloudflare D1](https://developers.cloudflare.com/d1/).

---

## 3. Hostinger (VPS / Shared Hosting)

Hostinger supports Node.js apps on VPS plans.

### Steps for VPS:
1. SSH into your Hostinger VPS
2. Clone the repo:
   ```bash
   git clone https://github.com/Devloper2003/Shree-shyama-shyam-tour-travel.git
   cd Shree-shyama-shyam-tour-travel
   ```
3. Install dependencies:
   ```bash
   bun install  # or npm install
   ```
4. Create `.env` file:
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   ```
5. Push database schema:
   ```bash
   bun run db:push
   ```
6. Build the app:
   ```bash
   bun run build
   ```
7. Start the production server:
   ```bash
   bun run start
   ```
8. Set up a reverse proxy (Nginx) to forward port 3000 to your domain

### Using PM2 (process manager):
```bash
npm install -g pm2
pm2 start "bun run start" --name braj-yatra
pm2 startup
pm2 save
```

---

## 4. Other Platforms (Netlify, Railway, Render)

### Netlify:
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add `DATABASE_URL` environment variable
5. Use [Netlify Functions](https://docs.netlify.com/functions/overview/) for API routes

### Railway:
1. Connect GitHub repo
2. Railway auto-detects Next.js
3. Add `DATABASE_URL` environment variable
4. Railway provides a PostgreSQL database — update Prisma schema accordingly
5. Deploy

### Render:
1. Connect GitHub repo
2. Type: Web Service
3. Build: `npm install && npm run build`
4. Start: `npm run start`
5. Add `DATABASE_URL` environment variable

---

## Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | `file:./db/custom.db` (dev) or database URL (prod) | Prisma database connection |

For production, also set these in `src/lib/site-config.ts`:
- Phone number
- WhatsApp number
- Email
- Address
- Social media links

---

## Post-Deployment Checklist

- [ ] Website loads at your domain
- [ ] All pages work (/, /package, /services, /blogs, /contact, /about)
- [ ] Booking form submits and enquiry saves to database
- [ ] WhatsApp button opens WhatsApp with pre-filled message
- [ ] Call button dials the phone number
- [ ] Admin panel accessible at `/admin` (password: `vithika2026`)
- [ ] Blog posts can be added/edited/deleted via admin
- [ ] Offers can be added/edited/deleted via admin
- [ ] Map shows real OpenStreetMap with markers
- [ ] Images load correctly (logo, temple photos, car photos)
- [ ] SSL/HTTPS is enabled (most platforms do this automatically)

---

## Admin Panel Access

- URL: `https://yourdomain.com/admin`
- Password: `vithika2026`
- **Change the password** in `src/components/site/pages/admin-page.tsx` (line with `ADMIN_PASSWORD`)
- For production security, upgrade to [NextAuth.js](https://next-auth.js.org)

---

## Updating Content

### Blog Posts:
1. Go to `/admin` → login
2. Click "Blog Posts" tab
3. Fill in title, excerpt, content, category
4. Click "Publish Post"
5. Post appears on the Blogs page immediately

### Offers:
1. Go to `/admin` → login
2. Click "Offers" tab
3. Fill in title, description, discount, valid till
4. Click "Add Offer"

### Pricing:
Pricing is in `src/lib/site-data.ts` → edit the `yatraPackages` and `vehicles` arrays.
After editing, redeploy the app.

### Contact Details:
Edit `src/lib/site-config.ts` → update phone, email, address, etc.
After editing, redeploy the app.

---

## Troubleshooting

### Database errors:
- Ensure `DATABASE_URL` is set correctly
- Run `bun run db:push` to create tables
- For SQLite, ensure the `db/` directory is writable

### Images not loading:
- Check that `public/` directory is deployed
- Logo: `public/logo.png`
- Temple images: `public/sites/*.jpg`
- Car images: `public/fleet/*.jpg`

### API routes not working:
- Ensure the hosting platform supports Next.js API routes
- Check serverless function logs
- Ensure `DATABASE_URL` is available to serverless functions

### Map not showing:
- OpenStreetMap embed should work on all platforms
- If blocked, check CSP headers or firewall rules
