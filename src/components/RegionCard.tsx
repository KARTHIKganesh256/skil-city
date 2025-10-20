"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";

interface RegionCardProps {
  region: {
    id: string;
    name: string;
    state: string | null;
    description: string | null;
    imageUrl: string | null;
    featured: boolean;
    _count?: {
      sarees: number;
    };
  };
  index: number;
}

export function RegionCard({ region, index }: RegionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/regions/${region.id}`}>
        <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border-2 hover:border-maroon vibrant-hover glow-effect">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative h-48 overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 30% 70%, rgba(255, 105, 180, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(50, 205, 50, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, 
                  rgba(255, 105, 180, 0.2) 0%, 
                  rgba(50, 205, 50, 0.2) 30%,
                  rgba(255, 20, 147, 0.25) 60%, 
                  rgba(0, 255, 127, 0.2) 100%
                )
              `
            }}
          >
            {/* Image placeholder with gradient overlay */}
            <div className="absolute inset-0 bg-black/20" />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle at center, rgba(214, 169, 59, 0.3), transparent)",
              }}
            />
            
            {region.featured && (
              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground font-semibold">
                Featured
              </Badge>
            )}

            {/* Decorative pattern overlay */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(255, 255, 255, 0.1) 10px,
                  rgba(255, 255, 255, 0.1) 20px
                )`,
              }}
              animate={{
                backgroundPosition: ["0px 0px", "20px 0px"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          <CardHeader>
            <CardTitle className="flex items-start gap-2 text-maroon group-hover:text-gold transition-colors">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <span className="line-clamp-2">{region.name}</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {region.description || "Discover the unique sarees from this region"}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {region._count?.sarees || 0} sarees available
              </span>
              <motion.div
                className="flex items-center gap-1 text-maroon font-medium group-hover:gap-2 transition-all"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

