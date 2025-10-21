# 🚀 Deploy SilkCity via GitHub (Automatic)

## Overview
This guide sets up **automatic deployment** where every push to GitHub triggers a deployment to Vercel. You use GitHub as normal, and your site updates automatically!

---

## 🎯 One-Time Setup (15 minutes)

### Step 1: Set Up Database (5 minutes)

#### Create Supabase Project
1. Go to **https://supabase.com**
2. Click "Sign in with GitHub"
3. Click "New Project"
   - Name: `silkcity`
   - Database Password: Create strong password (SAVE THIS!)
   - Region: Choose closest to you
   - Click "Create new project"

#### Initialize Database
1. In Supabase dashboard, click **"SQL Editor"**
2. Click "New query"
3. Open file: `K:\skil city\silkcity\database\setup.sql`
4. Copy ALL contents and paste into editor
5. Click **"Run"** ▶️
6. ✅ Success message should appear

#### Get Database Credentials
1. Click **"Settings"** → **"API"**
2. Copy and save these:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: Long key starting with `eyJ...`
   - **service_role**: Long key starting with `eyJ...`

3. Click **"Settings"** → **"Database"**
4. Under "Connection string" → "URI", copy:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

---

### Step 2: Deploy to Vercel (5 minutes)

#### Create Vercel Account
1. Go to **https://vercel.com**
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel

#### Import Your Project
1. Click "Add New..." → "Project"
2. Find **"skil-city"** → Click "Import"
3. **Framework**: Next.js ✓ (auto-detected)
4. Click "Environment Variables" dropdown

#### Add Environment Variables
Add each of these:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service_role key |
| `NEXT_PUBLIC_SITE_URL` | `https://skil-city.vercel.app` (temporary) |

5. Click **"Deploy"** 🚀
6. Wait 2-3 minutes...
7. **Copy your live URL!** 🎉

Example: `https://skil-city-abc123.vercel.app`

#### Update Site URL
1. In Vercel, go to "Settings" → "Environment Variables"
2. Edit `NEXT_PUBLIC_SITE_URL` with your actual URL
3. Go to "Deployments" → Click "..." → "Redeploy"

---

### Step 3: Set Up GitHub Actions (5 minutes)

#### Get Vercel Token
1. In Vercel, click your profile (bottom left)
2. Click "Settings" → "Tokens"
3. Click "Create Token"
   - Name: `GitHub Actions Deploy`
   - Scope: Full Account
   - Expiration: No Expiration
4. Click "Create" → **Copy the token** (save it!)

#### Add GitHub Secrets
1. Go to your GitHub repo: **https://github.com/KARTHIKganesh256/skil-city**
2. Click "Settings" (top tabs)
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"

Add this secret:
- **Name**: `VERCEL_TOKEN`
- **Value**: Paste the token from Vercel
- Click "Add secret"

---

## ✅ You're Done! Here's What Happens Now:

### Automatic Deployment Flow:
```
1. You make changes locally
2. git add . && git commit -m "Update"
3. git push origin master
4. 🤖 GitHub Actions runs automatically
5. ⚡ Deploys to Vercel in 2-3 minutes
6. 🎉 Your live site updates!
```

---

## 🌐 Your Live Website

**Your SilkCity app is live at:**
```
https://your-vercel-url.vercel.app
```

Share it with anyone! 🎊

---

## 📝 Daily Workflow

### Making Updates:
```bash
# 1. Make your changes in code editor

# 2. Check what changed
git status

# 3. Stage all changes
git add .

# 4. Commit with message
git commit -m "Added new saree collection"

# 5. Push to GitHub
git push origin master

# 6. Done! GitHub Actions deploys automatically 🚀
```

Check deployment status:
- Go to your GitHub repo
- Click "Actions" tab
- See real-time deployment progress

---

## 🔍 Monitoring

### Check Deployment Status:
1. **GitHub**: https://github.com/KARTHIKganesh256/skil-city/actions
   - See build logs and errors
   
2. **Vercel**: https://vercel.com/dashboard
   - See live deployments
   - Monitor performance
   - View analytics

---

## 🆘 Troubleshooting

### "GitHub Actions Failed"
- Click on the failed action in GitHub
- Read the error logs
- Usually: missing Vercel token or wrong branch name

### "Vercel Build Failed"
- Check Vercel deployment logs
- Verify environment variables are set
- Ensure all dependencies are in package.json

### "Database Connection Error"
- Check DATABASE_URL is correct
- Verify Supabase project is running
- Confirm password in connection string

### "Site Not Updating"
- Check if GitHub Actions ran successfully
- Verify you pushed to correct branch (master/main)
- Clear browser cache

---

## 🎯 Quick Commands Reference

```bash
# Check current status
git status

# Push updates (triggers deployment)
git add .
git commit -m "Your message"
git push origin master

# View deployment logs
# Go to: https://github.com/KARTHIKganesh256/skil-city/actions

# Force redeploy (no code changes)
# Go to Vercel → Deployments → ... → Redeploy
```

---

## 🌟 Benefits of This Setup

✅ **Automatic** - Push code, get deployed  
✅ **Fast** - Live in 2-3 minutes  
✅ **Free** - GitHub Actions + Vercel free tier  
✅ **Reliable** - Enterprise-grade infrastructure  
✅ **Scalable** - Handles traffic automatically  
✅ **HTTPS** - Free SSL certificate  
✅ **CDN** - Fast worldwide delivery  
✅ **Preview** - Every PR gets preview URL  

---

## 📊 What You Get

- **Live URL**: https://your-app.vercel.app
- **GitHub Repo**: https://github.com/KARTHIKganesh256/skil-city
- **Auto-deployment**: Every push goes live
- **Database**: Supabase with all regions & sarees
- **Analytics**: Built-in Vercel analytics
- **Monitoring**: Real-time error tracking

---

## 🎊 Congratulations!

Your SilkCity app is now:
- ✅ Live on the internet
- ✅ Automatically deployed via GitHub
- ✅ Backed by professional database
- ✅ Ready to share with the world!

**Share your live link and start selling sarees! 🛍️**

