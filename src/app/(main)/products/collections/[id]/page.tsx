'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Edit,
  MoreVertical,
  Star,
  Share2,
  Package,
  Shield,
  Award,
  Copy,
  ExternalLink,
  Info,
  TrendingUp,
  DollarSign,
  BarChart3,
  Globe,
  Store as StoreIcon,
  Zap,
  CheckCircle,
  Plus,
  Eye,
  Heart,
  ShoppingBag,
  Users,
  Calendar,
  Clock,
  Tag,
  Activity,
  AlertCircle,
  ChevronRight,
  Download,
  Filter,
  Search,
  Settings,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Camera,
  Verified,
  TrendingDown,
  PieChart,
  LineChart,
  Layers,
  Target,
  Bookmark,
  Bell,
  RefreshCw,
  Archive,
  FileText,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface CollectionDetailPageProps {
  params: {
    id: string;
  };
}

// Mock data for the collection
const mockCollectionData = {
  "id": "summer-collection-2024",
  "title": "Summer Collection 2024",
  "description": "Discover our latest summer collection featuring trendy and comfortable pieces perfect for the warm season. From lightweight fabrics to vibrant colors, this collection embodies the spirit of summer.",
  "status": "active",
  "featured": true,
  "image": "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "coverImages": [
    "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  ],
  "products": {
    "total": 24,
    "active": 20,
    "draft": 4,
    "outOfStock": 2
  },
  "channels": {
    "online": {
      "enabled": true,
      "url": "https://store.com/collections/summer-2024",
      "visibility": "visible",
      "featured": true
    },
    "pos": {
      "enabled": true,
      "availability": "in_stock",
      "displayOrder": 1
    },
    "marketplace": {
      "enabled": true,
      "platforms": ["amazon", "ebay"],
      "status": "active"
    }
  },
  "seo": {
    "title": "Summer Collection 2024 | Fashion Store",
    "description": "Shop our Summer 2024 Collection featuring trendy and comfortable pieces. Find the perfect summer outfits.",
    "keywords": ["summer fashion", "2024 collection", "trendy", "comfortable"],
    "score": 92
  },
  "schedule": {
    "publishDate": "2024-03-15T00:00:00Z",
    "endDate": "2024-08-31T23:59:59Z",
    "autoArchive": true
  },
  "tags": ["seasonal", "featured", "trending", "summer", "new arrival"],
  "createdAt": "2024-02-20T10:00:00Z",
  "updatedAt": "2024-02-20T15:30:00Z",
  "lastPublishedAt": "2024-03-15T00:00:00Z"
};

export default function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const collection = mockCollectionData;

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with Status Bar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 text-xs text-muted-foreground border-b border-border/40">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Live Collection</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Updated {new Date(collection.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-xs">Collection ID: {collection.id.slice(-8)}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Sync
              </Button>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-0">
              <Link href="/products/collections" className="w-fit">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Collections
                </Button>
              </Link>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Collections</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{collection.title}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={collection.status === 'active' ? 'default' : 'secondary'} className="hidden sm:inline-flex">
                <CheckCircle className="h-3 w-3 mr-1" />
                {collection.status === 'active' ? 'Active' : 'Draft'}
              </Badge>
              {collection.featured && (
                <Badge variant="outline" className="hidden sm:inline-flex border-amber-200 text-amber-700">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Collection Overview */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">{collection.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Published {new Date(collection.lastPublishedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {collection.products.total} Products
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      Last updated {new Date(collection.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Collection Media */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Image */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-[16/9] relative bg-gradient-to-br from-muted/30 to-muted/10">
                <img
                  src={collection.coverImages[selectedImage]}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
                  <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0 backdrop-blur-sm bg-background/80 shadow-sm">
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0 backdrop-blur-sm bg-background/80 shadow-sm">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0 backdrop-blur-sm bg-background/80 shadow-sm">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {collection.coverImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-md' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${collection.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Collection Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Collection Description */}
            <Card className="border-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Collection Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {collection.description}
                </p>
              </CardContent>
            </Card>

            {/* Collection Tags */}
            <div className="flex flex-wrap gap-2">
              {collection.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full h-12 flex items-center justify-start gap-2 bg-muted/30 p-1">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="channels" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Channels</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {/* Products Tab */}
              <TabsContent value="products" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Collection Products</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage products in this collection
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Products
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {/* Product Cards would go here */}
                      <div className="border rounded-lg p-4">
                        <div className="aspect-square rounded-lg bg-muted mb-4"></div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Product Name</h4>
                          <p className="text-sm text-muted-foreground">$99.99</p>
                        </div>
                      </div>
                      {/* More product cards... */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Channels Tab */}
              <TabsContent value="channels" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Sales Channels</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage where this collection appears
                    </p>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Channel
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Online Store */}
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Online Store</h4>
                          <p className="text-sm text-muted-foreground">Website & Mobile App</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-0">Active</Badge>
                    </CardContent>
                  </Card>

                  {/* POS */}
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <StoreIcon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Point of Sale</h4>
                          <p className="text-sm text-muted-foreground">In-store Display</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-0">Active</Badge>
                    </CardContent>
                  </Card>

                  {/* Marketplace */}
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Marketplace</h4>
                          <p className="text-sm text-muted-foreground">Amazon, eBay</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-0">Active</Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Collection Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure collection preferences
                    </p>
                  </div>
                  <Button size="sm">Save Changes</Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* SEO Settings */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">SEO Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Target className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">SEO Score</div>
                            <div className="text-sm text-muted-foreground">Current performance</div>
                          </div>
                        </div>
                        <Badge className="bg-green-50 text-green-700">{collection.seo.score}/100</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scheduling */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">Publishing Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Active Period</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(collection.schedule.publishDate).toLocaleDateString()} - 
                              {new Date(collection.schedule.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 