"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, TrendingUp, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BargainModal } from "@/components/BargainModal";

interface ProductInfoProps {
  saree: {
    id: string;
    title: string;
    type: string;
    fabric: string | null;
    price: number;
    mrp: number | null;
    stock: number;
    isBargainAllowed: boolean;
    polishPrice: number | null;
    characteristics: string | null;
    region: {
      id: string;
      name: string;
    };
  };
}

export function ProductInfo({ saree }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [polishSelected, setPolishSelected] = useState(false);

  const discount = saree.mrp
    ? Math.round(((saree.mrp - saree.price) / saree.mrp) * 100)
    : 0;

  const totalPrice = saree.price * quantity + (polishSelected && saree.polishPrice ? saree.polishPrice : 0);

  const handleAddToCart = () => {
    // Add to cart logic (localStorage or state management)
    const cartItem = {
      id: saree.id,
      title: saree.title,
      price: saree.price,
      quantity,
      polishSelected,
      image: "https://placehold.co/200x250/7B2C2C/F6F0EB?text=Saree",
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as Array<{id: string; quantity: number}>;
    const existingIndex = cart.findIndex((item) => item.id === saree.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart!", {
      description: `${quantity} × ${saree.title}`,
    });
  };

  const [showBargainModal, setShowBargainModal] = useState(false);

  const handleMakeOffer = () => {
    setShowBargainModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Title & Region */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon mb-2">
          {saree.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <a
            href={`/regions/${saree.region.id}`}
            className="hover:text-maroon transition-colors"
          >
            {saree.region.name}
          </a>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-gold text-maroon">{saree.type}</Badge>
        {saree.fabric && <Badge variant="outline">{saree.fabric}</Badge>}
        {saree.stock < 10 && saree.stock > 0 && (
          <Badge variant="destructive">Only {saree.stock} left!</Badge>
        )}
        {saree.isBargainAllowed && (
          <Badge variant="outline" className="border-maroon text-maroon">
            <TrendingUp className="w-3 h-3 mr-1" />
            Bargaining Available
          </Badge>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-maroon">
            ₹{saree.price.toLocaleString("en-IN")}
          </span>
          {saree.mrp && saree.mrp > saree.price && (
            <>
              <span className="text-xl text-muted-foreground line-through">
                ₹{saree.mrp.toLocaleString("en-IN")}
              </span>
              <Badge className="bg-green-500">{discount}% OFF</Badge>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Inclusive of all taxes
        </p>
      </div>

      <Separator />

      {/* Polish Service */}
      {saree.polishPrice && (
        <div className="p-4 bg-muted rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={polishSelected}
              onChange={(e) => setPolishSelected(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-maroon text-maroon focus:ring-maroon"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="font-semibold">Add Polish Service</span>
                <span className="text-sm text-maroon">
                  +₹{saree.polishPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional saree polishing to restore shine and luster
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(saree.stock, quantity + 1))}
            disabled={quantity >= saree.stock}
          >
            +
          </Button>
          <span className="text-sm text-muted-foreground">
            ({saree.stock} available)
          </span>
        </div>
      </div>

      {/* Total */}
      {(polishSelected || quantity > 1) && (
        <div className="p-4 bg-maroon/5 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="text-2xl font-bold text-maroon">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full bg-maroon hover:bg-maroon-700 text-white"
          onClick={handleAddToCart}
          disabled={saree.stock === 0}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {saree.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>

        {saree.isBargainAllowed && (
          <Button
            size="lg"
            variant="outline"
            className="w-full border-maroon text-maroon hover:bg-maroon hover:text-white"
            onClick={handleMakeOffer}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Make an Offer
          </Button>
        )}
      </div>

      {/* Features */}
      <div className="space-y-2 pt-4 border-t">
        <Feature text="Authentic Handwoven" />
        <Feature text="Free Shipping on Orders Above ₹5,000" />
        <Feature text="7-Day Return & Exchange" />
        <Feature text="Secure Payment Options" />
      </div>

      {/* Bargain Modal */}
      {saree.isBargainAllowed && (
        <BargainModal
          isOpen={showBargainModal}
          onClose={() => setShowBargainModal(false)}
          saree={{
            id: saree.id,
            title: saree.title,
            price: saree.price,
          }}
        />
      )}
    </motion.div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Check className="w-4 h-4 text-green-600" />
      <span>{text}</span>
    </div>
  );
}

