"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  type: string;
  price: number;
  mrp: number | null;
  images: string[];
}

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-serif font-bold text-maroon mb-8">
        You May Also Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/sarees/${product.id}`}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-maroon">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={
                      product.images[0] ||
                      "https://placehold.co/400x530/7B2C2C/F6F0EB?text=Saree"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {product.mrp && product.mrp > product.price && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      {Math.round(
                        ((product.mrp - product.price) / product.mrp) * 100
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-maroon line-clamp-1 group-hover:text-gold transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.type}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-maroon">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

