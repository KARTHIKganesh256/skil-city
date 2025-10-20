# SilkCity Database Setup

This directory contains SQL files to set up the complete SilkCity database with all tables and sample data.

## 📁 Files Overview

- **`setup.sql`** - Complete database setup (schema + seed data) - **USE THIS ONE**
- **`schema.sql`** - Database schema only (tables, indexes, triggers)
- **`seed.sql`** - Sample data only (regions, sarees, users)
- **`README.md`** - This documentation file

## 🚀 Quick Setup

### For Supabase (Recommended):

1. **Create Supabase project** at [supabase.com](https://supabase.com)
2. **Go to SQL Editor** in your Supabase dashboard
3. **Copy and paste** the contents of `setup.sql`
4. **Run the SQL** - This will create all tables and insert sample data
5. **Update your `.env.local`** with Supabase credentials

### For Local PostgreSQL:

1. **Install PostgreSQL** on your system
2. **Create database**:
   ```sql
   CREATE DATABASE silkcity;
   ```
3. **Run setup script**:
   ```bash
   psql -d silkcity -f database/setup.sql
   ```

## 📊 Database Schema

### Tables Created:

1. **User** - Customers, sellers, admins
2. **Region** - Saree origin regions (14 regions)
3. **Saree** - Product catalog with pricing
4. **Offer** - Bargaining system
5. **Order** - Purchase orders
6. **OrderItem** - Order line items
7. **CustomRequest** - Custom saree requests
8. **AdBanner** - Marketing banners
9. **WorkshopGallery** - Region showcases

### Sample Data Included:

- **14 Regions**: Dharmavaram, Kanchipuram, Varanasi, Maharashtra, etc.
- **20+ Sarees**: Sample products for each region
- **Admin User**: admin@silkcity.com
- **Sample Customer**: customer@example.com
- **Ad Banners**: Marketing content
- **Workshop Galleries**: Region showcases

## 🔧 Environment Variables

After setting up the database, update your `.env.local`:

```env
# For Supabase
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# For local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/silkcity"
```

## 📝 Verification

After running the setup, you can verify the data:

```sql
-- Check all tables
SELECT 'Regions' as table_name, COUNT(*) as count FROM "Region"
UNION ALL
SELECT 'Sarees', COUNT(*) FROM "Saree"
UNION ALL
SELECT 'Users', COUNT(*) FROM "User";

-- View featured regions
SELECT name, state FROM "Region" WHERE featured = true;

-- View sample sarees
SELECT r.name as region, s.title, s.price 
FROM "Saree" s
JOIN "Region" r ON s."regionId" = r.id
ORDER BY r.name;
```

## 🎯 Next Steps

1. **Run your Next.js app**: `npm run dev`
2. **Visit**: `http://localhost:3000`
3. **Verify regions display** correctly
4. **Test saree browsing** by region

## 🛠️ Troubleshooting

### If tables already exist:
```sql
-- Drop all tables (WARNING: This deletes all data)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

### If you get permission errors:
Make sure your database user has CREATE, INSERT, and UPDATE permissions.

### If you need to reset:
Simply re-run the `setup.sql` file - it will recreate everything.

## 📞 Support

If you encounter any issues:
1. Check the Supabase logs
2. Verify your database connection string
3. Ensure all environment variables are set correctly
4. Check the browser console for errors

Your SilkCity database is now ready with all 14 regions and sample sarees! 🎉
