import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const regionsData = [
  {
    name: "Varanasi, Uttar Pradesh",
    sareeType: "Banarasi Saree",
    characteristics:
      "Fine silk, intricate gold/silver brocade or zari work, opulent, often used for bridal wear.",
  },
  {
    name: "Kanchipuram, Tamil Nadu",
    sareeType: "Kanjivaram / Kanchipuram Silk",
    characteristics:
      "Pure mulberry silk, rich texture, vibrant colors, wide contrasting borders with traditional temple motifs and heavy zari.",
  },
  {
    name: "Maharashtra",
    sareeType: "Paithani",
    characteristics:
      "Pure silk, opulent pallu with peacock and nature-inspired motifs.",
  },
  {
    name: "Gujarat & Rajasthan",
    sareeType: "Bandhani / Bandhej",
    characteristics:
      "Vibrant dotted patterns created by tie-and-dye technique.",
  },
  {
    name: "Odisha",
    sareeType: "Sambalpuri Ikat",
    characteristics:
      "Intricate Ikat patterns on warp and weft before weaving.",
  },
  {
    name: "West Bengal",
    sareeType: "Tant / Taant",
    characteristics:
      "Lightweight crisp cotton with decorative borders.",
  },
  {
    name: "Madhya Pradesh",
    sareeType: "Chanderi",
    characteristics:
      "Sheer texture, lightweight, blend of silk and cotton/zari.",
  },
  {
    name: "Karnataka",
    sareeType: "Mysore Silk",
    characteristics:
      "Soft texture, rich luster, minimalistic design with gold zari border.",
  },
  {
    name: "Kerala",
    sareeType: "Kasavu / Set Mundu",
    characteristics:
      "Off-white or cream cotton/silk with golden border.",
  },
  {
    name: "Gujarat",
    sareeType: "Patola",
    characteristics:
      "Complex double-Ikat weave with vibrant geometric designs.",
  },
  {
    name: "Assam",
    sareeType: "Muga Silk",
    characteristics:
      "Natural golden sheen, high durability, heirloom quality.",
  },
  {
    name: "Telangana",
    sareeType: "Pochampally Ikat",
    characteristics:
      "Silk/cotton sarees with geometric Ikat patterns.",
  },
  {
    name: "Lucknow, Uttar Pradesh",
    sareeType: "Chikankari",
    characteristics:
      "Delicate white thread hand embroidery on fine cotton or georgette.",
  },
  {
    name: "Dharmavaram, Andhra Pradesh",
    sareeType: "Dharmavaram Silk",
    characteristics:
      "Broad solid borders, heavy brocaded zari on borders & pallu, muted/dual-shade colors, temple-inspired motifs, wedding-grade durability.",
    featured: true,
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Create regions and sarees
  for (const regionData of regionsData) {
    const region = await prisma.region.upsert({
      where: { name: regionData.name },
      update: {},
      create: {
        name: regionData.name,
        state: regionData.name.split(",")[1]?.trim() || null,
        description: `Home of the exquisite ${regionData.sareeType}. ${regionData.characteristics}`,
        featured: regionData.featured || false,
      },
    });

    // Create a sample saree for each region
    await prisma.saree.upsert({
      where: { id: `${region.id}-sample` },
      update: {},
      create: {
        id: `${region.id}-sample`,
        title: `${regionData.sareeType} - Classic`,
        regionId: region.id,
        type: regionData.sareeType,
        fabric: "Silk",
        characteristics: regionData.characteristics,
        price: Math.floor(Math.random() * 15000) + 5000,
        mrp: Math.floor(Math.random() * 20000) + 10000,
        stock: Math.floor(Math.random() * 50) + 10,
        images: [],
        isBargainAllowed: Math.random() > 0.7,
        polishPrice: Math.random() > 0.5 ? 500 : null,
        isCustomAvailable: Math.random() > 0.6,
      },
    });

    console.log(`✅ Created region: ${region.name}`);
  }

  // Create an admin user
  await prisma.user.upsert({
    where: { email: "admin@silkcity.com" },
    update: {},
    create: {
      email: "admin@silkcity.com",
      name: "Admin User",
      role: "ADMIN",
      passwordHash: "$2a$10$placeholder", // In production, use proper bcrypt hash
    },
  });
  console.log("✅ Created admin user");

  // Create a sample customer
  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "Sample Customer",
      role: "CUSTOMER",
      passwordHash: "$2a$10$placeholder",
    },
  });
  console.log("✅ Created sample customer");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


