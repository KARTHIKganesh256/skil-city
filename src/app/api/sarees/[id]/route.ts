import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const saree = await prisma.saree.findUnique({
      where: { id },
      include: {
        region: {
          include: {
            galleries: true,
          },
        },
      },
    });

    if (!saree) {
      return NextResponse.json(
        { error: "Saree not found" },
        { status: 404 }
      );
    }

    // Fetch related sarees from the same region
    const relatedSarees = await prisma.saree.findMany({
      where: {
        regionId: saree.regionId,
        id: { not: id },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      ...saree,
      relatedSarees,
    });
  } catch (error) {
    console.error("Error fetching saree:", error);
    return NextResponse.json(
      { error: "Failed to fetch saree" },
      { status: 500 }
    );
  }
}


