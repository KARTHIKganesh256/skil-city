"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Scissors, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const BORDER_STYLES = [
  { id: "classic", name: "Classic", pattern: "traditional temple motifs" },
  { id: "peacock", name: "Peacock", pattern: "peacock feather design" },
  { id: "floral", name: "Floral", pattern: "intricate floral patterns" },
  { id: "geometric", name: "Geometric", pattern: "geometric shapes" },
];

const PALLU_DESIGNS = [
  { id: "zari", name: "Heavy Zari", desc: "Traditional gold zari work" },
  { id: "dual", name: "Dual Tone", desc: "Two-color combination" },
  { id: "brocade", name: "Brocade", desc: "Rich brocade patterns" },
  { id: "simple", name: "Simple", desc: "Minimalist design" },
];

const BASE_COLORS = [
  { id: "maroon", name: "Maroon", hex: "#7B2C2C" },
  { id: "gold", name: "Gold", hex: "#D6A93B" },
  { id: "green", name: "Green", hex: "#2D5016" },
  { id: "blue", name: "Blue", hex: "#1E40AF" },
  { id: "red", name: "Red", hex: "#DC2626" },
  { id: "purple", name: "Purple", hex: "#7C3AED" },
];

export default function CustomBuilderPage() {
  const [selectedBorder, setSelectedBorder] = useState(BORDER_STYLES[0].id);
  const [selectedPallu, setSelectedPallu] = useState(PALLU_DESIGNS[0].id);
  const [selectedColor, setSelectedColor] = useState(BASE_COLORS[0].id);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Custom request submitted!", {
        description: "Our team will review and send you a quote within 24 hours.",
      });

      // Reset form
      setSelectedBorder(BORDER_STYLES[0].id);
      setSelectedPallu(PALLU_DESIGNS[0].id);
      setSelectedColor(BASE_COLORS[0].id);
      setAdditionalNotes("");
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedColorObj = BASE_COLORS.find((c) => c.id === selectedColor);

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4"
          >
            Custom Saree Builder
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Design your dream saree with our custom builder. Choose borders, pallu
            patterns, and colors to create something uniquely yours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Builder Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Border Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-maroon">
                  <Scissors className="w-5 h-5" />
                  Select Border Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {BORDER_STYLES.map((border) => (
                    <motion.button
                      key={border.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedBorder(border.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedBorder === border.id
                          ? "border-maroon bg-maroon/5"
                          : "border-muted hover:border-maroon/50"
                      }`}
                    >
                      <p className="font-semibold mb-1">{border.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {border.pattern}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pallu Design */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-maroon">
                  <Sparkles className="w-5 h-5" />
                  Select Pallu Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PALLU_DESIGNS.map((pallu) => (
                    <motion.button
                      key={pallu.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPallu(pallu.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedPallu === pallu.id
                          ? "border-maroon bg-maroon/5"
                          : "border-muted hover:border-maroon/50"
                      }`}
                    >
                      <p className="font-semibold mb-1">{pallu.name}</p>
                      <p className="text-sm text-muted-foreground">{pallu.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Base Color */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-maroon">
                  <Palette className="w-5 h-5" />
                  Select Base Color
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {BASE_COLORS.map((color) => (
                    <motion.button
                      key={color.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color.id)}
                      className={`aspect-square rounded-lg border-2 transition-all ${
                        selectedColor === color.id
                          ? "border-maroon ring-4 ring-maroon/20"
                          : "border-muted hover:border-maroon/50"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-maroon">Additional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="notes">Specific Requirements (Optional)</Label>
                <Textarea
                  id="notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any specific requirements, measurements, or design preferences..."
                  rows={4}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview & Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-maroon">Your Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preview */}
                <div
                  className="aspect-[3/4] rounded-lg border-4 border-maroon overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${selectedColorObj?.hex} 0%, ${selectedColorObj?.hex}dd 100%)`,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center p-4">
                      <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Design Preview</p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Border Style</p>
                    <p className="font-semibold">
                      {BORDER_STYLES.find((b) => b.id === selectedBorder)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pallu Design</p>
                    <p className="font-semibold">
                      {PALLU_DESIGNS.find((p) => p.id === selectedPallu)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Base Color</p>
                    <p className="font-semibold">{selectedColorObj?.name}</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-maroon hover:bg-maroon-700"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Submitting..." : "Request Quote"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Our experts will review your design and send you a detailed quote
                  within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}


