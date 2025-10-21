# 🚀 Supabase Setup Guide for SilkCity

## Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Click "New Project"**
3. **Fill in project details:**
   - Name: `SilkCity`
   - Database Password: Create a strong password (save this!)
   - Region: Choose closest to your users
4. **Click "Create new project"**
5. **Wait for project setup** (2-3 minutes)

## Step 2: Get Your Database Credentials

1. **Go to Project Settings** → **Database**
2. **Copy the connection string** (Connection pooling)
3. **Note down your credentials:**
   - Project URL
   - API Keys (anon and service_role)

## Step 3: Update Environment Variables

Create a `.env.local` file in your project root with:

```env
# Database - Using Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

## Step 4: Run Database Migration

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to Supabase
npx prisma db push

# Seed the database
npm run db:seed
```

## Step 5: Verify Setup

1. **Check Supabase Dashboard** → **Table Editor**
2. **Verify tables are created:**
   - User
   - Region
   - Saree
   - Order
   - OrderItem
   - Offer
   - CustomRequest
   - AdBanner
   - WorkshopGallery

## Step 6: Test Your Application

```bash
# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your application with real data!

## 🔧 Troubleshooting

### If you get connection errors:
1. Check your DATABASE_URL format
2. Ensure your Supabase project is active
3. Verify your password is correct

### If tables don't appear:
1. Run `npx prisma db push --force-reset` (WARNING: This will delete all data)
2. Then run `npm run db:seed`

## 📊 Your Database Schema

Your SilkCity database includes:
- **Users** (customers, sellers, admins)
- **Regions** (saree origins like Varanasi, Kanchipuram)
- **Sarees** (products with images, pricing, stock)
- **Orders** (purchase tracking)
- **Offers** (bargaining system)
- **Custom Requests** (custom saree orders)
- **Ad Banners** (marketing content)
- **Workshop Gallery** (region showcases)

## 🎉 Next Steps

1. **Add real product images** to your sarees
2. **Set up authentication** with Supabase Auth
3. **Configure payment integration** (Razorpay)
4. **Deploy to production** (Vercel + Supabase)

