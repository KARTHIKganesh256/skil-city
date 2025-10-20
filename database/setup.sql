-- SilkCity Complete Database Setup
-- This file contains both schema creation and seed data
-- Run this file to set up the complete database

-- =============================================
-- SCHEMA CREATION
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types (Enums)
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN');
CREATE TYPE "OfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'COUNTERED', 'DECLINED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE "ShippingStatus" AS ENUM ('PLACED', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'RETURNED');
CREATE TYPE "CustomRequestStatus" AS ENUM ('PENDING', 'QUOTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- Create User table
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "name" TEXT,
    "email" TEXT NOT NULL UNIQUE,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "passwordHash" TEXT,
    "addresses" JSONB[] DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Region table
CREATE TABLE "Region" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "name" TEXT NOT NULL UNIQUE,
    "state" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Saree table
CREATE TABLE "Saree" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "title" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fabric" TEXT,
    "characteristics" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "mrp" DOUBLE PRECISION,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT[] DEFAULT '{}',
    "isBargainAllowed" BOOLEAN NOT NULL DEFAULT false,
    "polishPrice" DOUBLE PRECISION,
    "isCustomAvailable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Offer table
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "sareeId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "offerAmount" DOUBLE PRECISION NOT NULL,
    "status" "OfferStatus" NOT NULL DEFAULT 'PENDING',
    "adminComment" TEXT,
    "counterAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Order table
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "userId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "shippingStatus" "ShippingStatus" NOT NULL DEFAULT 'PLACED',
    "shippingProvider" TEXT,
    "trackingNo" TEXT,
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "shippingAddress" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create OrderItem table
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "orderId" TEXT NOT NULL,
    "sareeId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "polishSelected" BOOLEAN NOT NULL DEFAULT false
);

-- Create CustomRequest table
CREATE TABLE "CustomRequest" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "userId" TEXT NOT NULL,
    "designDetails" TEXT NOT NULL,
    "borderChoice" TEXT,
    "palluChoice" TEXT,
    "status" "CustomRequestStatus" NOT NULL DEFAULT 'PENDING',
    "quoteAmount" DOUBLE PRECISION,
    "etaDays" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create AdBanner table
CREATE TABLE "AdBanner" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "imageUrl" TEXT NOT NULL,
    "link" TEXT,
    "position" TEXT NOT NULL DEFAULT 'hero',
    "activeFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activeTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create WorkshopGallery table
CREATE TABLE "WorkshopGallery" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (cuid()),
    "regionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "images" TEXT[] DEFAULT '{}',
    "description" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Foreign Key Constraints
ALTER TABLE "Saree" ADD CONSTRAINT "Saree_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_sareeId_fkey" FOREIGN KEY ("sareeId") REFERENCES "Saree"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_sareeId_fkey" FOREIGN KEY ("sareeId") REFERENCES "Saree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CustomRequest" ADD CONSTRAINT "CustomRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WorkshopGallery" ADD CONSTRAINT "WorkshopGallery_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Indexes for better performance
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "Saree_regionId_idx" ON "Saree"("regionId");
CREATE INDEX "Offer_sareeId_idx" ON "Offer"("sareeId");
CREATE INDEX "Offer_buyerId_idx" ON "Offer"("buyerId");
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_sareeId_idx" ON "OrderItem"("sareeId");
CREATE INDEX "CustomRequest_userId_idx" ON "CustomRequest"("userId");
CREATE INDEX "WorkshopGallery_regionId_idx" ON "WorkshopGallery"("regionId");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_User_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_Region_updated_at BEFORE UPDATE ON "Region" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_Saree_updated_at BEFORE UPDATE ON "Saree" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_Offer_updated_at BEFORE UPDATE ON "Offer" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_Order_updated_at BEFORE UPDATE ON "Order" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_CustomRequest_updated_at BEFORE UPDATE ON "CustomRequest" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_AdBanner_updated_at BEFORE UPDATE ON "AdBanner" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_WorkshopGallery_updated_at BEFORE UPDATE ON "WorkshopGallery" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED DATA
-- =============================================

