'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Tag,
  Calendar,
  ArrowUpDown,
  ChevronRight,
  ImageIcon,
  Settings,
  Pencil,
  Trash2,
  Store,
  Download,
  Eye,
  Copy,
  Globe,
  Filter,
  Grid,
  List,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Clock,
  Package,
  Users,
  TrendingUp,
  Layers,
  FileText,
  Share2,
  AlertCircle,
  Archive,
  Star,
  ChevronDown,
  RefreshCw,
  DollarSign
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Pagination } from '@/components/ui/pagination';

interface Collection {
  id: string;
  title: string;
  description: string;
  productCount: number;
  lastUpdated: string;
  image?: string;
  status: 'active' | 'draft';
  analytics: {
    views: number;
    sales: number;
    revenue: number;
    conversion: number;
  };
  tags: string[];
  featured: boolean;
  channels: {
    online: boolean;
    pos: boolean;
    marketplace: boolean;
  };
}

const collections: Collection[] = [
  {
    id: '1',
    title: 'Summer Collection',
    description: 'Products for the summer season',
    productCount: 24,
    lastUpdated: '2024-02-20T10:00:00',
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'active',
    analytics: {
      views: 12500,
      sales: 342,
      revenue: 15600,
      conversion: 2.74
    },
    tags: ['seasonal', 'featured', 'trending'],
    featured: true,
    channels: {
      online: true,
      pos: true,
      marketplace: true
    }
  },
  {
    id: '2',
    title: 'New Arrivals',
    description: 'Latest products added to the store',
    productCount: 12,
    lastUpdated: '2024-02-19T15:30:00',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'active',
    analytics: {
      views: 8200,
      sales: 156,
      revenue: 7800,
      conversion: 1.90
    },
    tags: ['new', 'featured'],
    featured: true,
    channels: {
      online: true,
      pos: false,
      marketplace: true
    }
  },
  {
    id: '3',
    title: 'Sale Items',
    description: 'Products currently on sale',
    productCount: 18,
    lastUpdated: '2024-02-18T09:15:00',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'draft',
    analytics: {
      views: 15800,
      sales: 423,
      revenue: 12400,
      conversion: 2.68
    },
    tags: ['sale', 'clearance'],
    featured: false,
    channels: {
      online: true,
      pos: true,
      marketplace: false
    }
  }
];

const CollectionStatus = ({ status, featured }: { status: Collection['status']; featured: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={`px-2 py-1 rounded-full inline-flex items-center gap-1.5 text-xs font-medium ${
      status === 'active'
        ? 'bg-green-50 text-green-700 border border-green-200'
        : 'bg-gray-50 text-gray-600 border border-gray-200'
    }`}>
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
      {status === 'active' ? 'Active' : 'Draft'}
    </div>
    {featured && (
      <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
        <Star className="w-3 h-3 mr-1 fill-current" />
        Featured
      </Badge>
    )}
  </div>
);

const ViewToggle = ({ view, setView }: { view: 'grid' | 'list'; setView: (view: 'grid' | 'list') => void }) => (
  <div className="flex items-center bg-muted rounded-lg p-1">
    <button
      onClick={() => setView('grid')}
      className={`p-1.5 rounded ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
    >
      <Grid className="w-4 h-4" />
    </button>
    <button
      onClick={() => setView('list')}
      className={`p-1.5 rounded ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
    >
      <List className="w-4 h-4" />
    </button>
  </div>
);

export default function CollectionsPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Collection;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

  const handleSort = (key: keyof Collection) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedCollections = [...collections]
    .filter(collection => {
      if (filterStatus === 'all') return true;
      return collection.status === filterStatus;
    })
    .filter(collection => 
      collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
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

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCollections = sortedCollections.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedCollections.length / itemsPerPage);

  const toggleCollectionSelection = (id: string) => {
    setSelectedCollections(current =>
      current.includes(id)
        ? current.filter(collectionId => collectionId !== id)
        : [...current, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedCollections(current =>
      current.length === collections.length ? [] : collections.map(c => c.id)
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Collections</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and organize your product collections
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
            New Collection
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search" 
              placeholder="Search collections..."
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-[120px]">
                <Filter className="h-4 w-4 mr-2" />
                {filterStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All Collections
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('draft')}>
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('archived')}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setView('grid')}>
            <Grid className={`h-4 w-4 ${view === 'grid' ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setView('list')}>
            <List className={`h-4 w-4 ${view === 'list' ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </div>

      {/* Collections Grid */}
      <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        {collections.map((collection) => (
          <Link href={`/products/collections/${collection.id}`} key={collection.id}>
            <Card className="cursor-pointer hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-[21/9] relative">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {collection.featured && (
                      <Badge variant="secondary" className="bg-black/60 hover:bg-black/70 text-white border-0">
                        <Star className="h-3 w-3 fill-current" />
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-black/60 hover:bg-black/70 text-white border-0">
                      {collection.products} products
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold line-clamp-1">{collection.title}</h3>
                    <Badge variant={collection.status === 'active' ? 'default' : 'secondary'}>
                      {collection.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Updated {new Date(collection.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
          <span className="font-medium">20</span> collections
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}