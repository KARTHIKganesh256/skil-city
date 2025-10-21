"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data
const PRODUCTS = [
  { id: "1", title: "Dharmavaram Silk Saree - Classic", type: "Dharmavaram Silk", price: 12000, stock: 15, status: "active" },
  { id: "2", title: "Banarasi Saree - Bridal Red", type: "Banarasi Saree", price: 18000, stock: 8, status: "active" },
  { id: "3", title: "Kanchipuram Gold Border", type: "Kanchipuram Silk", price: 15000, stock: 3, status: "low_stock" },
  { id: "4", title: "Paithani Pure Silk", type: "Paithani", price: 22000, stock: 12, status: "active" },
  { id: "5", title: "Pochampally Ikat", type: "Pochampally Ikat", price: 8500, stock: 0, status: "out_of_stock" },
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    toast.success("Product deleted successfully");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-maroon">
              Product Management
            </h1>
            <p className="text-muted-foreground">
              Manage your saree inventory
            </p>
          </div>
          <Button className="bg-maroon hover:bg-maroon-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{product.title}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock < 5
                              ? "text-orange-600"
                              : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={product.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-maroon hover:text-maroon-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const badges: Record<string, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-green-100 text-green-700" },
    low_stock: { label: "Low Stock", className: "bg-orange-100 text-orange-700" },
    out_of_stock: { label: "Out of Stock", className: "bg-red-100 text-red-700" },
  };

  const badge = badges[status] || badges.active;

  return (
    <Badge className={badge.className}>
      {badge.label}
    </Badge>
  );
}



