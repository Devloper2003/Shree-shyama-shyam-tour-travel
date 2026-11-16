# Shree Shyama Shyam Tour and Travels — Website

A production-ready, single-page website for **Shree Shyama Shyam Tour and Travels**, a private cab service provider operating all over India. Built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, and Prisma (SQLite).

## Features

- **Single-page site with 12 anchored sections** — Hero, Marquee, How It Works, Services, Why Choose Us, Fleet Gallery, Coverage Map, Popular Routes, Fare Calculator, Testimonials, About, FAQ, Contact
- **Animated UI** — count-up stats, floating particles, marquee strip, animated tab pills (Services / Testimonials / FAQ), animated India coverage map with pulsing city dots, scroll-triggered reveals
- **Multi-step booking form** (3 steps with animated progress bar) → POST `/api/enquiries` → enquiry saved to SQLite → returns WhatsApp / Call / Email deep links so the customer can confirm via any channel
- **Fare Calculator** — interactive km × per-km-rate estimation with minimum-fare floor
- **Popular Routes** — 20 intercity routes with search + "Book this route" buttons that auto-prefill the booking form
- **WhatsApp floating button** — appears on scroll, opens a pre-filled WhatsApp chat
- **Trust & Corporate theme** — Navy + white + gold accent, full dark mode support
- **Responsive** — mobile-first with drawer menu, tablet, desktop layouts
- **Accessible** — semantic HTML, ARIA labels, `prefers-reduced-motion` honored throughout

## Tech Stack

- Next.js 16 (App Router) + TypeScript 5
- Tailwind CSS 4 + shadcn/ui (New York style)
- Prisma ORM (SQLite)
- Framer Motion (animations)
- React Hook Form + Zod (form validation)

## Getting Started

### 1. Install dependencies

```bash
bun install
# or
npm install
```

### 2. Configure environment

Copy the example env file and adjust if needed:

```bash
cp .env.example .env
```

The default `DATABASE_URL` points to a local SQLite file at `db/custom.db`.

### 3. Set up the database

```bash
bun run db:push
# or
npx prisma db push --accept-data-loss
```

This creates the SQLite database and the `Enquiry` table.

### 4. Update your business contact details

Edit **`src/lib/site-config.ts`** and replace the placeholder values with your real:

- Phone number (`phoneDisplay`, `phoneRaw`)
- WhatsApp number (`whatsappDisplay`, `whatsappRaw`)
- Email (`email`)
- Office address
- Social media links
- Business stats (happy clients, cities covered, etc.)

All sections (header, hero, footer, contact card, WhatsApp button, API response, booking success screen) read from this single file — one update propagates everywhere.

### 5. Run the dev server

```bash
bun run dev
# or
npm run dev
```

Open <http://localhost:3000> in your browser.

### 6. Customize content (optional)

All static content lives in **`src/lib/site-data.ts`**:

- `vehicles` — cab types, pricing, seating
- `popularRoutes` — intercity routes
- `testimonials` — customer reviews
- `faqs` — FAQ items (categorized)
- `whyChooseUs` — USP cards
- `aboutPoints` — About section content

## Project Structure

```
.
├── prisma/
│   └── schema.prisma          # Enquiry model
├── public/                    # Static assets (logo, robots.txt)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── enquiries/route.ts   # POST endpoint (saves enquiry, returns deep links)
│   │   │   └── route.ts
│   │   ├── globals.css        # Trust & Corporate theme (Navy + gold)
│   │   ├── layout.tsx         # Root layout + metadata
│   │   └── page.tsx           # Assembles all sections
│   ├── components/
│   │   ├── site/              # All website sections (13 components)
│   │   │   ├── header.tsx
│   │   │   ├── hero.tsx              # Floating particles + count-up stats
│   │   │   ├── marquee.tsx           # Infinite scrolling strip
│   │   │   ├── how-it-works.tsx      # 4-step animated process
│   │   │   ├── services.tsx          # Animated tabs (Economy/Premium/Group)
│   │   │   ├── why-choose-us.tsx
│   │   │   ├── fleet.tsx             # SVG vehicle illustrations
│   │   │   ├── coverage.tsx          # Animated India map
│   │   │   ├── routes.tsx            # 20 popular intercity routes
│   │   │   ├── fare-calculator.tsx   # Interactive fare estimation
│   │   │   ├── testimonials.tsx      # Tabbed reviews filter
│   │   │   ├── about.tsx
│   │   │   ├── faq.tsx               # Categorized FAQ tabs
│   │   │   ├── contact.tsx           # 3-step multi-step booking form
│   │   │   ├── footer.tsx
│   │   │   ├── whatsapp-float.tsx    # Floating WhatsApp button
│   │   │   └── count-up.tsx          # Animated counter component
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/
│   │   ├── use-count-up.ts    # Animated count-up hook
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   └── lib/
│       ├── site-config.ts     # ← EDIT THIS: your contact details
│       ├── site-data.ts       # ← EDIT THIS: vehicles, routes, testimonials, FAQs
│       ├── db.ts              # Prisma client
│       └── utils.ts
├── .env.example               # Safe env template (committed)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## How the Booking Flow Works

1. Customer fills the 3-step booking form (Trip Details → Your Info → Review)
2. On submit, `POST /api/enquiries` is called
3. The API:
   - Validates required fields
   - Saves the enquiry to the SQLite `Enquiry` table (with `status: "new"`)
   - Returns three pre-filled deep links: WhatsApp (`wa.me`), Phone (`tel:`), Email (`mailto:`)
4. The success screen shows all three options so the customer can pick the fastest channel
5. The business receives the enquiry via email, WhatsApp, AND phone — regardless of which channel the customer prefers

## Deployment

This is a standard Next.js app and can be deployed to any Node.js-friendly host (Vercel, Netlify, Render, etc.). Make sure to:

1. Set the `DATABASE_URL` environment variable on your host
2. Run `prisma db push` on first deploy to create the database
3. Use a persistent volume for the SQLite file (or switch to PostgreSQL/MySQL for production)

## License

Proprietary — © Shree Shyama Shyam Tour and Travels. All rights reserved.
