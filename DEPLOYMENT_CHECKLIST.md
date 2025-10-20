# SilkCity Deployment Checklist

## 📋 Pre-Deployment Checklist

### 1. Database Setup ✓
- [ ] PostgreSQL database created (Vercel Postgres / Supabase / Railway)
- [ ] Production `DATABASE_URL` added to environment variables
- [ ] Migrations run: `npx prisma migrate deploy`
- [ ] Database seeded: `npm run db:seed` (optional for production)
- [ ] Connection pooling configured (if using Prisma Data Platform)

### 2. Environment Variables ✓
- [ ] All required variables set in hosting platform
- [ ] `NEXT_PUBLIC_APP_URL` updated to production domain
- [ ] `NEXTAUTH_SECRET` generated (use: `openssl rand -base64 32`)
- [ ] `DATABASE_URL` set to production database
- [ ] API keys secured (not in git)

### 3. Authentication (Supabase) ✓
- [ ] Supabase project created
- [ ] Auth providers enabled (Email, Google, etc.)
- [ ] Redirect URLs configured (add production URL)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set (server-side only)

### 4. File Storage (AWS S3) ✓
- [ ] S3 bucket created
- [ ] Bucket CORS policy configured
- [ ] IAM user created with S3 permissions
- [ ] `AWS_ACCESS_KEY_ID` set
- [ ] `AWS_SECRET_ACCESS_KEY` set
- [ ] `AWS_S3_BUCKET_NAME` set
- [ ] `AWS_REGION` set

### 5. Payment Gateway (Razorpay) ✓
- [ ] Razorpay account created and verified
- [ ] Live mode API keys obtained
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID` set (live key)
- [ ] `RAZORPAY_KEY_SECRET` set (live key)
- [ ] Webhook URLs configured in Razorpay dashboard
- [ ] Payment flows tested in sandbox

### 6. Maps (Mapbox) ✓
- [ ] Mapbox account created
- [ ] Access token generated
- [ ] `NEXT_PUBLIC_MAPBOX_TOKEN` set
- [ ] URL restrictions configured (if needed)

### 7. Code Quality ✓
- [ ] All TypeScript errors resolved: `npm run build`
- [ ] ESLint warnings checked: `npm run lint`
- [ ] Environment variables validated
- [ ] API routes tested locally
- [ ] Components render correctly

### 8. Performance Optimization ✓
- [ ] Images optimized (using Next.js Image component)
- [ ] API routes use proper caching headers
- [ ] Database queries optimized (indexed fields)
- [ ] Bundle size checked: `npm run build`
- [ ] Lighthouse score checked (aim for 90+)

### 9. Security ✓
- [ ] `.env` file in `.gitignore`
- [ ] API routes have authentication checks
- [ ] Admin routes protected with role checks
- [ ] SQL injection protection (Prisma handles this)
- [ ] CORS configured properly
- [ ] Rate limiting on API routes (optional)

### 10. SEO & Meta Tags ✓
- [ ] Meta descriptions set in `layout.tsx`
- [ ] Open Graph tags configured
- [ ] Twitter Card tags added
- [ ] `robots.txt` created (if needed)
- [ ] `sitemap.xml` generated (optional)
- [ ] Favicon and app icons added

---

## 🚀 Vercel Deployment Steps

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Initial commit: SilkCity foundation"
git push origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Select the `silkcity` directory (if monorepo)
5. Framework preset: Next.js (auto-detected)

### Step 3: Configure Environment Variables
In Vercel dashboard, add all variables from `.env`:

**Essential**:
- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL` (set to your Vercel domain)
- `NEXTAUTH_SECRET`

**Authentication**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Payments**:
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

**Storage**:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`
- `AWS_REGION`

**Maps**:
- `NEXT_PUBLIC_MAPBOX_TOKEN`

### Step 4: Database Setup
After deployment:
```bash
# Connect to Vercel project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy

# Seed database (optional)
npm run db:seed
```

### Step 5: Verify Deployment
- [ ] Homepage loads correctly
- [ ] API routes return data
- [ ] Database connection works
- [ ] Images load properly
- [ ] No console errors

### Step 6: Configure Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to custom domain
5. Redeploy

---

## 🚂 Railway Deployment Steps

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
railway login
```