-- Insert Regions
INSERT INTO "Region" ("id", "name", "state", "description", "featured") VALUES
('dharmavaram', 'Dharmavaram, Andhra Pradesh', 'Andhra Pradesh', 'Home of the exquisite Dharmavaram Silk. Broad solid borders, heavy brocaded zari on borders & pallu, muted/dual-shade colors, temple-inspired motifs, wedding-grade durability.', true),
('kanchipuram', 'Kanchipuram, Tamil Nadu', 'Tamil Nadu', 'Home of the exquisite Kanjivaram / Kanchipuram Silk. Pure mulberry silk, rich texture, vibrant colors, wide contrasting borders with traditional temple motifs and heavy zari.', true),
('varanasi', 'Varanasi, Uttar Pradesh', 'Uttar Pradesh', 'Home of the exquisite Banarasi Saree. Fine silk, intricate gold/silver brocade or zari work, opulent, often used for bridal wear.', false),
('maharashtra', 'Maharashtra', 'Maharashtra', 'Home of the exquisite Paithani. Pure silk, opulent pallu with peacock and nature-inspired motifs.', false),
('gujarat-rajasthan', 'Gujarat & Rajasthan', 'Gujarat', 'Home of the exquisite Bandhani / Bandhej. Vibrant dotted patterns created by tie-and-dye technique.', false),
('odisha', 'Odisha', 'Odisha', 'Home of the exquisite Sambalpuri Ikat. Intricate Ikat patterns on warp and weft before weaving.', false),
('west-bengal', 'West Bengal', 'West Bengal', 'Home of the exquisite Tant / Taant. Lightweight crisp cotton with decorative borders.', false),
('chanderi', 'Chanderi, Madhya Pradesh', 'Madhya Pradesh', 'Home of the exquisite Chanderi. Sheer texture, lightweight, blend of silk and cotton/zari.', false),
('mysore', 'Mysore, Karnataka', 'Karnataka', 'Home of the exquisite Mysore Silk. Soft texture, rich luster, minimalistic design with gold zari border.', false),
('kerala', 'Kerala', 'Kerala', 'Home of the exquisite Kasavu / Set Mundu. Off-white or cream cotton/silk with golden border.', false),
('gujarat-patola', 'Gujarat', 'Gujarat', 'Home of the exquisite Patola. Complex double-Ikat weave with vibrant geometric designs.', false),
('assam', 'Assam', 'Assam', 'Home of the exquisite Muga Silk. Natural golden sheen, high durability, heirloom quality.', false),
('pochampally', 'Pochampally, Telangana', 'Telangana', 'Home of the exquisite Pochampally Ikat. Silk/cotton sarees with geometric Ikat patterns.', false),
('lucknow', 'Lucknow, Uttar Pradesh', 'Uttar Pradesh', 'Home of the exquisite Chikankari. Delicate white thread hand embroidery on fine cotton or georgette.', false);

-- Insert Sample Sarees (2-3 sarees per region)
INSERT INTO "Saree" ("id", "title", "regionId", "type", "fabric", "characteristics", "price", "mrp", "stock", "images", "isBargainAllowed", "polishPrice", "isCustomAvailable") VALUES
-- Dharmavaram Sarees
('dharmavaram-1', 'Dharmavaram Silk - Classic Red', 'dharmavaram', 'Dharmavaram Silk', 'Pure Silk', 'Broad solid borders, heavy brocaded zari on borders & pallu, muted/dual-shade colors, temple-inspired motifs, wedding-grade durability.', 15000.00, 18000.00, 25, '{}', true, 500.00, true),
('dharmavaram-2', 'Dharmavaram Silk - Royal Blue', 'dharmavaram', 'Dharmavaram Silk', 'Pure Silk', 'Traditional temple motifs with heavy zari work, perfect for weddings and special occasions.', 18000.00, 22000.00, 15, '{}', false, 500.00, true),

-- Kanchipuram Sarees
('kanchipuram-1', 'Kanjivaram Silk - Traditional Gold', 'kanchipuram', 'Kanjivaram / Kanchipuram Silk', 'Pure Mulberry Silk', 'Pure mulberry silk, rich texture, vibrant colors, wide contrasting borders with traditional temple motifs and heavy zari.', 25000.00, 30000.00, 18, '{}', false, 800.00, true),
('kanchipuram-2', 'Kanjivaram Silk - Classic Green', 'kanchipuram', 'Kanjivaram / Kanchipuram Silk', 'Pure Mulberry Silk', 'Rich green with golden borders, temple motifs, premium quality silk.', 22000.00, 28000.00, 12, '{}', true, 800.00, true),

-- Varanasi Sarees
('varanasi-1', 'Banarasi Saree - Bridal Red', 'varanasi', 'Banarasi Saree', 'Fine Silk', 'Fine silk, intricate gold/silver brocade or zari work, opulent, often used for bridal wear.', 35000.00, 42000.00, 32, '{}', false, 1000.00, true),
('varanasi-2', 'Banarasi Saree - Royal Blue', 'varanasi', 'Banarasi Saree', 'Fine Silk', 'Traditional Banarasi with Mughal-inspired motifs, luxury collection.', 32000.00, 40000.00, 20, '{}', true, 1000.00, true),

