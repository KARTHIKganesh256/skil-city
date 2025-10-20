"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const { addToFavorites } = useFavorites();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleMoveToFavorites = (item: any) => {
    addToFavorites({
      id: item.sareeId,
      name: item.name,
      price: item.price,
      image: item.image,
      region: "Dharmavaram", // You might want to get this from the item
      type: "Silk"
    });
    removeFromCart(item.id);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover our beautiful collection of sarees and add some to your cart
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/sarees">
                <Button size="lg" className="bg-accent hover:bg-accent-strong">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <Link href="/sarees">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.selectedSize}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.selectedColor}
                          </Badge>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveToFavorites(item)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="sticky top-4 sm:top-8">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span className="font-medium">₹{state.total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-medium">₹{Math.round(state.total * 0.18).toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{(state.total + Math.round(state.total * 0.18)).toLocaleString()}</span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-accent hover:bg-accent-strong"
                    size="lg"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Secure checkout with SSL encryption
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}