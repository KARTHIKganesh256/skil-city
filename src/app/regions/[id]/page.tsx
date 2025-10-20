import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { SareeGrid } from "@/components/SareeGrid";

async function getRegion(id: string) {
  try {
    // For server-side rendering, we need to use the full URL
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3003';
    const baseUrl = `${protocol}://${host}`;
    
    const res = await fetch(`${baseUrl}/api/regions/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching region:", error);
    return null;
  }
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const region = await getRegion(id);

  if (!region) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <section className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-maroon via-gold to-maroon-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                rgba(255, 255, 255, 0.1) 35px,
                rgba(255, 255, 255, 0.1) 70px
              )`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2 sm:mb-4">
            {region.name}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl">
            {region.description ||
              `Explore the exquisite collection of sarees from ${region.name}`}
          </p>
          <div className="mt-2 sm:mt-4 flex items-center gap-2 text-white/80">
            <span className="text-xs sm:text-sm">
              {region.sarees?.length || 0} sarees available
            </span>
          </div>
        </div>
      </section>

      {/* Sarees Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {region.sarees && region.sarees.length > 0 ? (
          <SareeGrid 
            sarees={region.sarees} 
            viewMode="grid"
            onAddToCart={() => {}}
            onAddToFavorites={() => {}}
            isFavorite={() => false}
          />
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-muted-foreground">
              No sarees available from this region yet. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Workshop Gallery Preview (if available) */}
      {region.galleries && region.galleries.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-maroon mb-4 sm:mb-6">
            Workshop Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {region.galleries[0]?.images.slice(0, 4).map((image: string, i: number) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg overflow-hidden"
              >
                <img
                  src={image || `https://placehold.co/400x400/7B2C2C/F6F0EB?text=Gallery+${i+1}`}
                  alt={`Workshop ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

