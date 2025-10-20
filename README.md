# SilkCity - Dharmavaram Saree Store

A full-stack PWA/mobile-ready web application for selling authentic Indian sarees with a focus on Dharmavaram silk. Features a beautiful animated UI, region-based browsing, bargaining system, custom saree builder, polish service, and comprehensive admin panel.

## 🎨 Features

### Customer Features
- **Browse by Region**: Explore sarees organized by Indian regions with detailed characteristics
- **Product Details**: High-quality images, zoom, video drapes, weave information
- **Bargaining System**: Make offers on premium sarees with real-time negotiation
- **Polish Service**: Add polish service to orders for saree maintenance
- **Custom Saree Builder**: Design custom sarees with border & pallu pattern selection
- **Advanced Filters**: Filter by region, type, price, fabric, bargain availability
- **Guest Checkout**: Purchase without account creation
- **Order Tracking**: Real-time shipment tracking and status updates

### Admin Features
- **Dashboard**: Sales summary, pending offers, inventory alerts
- **Product Management**: CRUD operations for sarees with image uploads
- **Order Management**: Update order/shipping status, print invoices
- **Bargaining Interface**: Accept/counter/decline offers, send payment links
- **Custom Order Management**: Track custom saree requests and assign to weavers
- **Banner Management**: Upload and schedule promotional banners
- **Content Management**: Edit region pages, workshop galleries, SEO metadata

### Unique Features
- **Dharmavaram Spotlight**: Featured section highlighting Dharmavaram heritage
- **Workshop Gallery**: Behind-the-scenes weaving process with images/videos
- **Mapbox Integration**: Interactive region maps and workshop locations
- **Dual-shade Theme**: Inspired by Dharmavaram dual-shade sarees
- **Smooth Animations**: Framer Motion powered interactions throughout

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router) with React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with JIT compiler
- **UI Components**: shadcn/ui (primary), Tailark, Aceternity UI components
- **Animations**: Framer Motion, Motion Primitives, @formkit/auto-animate
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Next.js API Routes (serverless)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Supabase Auth (email/OTP + social logins)
- **File Storage**: AWS S3 / Supabase Storage
- **Payments**: Razorpay (India) / Stripe (Global)

### Additional Services
- **Maps**: Mapbox GL for region maps
- **Analytics**: Plausible / Google Analytics ready
- **Push Notifications**: OneSignal / Firebase Cloud Messaging ready

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd silkcity
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy the example environment file:
```bash
cp env.example .env
```

Update `.env` with your actual credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/silkcity?schema=public"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET_NAME="silkcity-uploads"

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

### 4. Database Setup

#### Generate Prisma Client
```bash
npm run prisma:generate
```

#### Run Migrations
```bash
npm run prisma:migrate
```
This will prompt for a migration name, e.g., "init"

#### Seed the Database
```bash
npm run db:seed
```
This will populate your database with:
- 14 regions (including Dharmavaram as featured)
- Sample sarees for each region
- Admin user: `admin@silkcity.com`
- Test customer: `customer@example.com`

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🗄 Database Schema

### Main Models
- **User**: Customers, sellers, admins with role-based access
- **Region**: Indian regions with saree types and characteristics
- **Saree**: Products with pricing, images, bargaining options
- **Offer**: Bargaining offers with status tracking
- **Order**: Customer orders with payment and shipping status
- **OrderItem**: Individual items in orders with polish option
- **CustomRequest**: Custom saree design requests
- **AdBanner**: Promotional banners with scheduling
- **WorkshopGallery**: Regional workshop images/videos

### Enums
- **Role**: CUSTOMER, SELLER, ADMIN
- **OfferStatus**: PENDING, ACCEPTED, COUNTERED, DECLINED
- **PaymentStatus**: PENDING, PAID, FAILED, REFUNDED
- **ShippingStatus**: PLACED, PROCESSING, SHIPPED, IN_TRANSIT, DELIVERED, RETURNED
- **CustomRequestStatus**: PENDING, QUOTED, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Select the `silkcity` directory

2. **Configure Environment Variables**
   - Add all variables from `.env` in Vercel dashboard
   - Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
   - Update `DATABASE_URL` to production database

3. **Database Setup**
   - Use Vercel Postgres, Supabase, or Railway for PostgreSQL
   - Run migrations: `npx prisma migrate deploy`
   - Run seed: `npm run db:seed`

4. **Deploy**
   - Vercel will auto-deploy on push to main branch

### Railway Deployment (Alternative)

1. **Create Railway Project**
   ```bash
   railway init
   ```

2. **Add PostgreSQL**
   ```bash
   railway add postgres
   ```

3. **Deploy**
   ```bash
   railway up
   ```

4. **Run Migrations**
   ```bash
   railway run npm run prisma:migrate
   railway run npm run db:seed
   ```

