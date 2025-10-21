"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OrderSuccessPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <CheckCircle className="w-24 h-24 text-green-500" />
          </motion.div>

          <h1 className="text-4xl font-serif font-bold text-maroon mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been confirmed and will be
            processed soon.
          </p>

          <Card className="text-left mb-8">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-mono font-semibold text-maroon">
                  {orderNumber}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-green-600">Confirmed</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-medium">5-7 business days</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-maroon hover:bg-maroon-700"
            >
              <Link href={`/orders/${orderNumber}`}>
                <Package className="w-5 h-5 mr-2" />
                Track Order
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/">
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            A confirmation email has been sent to your registered email address.
          </p>
        </motion.div>
      </div>
    </main>
  );
}



