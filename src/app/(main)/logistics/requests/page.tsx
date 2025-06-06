'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Progress } from '@/components/ui/progress';
import { 
  Package,
  Search,
  Filter,
  Download,
  Plus,
  ArrowLeft,
  MoreVertical,
  Eye,
  Edit,
  Phone,
  XCircle,
  User,
  MapPin,
  Clock,
  Star,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Truck,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Home,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Users,
  Route,
  Timer,
  Gauge,
  Signal,
  Wifi,
  WifiOff,
  Settings,
  SlidersHorizontal,
  Grid3X3,
  List,
  Calendar as CalendarIcon,
  FileText,
  Bell,
  Maximize2,
  Minimize2,
  Copy,
  ExternalLink,
  Building2,
  Navigation
} from 'lucide-react';

// Interfaces
interface DeliveryRequest {
  requestId: string;
  status: 'PENDING_ASSIGNMENT' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  pickup: {
    address: string;
    coordinates: { lat: number; lng: number };
    contactPerson: string;
    contactPhone: string;
    instructions?: string;
  };
  destination: {
    address: string;
    coordinates: { lat: number; lng: number };
    contactPerson: string;
    contactPhone: string;
    instructions?: string;
  };
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    rating: number;
  };
  assignedDriver: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    vehicleInfo: {
      type: string;
      plateNumber: string;
      model: string;
    };
  } | null;
  vehicleTypeRequired: 'MOTORCYCLE' | 'CAR' | 'VAN' | 'TRUCK';
  cargoDetails: {
    weight: number;
    volume: number;
    description: string;
    specialRequirements: string[];
  };
  estimatedCost: number;
  actualCost: number | null;
  estimatedDistance: number;
  timestamp: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime: string | null;
}

