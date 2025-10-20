import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sample sarees data
const sampleSarees = [
  {
    id: "dharmavaram-1",
    title: "Dharmavaram Silk - Traditional Red",
    regionId: "dharmavaram",
    type: "Dharmavaram Silk",
    fabric: "Pure Silk",
    characteristics: "Broad solid borders, heavy brocaded zari on borders & pallu, muted/dual-shade colors, temple-inspired motifs, wedding-grade durability.",
    price: 25000,
    mrp: 35000,
    stock: 15,
    images: ["/images/sarees/dharmavaram-1.jpg"],
    isBargainAllowed: true,
    polishPrice: 800,
    isCustomAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: {
      id: "dharmavaram",
      name: "Dharmavaram, Andhra Pradesh",
      state: "Andhra Pradesh"
    }
  },
  {
    id: "dharmavaram-2",
    title: "Dharmavaram Silk - Royal Blue",
    regionId: "dharmavaram",
    type: "Dharmavaram Silk",
    fabric: "Pure Silk",
    characteristics: "Traditional Dharmavaram silk with intricate zari work and temple motifs.",
    price: 22000,
    mrp: 30000,
    stock: 10,
    images: ["/images/sarees/dharmavaram-2.jpg"],
    isBargainAllowed: false,
    polishPrice: 600,
    isCustomAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: {
      id: "dharmavaram",
      name: "Dharmavaram, Andhra Pradesh",
      state: "Andhra Pradesh"
    }
  },
  {
    id: "kanchipuram-1",
    title: "Kanjivaram Silk - Temple Border",
    regionId: "kanchipuram",
    type: "Kanjivaram Silk",
    fabric: "Pure Mulberry Silk",
    characteristics: "Pure mulberry silk, rich texture, vibrant colors, wide contrasting borders with traditional temple motifs and heavy zari.",
    price: 35000,
    mrp: 45000,
    stock: 8,
    images: ["/images/sarees/kanchipuram-1.jpg"],
    isBargainAllowed: true,
    polishPrice: 1000,
    isCustomAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: {
      id: "kanchipuram",
      name: "Kanchipuram, Tamil Nadu",
      state: "Tamil Nadu"
    }
  },
  {
    id: "varanasi-1",
    title: "Banarasi Silk - Gold Brocade",
    regionId: "varanasi",
    type: "Banarasi Silk",
    fabric: "Fine Silk",
    characteristics: "Fine silk, intricate gold/silver brocade or zari work, opulent, often used for bridal wear.",
    price: 28000,
    mrp: 38000,
    stock: 12,
    images: ["/images/sarees/varanasi-1.jpg"],
    isBargainAllowed: true,
    polishPrice: 900,
    isCustomAvailable: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: {
      id: "varanasi",
      name: "Varanasi, Uttar Pradesh",
      state: "Uttar Pradesh"
    }
  },
  {
    id: "mysore-1",
    title: "Mysore Silk - Classic Gold",
    regionId: "mysore",
    type: "Mysore Silk",
    fabric: "Pure Silk",
    characteristics: "Soft texture, rich luster, minimalistic design with gold zari border.",
    price: 18000,
    mrp: 25000,
    stock: 20,
    images: ["/images/sarees/mysore-1.jpg"],
    isBargainAllowed: false,
    polishPrice: 500,
    isCustomAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: {
      id: "mysore",
      name: "Mysore, Karnataka",
      state: "Karnataka"
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const regionId = searchParams.get("regionId");
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const fabric = searchParams.get("fabric");
    const isBargainAllowed = searchParams.get("isBargainAllowed");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Try to fetch from database first
    const where: any = {};

    if (regionId) where.regionId = regionId;
    if (type) where.type = { contains: type, mode: "insensitive" };
    if (fabric) where.fabric = { contains: fabric, mode: "insensitive" };
    if (isBargainAllowed !== null && isBargainAllowed !== undefined) {
      where.isBargainAllowed = isBargainAllowed === "true";
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { type: { contains: search, mode: "insensitive" } },
        { characteristics: { contains: search, mode: "insensitive" } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Fetch sarees with pagination
    const [sarees, dbTotal] = await Promise.all([
      prisma.saree.findMany({
        where,
        include: {
          region: {
            select: {
              id: true,
              name: true,
              state: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.saree.count({ where }),
    ]);

    // If we have data from database, return it
    if (sarees && sarees.length > 0) {
      return NextResponse.json({
        sarees,
        pagination: {
          page,
          limit,
          total: dbTotal,
          totalPages: Math.ceil(dbTotal / limit),
        },
      });
    }

    // Otherwise, filter and return sample data
    let filteredSarees = [...sampleSarees];

    if (regionId) {
      filteredSarees = filteredSarees.filter(saree => saree.regionId === regionId);
    }
    if (type) {
      filteredSarees = filteredSarees.filter(saree => 
        saree.type.toLowerCase().includes(type.toLowerCase())
      );
    }
    if (fabric) {
      filteredSarees = filteredSarees.filter(saree => 
        saree.fabric.toLowerCase().includes(fabric.toLowerCase())
      );
    }
    if (isBargainAllowed !== null && isBargainAllowed !== undefined) {
      filteredSarees = filteredSarees.filter(saree => 
        saree.isBargainAllowed === (isBargainAllowed === "true")
      );
    }
    if (search) {
      filteredSarees = filteredSarees.filter(saree => 
        saree.title.toLowerCase().includes(search.toLowerCase()) ||
        saree.type.toLowerCase().includes(search.toLowerCase()) ||
        saree.characteristics.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (minPrice || maxPrice) {
      filteredSarees = filteredSarees.filter(saree => {
        if (minPrice && saree.price < parseFloat(minPrice)) return false;
        if (maxPrice && saree.price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Apply pagination
    const totalCount = filteredSarees.length;
    const paginatedSarees = filteredSarees.slice(skip, skip + limit);

    return NextResponse.json({
      sarees: paginatedSarees,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching sarees:", error);
    
    // Return sample data as fallback
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;
    
    const fallbackTotal = sampleSarees.length;
    const paginatedSarees = sampleSarees.slice(skip, skip + limit);
    
    return NextResponse.json({
      sarees: paginatedSarees,
      pagination: {
        page,
        limit,
        total: fallbackTotal,
        totalPages: Math.ceil(fallbackTotal / limit),
      },
    });
  }
}