### Step 2: Initialize Project
```bash
cd silkcity
railway init
railway link
```

### Step 3: Add PostgreSQL
```bash
railway add postgres
```

### Step 4: Set Environment Variables
```bash
# Copy local .env to Railway
railway variables set $(cat .env | grep -v '^#' | xargs)

# Or set individually
railway variables set NEXTAUTH_SECRET=your-secret
railway variables set NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

### Step 5: Deploy
```bash
railway up
```

### Step 6: Run Migrations
```bash
railway run npm run prisma:migrate
railway run npm run db:seed
```

---

## 🗄️ Database Migration Checklist

### For Production Database
```bash
# Generate migration (development)
npm run prisma:migrate

# Deploy to production (no prompts)
npx prisma migrate deploy

# If using Prisma Data Platform
# Enable connection pooling for serverless
```

### Backup Strategy
- [ ] Automated daily backups configured
- [ ] Backup restoration tested
- [ ] Point-in-time recovery available

---

## 📱 PWA Configuration (Optional)

### Make App Installable
1. Install next-pwa:
```bash
npm install @ducanh2912/next-pwa
```

2. Create `public/manifest.json`:
```json
{
  "name": "SilkCity - Dharmavaram Saree Store",
  "short_name": "SilkCity",
  "description": "Authentic Indian Sarees",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F6F0EB",
  "theme_color": "#7B2C2C",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

3. Add icons to `public/icons/` (192x192, 512x512)

4. Update `next.config.ts`

---

## 📊 Monitoring & Analytics

### Google Analytics (Optional)
1. Create GA4 property
2. Get Measurement ID
3. Set `NEXT_PUBLIC_GA_ID` in environment
4. Add tracking code to `layout.tsx`

### Error Tracking (Recommended)
- [ ] Sentry configured (optional)
- [ ] Error boundaries added
- [ ] API error logging enabled

### Performance Monitoring
- [ ] Vercel Analytics enabled (built-in)
- [ ] Core Web Vitals monitored
- [ ] API response times tracked

---

## 🔒 Security Hardening

### Headers Configuration
Add to `next.config.ts`:
```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ];
}
```

### API Rate Limiting
Consider adding:
- `@upstash/ratelimit` for Redis-based rate limiting
- IP-based throttling
- Authentication requirement for sensitive endpoints

---

## 📝 Post-Deployment Checklist

### Immediate (Day 1)
- [ ] Test all pages load correctly
- [ ] Test API endpoints work
- [ ] Verify database connection
- [ ] Check authentication flow
- [ ] Test payment sandbox
- [ ] Monitor error logs

### Week 1
- [ ] Review analytics data
- [ ] Check performance metrics
- [ ] Monitor database performance
- [ ] Review user feedback
- [ ] Fix any critical bugs

### Month 1
- [ ] Review hosting costs
- [ ] Optimize slow queries
- [ ] Add missing features
- [ ] Implement user feedback
- [ ] Plan scaling strategy

---

## 🆘 Rollback Plan

If deployment fails:

1. **Immediate Rollback** (Vercel):
   - Go to Deployments tab
   - Click on previous successful deployment
   - Click "Promote to Production"

2. **Database Rollback**:
   ```bash
   # Restore from backup
   # Or run Prisma migration rollback (if safe)
   npx prisma migrate resolve --rolled-back <migration_name>
   ```

3. **Emergency Contact**:
   - Document key team members
   - Have backup access to all services
   - Keep credentials in secure vault

---

## 📧 Go-Live Communication

### Internal Team
- [ ] Notify team of deployment schedule
- [ ] Share production URLs
- [ ] Distribute admin credentials (securely)
- [ ] Document support procedures

### External (Customers)
- [ ] Announcement on social media (if applicable)
- [ ] Email to existing customers (if any)
- [ ] Update marketing materials
- [ ] SEO submission to Google/Bing

---

## ✅ Final Sign-Off

Deployment completed by: _______________  
Date: _______________  
Production URL: _______________  
Database: _______________  
Hosting: _______________  

**Status**: □ Development  □ Staging  □ Production

**Notes**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Good luck with your deployment! 🚀**

For issues, refer to `README.md` troubleshooting section or contact the development team.


