# 🚀 SilkCity Deployment Guide

## Quick Deploy to Vercel (Recommended - 5 Minutes)

### Step 1: Set Up Supabase Database

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Click "New Project"**
   - Name: `silkcity`
   - Database Password: Choose a strong password (save it!)
   - Region: Choose closest to your users
3. **Wait for project setup** (2-3 minutes)
4. **Go to SQL Editor** in the left sidebar
5. **Copy and paste** the entire contents of `database/setup.sql`
6. **Click "Run"** - This creates all tables and sample data
7. **Go to Settings** → **API** and copy:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - `anon` `public` key
   - `service_role` `secret` key
   - **Database URL** from Settings → Database → Connection String → URI
     - Replace `[YOUR-PASSWORD]` with your actual password

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up/login with GitHub
2. **Click "Add New Project"**
3. **Import your GitHub repository**:
   - Click "Import Git Repository"
   - Search for: `skil-city`
   - Click "Import"
4. **Configure Project**:
   - Framework Preset: `Next.js` (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

5. **Add Environment Variables** (Click "Environment Variables"):
   ```env
   # Database
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   
   # Site URL (update after deployment)
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   
   # Optional: AWS S3 (for image uploads - can add later)
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_S3_BUCKET_NAME=silkcity-images
   
   # Optional: Razorpay (for payments - can add later)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   
   # Optional: Mapbox (for maps - can add later)
   NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
   ```

6. **Click "Deploy"**
   - Deployment takes 2-3 minutes
   - Vercel will build and deploy your app

7. **After Deployment**:
   - Copy your deployment URL (e.g., `https://skil-city.vercel.app`)
   - Go back to Vercel → Settings → Environment Variables
   - Update `NEXT_PUBLIC_SITE_URL` with your actual URL
   - Redeploy (Deployments → Click "..." → Redeploy)

### Step 3: Verify Deployment

1. **Visit your deployed site**: `https://your-app.vercel.app`
2. **Check the homepage** - You should see all 14 regions!
3. **Test navigation** - Click on regions to browse sarees
4. **Check admin panel** (if implemented) - Login with admin credentials

---

## Alternative: Manual Vercel CLI Deployment

If you prefer command line:

### 1. Login to Vercel
```powershell
npx vercel login
```
- Follow the email verification link

### 2. Link Project
```powershell
cd "K:\skil city\silkcity"
npx vercel
```
- Follow prompts to link to your GitHub repo

### 3. Add Environment Variables
```powershell
npx vercel env add DATABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
npx vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

### 4. Deploy to Production
```powershell
npx vercel --prod
```

---

## 📋 Pre-Deployment Checklist

- ✅ All code pushed to GitHub: `https://github.com/KARTHIKganesh256/skil-city`
- ✅ Database schema ready: `database/setup.sql`
- ✅ Environment variables template: `.env.example`
- ⏳ Supabase project created and database setup
- ⏳ Vercel project created and deployed
- ⏳ Environment variables configured

---

## 🔧 Post-Deployment Configuration

### Update CORS Settings (Supabase)
1. Go to Supabase → Settings → API
2. Add your Vercel domain to allowed origins:
   - `https://your-app.vercel.app`
   - `https://*.vercel.app` (for preview deployments)

### Set Up Custom Domain (Optional)
1. Go to Vercel → Settings → Domains
2. Add your custom domain (e.g., `silkcity.com`)
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Enable Image Uploads (Optional)
1. Create AWS S3 bucket or use Supabase Storage
2. Add credentials to environment variables
3. Test image upload functionality

### Configure Payment Gateway (Optional)
1. Sign up for Razorpay
2. Get API keys (test and production)
3. Add to environment variables
4. Test payment flow

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript types are correct

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check Supabase project is not paused
- Ensure password in connection string is correct

### Environment Variables Not Working
- Variables must start with `NEXT_PUBLIC_` to be available in browser
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

### Images Not Loading
- Set up Supabase Storage or AWS S3
- Update image URLs in database
- Check CORS settings

---

## 📞 Support

### Resources
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

### Your Project URLs
- **GitHub**: https://github.com/KARTHIKganesh256/skil-city
- **Vercel**: (Will be available after deployment)
- **Supabase**: (Will be available after setup)

---

## 🎉 Success!

Once deployed, your SilkCity application will be:
- ✨ **Live** at your Vercel URL
- 🚀 **Fast** with edge caching
- 🔄 **Auto-deployed** on every GitHub push
- 🌍 **Globally distributed** via Vercel CDN
- 🔒 **Secure** with HTTPS by default

**Next Steps**: Share your live URL and start showcasing Indian silk sarees to the world! 🎊


