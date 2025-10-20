# SilkCity Quick Reference Card

## 🚀 Essential Commands

```bash
# Development
npm run dev                    # Start dev server (http://localhost:3000)
npm run build                  # Build for production
npm start                      # Start production server

# Database
npm run prisma:generate        # Generate Prisma client
npm run prisma:migrate         # Run migrations (creates tables)
npm run db:seed                # Seed with sample data
npm run prisma:studio          # Open database GUI (http://localhost:5555)

# Code Quality
npm run lint                   # Run ESLint
```

## 🎨 Color Classes (Tailwind)

```tsx
// Backgrounds
bg-maroon        // Deep maroon (#7B2C2C)
bg-gold          // Zari gold (#D6A93B)
bg-cream         // Neutral cream (#F6F0EB)
bg-olive         // Muted olive (#6B7A53)
bg-teal          // Dual-shade teal (#5A8B8B)

// With shades (50-900)
bg-maroon-500    // Base
bg-maroon-700    // Darker
bg-maroon-300    // Lighter

// Text & Borders
text-maroon      hover:text-gold
border-maroon    hover:border-gold
```

## 📊 Database Models Quick View

```typescript
User {
  id, email, name, role (CUSTOMER|SELLER|ADMIN)
  → orders[], offers[], customRequests[]
}

Region {
  id, name, state, description, featured
  → sarees[], galleries[]
}

Saree {
  id, title, type, fabric, price, mrp, stock
  images[], isBargainAllowed, polishPrice
  → region, offers[], orderItems[]
}

Offer {
  id, offerAmount, status (PENDING|ACCEPTED|COUNTERED|DECLINED)
  → saree, buyer
}

Order {
  id, totalAmount, paymentStatus, shippingStatus
  → user, items[]
}
```

## 🔌 API Endpoints

```bash
# Regions
GET  /api/regions              # List all (with ?featured=true)
GET  /api/regions/[id]         # Get one with sarees + galleries

# Sarees
GET  /api/sarees               # List all (filterable)
     ?regionId=xxx             # Filter by region
     ?type=Banarasi            # Filter by type
     ?minPrice=5000            # Min price
     &maxPrice=15000           # Max price
     &isBargainAllowed=true    # Only bargainable
     &search=silk              # Text search
     &page=1&limit=20          # Pagination
GET  /api/sarees/[id]          # Get one with relatedSarees
```

## 🧩 Component Patterns

### Server Component (Default)
```tsx
// src/app/products/page.tsx
export default async function ProductsPage() {
  const products = await fetch('/api/sarees').then(r => r.json());
  return <div>{/* render */}</div>;
}
```

### Client Component (Interactive)
```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function InteractiveCard() {
  const [count, setCount] = useState(0);
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </motion.div>
  );
}
```

### API Route
```tsx
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const data = await prisma.saree.findMany();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const created = await prisma.saree.create({ data: body });
  return NextResponse.json(created, { status: 201 });
}
```

## 🎭 Animation Patterns

### Fade In on Mount
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Fade In on Scroll
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Hover Effects
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Hoverable
</motion.div>
```

## 🗂 File Organization

```
src/app/
├── (auth)/              # Auth group routes
│   ├── login/
│   └── signup/
├── (shop)/              # Shop group routes
│   ├── cart/
│   ├── checkout/
│   └── products/
├── admin/               # Admin pages (protected)
│   ├── dashboard/
│   ├── products/
│   └── orders/
├── api/                 # API routes
│   ├── regions/
│   ├── sarees/
│   ├── orders/
│   └── auth/
└── page.tsx             # Homepage
```

## 🔒 Environment Variables

```bash
# Essential
DATABASE_URL="postgresql://..."

# Auth (Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."

# Payments (Razorpay)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

# Storage (AWS S3)
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET_NAME="silkcity-uploads"

# Maps (Mapbox)
NEXT_PUBLIC_MAPBOX_TOKEN="pk.eyJ..."
```

## 🛠 Adding shadcn Components

```bash
# Individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
npx shadcn@latest add tabs

# Then import and use
import { Button } from "@/components/ui/button";
```

## 📝 Prisma Queries

```typescript
import { prisma } from "@/lib/prisma";

// Find many with filters
const sarees = await prisma.saree.findMany({
  where: {
    regionId: "xxx",
    price: { gte: 5000, lte: 15000 },
    isBargainAllowed: true,
  },
  include: { region: true },
  orderBy: { createdAt: "desc" },
  take: 20,
  skip: 0,
});

// Find one
const saree = await prisma.saree.findUnique({
  where: { id: "xxx" },
  include: { region: true, offers: true },
});

// Create
const newSaree = await prisma.saree.create({
  data: {
    title: "Beautiful Silk",
    regionId: "xxx",
    type: "Banarasi",
    price: 12000,
    stock: 10,
  },
});

// Update
const updated = await prisma.saree.update({
  where: { id: "xxx" },
  data: { stock: 5 },
});

// Delete
await prisma.saree.delete({
  where: { id: "xxx" },
});
```

## 🐛 Common Issues

### Prisma Client Not Found
```bash
npm run prisma:generate
# Then restart IDE/editor
```

### Database Connection Failed
```bash
# Check .env DATABASE_URL
# Test connection:
npx prisma db pull
```

### Tailwind Not Working
```bash
# Clear cache
rm -rf .next
npm run dev
```

### Port Already in Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Or use different port:
npm run dev -- -p 3001
```

## 📊 Sample Data

**Admin Login**: admin@silkcity.com (password in seed)  
**Customer Login**: customer@example.com (password in seed)  

**14 Regions Seeded**:
- Dharmavaram (featured)
- Varanasi, Kanchipuram, Maharashtra
- Gujarat & Rajasthan, Odisha, West Bengal
- Madhya Pradesh, Karnataka, Kerala
- Gujarat, Assam, Telangana, Lucknow

## 🎯 Next Steps Checklist

- [ ] Set up PostgreSQL database
- [ ] Run `npm run prisma:migrate`
- [ ] Run `npm run db:seed`
- [ ] Start dev server: `npm run dev`
- [ ] Verify homepage loads correctly
- [ ] Build product detail page
- [ ] Build shopping cart
- [ ] Integrate authentication
- [ ] Add checkout with Razorpay
- [ ] Build admin panel

## 📚 Documentation Files

- `README.md` - Complete documentation
- `GETTING_STARTED.md` - Quick start (5 min)
- `PROJECT_SUMMARY.md` - Current status
- `QUICK_REFERENCE.md` - This file
- `env.example` - Environment template

## 🔗 Useful Links

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- shadcn/ui: https://ui.shadcn.com
- Tailwind: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

---

**Quick Help**: Check GETTING_STARTED.md for detailed walkthrough  
**Full Docs**: See README.md for complete reference


