import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sample regions data for when database is not available
const sampleRegions = [
  {
    id: "dharmavaram",
    name: "Dharmavaram, Andhra Pradesh",
    state: "Andhra Pradesh",
    description: "Home of the exquisite Dharmavaram Silk. Broad solid borders, heavy brocaded zari on borders & pallu, muted/dual-shade colors, temple-inspired motifs, wedding-grade durability.",
    imageUrl: null,
    featured: true,
    _count: { sarees: 25 }
  },
  {
    id: "kanchipuram",
    name: "Kanchipuram, Tamil Nadu",
    state: "Tamil Nadu",
    description: "Home of the exquisite Kanjivaram / Kanchipuram Silk. Pure mulberry silk, rich texture, vibrant colors, wide contrasting borders with traditional temple motifs and heavy zari.",
    imageUrl: null,
    featured: true,
    _count: { sarees: 18 }
  },
  {
    id: "varanasi",
    name: "Varanasi, Uttar Pradesh",
    state: "Uttar Pradesh",
    description: "Home of the exquisite Banarasi Saree. Fine silk, intricate gold/silver brocade or zari work, opulent, often used for bridal wear.",
    imageUrl: null,
    featured: false,
    _count: { sarees: 32 }
  },
  {
    id: "mysore",
    name: "Mysore, Karnataka",
    state: "Karnataka",
    description: "Home of the exquisite Mysore Silk. Soft texture, rich luster, minimalistic design with gold zari border.",
    imageUrl: null,
    featured: false,
    _count: { sarees: 15 }
  },
  {
    id: "gujarat",
    name: "Gujarat & Rajasthan",
    state: "Gujarat",
    description: "Home of the exquisite Bandhani / Bandhej. Vibrant dotted patterns created by tie-and-dye technique.",
    imageUrl: null,
    featured: false,
    _count: { sarees: 22 }
  },
  {
    id: "odisha",
    name: "Odisha",
    state: "Odisha",
    description: "Home of the exquisite Sambalpuri Ikat. Intricate Ikat patterns on warp and weft before weaving.",
    imageUrl: null,
    featured: false,
    _count: { sarees: 12 }
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    state: "West Bengal",
    description: "Home of the exquisite Tant / Taant. Lightweight crisp cotton with decorative borders.",
    imageUrl: null,
    featured: false,
    _count: { sarees: 8 }
  },
  {
    id: "chanderi",
    name: "Chanderi, Madhya Pradesh",
    state: "Madhya Pradesh",
    description: "Home of the exquisite Chanderi. Sheer texture, lightweight, blend of silk and cotton/zari.",
    imageUrl: null,
    featured: false,
    _count: { sarees: 14 }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    // Try to fetch from database first
    const regions = await prisma.region.findMany({
      where: featured === "true" ? { featured: true } : undefined,
      include: {
        _count: {
          select: { sarees: true },
        },
      },
      orderBy: [
        { featured: "desc" },
        { name: "asc" },
      ],
    });

    // If we have data from database, return it
    if (regions && regions.length > 0) {
      return NextResponse.json(regions);
    }

    // Otherwise, return sample data
    const filteredRegions = featured === "true" 
      ? sampleRegions.filter(region => region.featured)
      : sampleRegions;

    return NextResponse.json(filteredRegions);
  } catch (error) {
    console.error("Error fetching regions:", error);
    
    // Return sample data as fallback
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    
    const filteredRegions = featured === "true" 
      ? sampleRegions.filter(region => region.featured)
      : sampleRegions;
    
    return NextResponse.json(filteredRegions);
  }
}