// Sample data with enhanced structure
const sampleRequests: DeliveryRequest[] = [
  {
    requestId: 'REQ-983473',
    status: 'IN_TRANSIT',
    priority: 'HIGH',
    pickup: {
      address: 'Bole International Airport, Addis Ababa',
      coordinates: { lat: 8.9806, lng: 38.7992 },
      contactPerson: 'Ahmed Hassan',
      contactPhone: '+251911234567',
      instructions: 'Terminal 2, Gate 5'
    },
    destination: {
      address: 'Merkato Market, Addis Ababa',
      coordinates: { lat: 9.0084, lng: 38.7575 },
      contactPerson: 'Fatima Mohammed',
      contactPhone: '+251922345678',
      instructions: 'Main entrance, near coffee shop'
    },
    customerInfo: {
      name: 'Fatima Mohammed',
      phone: '+251922345678',
      email: 'fatima.mohammed@email.com',
      rating: 4.8
    },
    assignedDriver: {
      id: 'DRV-001',
      name: 'Dawit Tekle',
      phone: '+251933456789',
      rating: 4.9,
      vehicleInfo: {
        type: 'VAN',
        plateNumber: 'AA-12345',
        model: 'Toyota Hiace'
      }
    },
    vehicleTypeRequired: 'VAN',
    cargoDetails: {
      weight: 25.5,
      volume: 2.3,
      description: 'Electronics and accessories',
      specialRequirements: ['FRAGILE', 'TEMPERATURE_CONTROLLED']
    },
    estimatedCost: 850,
    actualCost: 820,
    estimatedDistance: 15.2,
    timestamp: '2024-01-15T10:30:00Z',
    estimatedDeliveryTime: '2024-01-15T12:00:00Z',
    actualDeliveryTime: null
  },
  {
    requestId: 'REQ-983474',
    status: 'PENDING_ASSIGNMENT',
    priority: 'MEDIUM',
    pickup: {
      address: 'Kazanchis Business District, Addis Ababa',
      coordinates: { lat: 9.0192, lng: 38.7525 },
      contactPerson: 'Solomon Girma',
      contactPhone: '+251944567890',
      instructions: 'Office building, 3rd floor'
    },
    destination: {
      address: 'Piassa, Addis Ababa',
      coordinates: { lat: 9.0370, lng: 38.7468 },
      contactPerson: 'Meron Tadesse',
      contactPhone: '+251955678901',
      instructions: 'Residential area, blue gate'
    },
    customerInfo: {
      name: 'Meron Tadesse',
      phone: '+251955678901',
      email: 'meron.tadesse@email.com',
      rating: 4.2
    },
    assignedDriver: null,
    vehicleTypeRequired: 'MOTORCYCLE',
    cargoDetails: {
      weight: 2.1,
      volume: 0.5,
      description: 'Documents and small packages',
      specialRequirements: []
    },
    estimatedCost: 120,
    actualCost: null,
    estimatedDistance: 3.8,
    timestamp: '2024-01-15T11:15:00Z',
    estimatedDeliveryTime: '2024-01-15T13:30:00Z',
    actualDeliveryTime: null
  },
  {
    requestId: 'REQ-983475',
    status: 'DELIVERED',
    priority: 'LOW',
    pickup: {
      address: 'Entoto Park, Addis Ababa',
      coordinates: { lat: 9.0765, lng: 38.7295 },
      contactPerson: 'Yohannes Bekele',
      contactPhone: '+251966789012',
      instructions: 'Park entrance, visitor center'
    },
    destination: {
      address: 'Bole Medhanialem, Addis Ababa',
      coordinates: { lat: 8.9806, lng: 38.8092 },
      contactPerson: 'Hanan Ali',
      contactPhone: '+251977890123',
      instructions: 'Apartment complex, Building C'
    },
    customerInfo: {
      name: 'Hanan Ali',
      phone: '+251977890123',
      email: 'hanan.ali@email.com',
      rating: 4.6
    },
    assignedDriver: {
      id: 'DRV-002',
      name: 'Meseret Hailu',
      phone: '+251988901234',
      rating: 4.7,
      vehicleInfo: {
        type: 'CAR',
        plateNumber: 'AA-67890',
        model: 'Toyota Corolla'
      }
    },
    vehicleTypeRequired: 'CAR',
    cargoDetails: {
      weight: 8.3,
      volume: 1.2,
      description: 'Personal items and gifts',
      specialRequirements: []
    },
    estimatedCost: 280,
    actualCost: 280,
    estimatedDistance: 12.5,
    timestamp: '2024-01-15T09:00:00Z',
    estimatedDeliveryTime: '2024-01-15T11:00:00Z',
    actualDeliveryTime: '2024-01-15T10:45:00Z'
  },
  {
    requestId: 'REQ-983476',
    status: 'ASSIGNED',
    priority: 'URGENT',
    pickup: {
      address: 'Black Lion Hospital, Addis Ababa',
      coordinates: { lat: 9.0370, lng: 38.7468 },
      contactPerson: 'Dr. Alemayehu Worku',
      contactPhone: '+251999012345',
      instructions: 'Emergency department entrance'
    },
    destination: {
      address: 'Tikur Anbessa Hospital, Addis Ababa',
      coordinates: { lat: 9.0192, lng: 38.7625 },
      contactPerson: 'Nurse Tigist Mekonnen',
      contactPhone: '+251900123456',
      instructions: 'Main reception, ask for ICU'
    },
    customerInfo: {
      name: 'Ministry of Health',
      phone: '+251900123456',
      email: 'emergency@moh.gov.et',
      rating: 5.0
    },
    assignedDriver: {
      id: 'DRV-003',
      name: 'Getachew Mengistu',
      phone: '+251911234567',
      rating: 4.8,
      vehicleInfo: {
        type: 'MOTORCYCLE',
        plateNumber: 'AA-11111',
        model: 'Bajaj Boxer'
      }
    },
    vehicleTypeRequired: 'MOTORCYCLE',
    cargoDetails: {
      weight: 1.5,
      volume: 0.3,
      description: 'Medical supplies and blood samples',
      specialRequirements: ['URGENT', 'TEMPERATURE_CONTROLLED', 'MEDICAL']
    },
    estimatedCost: 200,
    actualCost: null,
    estimatedDistance: 5.2,
    timestamp: '2024-01-15T12:00:00Z',
    estimatedDeliveryTime: '2024-01-15T12:30:00Z',
    actualDeliveryTime: null
  },
  {
    requestId: 'REQ-983477',
    status: 'CANCELLED',
    priority: 'MEDIUM',
    pickup: {
      address: 'Addis Ababa University, Addis Ababa',
      coordinates: { lat: 9.0370, lng: 38.7468 },
      contactPerson: 'Prof. Belayneh Kinde',
      contactPhone: '+251922345678',
      instructions: 'Main campus, library building'
    },
    destination: {
      address: 'Science and Technology University, Addis Ababa',
      coordinates: { lat: 9.0084, lng: 38.7575 },
      contactPerson: 'Dr. Rahel Gizaw',
      contactPhone: '+251933456789',
      instructions: 'Research center, 2nd floor'
    },
    customerInfo: {
      name: 'Dr. Rahel Gizaw',
      phone: '+251933456789',
      email: 'rahel.gizaw@stu.edu.et',
      rating: 4.4
    },
    assignedDriver: null,
    vehicleTypeRequired: 'CAR',
    cargoDetails: {
      weight: 15.0,
      volume: 1.8,
      description: 'Research equipment and books',
      specialRequirements: ['FRAGILE']
    },
    estimatedCost: 350,
    actualCost: null,
    estimatedDistance: 8.7,
    timestamp: '2024-01-15T08:30:00Z',
    estimatedDeliveryTime: '2024-01-15T10:30:00Z',
    actualDeliveryTime: null
  }
];

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

const formatStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'PENDING_ASSIGNMENT': 'Pending Assignment',
    'ASSIGNED': 'Assigned',
    'IN_TRANSIT': 'In Transit',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled'
  };
  return statusMap[status] || status;
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'PENDING_ASSIGNMENT':
      return 'outline';
    case 'ASSIGNED':
      return 'secondary';
    case 'IN_TRANSIT':
      return 'default';
    case 'DELIVERED':
      return 'default';
    case 'CANCELLED':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getPriorityVariant = (priority: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (priority) {
    case 'LOW':
      return 'outline';
    case 'MEDIUM':
      return 'secondary';
    case 'HIGH':
      return 'default';
    case 'URGENT':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState('today');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Real-time updates simulation
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate connection status
      setIsConnected(Math.random() > 0.1); // 90% uptime
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Filter and sort requests
  const filteredAndSortedRequests = useMemo(() => {
    let filtered = sampleRequests.filter(request => {
      const matchesSearch = searchTerm === '' || 
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.destination.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.customerInfo?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
      const matchesVehicle = vehicleTypeFilter === 'all' || request.vehicleTypeRequired === vehicleTypeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesVehicle;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case 'requestId':
          aValue = a.requestId;
          bValue = b.requestId;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'priority':
          aValue = a.priority;
          bValue = b.priority;
          break;
        case 'cost':
          aValue = a.actualCost || a.estimatedCost || 0;
          bValue = b.actualCost || b.estimatedCost || 0;
          break;
        case 'timestamp':
        default:
          aValue = new Date(a.timestamp);
          bValue = new Date(b.timestamp);
          break;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, priorityFilter, vehicleTypeFilter, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(filteredAndSortedRequests.map(r => r.requestId));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId: string, checked: boolean) => {
    if (checked) {
      setSelectedRequests([...selectedRequests, requestId]);
    } else {
      setSelectedRequests(selectedRequests.filter(id => id !== requestId));
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 opacity-50" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-3 h-3" /> : 
      <ChevronDown className="w-3 h-3" />;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  // Calculate enhanced metrics
  const metrics = useMemo(() => {
    const total = filteredAndSortedRequests.length;
    const pending = filteredAndSortedRequests.filter(r => r.status === 'PENDING_ASSIGNMENT').length;
    const assigned = filteredAndSortedRequests.filter(r => r.status === 'ASSIGNED').length;
    const inTransit = filteredAndSortedRequests.filter(r => r.status === 'IN_TRANSIT').length;
    const delivered = filteredAndSortedRequests.filter(r => r.status === 'DELIVERED').length;
    const cancelled = filteredAndSortedRequests.filter(r => r.status === 'CANCELLED').length;
    const totalRevenue = filteredAndSortedRequests.reduce((sum, r) => sum + (r.actualCost || r.estimatedCost || 0), 0);
    const avgDeliveryTime = 45; // minutes
    const onTimeRate = 94; // percentage
    const customerSatisfaction = 4.7; // out of 5
    
    return { 
      total, pending, assigned, inTransit, delivered, cancelled, totalRevenue, 
      avgDeliveryTime, onTimeRate, customerSatisfaction 
    };
  }, [filteredAndSortedRequests]);

  return (
    <TooltipProvider>
      <div className={`min-h-screen bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/logistics" className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    Logistics
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Delivery Requests</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl shadow-sm">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Delivery Requests
                      </h1>
                      <div className="flex items-center gap-1">
                        {isConnected ? (
                          <Wifi className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <WifiOff className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-xs text-gray-500">
                          {isConnected ? 'Live' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                      Manage all delivery requests and assignments
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Last updated: {formatTime(lastUpdated.toISOString())}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Back Button - Relocated */}
                <Link href="/logistics">
                  <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>

                {/* Auto Refresh Toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={`gap-2 ${autoRefresh ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-gray-300'}`}
                    >
                      <Zap className={`w-4 h-4 ${autoRefresh ? 'text-emerald-600' : 'text-gray-400'}`} />
                      <span className="hidden sm:inline">Auto</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {autoRefresh ? 'Disable' : 'Enable'} auto-refresh
                  </TooltipContent>
                </Tooltip>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="gap-2 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>

                <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="rounded-none border-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none border-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="gap-2"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isFullscreen ? 'Exit' : 'Enter'} fullscreen
                  </TooltipContent>
                </Tooltip>

                <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm shadow-sm">
                  <Plus className="w-4 h-4" />
                  New Request
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Enhanced Metrics Dashboard - Subtle Colors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Package className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-amber-600">{metrics.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{metrics.assigned}</div>
                    <div className="text-sm text-gray-600">Assigned</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{metrics.inTransit}</div>
                    <div className="text-sm text-gray-600">In Transit</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Truck className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{metrics.delivered}</div>
                    <div className="text-sm text-gray-600">Delivered</div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{metrics.cancelled}</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                  </div>
                  <div className="p-2 bg-red-50 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-600">{metrics.onTimeRate}%</div>
                    <div className="text-sm text-gray-600">On Time</div>
                  </div>
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Target className="w-6 h-6 text-slate-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Filters - Subtle Design */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Filters & Search</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {filteredAndSortedRequests.length} of {sampleRequests.length} requests
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Advanced
                  </Button>
                  {selectedRequests.length > 0 && (
                    <Badge variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700">
                      {selectedRequests.length} selected
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="PENDING_ASSIGNMENT">Pending Assignment</SelectItem>
                    <SelectItem value="ASSIGNED">Assigned</SelectItem>
                    <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Vehicle Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="MOTORCYCLE">Motorcycle</SelectItem>
                    <SelectItem value="CAR">Car</SelectItem>
                    <SelectItem value="VAN">Van</SelectItem>
                    <SelectItem value="TRUCK">Truck</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setPriorityFilter('all');
                      setVehicleTypeFilter('all');
                      setDateRange('today');
                    }}
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Cost Range (ETB)</label>
                      <div className="flex gap-2">
                        <Input placeholder="Min" className="border-gray-300" />
                        <Input placeholder="Max" className="border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Distance Range (km)</label>
                      <div className="flex gap-2">
                        <Input placeholder="Min" className="border-gray-300" />
                        <Input placeholder="Max" className="border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Customer Rating</label>
                      <Select>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Min Rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1+ Stars</SelectItem>
                          <SelectItem value="2">2+ Stars</SelectItem>
                          <SelectItem value="3">3+ Stars</SelectItem>
                          <SelectItem value="4">4+ Stars</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Bulk Actions */}
              {selectedRequests.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">
                      Bulk Actions ({selectedRequests.length} selected):
                    </span>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      Assign Driver
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Bell className="w-4 h-4" />
                      Send Notification
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export Selected
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                      <XCircle className="w-4 h-4" />
                      Cancel Selected
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Main Content - Clean Design */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Delivery Requests
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Showing {filteredAndSortedRequests.length} requests
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">
                    Updated {formatTime(lastUpdated.toISOString())}
                  </div>
                  {isConnected && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-emerald-600">Live</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'table' ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={selectedRequests.length === filteredAndSortedRequests.length && filteredAndSortedRequests.length > 0}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSort('requestId')}
                        >
                          <div className="flex items-center gap-2">
                            Request ID
                            {getSortIcon('requestId')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center gap-2">
                            Status
                            {getSortIcon('status')}
                          </div>
                        </TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSort('priority')}
                        >
                          <div className="flex items-center gap-2">
                            Priority
                            {getSortIcon('priority')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSort('cost')}
                        >
                          <div className="flex items-center gap-2">
                            Cost
                            {getSortIcon('cost')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSort('timestamp')}
                        >
                          <div className="flex items-center gap-2">
                            Created
                            {getSortIcon('timestamp')}
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedRequests.map((request) => (
                        <TableRow 
                          key={request.requestId} 
                          className="border-gray-200 hover:bg-gray-50/50 transition-colors"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedRequests.includes(request.requestId)}
                              onChange={(e) => handleSelectRequest(request.requestId, e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Link 
                                href={`/logistics/requests/${request.requestId}`}
                                className="font-mono text-sm font-medium text-slate-900 hover:text-slate-700 hover:underline transition-colors"
                              >
                                {request.requestId}
                              </Link>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Truck className="w-3 h-3" />
                                {request.vehicleTypeRequired}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge 
                                variant={getStatusVariant(request.status)}
                                className="text-xs font-medium"
                              >
                                {formatStatus(request.status)}
                              </Badge>
                              {request.status === 'IN_TRANSIT' && (
                                <div className="flex items-center gap-1 text-xs text-blue-600">
                                  <Navigation className="w-3 h-3" />
                                  Live tracking
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 max-w-48">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                                <span className="truncate text-gray-900">{request.pickup.address}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                                <span className="truncate text-gray-600">{request.destination.address}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                ~{request.estimatedDistance} km
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${request.customerInfo?.name}`} />
                                <AvatarFallback className="text-xs bg-gray-100">
                                  {request.customerInfo?.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <div className="text-sm font-medium text-gray-900">
                                  {request.customerInfo?.name}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  {request.customerInfo?.rating}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {request.assignedDriver ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${request.assignedDriver.name}`} />
                                  <AvatarFallback className="text-xs bg-blue-100">
                                    {request.assignedDriver.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <div className="text-sm font-medium text-gray-900">
                                    {request.assignedDriver.name}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    {request.assignedDriver.rating}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Unassigned
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={getPriorityVariant(request.priority)}
                              className="text-xs font-medium"
                            >
                              {request.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {formatCurrency(request.actualCost || request.estimatedCost || 0)}
                              </div>
                              {request.actualCost && request.estimatedCost && request.actualCost !== request.estimatedCost && (
                                <div className="text-xs text-gray-500">
                                  Est: {formatCurrency(request.estimatedCost)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-900">
                                {formatDate(request.timestamp)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatTime(request.timestamp)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                  <Link 
                                    href={`/logistics/requests/${request.requestId}`}
                                    className="flex items-center gap-2"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Edit className="w-4 h-4" />
                                  Edit Request
                                </DropdownMenuItem>
                                {request.assignedDriver && (
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Call Driver
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Copy className="w-4 h-4" />
                                  Copy ID
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <ExternalLink className="w-4 h-4" />
                                  Track Live
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <XCircle className="w-4 h-4" />
                                  Cancel Request
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                // Grid View - Clean Design
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredAndSortedRequests.map((request) => (
                    <Card key={request.requestId} className="border border-gray-200 hover:shadow-md transition-shadow bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedRequests.includes(request.requestId)}
                              onChange={(e) => handleSelectRequest(request.requestId, e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <Link 
                              href={`/logistics/requests/${request.requestId}`}
                              className="font-mono text-sm font-medium text-slate-900 hover:text-slate-700 hover:underline"
                            >
                              {request.requestId}
                            </Link>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/logistics/requests/${request.requestId}`}>
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Request</DropdownMenuItem>
                              <DropdownMenuItem>Cancel Request</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusVariant(request.status)} className="text-xs">
                            {formatStatus(request.status)}
                          </Badge>
                          <Badge variant={getPriorityVariant(request.priority)} className="text-xs">
                            {request.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            <span className="truncate">{request.pickup.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="truncate">{request.destination.address}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Customer:</span>
                          <span className="font-medium">{request.customerInfo?.name}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Cost:</span>
                          <span className="font-medium">{formatCurrency(request.actualCost || request.estimatedCost || 0)}</span>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {formatDate(request.timestamp)} • {formatTime(request.timestamp)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredAndSortedRequests.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create New Request
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
} 