"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, MapPin, Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SareeGrid } from "@/components/SareeGrid";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";

interface SareeType {
  id: string;
  name: string;
  description: string;
  image: string;
  characteristics: string[];
  priceRange: { min: number; max: number };
  states: string[];
  regions: string[];
}

interface State {
  id: string;
  name: string;
  code: string;
  description: string;
  image: string;
  sareeTypes: string[];
  regions: Array<{
    id: string;
    name: string;
    description: string;
    specialties: string[];
  }>;
  totalSarees: number;
  avgPrice: number;
}

interface Saree {
  id: string;
  title: string;
  type: string;
  price: number;
  mrp: number | null;
  stock: number;
  images: string[];
  isBargainAllowed: boolean;
  isCustomAvailable: boolean;
  region: {
    id: string;
    name: string;
    state: string | null;
  };
  characteristics?: string;
  fabric?: string;
}

export default function SareesPage() {
  const [sareeTypes, setSareeTypes] = useState<SareeType[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCart();
  const { addToFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [typesRes, statesRes, sareesRes] = await Promise.all([
        fetch('/api/sarees/types'),
        fetch('/api/sarees/states'),
        fetch('/api/sarees')
      ]);

      if (typesRes.ok) {
        const types = await typesRes.json();
        setSareeTypes(types);
      }

      if (statesRes.ok) {
        const statesData = await statesRes.json();
        setStates(statesData);
      }

      if (sareesRes.ok) {
        const sareesData = await sareesRes.json();
        setSarees(sareesData.sarees || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load sarees');
    } finally {
      setLoading(false);
    }
  };

  const filteredSarees = sarees.filter(saree => {
    // Safe string checks with fallbacks
    const sareeTitle = saree.title || '';
    const sareeCharacteristics = saree.characteristics || '';
    const regionName = saree.region?.name || '';
    const sareeType = saree.type || '';
    const regionState = saree.region?.state || '';
    
    const matchesSearch = sareeTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sareeCharacteristics.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         regionName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || selectedType === "all" || sareeType.toLowerCase().includes(selectedType.toLowerCase());
    const matchesState = !selectedState || selectedState === "all" || (regionState && regionState.toLowerCase().includes(selectedState.toLowerCase()));
    
    let matchesPrice = true;
    if (priceRange && priceRange !== "all") {
      const [min, max] = priceRange.split('-').map(Number);
      matchesPrice = saree.price >= min && saree.price <= max;
    }

    return matchesSearch && matchesType && matchesState && matchesPrice;
  });

  const sortedSarees = [...filteredSarees].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return 0; // Rating not available in current schema
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  const handleAddToCart = (saree: Saree) => {
    addToCart({
      sareeId: saree.id,
      name: saree.title,
      price: saree.price,
      image: saree.images[0] || '/placeholder-saree.jpg',
      selectedSize: "6m",
      selectedColor: saree.fabric || "Default",
      customizations: {
        blouse: "",
        pallu: "",
        border: "",
        length: 6,
        width: 1.1
      }
    });
  };

  const handleAddToFavorites = (sareeId: string) => {
    const saree = sarees.find(s => s.id === sareeId);
    if (saree) {
      addToFavorites({
        id: saree.id,
        name: saree.title,
        price: saree.price,
        image: saree.images[0] || '/placeholder-saree.jpg',
        region: saree.region.name,
        type: saree.type
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sarees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-4"
          >
            Explore Our Saree Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
          >
            Discover traditional sarees from across India, each telling a unique story of heritage and craftsmanship
          </motion.p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search sarees, regions, or types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Saree Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {sareeTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-10000">Under ₹10,000</SelectItem>
                    <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                    <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                    <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="100000-999999">Above ₹1,00,000</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">
              {sortedSarees.length} Sarees Found
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {selectedType && selectedType !== "all" && `Type: ${selectedType}`}
              {selectedState && selectedState !== "all" && ` • State: ${selectedState}`}
              {priceRange && priceRange !== "all" && ` • Price: ${priceRange}`}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Saree Types Overview */}
        <Tabs defaultValue="sarees" className="mb-6 sm:mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sarees" className="text-xs sm:text-sm">All Sarees</TabsTrigger>
            <TabsTrigger value="types" className="text-xs sm:text-sm">Saree Types</TabsTrigger>
            <TabsTrigger value="states" className="text-xs sm:text-sm">By State</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sarees">
            <SareeGrid 
              sarees={sortedSarees} 
              viewMode={viewMode}
              onAddToCart={handleAddToCart}
              onAddToFavorites={handleAddToFavorites}
              isFavorite={isFavorite}
            />
          </TabsContent>
          
          <TabsContent value="types">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sareeTypes.map((type) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{type.name}</h3>
                        <p className="text-sm opacity-90">
                          ₹{type.priceRange.min.toLocaleString()} - ₹{type.priceRange.max.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {type.characteristics.slice(0, 3).map((char, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {type.states.length} states
                        </span>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedType(type.name)}
                          className="bg-accent hover:bg-accent-strong"
                        >
                          View Sarees
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="states">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {states.map((state) => (
                <motion.div
                  key={state.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{state.name}</h3>
                        <p className="text-sm opacity-90">
                          {state.totalSarees} sarees
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">{state.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {state.sareeTypes.slice(0, 3).map((type, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Avg: ₹{state.avgPrice.toLocaleString()}
                        </span>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedState(state.name)}
                          className="bg-accent hover:bg-accent-strong"
                        >
                          View Sarees
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
