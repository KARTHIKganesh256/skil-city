"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, MapPin, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GALLERY_IMAGES = [
  { id: 1, url: "https://placehold.co/800x600/7B2C2C/F6F0EB?text=Weaving+Process", title: "Traditional Loom" },
  { id: 2, url: "https://placehold.co/800x600/D6A93B/F6F0EB?text=Zari+Work", title: "Zari Work Detail" },
  { id: 3, url: "https://placehold.co/800x600/6B7A53/F6F0EB?text=Artisan+at+Work", title: "Master Artisan" },
  { id: 4, url: "https://placehold.co/800x600/7B2C2C/F6F0EB?text=Silk+Threads", title: "Silk Thread Selection" },
  { id: 5, url: "https://placehold.co/800x600/D6A93B/F6F0EB?text=Border+Design", title: "Border Weaving" },
  { id: 6, url: "https://placehold.co/800x600/6B7A53/F6F0EB?text=Finished+Saree", title: "Finished Product" },
];

export default function DharmawaramGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-80 bg-gradient-to-br from-maroon via-gold to-maroon-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 5px,
                rgba(255, 255, 255, 0.1) 5px,
                rgba(255, 255, 255, 0.1) 10px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 5px,
                rgba(255, 255, 255, 0.1) 5px,
                rgba(255, 255, 255, 0.1) 10px
              )`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4"
          >
            Dharmavaram Workshop Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            Witness the artistry and craftsmanship behind every Dharmavaram silk
            saree
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-maroon via-gold to-maroon-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="rounded-full w-20 h-20 bg-white/90 hover:bg-white"
                    onClick={() => setShowVideo(true)}
                  >
                    <Play className="w-8 h-8 text-maroon ml-1" fill="currentColor" />
                  </Button>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    The Weaving Process
                  </h3>
                  <p className="text-white/90">
                    Watch how master artisans create Dharmavaram silk sarees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Photo Gallery */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-maroon mb-8">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold">{image.title}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-serif font-bold text-maroon mb-8">
            Visit Our Workshop
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Map Placeholder */}
                <div className="aspect-square md:aspect-auto bg-muted flex items-center justify-center p-8">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-maroon mx-auto mb-4" />
                    <p className="text-lg font-semibold text-maroon mb-2">
                      Dharmavaram, Andhra Pradesh
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mapbox integration available with API key
                    </p>
                  </div>
                </div>

                {/* Address Info */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-maroon mb-4">
                      Workshop Address
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>SilkCity Workshop</p>
                      <p>Main Street, Dharmavaram</p>
                      <p>Anantapur District</p>
                      <p>Andhra Pradesh - 515671</p>
                      <p>India</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-maroon mb-2">
                      Contact Information
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Phone: +91 12345 67890</p>
                      <p>Email: workshop@silkcity.com</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-maroon mb-2">
                      Workshop Hours
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>

                  <Button className="bg-maroon hover:bg-maroon-700">
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <img
              src={GALLERY_IMAGES.find((img) => img.id === selectedImage)?.url}
              alt="Gallery"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-4xl p-0">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">
              Video player would be embedded here
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}


