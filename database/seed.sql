-- AggCity Seed Data
-- Sample data for SilkCity E-commerce Platform

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

-- Insert Sample Sarees for each region
INSERT INTO "Saree" ("id", "title", "regionId", "type", "fabric", "characteristics", "price", "mrp", "stock", "images", "isBargainAllowed", "polishPrice", "isCustomAvailable") VALUES
-- Dharmavaram Sarees
('dharmavaram-1', 'Dharmavaram Silk - Classic Red', 'dharmavaram', 'Dharmavaram Silk', 'Pure Silk', 'Broad solid borders, heavy brocaded zari on borders & pallu, muted/dual-shade colors, temple-inspired motifs, wedding-grade durability.', 15000.00, 18000.00, 25, '{}', true, 500.00, true),
('dharmavaram-2', 'Dharmavaram Silk - Royal Blue', 'dharmavaram', 'Dharmavaram Silk', 'Pure Silk', 'Traditional temple motifs with heavy zari work, perfect for weddings and special occasions.', 18000.00, 22000.00, 15, '{}', false, 500.00, true),
('dharmavaram-3', 'Dharmavaram Silk - Maroon Elegance', 'dharmavaram', 'Dharmavaram Silk', 'Pure Silk', 'Rich maroon color with golden zari borders, wedding collection.', 16000.00, 20000.00, 20, '{}', true, 500.00, false),

-- Kanchipuram Sarees
('kanchipuram-1', 'Kanjivaram Silk - Traditional Gold', 'kanchipuram', 'Kanjivaram / Kanchipuram Silk', 'Pure Mulberry Silk', 'Pure mulberry silk, rich texture, vibrant colors, wide contrasting borders with traditional temple motifs and heavy zari.', 25000.00, 30000.00, 18, '{}', false, 800.00, true),
('kanchipuram-2', 'Kanjivaram Silk - Classic Green', 'kanchipuram', 'Kanjivaram / Kanchipuram Silk', 'Pure Mulberry Silk', 'Rich green with golden borders, temple motifs, premium quality silk.', 22000.00, 28000.00, 12, '{}', true, 800.00, true),
('kanchipuram-3', 'Kanjivaram Silk - Royal Purple', 'kanchipuram', 'Kanjivaram / Kanchipuram Silk', 'Pure Mulberry Silk', 'Deep purple with intricate zari work, perfect for grand occasions.', 28000.00, 35000.00, 8, '{}', false, 800.00, false),

-- Varanasi Sarees
('varanasi-1', 'Banarasi Saree - Bridal Red', 'varanasi', 'Banarasi Saree', 'Fine Silk', 'Fine silk, intricate gold/silver brocade or zari work, opulent, often used for bridal wear.', 35000.00, 42000.00, 32, '{}', false, 1000.00, true),
('varanasi-2', 'Banarasi Saree - Royal Blue', 'varanasi', 'Banarasi Saree', 'Fine Silk', 'Traditional Banarasi with Mughal-inspired motifs, luxury collection.', 32000.00, 40000.00, 20, '{}', true, 1000.00, true),
('varanasi-3', 'Banarasi Saree - Emerald Green', 'varanasi', 'Banarasi Saree', 'Fine Silk', 'Emerald green with gold brocade, premium bridal wear.', 38000.00, 45000.00, 15, '{}', false, 1000.00, false),

-- Maharashtra Sarees
('maharashtra-1', 'Paithani - Peacock Design', 'maharashtra', 'Paithani', 'Pure Silk', 'Pure silk, opulent pallu with peacock and nature-inspired motifs.', 28000.00, 35000.00, 20, '{}', true, 700.00, true),
('maharashtra-2', 'Paithani - Lotus Motif', 'maharashtra', 'Paithani', 'Pure Silk', 'Traditional lotus motif pallu, authentic Maharashtra craftsmanship.', 26000.00, 32000.00, 18, '{}', false, 700.00, true),

-- Gujarat & Rajasthan Sarees
('gujarat-rajasthan-1', 'Bandhani - Vibrant Orange', 'gujarat-rajasthan', 'Bandhani / Bandhej', 'Cotton/Silk', 'Vibrant dotted patterns created by tie-and-dye technique.', 8000.00, 10000.00, 22, '{}', true, 300.00, true),
('gujarat-rajasthan-2', 'Bandhani - Traditional Red', 'gujarat-rajasthan', 'Bandhani / Bandhej', 'Cotton/Silk', 'Classic red with white dots, traditional Rajasthani design.', 7500.00, 9500.00, 25, '{}', true, 300.00, false),

-- Odisha Sarees
('odisha-1', 'Sambalpuri Ikat - Blue White', 'odisha', 'Sambalpuri Ikat', 'Cotton/Silk', 'Intricate Ikat patterns on warp and weft before weaving.', 12000.00, 15000.00, 12, '{}', true, 400.00, true),
('odisha-2', 'Sambalpuri Ikat - Red Black', 'odisha', 'Sambalpuri Ikat', 'Cotton/Silk', 'Traditional red and black Ikat patterns, handwoven.', 11000.00, 14000.00, 15, '{}', false, 400.00, true),

-- West Bengal Sarees
('west-bengal-1', 'Tant - Classic White', 'west-bengal', 'Tant / Taant', 'Cotton', 'Lightweight crisp cotton with decorative borders.', 4000.00, 5000.00, 8, '{}', true, 200.00, true),
('west-bengal-2', 'Tant - Red Border', 'west-bengal', 'Tant / Taant', 'Cotton', 'Traditional white with red border, comfortable daily wear.', 3500.00, 4500.00, 12, '{}', true, 200.00, false),

