"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 12345 67890",
    address: "123 Main Street, Mumbai, Maharashtra - 400001",
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  const recentOrders = [
    { id: "ORD-001", date: "2024-10-18", total: 12000, status: "DELIVERED" },
    { id: "ORD-002", date: "2024-10-15", total: 18000, status: "SHIPPED" },
    { id: "ORD-003", date: "2024-10-10", total: 9500, status: "DELIVERED" },
  ];

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-serif font-bold text-maroon mb-1">
                  {profile.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {profile.email}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setEditing(!editing)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {editing ? "Cancel" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-maroon">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <span className="font-bold text-maroon">24</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Wishlist</span>
                  </div>
                  <span className="font-bold text-maroon">8</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-maroon">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          disabled={!editing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          disabled={!editing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                          disabled={!editing}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) =>
                            setProfile({ ...profile, address: e.target.value })
                          }
                          disabled={!editing}
                        />
                      </div>
                    </div>

                    {editing && (
                      <Button
                        onClick={handleSave}
                        className="bg-maroon hover:bg-maroon-700"
                      >
                        Save Changes
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-maroon">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-maroon">
                              ₹{order.total.toLocaleString("en-IN")}
                            </p>
                            <p className="text-sm text-green-600">{order.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-maroon">Saved Addresses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/50 rounded-lg mb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold mb-1">Home</p>
                          <p className="text-sm text-muted-foreground">
                            {profile.address}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add New Address
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}



