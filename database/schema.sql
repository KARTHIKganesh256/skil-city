-- SilkCity Database Schema
-- PostgreSQL Database Setup for SilkCity E-commerce Platform

-- Create database (run this first if creating a new database)
-- CREATE DATABASE silkcity;

-- Use the database
-- \c silkcity;

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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
    "orderId" TEXT NOT NULL,
    "sareeId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "polishSelected" BOOLEAN NOT NULL DEFAULT false
);

-- Create CustomRequest table
CREATE TABLE "CustomRequest" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()::text),
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
