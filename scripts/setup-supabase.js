#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SilkCity Supabase Setup Script');
console.log('==================================\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  if (fs.existsSync(envExamplePath)) {
    // Copy from example
    const envExample = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envExample);
    console.log('✅ Created .env.local from env.example');
  } else {
    // Create basic template
    const envTemplate = `# Database - Using Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
`;
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Created .env.local template');
  }
  
  console.log('\n⚠️  IMPORTANT: Please update .env.local with your Supabase credentials!');
  console.log('   Get them from: https://supabase.com/dashboard/project/[YOUR-PROJECT]/settings/api\n');
} else {
  console.log('✅ .env.local file already exists');
}

// Check if Prisma is configured
try {
  console.log('🔍 Checking Prisma configuration...');
  execSync('npx prisma --version', { stdio: 'pipe' });
  console.log('✅ Prisma is installed');
} catch (error) {
  console.log('❌ Prisma not found. Installing...');
  execSync('npm install prisma @prisma/client', { stdio: 'inherit' });
  console.log('✅ Prisma installed');
}

// Generate Prisma client
try {
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');
} catch (error) {
  console.log('❌ Failed to generate Prisma client');
  console.log('   Make sure your DATABASE_URL is correct in .env.local');
}

console.log('\n🎉 Setup script completed!');
console.log('\nNext steps:');
console.log('1. Update .env.local with your Supabase credentials');
console.log('2. Run: npx prisma db push');
console.log('3. Run: npm run db:seed');
console.log('4. Run: npm run dev');
console.log('\nFor detailed instructions, see SUPABASE_SETUP.md');

