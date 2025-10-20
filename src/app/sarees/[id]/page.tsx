import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";

async function getSaree(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/sarees/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching saree:", error);
    return null;
  }
}

export default async function SareePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const saree = await getSaree(id);

  if (!saree) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-maroon">
            Home
          </a>
          {" / "}
          <a href={`/regions/${saree.region.id}`} className="hover:text-maroon">
            {saree.region.name}
          </a>
          {" / "}
          <span className="text-foreground">{saree.title}</span>
        </div>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductGallery images={saree.images} title={saree.title} />
          <ProductInfo saree={saree} />
        </div>

        {/* Product Details Tabs */}
        <ProductTabs saree={saree} />

        {/* Related Products */}
        {saree.relatedSarees && saree.relatedSarees.length > 0 && (
          <RelatedProducts products={saree.relatedSarees} />
        )}
      </div>
    </main>
  );
}


