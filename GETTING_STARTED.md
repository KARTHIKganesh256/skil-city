# Getting Started with SilkCity

This guide will help you get the SilkCity application up and running quickly.

## ✅ What's Been Set Up

Your project scaffold is complete with:

✅ **Next.js 15** with TypeScript, App Router, and Turbopack
✅ **Tailwind CSS v4** with custom SilkCity color palette
✅ **shadcn/ui** components (button, card, badge)
✅ **Prisma ORM** with complete database schema
✅ **Framer Motion** for smooth animations
✅ All core dependencies installed (Mapbox, AWS SDK, Supabase, Razorpay, etc.)
✅ **Homepage** with Hero, Dharmavaram Spotlight, and Region grid
✅ **API routes** for regions and sarees
✅ **Seed script** with 14 regions and sample sarees
✅ Custom color palette (Maroon, Gold, Cream, Olive, Teal)
✅ Comprehensive README with deployment instructions

## 🚀 Quick Start (5 minutes)

### 1. Set Up Your Database

You have two options:

#### Option A: Local PostgreSQL (Recommended for Development)
If you have PostgreSQL installed locally:

```bash
# Update .env with your local database
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/silkcity?schema=public"
```

#### Option B: Free Cloud Database (Easiest)
Use Supabase or Neon for a free PostgreSQL database:

1. **Supabase**: Go to [supabase.com](https://supabase.com) → New Project
2. Copy the connection string (pooling mode)
3. Update `.env`:
```bash
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

### 2. Generate Prisma Client & Run Migrations

```bash
# Generate the Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:migrate

# When prompted, enter migration name: "init"
```

### 3. Seed the Database

```bash
npm run db:seed
```

This creates:
- 14 regions (Dharmavaram, Varanasi, Kanchipuram, etc.)
- Sample sarees for each region
- Admin user: `admin@silkcity.com`
- Test customer: `customer@example.com`

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

## 🎨 What You'll See

### Homepage Features
- **Animated Hero Section**: Smooth entrance animations with gradient backgrounds
- **Dharmavaram Spotlight**: Featured section highlighting the heritage
- **Region Grid**: 14 beautifully animated region cards
- **Hover Effects**: Cards lift and borders change color on hover
- **Scroll Animations**: Elements fade in as you scroll

### Current Pages
- `/` - Homepage with Hero, Dharmavaram section, and region grid
- `/api/regions` - List all regions
- `/api/regions/[id]` - Get specific region with sarees
- `/api/sarees` - List sarees with filtering
- `/api/sarees/[id]` - Get specific saree details

## 🎯 Next Steps to Build

Here's what to build next (in recommended order):

### Phase 1: Core Shopping Experience

1. **Product Detail Page** (`/sarees/[id]`)
   - Large image carousel with zoom
   - Product info (price, fabric, characteristics)
   - Polish service toggle
   - Add to cart button
   - Related sarees section

2. **Shopping Cart** (`/cart`)
   - Cart items with quantity controls
   - Polish service indicator
   - Total calculation
   - Checkout button

3. **Region Detail Page** (`/regions/[id]`)
   - Region information
   - Filtered saree grid
   - Workshop gallery (if available)

### Phase 2: Authentication & Checkout

4. **Authentication**
   - Set up Supabase Auth
   - Login/signup modals
   - User profile page
   - Protected routes

5. **Checkout Flow** (`/checkout`)
   - Shipping address form
   - Payment integration (Razorpay)
   - Order confirmation

6. **Order Tracking** (`/orders/[id]`)
   - Order status
   - Tracking information
   - Invoice download

### Phase 3: Special Features

7. **Bargaining System**
   - "Make an Offer" button on eligible products
   - Offer submission modal
   - Offer status tracking for customers
   - Admin offer management

8. **Custom Saree Builder** (`/custom-builder`)
   - Border selection
   - Pallu pattern picker
   - Color swatches
   - Preview canvas
   - Request quote form

9. **Workshop Gallery** (`/gallery/dharmavaram`)
   - Image grid with lightbox
   - Video player
   - Mapbox integration for location

### Phase 4: Admin Panel

10. **Admin Dashboard** (`/admin`)
    - Sales overview
    - Pending offers count
    - Recent orders
    - Low stock alerts

11. **Admin Product Management** (`/admin/products`)
    - Product CRUD with image upload to S3
    - Bulk operations
    - Inventory management

12. **Admin Order Management** (`/admin/orders`)
    - Order list with filters
    - Status updates
    - Shipping label generation
    - Invoice printing

13. **Admin Offer Management** (`/admin/offers`)
    - Pending offers list
    - Accept/counter/decline actions
    - Payment link generation

14. **Admin Content Management**
    - Banner upload and scheduling
    - Region page editing
    - Workshop gallery management

## 🛠 Development Tips

### Viewing the Database
```bash
npm run prisma:studio
```
Opens a visual database editor at [http://localhost:5555](http://localhost:5555)

### Adding More Regions or Sarees
Edit `prisma/seed.ts` and re-run:
```bash
npm run db:seed
```

### Installing More shadcn Components
```bash
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add textarea
```

### Creating New API Routes
Create files in `src/app/api/[endpoint]/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Your logic here
  return NextResponse.json({ data: "response" });
}
```

### Using Prisma in Components
```typescript
import { prisma } from "@/lib/prisma";

