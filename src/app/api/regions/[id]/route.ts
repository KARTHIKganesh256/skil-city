import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sample sarees data for regions
const sampleSarees = {
  dharmavaram: [
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
      updatedAt: new Date().toISOString()
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
      updatedAt: new Date().toISOString()
    }
  ],
  kanchipuram: [
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
      updatedAt: new Date().toISOString()
    }
  ],
  varanasi: [
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
      updatedAt: new Date().toISOString()
    }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to fetch from database first
    const region = await prisma.region.findUnique({
      where: { id },
      include: {
        sarees: {
          take: 20,
          orderBy: { createdAt: "desc" },
        },
        galleries: true,
      },
    });

    // If we have data from database, return it
    if (region) {
      return NextResponse.json(region);
    }

    // Otherwise, return sample data based on region ID
    const sampleRegionData = {
      id,
      name: id === "dharmavaram" ? "Dharmavaram, Andhra Pradesh" :
            id === "kanchipuram" ? "Kanchipuram, Tamil Nadu" :
            id === "varanasi" ? "Varanasi, Uttar Pradesh" :
            id === "mysore" ? "Mysore, Karnataka" :
            id === "gujarat" ? "Gujarat & Rajasthan" :
            id === "odisha" ? "Odisha" :
            id === "west-bengal" ? "West Bengal" :
            id === "chanderi" ? "Chanderi, Madhya Pradesh" :
            "Unknown Region",
      state: id === "dharmavaram" ? "Andhra Pradesh" :
             id === "kanchipuram" ? "Tamil Nadu" :
             id === "varanasi" ? "Uttar Pradesh" :
             id === "mysore" ? "Karnataka" :
             id === "gujarat" ? "Gujarat" :
             id === "odisha" ? "Odisha" :
             id === "west-bengal" ? "West Bengal" :
             id === "chanderi" ? "Madhya Pradesh" :
             null,
      description: id === "dharmavaram" ? "Home of the exquisite Dharmavaram Silk. Broad solid borders, heavy brocaded zari on borders & pallu, muted/dual-shade colors, temple-inspired motifs, wedding-grade durability." :
                   id === "kanchipuram" ? "Home of the exquisite Kanjivaram / Kanchipuram Silk. Pure mulberry silk, rich texture, vibrant colors, wide contrasting borders with traditional temple motifs and heavy zari." :
                   id === "varanasi" ? "Home of the exquisite Banarasi Saree. Fine silk, intricate gold/silver brocade or zari work, opulent, often used for bridal wear." :
                   "Explore the unique sarees from this region",
      imageUrl: null,
      featured: id === "dharmavaram" || id === "kanchipuram",
      sarees: sampleSarees[id as keyof typeof sampleSarees] || [],
      galleries: []
    };

    return NextResponse.json(sampleRegionData);
  } catch (error) {
    console.error("Error fetching region:", error);
    
    // Return sample data as fallback
    const { id } = await params;
    const sampleRegionData = {
      id,
      name: "Sample Region",
      state: null,
      description: "Explore the unique sarees from this region",
      imageUrl: null,
      featured: false,
      sarees: [],
      galleries: []
    };
    
    return NextResponse.json(sampleRegionData);
  }
}

