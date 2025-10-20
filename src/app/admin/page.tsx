"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data
const STATS = [
  {
    title: "Total Sales",
    value: "₹4,52,000",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Orders",
    value: "124",
    change: "+8.2%",
    icon: ShoppingBag,
    color: "text-blue-600",
  },
  {
    title: "Products",
    value: "248",
    change: "+4",
    icon: Package,
    color: "text-purple-600",
  },
  {
    title: "Customers",
    value: "1,428",
    change: "+23",
    icon: Users,
    color: "text-orange-600",
  },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "John Doe", amount: 12000, status: "SHIPPED" },
  { id: "ORD-002", customer: "Jane Smith", amount: 8500, status: "PROCESSING" },
  { id: "ORD-003", customer: "Bob Johnson", amount: 15000, status: "PLACED" },
  { id: "ORD-004", customer: "Alice Brown", amount: 9800, status: "DELIVERED" },
];

const PENDING_OFFERS = [
  { id: 1, saree: "Dharmavaram Silk Saree", customer: "Raj Kumar", offer: 10000, original: 12000 },
  { id: 2, saree: "Banarasi Saree - Red", customer: "Priya Sharma", offer: 8500, original: 9500 },
  { id: 3, saree: "Kanchipuram Silk", customer: "Amit Patel", offer: 11000, original: 13000 },
];

const LOW_STOCK_ITEMS = [
  { id: 1, name: "Dharmavaram Classic", stock: 2 },
  { id: 2, name: "Banarasi Bridal", stock: 1 },
  { id: 3, name: "Kanchipuram Gold", stock: 3 },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-maroon mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-maroon">Recent Orders</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-maroon">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </p>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Offers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-maroon">Pending Offers</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/offers">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {PENDING_OFFERS.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm">{offer.saree}</p>
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      by {offer.customer}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground line-through">
                        ₹{offer.original.toLocaleString("en-IN")}
                      </span>
                      <span className="font-bold text-maroon">
                        ₹{offer.offer.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-green-600">
                        ({Math.round(((offer.original - offer.offer) / offer.original) * 100)}% off)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="w-5 h-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LOW_STOCK_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <p className="font-semibold text-sm mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Only {item.stock} left in stock
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Button
            asChild
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Link href="/admin/products">
              <Package className="w-6 h-6" />
              Manage Products
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Link href="/admin/orders">
              <ShoppingBag className="w-6 h-6" />
              Manage Orders
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Link href="/admin/offers">
              <TrendingUp className="w-6 h-6" />
              Review Offers
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Link href="/admin/customers">
              <Users className="w-6 h-6" />
              View Customers
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PLACED: "bg-blue-100 text-blue-700",
    PROCESSING: "bg-yellow-100 text-yellow-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${colors[status] || "bg-gray-100 text-gray-700"
        }`}
    >
      {status}
    </span>
  );
}