// In a Server Component or API route
const sarees = await prisma.saree.findMany({
  where: { regionId: "some-id" },
  include: { region: true },
});
```

## 🎨 Using the Color Palette

The custom colors are available in Tailwind:

```tsx
// Backgrounds
<div className="bg-maroon">         {/* Deep maroon */}
<div className="bg-gold">           {/* Zari gold */}
<div className="bg-cream">          {/* Neutral cream */}
<div className="bg-olive">          {/* Muted olive */}
<div className="bg-teal">           {/* Dual-shade teal */}

// Text colors
<p className="text-maroon">
<p className="text-gold">

// Borders
<div className="border-maroon hover:border-gold">

// Shades (for maroon, gold, olive, teal)
<div className="bg-maroon-500">     {/* Base shade */}
<div className="bg-maroon-700">     {/* Darker */}
<div className="bg-maroon-300">     {/* Lighter */}
```

## 🧪 Adding Animations

The project uses Framer Motion. Here's a quick example:

```tsx
"use client";

import { motion } from "framer-motion";

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      Card content
    </motion.div>
  );
}
```

## 📝 Environment Variables You'll Need

For full functionality, you'll need to set up:

### Required Now
- ✅ `DATABASE_URL` - Already set up

### Needed for Authentication
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Needed for Payments
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

### Needed for Images
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`
- `AWS_REGION`

### Needed for Maps
- `NEXT_PUBLIC_MAPBOX_TOKEN`

See `env.example` for the complete list and setup instructions in `README.md`.

## 🐛 Common Issues

### "Prisma Client not found"
```bash
npm run prisma:generate
```

### "Cannot connect to database"
1. Check your `DATABASE_URL` in `.env`
2. Ensure PostgreSQL is running (if local)
3. Test connection: `npx prisma db pull`

### Tailwind styles not applying
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript errors after adding Prisma models
```bash
npm run prisma:generate
```
Restart your IDE/editor

## 📚 Key Files to Know

- `src/app/page.tsx` - Homepage
- `src/app/layout.tsx` - Root layout with fonts and metadata
- `src/app/globals.css` - Global styles and Tailwind setup
- `tailwind.config.ts` - Tailwind configuration with custom colors
- `prisma/schema.prisma` - Database schema
- `src/lib/prisma.ts` - Prisma client singleton
- `src/components/` - Reusable React components
- `src/components/ui/` - shadcn/ui components

## 🎯 Your Mission

You now have a solid foundation. Your next goals:

1. ✅ Get the dev server running (you should see the homepage)
2. 🔨 Build the product detail page (use the `/api/sarees/[id]` endpoint)
3. 🔨 Create a shopping cart (use Next.js App Router state or Zustand)
4. 🔨 Implement authentication with Supabase
5. 🔨 Add checkout with Razorpay

## 💡 Pro Tips

1. **Use Server Components**: Fetch data directly in Server Components (no need for `useEffect`)
2. **Client Components**: Only use `"use client"` when you need interactivity
3. **Parallel Routes**: Use API routes with `fetch` and React Query for client-side data
4. **Image Optimization**: Use Next.js `<Image>` component for automatic optimization
5. **Type Safety**: Leverage Prisma's generated types for end-to-end type safety

## 🎉 You're All Set!

The foundation is ready. Time to build something amazing!

For detailed deployment instructions, see `README.md`.

For questions or issues, refer to the troubleshooting section in `README.md`.

**Happy coding! 🚀**