## 📁 Project Structure

```
silkcity/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   │   ├── regions/       # Region endpoints
│   │   │   ├── sarees/        # Saree endpoints
│   │   │   ├── offers/        # Bargaining endpoints
│   │   │   ├── orders/        # Order endpoints
│   │   │   └── custom-requests/ # Custom saree endpoints
│   │   ├── regions/           # Region pages
│   │   ├── sarees/            # Product pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # shadcn components
│   │   ├── Hero.tsx
│   │   ├── RegionCard.tsx
│   │   └── DharmawaramSpotlight.tsx
│   └── lib/                   # Utilities
│       ├── prisma.ts          # Prisma client
│       └── utils.ts           # Helper functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── components.json            # shadcn config
├── env.example                # Environment template
└── package.json               # Dependencies
```

## 🎨 Color Palette

The app uses a custom color scheme inspired by Dharmavaram silk:

- **Primary (Maroon)**: `#7B2C2C` - Deep, rich maroon
- **Secondary (Gold)**: `#D6A93B` - Zari gold accents
- **Cream**: `#F6F0EB` - Neutral background
- **Olive**: `#6B7A53` - Muted accent
- **Teal**: `#5A8B8B` - Dual-shade highlight

Colors are defined in `tailwind.config.ts` and can be used as:
```tsx
<div className="bg-maroon text-gold border-olive" />
```

## 🧩 Adding shadcn Components

Install additional shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form
npx shadcn@latest add table
```

## 📱 PWA Configuration

To make the app fully PWA-ready:

1. Install `next-pwa`:
   ```bash
   npm install @ducanh2912/next-pwa
   ```

2. Add to `next.config.ts`:
   ```typescript
   import withPWA from '@ducanh2912/next-pwa';
   
   export default withPWA({
     dest: 'public',
     register: true,
     skipWaiting: true,
   })({
     // your existing config
   });
   ```

3. Add `manifest.json` to `public/` directory
4. Add app icons in various sizes to `public/icons/`

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)
```bash
npm test
```

### Storybook (Component Development)
```bash
npx storybook init
npm run storybook
```

## 📊 Database Management

### Prisma Studio
Visual database editor:
```bash
npm run prisma:studio
```

### Create Migration
After schema changes:
```bash
npm run prisma:migrate
```

### Reset Database
```bash
npx prisma migrate reset
```

## 🔐 Authentication Setup

### Supabase Auth Configuration

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Enable auth providers in dashboard (Email, Google, Facebook, etc.)
3. Copy project URL and anon key to `.env`
4. Configure redirect URLs in Supabase dashboard

## 💳 Payment Integration

### Razorpay Setup
1. Create account at [razorpay.com](https://razorpay.com)
2. Get API keys from dashboard
3. Add keys to `.env`
4. Test in sandbox mode first

## 🗺 Mapbox Setup

1. Create account at [mapbox.com](https://mapbox.com)
2. Generate access token
3. Add to `.env` as `NEXT_PUBLIC_MAPBOX_TOKEN`

## ☁️ AWS S3 Setup (Image Uploads)

1. Create S3 bucket
2. Configure CORS policy
3. Create IAM user with S3 permissions
4. Add credentials to `.env`

## 📈 Analytics

### Google Analytics
Add tracking ID to `.env`:
```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Plausible
Add script to `layout.tsx` for privacy-friendly analytics

## 🌐 Internationalization (i18n)

For multilingual support (English, Telugu, Hindi):
1. Install `next-intl`
2. Configure locales in `next.config.ts`
3. Add translation files in `messages/` directory

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🐛 Troubleshooting

### Prisma Client Not Found
```bash
npm run prisma:generate
```

### Database Connection Error
- Verify `DATABASE_URL` in `.env`
- Check if PostgreSQL is running
- Ensure database exists

### Tailwind Classes Not Working
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📝 Roadmap

### Phase 1 (Current)
- ✅ Project scaffold
- ✅ Database schema and seed
- ✅ API routes for regions and sarees
- ✅ Homepage with Hero and Region blocks
- ✅ Color palette and animations

### Phase 2 (Next)
- [ ] Product detail pages
- [ ] Shopping cart
- [ ] Checkout flow with Razorpay
- [ ] User authentication (Supabase)
- [ ] Bargaining modal and flow
- [ ] Custom saree builder

### Phase 3
- [ ] Admin dashboard
- [ ] Order management
- [ ] Image upload to S3
- [ ] Workshop gallery with Mapbox
- [ ] Push notifications

### Phase 4
- [ ] Mobile app wrappers (React Native / Expo)
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Performance optimizations

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

Contact the development team for contribution guidelines.

## 📧 Support

For issues or questions, contact: admin@silkcity.com

---

**Built with ❤️ for preserving India's textile heritage**