-- Chanderi Sarees
('chanderi-1', 'Chanderi - Sheer Gold', 'chanderi', 'Chanderi', 'Silk/Cotton/Zari', 'Sheer texture, lightweight, blend of silk and cotton/zari.', 15000.00, 18000.00, 14, '{}', true, 500.00, true),
('chanderi-2', 'Chanderi - Pastel Pink', 'chanderi', 'Chanderi', 'Silk/Cotton/Zari', 'Delicate pastel pink with subtle zari work.', 14000.00, 17000.00, 16, '{}', false, 500.00, true),

-- Mysore Sarees
('mysore-1', 'Mysore Silk - Classic Gold', 'mysore', 'Mysore Silk', 'Pure Silk', 'Soft texture, rich luster, minimalistic design with gold zari border.', 18000.00, 22000.00, 15, '{}', true, 600.00, true),
('mysore-2', 'Mysore Silk - Elegant Maroon', 'mysore', 'Mysore Silk', 'Pure Silk', 'Rich maroon with golden borders, premium quality.', 20000.00, 25000.00, 12, '{}', false, 600.00, false),

-- Kerala Sarees
('kerala-1', 'Kasavu - Traditional Cream', 'kerala', 'Kasavu / Set Mundu', 'Cotton/Silk', 'Off-white or cream cotton/silk with golden border.', 6000.00, 7500.00, 10, '{}', true, 250.00, true),
('kerala-2', 'Kasavu - Wedding Gold', 'kerala', 'Kasavu / Set Mundu', 'Cotton/Silk', 'Premium cream with heavy golden border, wedding collection.', 8000.00, 10000.00, 8, '{}', false, 250.00, true),

-- Gujarat Patola Sarees
('gujarat-patola-1', 'Patola - Geometric Red', 'gujarat-patola', 'Patola', 'Silk', 'Complex double-Ikat weave with vibrant geometric designs.', 45000.00, 55000.00, 6, '{}', false, 1500.00, true),
('gujarat-patola-2', 'Patola - Traditional Blue', 'gujarat-patola', 'Patola', 'Silk', 'Traditional blue geometric patterns, master craftsmanship.', 50000.00, 60000.00, 4, '{}', false, 1500.00, false),

-- Assam Sarees
('assam-1', 'Muga Silk - Natural Gold', 'assam', 'Muga Silk', 'Pure Muga Silk', 'Natural golden sheen, high durability, heirloom quality.', 35000.00, 42000.00, 8, '{}', true, 1000.00, true),
('assam-2', 'Muga Silk - Traditional Cream', 'assam', 'Muga Silk', 'Pure Muga Silk', 'Classic cream color with natural golden sheen.', 32000.00, 38000.00, 10, '{}', false, 1000.00, true),

-- Pochampally Sarees
('pochampally-1', 'Pochampally Ikat - Blue Geometric', 'pochampally', 'Pochampally Ikat', 'Silk/Cotton', 'Silk/cotton sarees with geometric Ikat patterns.', 16000.00, 20000.00, 12, '{}', true, 500.00, true),
('pochampally-2', 'Pochampally Ikat - Red Traditional', 'pochampally', 'Pochampally Ikat', 'Silk/Cotton', 'Traditional red with geometric patterns, handwoven.', 15000.00, 18000.00, 15, '{}', false, 500.00, false),

-- Lucknow Sarees
('lucknow-1', 'Chikankari - White Delicate', 'lucknow', 'Chikankari', 'Cotton/Georgette', 'Delicate white thread hand embroidery on fine cotton or georgette.', 12000.00, 15000.00, 16, '{}', true, 400.00, true),
('lucknow-2', 'Chikankari - Pastel Blue', 'lucknow', 'Chikankari', 'Cotton/Georgette', 'Pastel blue with intricate white thread work.', 11000.00, 14000.00, 18, '{}', false, 400.00, true);

-- Insert Admin User
INSERT INTO "User" ("id", "name", "email", "phone", "role", "passwordHash") VALUES
('admin-1', 'Admin User', 'admin@silkcity.com', '+91-9876543210', 'ADMIN', '$2a$10$placeholder');

-- Insert Sample Customer
INSERT INTO "User" ("id", "name", "email", "phone", "role", "passwordHash") VALUES
('customer-1', 'Sample Customer', 'customer@example.com', '+91-9876543211', 'CUSTOMER', '$2a$10$placeholder');

-- Insert Sample Ad Banners
INSERT INTO "AdBanner" ("id", "imageUrl", "link", "position", "activeFrom", "activeTo") VALUES
('banner-1', '/images/banner-dharmavaram.jpg', '/regions/dharmavaram', 'hero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('banner-2', '/images/banner-kanchipuram.jpg', '/regions/kanchipuram', 'hero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('banner-3', '/images/banner-varanasi.jpg', '/regions/varanasi', 'hero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days');

-- Insert Sample Workshop Gallery
INSERT INTO "WorkshopGallery" ("id", "regionId", "title", "images", "description", "videoUrl") VALUES
('gallery-1', 'dharmavaram', 'Dharmavaram Silk Weaving Workshop', '{}', 'Experience the traditional art of Dharmavaram silk weaving in this authentic workshop.', 'https://youtube.com/watch?v=example1'),
('gallery-2', 'kanchipuram', 'Kanjivaram Craftsmanship', '{}', 'Watch master craftsmen create beautiful Kanjivaram sarees with traditional techniques.', 'https://youtube.com/watch?v=example2'),
('gallery-3', 'varanasi', 'Banarasi Brocade Making', '{}', 'Learn about the intricate process of creating Banarasi brocade sarees.', 'https://youtube.com/watch?v=example3');
