"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  ShoppingCart, 
  Calendar, 
  Ruler, 
  Palette, 
  Star,
  MapPin,
  Clock,
  Users,
  Award,
  Truck,
  Shield,
  MessageCircle,
  Share2,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Saree {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  region: {
    name: string;
    state: string;
  };
  type: string;
  material: string;
  color: string;
  length: number;
  width: number;
  weight: number;
  occasion: string[];
  careInstructions: string;
  availability: 'in-stock' | 'out-of-stock' | 'pre-order';
  estimatedDelivery: string;
  rating: number;
  reviewCount: number;
  isCustomizable: boolean;
  isBargainable: boolean;
  minBargainPrice?: number;
  maxBargainPrice?: number;
  features: string[];
  specifications: {
    blouse: string;
    pallu: string;
    border: string;
    zari: string;
    work: string;
  };
}

interface SareePanelProps {
  saree: Saree;
  onAddToCart: (saree: Saree, options: Record<string, unknown>) => void;
  onAddToFavorites: (sareeId: string) => void;
  onBookCustom: (saree: Saree, requirements: Record<string, unknown>) => void;
  onStartBargain: (saree: Saree, offer: number) => void;
}

export function SareePanel({ 
  saree, 
  onAddToCart, 
  onAddToFavorites, 
  onBookCustom, 
  onStartBargain 
}: SareePanelProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(saree.color);
  const [customizations, setCustomizations] = useState({
    blouse: "",
    pallu: "",
    border: "",
    length: saree.length,
    width: saree.width
  });
  const [isFavorited, setIsFavorited] = useState(false);
  const [showBargainModal, setShowBargainModal] = useState(false);
  const [bargainOffer, setBargainOffer] = useState(saree.price);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customRequirements, setCustomRequirements] = useState({
    occasion: "",
    preferences: "",
    timeline: "",
    budget: ""
  });

  const sizes = ["5.5m", "6m", "6.5m", "7m", "7.5m", "8m"];
  const colors = [saree.color, "Red", "Green", "Blue", "Purple", "Pink", "Orange", "Yellow"];

  const handleAddToCart = () => {
    const cartItem = {
      ...saree,
      selectedSize,
      selectedColor,
      customizations
    };
    onAddToCart(saree, cartItem);
    toast.success("Added to cart!");
  };

  const handleAddToFavorites = () => {
    setIsFavorited(!isFavorited);
    onAddToFavorites(saree.id);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites!");
  };

  const handleBookCustom = () => {
    onBookCustom(saree, customRequirements);
    setShowCustomModal(false);
    toast.success("Custom booking request submitted!");
  };

  const handleStartBargain = () => {
    onStartBargain(saree, bargainOffer);
    setShowBargainModal(false);
    toast.success("Bargain offer submitted!");
  };

  const getAvailabilityBadge = () => {
    switch (saree.availability) {
      case 'in-stock':
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      case 'pre-order':
        return <Badge className="bg-blue-100 text-blue-800">Pre-order</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <motion.img
              key={selectedImage}
              src={saree.images[selectedImage]}
              alt={saree.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {saree.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-accent' : 'border-gray-200'
                }`}
              >
                <img src={image} alt={`${saree.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
                  {saree.name}
                </h1>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground truncate">
                    {saree.region.name}, {saree.region.state}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 sm:gap-2 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddToFavorites}
                  className={`h-8 w-8 sm:h-10 sm:w-10 ${isFavorited ? "text-red-500" : ""}`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? "fill-current" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {getAvailabilityBadge()}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(saree.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({saree.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                ₹{saree.price.toLocaleString()}
              </span>
              {saree.originalPrice && (
                <span className="text-lg sm:text-xl text-muted-foreground line-through">
                  ₹{saree.originalPrice.toLocaleString()}
                </span>
              )}
              {saree.originalPrice && (
                <Badge className="bg-accent text-white text-xs sm:text-sm">
                  {Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-accent hover:bg-accent-strong"
              disabled={saree.availability === 'out-of-stock'}
              size="lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <div className="flex gap-2 sm:gap-3">
              {saree.isBargainable && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowBargainModal(true)}
                  className="border-accent text-accent hover:bg-accent hover:text-white flex-1 sm:flex-none"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Bargain</span>
                </Button>
              )}
              {saree.isCustomizable && (
                <Button 
                  variant="outline"
                  onClick={() => setShowCustomModal(true)}
                  className="flex-1 sm:flex-none"
                  size="lg"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Book Custom</span>
                </Button>
              )}
            </div>
          </div>

          {/* Product Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {saree.isCustomizable && (
                <div className="space-y-3">
                  <Label>Customizations</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="blouse">Blouse Length</Label>
                      <Input
                        id="blouse"
                        value={customizations.blouse}
                        onChange={(e) => setCustomizations(prev => ({ ...prev, blouse: e.target.value }))}
                        placeholder="e.g., 1.2m"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pallu">Pallu Style</Label>
                      <Input
                        id="pallu"
                        value={customizations.pallu}
                        onChange={(e) => setCustomizations(prev => ({ ...prev, pallu: e.target.value }))}
                        placeholder="e.g., Traditional"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Information Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="text-xs sm:text-sm">Specs</TabsTrigger>
              <TabsTrigger value="care" className="text-xs sm:text-sm">Care</TabsTrigger>
              <TabsTrigger value="shipping" className="text-xs sm:text-sm">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed">{saree.description}</p>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <h4 className="font-semibold">Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {saree.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">Length:</span>
                        <span className="text-sm">{saree.length}m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">Width:</span>
                        <span className="text-sm">{saree.width}m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Weight:</span>
                        <span className="text-sm">{saree.weight}g</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">Material:</span>
                        <span className="text-sm">{saree.material}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">Type:</span>
                        <span className="text-sm">{saree.type}</span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <h4 className="font-semibold">Detailed Specifications:</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div><span className="font-medium">Blouse:</span> {saree.specifications.blouse}</div>
                      <div><span className="font-medium">Pallu:</span> {saree.specifications.pallu}</div>
                      <div><span className="font-medium">Border:</span> {saree.specifications.border}</div>
                      <div><span className="font-medium">Zari:</span> {saree.specifications.zari}</div>
                      <div><span className="font-medium">Work:</span> {saree.specifications.work}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="care" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Care Instructions:</h4>
                      <p className="text-sm text-gray-600">{saree.careInstructions}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Occasions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {saree.occasion.map((occ, index) => (
                          <Badge key={index} variant="secondary">{occ}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-accent" />
                      <span className="font-semibold">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Estimated Delivery: {saree.estimatedDelivery}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">7-day return policy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Expert consultation available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bargain Modal */}
      <AnimatePresence>
        {showBargainModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBargainModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Make an Offer</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="offer">Your Offer (₹)</Label>
                  <Input
                    id="offer"
                    type="number"
                    value={bargainOffer}
                    onChange={(e) => setBargainOffer(Number(e.target.value))}
                    min={saree.minBargainPrice || saree.price * 0.7}
                    max={saree.maxBargainPrice || saree.price}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Range: ₹{saree.minBargainPrice || Math.round(saree.price * 0.7)} - ₹{saree.maxBargainPrice || saree.price}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleStartBargain}
                    className="flex-1 bg-accent hover:bg-accent-strong"
                  >
                    Submit Offer
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowBargainModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Booking Modal */}
      <AnimatePresence>
        {showCustomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCustomModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Book Custom Saree</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="occasion">Occasion</Label>
                  <Input
                    id="occasion"
                    value={customRequirements.occasion}
                    onChange={(e) => setCustomRequirements(prev => ({ ...prev, occasion: e.target.value }))}
                    placeholder="e.g., Wedding, Festival, Party"
                  />
                </div>
                <div>
                  <Label htmlFor="preferences">Design Preferences</Label>
                  <Textarea
                    id="preferences"
                    value={customRequirements.preferences}
                    onChange={(e) => setCustomRequirements(prev => ({ ...prev, preferences: e.target.value }))}
                    placeholder="Describe your design preferences, colors, patterns..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={customRequirements.timeline}
                    onChange={(e) => setCustomRequirements(prev => ({ ...prev, timeline: e.target.value }))}
                    placeholder="e.g., 2 weeks, 1 month"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input
                    id="budget"
                    value={customRequirements.budget}
                    onChange={(e) => setCustomRequirements(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="e.g., ₹5000-10000"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleBookCustom}
                    className="flex-1 bg-accent hover:bg-accent-strong"
                  >
                    Submit Request
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCustomModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
