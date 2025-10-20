"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, CreditCard, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  polishSelected: boolean;
  image: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      router.push("/cart");
    }
    setCartItems(cart);
  }, [router]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    // Validate
    if (
      !shippingInfo.fullName ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.pincode
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart
      localStorage.removeItem("cart");

      // Show success
      toast.success("Order placed successfully!");

      // Redirect to order confirmation
      router.push("/orders/success");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon mb-8">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <Step number={1} label="Shipping" active={step >= 1} />
          <div className="h-px w-16 bg-muted mx-2" />
          <Step number={2} label="Payment" active={step >= 2} />
          <div className="h-px w-16 bg-muted mx-2" />
          <Step number={3} label="Confirm" active={step >= 3} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-maroon">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+91 12345 67890"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="Street address, apartment, suite, etc."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={shippingInfo.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-maroon">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <PaymentOption
                  name="Razorpay"
                  description="Credit/Debit Card, UPI, Net Banking"
                  selected={true}
                />
                <PaymentOption
                  name="Cash on Delivery"
                  description="Pay when you receive"
                  selected={false}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-maroon">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-maroon">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-maroon">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-maroon hover:bg-maroon-700"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing an order, you agree to our Terms and Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function Step({
  number,
  label,
  active,
}: {
  number: number;
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
          active
            ? "bg-maroon text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {active && number < 3 ? <Check className="w-5 h-5" /> : number}
      </div>
      <span className="text-xs mt-2 text-muted-foreground">{label}</span>
    </div>
  );
}

function PaymentOption({
  name,
  description,
  selected,
}: {
  name: string;
  description: string;
  selected: boolean;
}) {
  return (
    <label
      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
        selected
          ? "border-maroon bg-maroon/5"
          : "border-muted hover:border-maroon/50"
      }`}
    >
      <input
        type="radio"
        name="payment"
        checked={selected}
        className="mt-1"
        readOnly
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </label>
  );
}


