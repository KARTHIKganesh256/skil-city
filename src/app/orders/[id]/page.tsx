"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderTrackingPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - replace with actual API call
  const order = {
    id: params.id,
    status: "SHIPPED",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    items: [
      {
        id: "1",
        title: "Dharmavaram Silk Saree - Classic",
        price: 12000,
        quantity: 1,
        image: "https://placehold.co/200x250/7B2C2C/F6F0EB?text=Saree",
      },
    ],
    subtotal: 12000,
    shipping: 0,
    total: 12000,
    shippingAddress: {
      fullName: "John Doe",
      phone: "+91 12345 67890",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    trackingNo: "TRK123456789",
    carrier: "BlueDart",
  };

  const statusSteps = [
    {
      status: "PLACED",
      label: "Order Placed",
      icon: Package,
      completed: true,
      date: order.createdAt,
    },
    {
      status: "PROCESSING",
      label: "Processing",
      icon: Package,
      completed: true,
      date: new Date(order.createdAt.getTime() + 4 * 60 * 60 * 1000),
    },
    {
      status: "SHIPPED",
      label: "Shipped",
      icon: Truck,
      completed: order.status === "SHIPPED" || order.status === "DELIVERED",
      date:
        order.status === "SHIPPED" || order.status === "DELIVERED"
          ? new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000)
          : null,
    },
    {
      status: "DELIVERED",
      label: "Delivered",
      icon: CheckCircle,
      completed: order.status === "DELIVERED",
      date: order.status === "DELIVERED" ? order.estimatedDelivery : null,
    },
  ];

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon mb-2">
          Order Tracking
        </h1>
        <p className="text-muted-foreground mb-8">
          Order #{order.id}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-maroon">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.status} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              step.completed
                                ? "bg-green-500 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                          </motion.div>
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`w-0.5 h-16 ${
                                step.completed ? "bg-green-500" : "bg-muted"
                              }`}
                            />
                          )}
                        </div>

                        <div className="flex-1 pb-8">
                          <h3 className="font-semibold text-maroon">
                            {step.label}
                          </h3>
                          {step.date && (
                            <p className="text-sm text-muted-foreground">
                              {step.date.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )}
                          {step.status === "SHIPPED" && step.completed && (
                            <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm font-medium">
                                Tracking Number: {order.trackingNo}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Carrier: {order.carrier}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-maroon">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-28 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-lg font-bold text-maroon">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Shipping Address */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-maroon">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {order.shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${order.shipping}`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-maroon">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-maroon">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.phone}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  <p className="text-muted-foreground">
                    PIN: {order.shippingAddress.pincode}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}