-- Other regions (abbreviated for space)
('maharashtra-1', 'Paithani - Peacock Design', 'maharashtra', 'Paithani', 'Pure Silk', 'Pure silk, opulent pallu with peacock and nature-inspired motifs.', 28000.00, 35000.00, 20, '{}', true, 700.00, true),
('gujarat-rajasthan-1', 'Bandhani - Vibrant Orange', 'gujarat-rajasthan', 'Bandhani / Bandhej', 'Cotton/Silk', 'Vibrant dotted patterns created by tie-and-dye technique.', 8000.00, 10000.00, 22, '{}', true, 300.00, true),
('odisha-1', 'Sambalpuri Ikat - Blue White', 'odisha', 'Sambalpuri Ikat', 'Cotton/Silk', 'Intricate Ikat patterns on warp and weft before weaving.', 12000.00, 15000.00, 12, '{}', true, 400.00, true),
('west-bengal-1', 'Tant - Classic White', 'west-bengal', 'Tant / Taant', 'Cotton', 'Lightweight crisp cotton with decorative borders.', 4000.00, 5000.00, 8, '{}', true, 200.00, true),
('chanderi-1', 'Chanderi - Sheer Gold', 'chanderi', 'Chanderi', 'Silk/Cotton/Zari', 'Sheer texture, lightweight, blend of silk and cotton/zari.', 15000.00, 18000.00, 14, '{}', true, 500.00, true),
('mysore-1', 'Mysore Silk - Classic Gold', 'mysore', 'Mysore Silk', 'Pure Silk', 'Soft texture, rich luster, minimalistic design with gold zari border.', 18000.00, 22000.00, 15, '{}', true, 600.00, true),
('kerala-1', 'Kasavu - Traditional Cream', 'kerala', 'Kasavu / Set Mundu', 'Cotton/Silk', 'Off-white or cream cotton/silk with golden border.', 6000.00, 7500.00, 10, '{}', true, 250.00, true),
('gujarat-patola-1', 'Patola - Geometric Red', 'gujarat-patola', 'Patola', 'Silk', 'Complex double-Ikat weave with vibrant geometric designs.', 45000.00, 55000.00, 6, '{}', false, 1500.00, true),
('assam-1', 'Muga Silk - Natural Gold', 'assam', 'Muga Silk', 'Pure Muga Silk', 'Natural golden sheen, high durability, heirloom quality.', 35000.00, 42000.00, 8, '{}', true, 1000.00, true),
('pochampally-1', 'Pochampally Ikat - Blue Geometric', 'pochampally', 'Pochampally Ikat', 'Silk/Cotton', 'Silk/cotton sarees with geometric Ikat patterns.', 16000.00, 20000.00, 12, '{}', true, 500.00, true),
('lucknow-1', 'Chikankari - White Delicate', 'lucknow', 'Chikankari', 'Cotton/Georgette', 'Delicate white thread hand embroidery on fine cotton or georgette.', 12000.00, 15000.00, 16, '{}', true, 400.00, true);

-- Insert Admin User
INSERT INTO "User" ("id", "name", "email", "phone", "role", "passwordHash") VALUES
('admin-1', 'Admin User', 'admin@silkcity.com', '+91-9876543210', 'ADMIN', '$2a$10$placeholder');

-- Insert Sample Customer
INSERT INTO "User" ("id", "name", "email", "phone", "role", "passwordHash") VALUES
('customer-1', 'Sample Customer', 'customer@example.com', '+91-9876543211', 'CUSTOMER', '$2a$10$placeholder');

-- Insert Sample Ad Banners
INSERT INTO "AdBanner" ("id", "imageUrl", "link", "position", "activeFrom", "activeTo") VALUES
('banner-1', '/images/banner-dharmavaram.jpg', '/regions/dharmavaram', 'hero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('banner-2', '/images/banner-kanchipuram.jpg', '/regions/kanchipuram', 'hero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days');

-- Insert Sample Workshop Gallery
INSERT INTO "WorkshopGallery" ("id", "regionId", "title", "images", "description", "videoUrl") VALUES
('gallery-1', 'dharmavaram', 'Dharmavaram Silk Weaving Workshop', '{}', 'Experience the traditional art of Dharmavaram silk weaving in this authentic workshop.', 'https://youtube.com/watch?v=example1'),
('gallery-2', 'kanchipuram', 'Kanjivaram Craftsmanship', '{}', 'Watch master craftsmen create beautiful Kanjivaram sarees with traditional techniques.', 'https://youtube.com/watch?v=example2');

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Verify data insertion
SELECT 'Regions' as table_name, COUNT(*) as count FROM "Region"
UNION ALL
SELECT 'Sarees', COUNT(*) FROM "Saree"
UNION ALL
SELECT 'Users', COUNT(*) FROM "User"
UNION ALL
SELECT 'AdBanners', COUNT(*) FROM "AdBanner"
UNION ALL
SELECT 'WorkshopGalleries', COUNT(*) FROM "WorkshopGallery";

-- Show featured regions
SELECT name, state, featured FROM "Region" WHERE featured = true;

-- Show sample sarees
SELECT r.name as region, s.title, s.price, s.stock FROM "Saree" s
JOIN "Region" r ON s."regionId" = r.id
ORDER BY r.name, s.price;
