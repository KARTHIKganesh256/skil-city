"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface BargainModalProps {
  isOpen: boolean;
  onClose: () => void;
  saree: {
    id: string;
    title: string;
    price: number;
  };
}

export function BargainModal({ isOpen, onClose, saree }: BargainModalProps) {
  const [offerAmount, setOfferAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const offer = parseFloat(offerAmount);
    if (!offer || offer <= 0) {
      toast.error("Please enter a valid offer amount");
      return;
    }

    if (offer >= saree.price) {
      toast.error("Offer must be lower than the original price");
      return;
    }

    setLoading(true);

    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Offer submitted successfully!", {
        description: "The seller will review your offer and respond soon.",
      });

      onClose();
      setOfferAmount("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit offer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const discount = offerAmount
    ? Math.round(((saree.price - parseFloat(offerAmount)) / saree.price) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-maroon">
            <TrendingUp className="w-5 h-5" />
            Make an Offer
          </DialogTitle>
          <DialogDescription>
            Negotiate the price for this saree with the seller
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Info */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="font-semibold text-sm mb-1">{saree.title}</p>
            <p className="text-2xl font-bold text-maroon">
              ₹{saree.price.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">Original Price</p>
          </div>

          {/* Offer Amount */}
          <div className="space-y-2">
            <Label htmlFor="offerAmount">Your Offer *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <Input
                id="offerAmount"
                type="number"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter your offer"
                className="pl-7"
                required
                min="1"
                max={saree.price - 1}
              />
            </div>
            {offerAmount && discount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 font-medium"
              >
                {discount}% off the original price
              </motion.p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note for the seller..."
              rows={3}
            />
          </div>

          {/* Quick Suggestions */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Quick Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 20].map((percent) => {
                const amount = Math.floor(saree.price * (1 - percent / 100));
                return (
                  <Button
                    key={percent}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOfferAmount(amount.toString())}
                    className="text-xs"
                  >
                    -{percent}% (₹{amount.toLocaleString("en-IN")})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-maroon hover:bg-maroon-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Offer"}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            The seller will review and may accept, counter, or decline your offer
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}



