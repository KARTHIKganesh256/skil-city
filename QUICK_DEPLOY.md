# ⚡ Quick Deploy - 3 Simple Steps

## 🎯 Deploy Your SilkCity App in 10 Minutes!

### ✅ Prerequisites
- GitHub account (you have this! ✓)
- All code is on GitHub: https://github.com/KARTHIKganesh256/skil-city ✓

---

## Step 1️⃣: Set Up Database (3 minutes)

### Go to Supabase
1. Open: **https://supabase.com**
2. Click **"Start your project"** → Sign up with GitHub
3. Click **"New Project"**
   - **Name**: `silkcity`
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you
4. Click **"Create new project"** → Wait 2-3 minutes

### Create Database Tables
1. Click **"SQL Editor"** in left sidebar (or go to https://supabase.com/dashboard/project/_/sql)
2. Click **"New query"**
3. Open your file: `K:\skil city\silkcity\database\setup.sql`
4. Copy ALL contents and paste into Supabase SQL Editor
5. Click **"Run"** (green play button)
6. ✅ You should see: "Success. No rows returned"

### Get Your Database Credentials
1. Click **"Settings"** (gear icon) → **"API"**
2. Copy these values (you'll need them soon):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: (long string starting with `eyJ...`)
   - **service_role secret key**: (long string starting with `eyJ...`)

3. Click **"Settings"** → **"Database"**
4. Scroll to **"Connection string"** → **"URI"**
5. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **Replace `[YOUR-PASSWORD]`** with your actual database password

---

## Step 2️⃣: Deploy to Vercel (5 minutes)

### Connect Vercel to GitHub
1. Open: **https://vercel.com**
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

### Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find **"skil-city"** repository → Click **"Import"**
3. **Configure Project**:
   - Framework Preset: `Next.js` ✓ (auto-detected)
   - Root Directory: `./` (leave default)
   - Click **"Environment Variables"** to expand

### Add Environment Variables
Click **"Add"** for each variable:

**Required Variables:**

1. **DATABASE_URL**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
   *(Use the connection string from Step 1)*

2. **NEXT_PUBLIC_SUPABASE_URL**
   ```
   https://xxxxx.supabase.co
   ```
   *(Your Supabase Project URL)*

3. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   *(Your Supabase anon public key)*

4. **SUPABASE_SERVICE_ROLE_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   *(Your Supabase service_role key)*

5. **NEXT_PUBLIC_SITE_URL** (temporary - we'll update this)
   ```
   https://skil-city.vercel.app
   ```

### Deploy!
1. Click **"Deploy"** button
2. ☕ Wait 2-3 minutes while Vercel builds your app
3. 🎉 You'll see "Congratulations!" when done

---

## Step 3️⃣: Final Configuration (2 minutes)

### Update Site URL
1. On Vercel success page, copy your **live URL**: `https://skil-city-xxxxx.vercel.app`
2. Click **"Go to Project"**
3. Click **"Settings"** → **"Environment Variables"**
4. Find **"NEXT_PUBLIC_SITE_URL"**
5. Click **"..."** → **"Edit"**
6. Replace with your actual URL
7. Click **"Save"**
8. Go to **"Deployments"** tab
9. Click **"..."** on the latest deployment → **"Redeploy"**
10. Click **"Redeploy"** to confirm

### Test Your Live Site! 🚀
1. Click **"Visit"** or go to your URL
2. ✅ **Homepage** should load with all regions
3. ✅ **Click a region** to see sarees
4. ✅ **Navigation** should work

---

## 🎊 YOU'RE LIVE!

**Your SilkCity app is now online at:**
```
https://your-url.vercel.app
```

### What You Get:
- ✅ Live website accessible worldwide
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN (super fast!)
- ✅ Auto-deploy on every Git push
- ✅ Database with 14 regions + sarees

---

## 🔄 Future Updates

**To update your live site:**
1. Make changes locally
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push origin master`
4. ⚡ Vercel auto-deploys in 2-3 minutes!

---

## 🆘 Need Help?

### Common Issues:

**"Build Failed"**
- Check build logs in Vercel
- Verify all files are pushed to GitHub

**"Database Connection Failed"**
- Double-check DATABASE_URL is correct
- Verify password in connection string

**"No regions showing"**
- Verify you ran the SQL in Supabase
- Check browser console for errors

**"Environment variables not working"**
- Must start with `NEXT_PUBLIC_` for browser access
- Redeploy after changing variables

---

## 📱 Share Your Success!

Your app is now live! Share your URL:
- **Website**: https://your-url.vercel.app
- **GitHub**: https://github.com/KARTHIKganesh256/skil-city

**Congratulations! 🎉 You've successfully deployed SilkCity!**

