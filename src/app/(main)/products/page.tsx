'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Upload,
  ChevronDown,
  Store,
  ArrowUpDown,
  ChevronRight,
  ImageIcon,
  X,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export interface Product {
  id: string;
  image: string;
  images?: string[];
  title: string;
  status: 'active' | 'draft';
  inventory: number;
  category: string;
  type: string;
  vendor: string;
  price: number;
  sku?: string;
  description?: string;
  compareAtPrice?: number;
  costPerItem?: number;
  barcode?: string;
  weight?: number;
  weightUnit?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  salesChannels?: string[];
  organization?: {
    collections: string[];
    tags: string[];
  };
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Basic Cotton T-Shirt',
    status: 'active',
    inventory: 50,
    category: 'Clothing',
    type: 'T-Shirt',
    vendor: 'Fashion Co.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Leather Wallet',
    status: 'active',
    inventory: 25,
    category: 'Accessories',
    type: 'Wallet',
    vendor: 'Leather Goods Inc.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Running Shoes',
    status: 'draft',
    inventory: 15,
    category: 'Footwear',
    type: 'Shoes',
    vendor: 'Sports Gear Ltd.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
];

export const getStatusBadge = (status: 'active' | 'draft') => {
  const styles = {
    active: "bg-green-100/50 text-green-700 ring-1 ring-green-600/10",
    draft: "bg-zinc-100/50 text-zinc-600 ring-1 ring-zinc-500/10"
  };

  const icons = {
    active: (
      <svg className="w-3 h-3 fill-green-500" viewBox="0 0 24 24">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/>
      </svg>
    ),
    draft: (
      <svg className="w-3 h-3 fill-zinc-500" viewBox="0 0 24 24">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>
      </svg>
    )
  };

  return (
    <div className={`px-2.5 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs font-medium backdrop-blur-sm ${styles[status]}`}>
      {icons[status]}
      {status === 'active' ? 'Active' : 'Draft'}
    </div>
  );
};

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedProducts(prev => 
      prev.length === products.length
        ? []
        : products.map(p => p.id)
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === null || bValue === null || aValue === undefined || bValue === undefined) return 0;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (key: keyof Product) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4 sm:p-6 max-w-full sm:max-w-[1200px] mx-auto">
      {/* Mobile-Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your products and inventory
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
          {/* Mobile Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="sm:hidden flex-1"
                size="sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-lg p-0">
              <SheetHeader className="px-4 py-3 border-b">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)]">
                <div className="p-4 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="footwear">Footwear</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Stock Level</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="All Stock Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Stock Levels</SelectItem>
                          <SelectItem value="in_stock">In Stock</SelectItem>
                          <SelectItem value="low_stock">Low Stock</SelectItem>
                          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <Label className="text-sm font-medium">Sort By</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Sort products" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                        <SelectItem value="name_asc">Name: A to Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          
          <Link href="/products/add" className="sm:hidden flex-1">
            <Button className="w-full" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </Link>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Link href="/products/add">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards - Commented out
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Card className="p-4 sm:p-6">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl sm:text-2xl font-semibold">{products.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card className="p-4 sm:p-6">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl sm:text-2xl font-semibold text-green-600">
              {products.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Currently selling
            </p>
          </CardContent>
        </Card>
        <Card className="p-4 sm:p-6">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl sm:text-2xl font-semibold text-yellow-600">
              {products.filter(p => p.inventory < 10).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Less than 10 units
            </p>
          </CardContent>
        </Card>
        <Card className="p-4 sm:p-6">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl sm:text-2xl font-semibold text-red-600">
              {products.filter(p => p.inventory === 0).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>
      */}

      {/* Mobile-Enhanced Search and Filters */}
      <div className="bg-white border rounded-xl mb-6 divide-y">
        <div className="p-4 space-y-4">
          {/* Search and Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-9 w-full bg-white border-gray-200 hover:border-gray-300 focus:border-gray-300 focus:ring-primary/20 rounded-lg"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden sm:flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-[160px] bg-white border-gray-200 hover:border-gray-300 focus:border-gray-300 focus:ring-primary/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px] bg-white border-gray-200 hover:border-gray-300 focus:border-gray-300 focus:ring-primary/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px] bg-white border-gray-200 hover:border-gray-300 focus:border-gray-300 focus:ring-primary/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <SelectValue placeholder="Stock level" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock Levels</SelectItem>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg">
                <Filter className="w-4 h-4" />
                More filters
              </Button>
            </div>
          </div>

          {/* Mobile Filters Row */}
          <div className="flex sm:hidden items-center gap-2 overflow-x-auto pb-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                  <Filter className="w-4 h-4" />
                  All Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-lg">
                <SheetHeader className="px-1 pb-6">
                  <SheetTitle className="text-xl font-semibold">Filters</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <div className="space-y-8 pr-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium inline-flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          Category
                        </Label>
                        <Select>
                          <SelectTrigger className="mt-1.5 w-full bg-white border-gray-200">
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="footwear">Footwear</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium inline-flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Status
                        </Label>
                        <Select>
                          <SelectTrigger className="mt-1.5 w-full bg-white border-gray-200">
                            <SelectValue placeholder="All Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium inline-flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          Stock Level
                        </Label>
                        <Select>
                          <SelectTrigger className="mt-1.5 w-full bg-white border-gray-200">
                            <SelectValue placeholder="All Stock Levels" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Stock Levels</SelectItem>
                            <SelectItem value="in_stock">In Stock</SelectItem>
                            <SelectItem value="low_stock">Low Stock</SelectItem>
                            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-sm font-medium inline-flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        Sort By
                      </Label>
                      <Select>
                        <SelectTrigger className="w-full bg-white border-gray-200">
                          <SelectValue placeholder="Sort products" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="price_asc">Price: Low to High</SelectItem>
                          <SelectItem value="price_desc">Price: High to Low</SelectItem>
                          <SelectItem value="name_asc">Name: A to Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <Select>
              <SelectTrigger className="w-[130px] bg-white border-gray-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="footwear">Footwear</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[130px] bg-white border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="h-7 gap-1.5 bg-gray-50/50 hover:bg-gray-100/50 border-gray-200 text-gray-700">
              In Stock
              <X className="w-3.5 h-3.5" />
            </Button>
            <Button variant="secondary" size="sm" className="h-7 gap-1.5 bg-gray-50/50 hover:bg-gray-100/50 border-gray-200 text-gray-700">
              Active
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add View Switcher above products */}
      <div className="hidden lg:flex items-center justify-between mb-4">
        <Tabs defaultValue="grid" className="w-[400px]" onValueChange={(value) => setView(value as 'grid' | 'list')}>
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="price_asc">Price: Low to high</SelectItem>
            <SelectItem value="price_desc">Price: High to low</SelectItem>
            <SelectItem value="name_asc">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop View Switcher */}
      <div className="hidden lg:block">
        {view === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 rounded-xl bg-white relative"
              >
                <Link 
                  href={`/products/${product.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View details for ${product.title}`}
                />
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-20">
                    {getStatusBadge(product.status)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-2 z-20">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/90 hover:bg-white gap-1.5"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add your quick view logic here
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Quick view
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Store className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-xs text-gray-500 font-medium">{product.vendor}</p>
                    </div>
                    <h3 className="font-medium text-base line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                  </div>
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm font-medium">${product.price.toFixed(2)}</span>
                      <span className="text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-600">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${
                          product.inventory === 0 ? 'bg-red-500' : 
                          product.inventory < 10 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}></span>
                        <span className="text-sm text-gray-600">{product.inventory} in stock</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 relative hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add your edit logic here
                          }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 relative hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add your duplicate logic here
                          }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 relative text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add your delete logic here
                          }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="gap-1 font-medium"
                      onClick={() => handleSort('title')}
                    >
                      Product
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="gap-1 font-medium"
                      onClick={() => handleSort('inventory')}
                    >
                      Inventory
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="gap-1 font-medium"
                      onClick={() => handleSort('price')}
                    >
                      Price
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow 
                    key={product.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg border bg-gray-50 overflow-hidden">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.vendor}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(product.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-400" />
                        <span>{product.inventory} in stock</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {product.category}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        {product.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Mobile Grid */}
      <div className="lg:hidden grid grid-cols-1 xs:grid-cols-2 gap-4">
        {sortedProducts.map((product) => (
          <Card 
            key={product.id} 
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-100"
          >
            <div className="aspect-square relative overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-gray-300" />
                </div>
              )}
              <div className="absolute top-3 left-3 z-10">
                {getStatusBadge(product.status)}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-medium text-base line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <Store className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-500">{product.vendor}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Price</span>
                  <span className="font-medium text-base">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Category</span>
                  <span className="text-sm">{product.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Stock</span>
                  <span className={`font-medium ${
                    product.inventory === 0 ? 'text-red-600' : 
                    product.inventory < 10 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {product.inventory} units
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Button variant="outline" size="sm" className="text-xs h-8 px-3 hover:text-primary hover:border-primary transition-colors">
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem className="cursor-pointer">
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Pagination */}
      <div className="mt-6 bg-white border rounded-lg px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 order-2 sm:order-1">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, products.length)}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, products.length)}</span> of{" "}
              <span className="font-medium">{products.length}</span> products
            </div>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
            >
              <SelectTrigger className="w-[110px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 per page</SelectItem>
                <SelectItem value="24">24 per page</SelectItem>
                <SelectItem value="36">36 per page</SelectItem>
                <SelectItem value="48">48 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {pages.map(page => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <Button
                      key={page}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled
                    >
                      ...
                    </Button>
                  );
                }
                return null;
              })}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
            {/* Mobile Pagination */}
            <div className="flex sm:hidden items-center gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}