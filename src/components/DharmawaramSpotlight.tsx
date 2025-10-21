"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, Play } from "lucide-react";

export function DharmawaramSpotlight() {
  return (
    <section id="dharmavaram" className="py-20 px-4 bg-gradient-to-b from-muted/50 to-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
            The Dharmavaram Legacy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the rich heritage and artistry behind Dharmavaram silk sarees, 
            renowned for their durability, dual-shade colors, and temple-inspired motifs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Image/Video section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden border-2 border-maroon/20">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-maroon via-gold to-maroon-700 flex items-center justify-center group cursor-pointer">
                  <motion.div
                    className="absolute inset-0 bg-black/40"
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="relative z-10 flex flex-col items-center gap-4 text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center">
                      <Play className="w-8 h-8 text-maroon ml-1" fill="currentColor" />
                    </div>
                    <span className="text-xl font-semibold">Watch the Weaving Process</span>
                  </motion.div>

                  {/* Decorative weave pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 5px,
                        rgba(255, 255, 255, 0.1) 5px,
                        rgba(255, 255, 255, 0.1) 10px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 5px,
                        rgba(255, 255, 255, 0.1) 5px,
                        rgba(255, 255, 255, 0.1) 10px
                      )`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Map section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6"
            >
              <Card className="p-4 border-gold/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-maroon mb-1">
                      Dharmavaram, Andhra Pradesh
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A historic town known for its traditional silk weaving industry, 
                      producing some of India&apos;s finest wedding sarees for generations.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right: Content section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold text-maroon mb-3">
                What Makes Dharmavaram Silk Special?
              </h3>
              <div className="space-y-4">
                <FeatureItem
                  title="Broad Solid Borders"
                  description="Distinctive wide borders with intricate zari work that frame the saree beautifully."
                />
                <FeatureItem
                  title="Dual-Shade Colors"
                  description="Unique color combinations that shift and shimmer, creating a mesmerizing effect."
                />
                <FeatureItem
                  title="Temple Motifs"
                  description="Traditional designs inspired by ancient temple architecture and sacred geometry."
                />
                <FeatureItem
                  title="Wedding-Grade Durability"
                  description="Heavy, durable silk that can be cherished and passed down through generations."
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                className="bg-maroon hover:bg-maroon-700 text-white"
              >
                <Link href="/gallery/dharmavaram">
                  <Camera className="w-4 h-4 mr-2" />
                  Workshop Gallery
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-maroon text-maroon hover:bg-maroon hover:text-white"
              >
                <Link href="/regions/dharmavaram">
                  View Collection
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex gap-3"
    >
      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
      <div>
        <h4 className="font-semibold text-maroon">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}


