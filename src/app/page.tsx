import { Hero } from "@/components/Hero";
import { DharmawaramSpotlight } from "@/components/DharmawaramSpotlight";
import { RegionCard } from "@/components/RegionCard";

async function getRegions() {
  try {
    // Import prisma directly instead of making HTTP request
    const { prisma } = await import('@/lib/prisma');
    
    // Try to fetch from database first
    const regions = await prisma.region.findMany({
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
      return regions;
    }

    // Fallback sample data
    return [
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
      }
    ];
  } catch (error) {
    console.error("Error fetching regions:", error);
    // Return sample data as fallback
    return [
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
      }
    ];
  }
}

export default async function Home() {
  const regions = await getRegions();
  
  // Debug logging
  console.log("Regions fetched:", regions.length, regions);

  return (
    <main className="min-h-screen">
      <Hero />
      
      <DharmawaramSpotlight />

      {/* Regions Section */}
      <section id="regions" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
              Explore Sarees by Region
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each region of India has its own unique weaving tradition, patterns, and cultural significance. 
              Discover the diversity of Indian silk and cotton sarees.
            </p>
          </div>

          {regions && regions.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regions.map((region: any, index: number) => (
                <RegionCard key={region.id} region={region} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Loading regions... If this persists, the API might be having issues.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Regions count: {regions ? regions.length : 'undefined'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Run: <code className="bg-muted px-2 py-1 rounded">npm run db:seed</code>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features/Services Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
              Why Choose SilkCity?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Custom Made Sarees"
              description="Design your dream saree with our custom builder. Choose borders, pallu patterns, and colors to create something uniquely yours."
              icon="✨"
            />
            <FeatureCard
              title="Polish Service"
              description="Keep your precious sarees looking brand new with our professional polish and maintenance service."
              icon="💎"
            />
            <FeatureCard
              title="Bargain on Premium"
              description="Found your perfect saree? Make an offer on select premium pieces and negotiate directly with our experts."
              icon="💰"
            />
          </div>
        </div>
      </section>
      </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white border-2 border-maroon/10 hover:border-maroon/30 transition-all hover:shadow-lg">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-serif font-bold text-maroon mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
