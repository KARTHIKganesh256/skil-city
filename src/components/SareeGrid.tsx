"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface Saree {
  id: string;
  title: string;
  type: string;
  price: number;
  mrp: number | null;
  images: string[];
  isBargainAllowed: boolean;
  stock: number;
  isCustomAvailable: boolean;
  region: {
    name: string;
    state: string;
  };
}

interface SareeGridProps {
  sarees: Saree[];
  viewMode?: "grid" | "list";
  onAddToCart?: (saree: Saree) => void;
  onAddToFavorites?: (sareeId: string) => void;
  isFavorite?: (sareeId: string) => boolean;
}

export function SareeGrid({ 
  sarees, 
  viewMode = "grid",
  onAddToCart,
  onAddToFavorites,
  isFavorite
}: SareeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sarees.map((saree, index) => (
        <motion.div
          key={saree.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Link href={`/sarees/${saree.id}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-maroon h-full">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <motion.img
                  src={
                    saree.images[0] ||
                    "https://placehold.co/400x530/7B2C2C/F6F0EB?text=Saree"
                  }
                  alt={saree.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Badges */}
                <div className="absolute top-3 right-3 space-y-2">
                  {saree.mrp && saree.mrp > saree.price && (
                    <Badge className="bg-green-500 block">
                      {Math.round(((saree.mrp - saree.price) / saree.mrp) * 100)}% OFF
                    </Badge>
                  )}
                  {saree.isBargainAllowed && (
                    <Badge variant="outline" className="bg-accent text-accent-foreground border-transparent block">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Bargain
                    </Badge>
                  )}
                  {saree.stock < 5 && saree.stock > 0 && (
                    <Badge variant="destructive" className="block">
                      Low Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Info */}
              <CardContent className="p-4">
                <h3 className="font-semibold text-maroon line-clamp-2 mb-1 group-hover:text-gold transition-colors">
                  {saree.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {saree.type}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-maroon">
                    ₹{saree.price.toLocaleString("en-IN")}
                  </span>
                  {saree.mrp && saree.mrp > saree.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{saree.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

