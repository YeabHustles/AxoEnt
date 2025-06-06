'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  MapPin, 
  Clock, 
  User, 
  Package, 
  Navigation, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Phone,
  Star,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Route,
  Timer,
  DollarSign,
  Thermometer,
  Weight,
  Box,
  Shield,
  Zap,
  RefreshCw,
  Settings,
  Download,
  Upload,
  Bell,
  Map,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Gauge,
  Fuel,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronRight,
  ExternalLink,
  Info,
  Circle,
  Dot
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Enhanced Types
interface LogisticsRequest {
  requestId: string;
  status: 'PENDING_ASSIGNMENT' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  timestamp: string;
  pickup: {
    address: string;
    coordinates: { lat: number; lng: number };
    etaWindow: { start: string; end: string };
  };
  destination: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  vehicleTypeRequired: string;
  cargoDetails: {
    type: string;
    weightKg: number;
    volumeM3: number;
    fragile: boolean;
    temperatureSensitive: boolean;
  };
  assignedDriver: Driver | null;
  estimatedCost?: number;
  actualCost?: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  customerInfo?: {
    name: string;
    phone: string;
    rating: number;
  };
}

interface Driver {
  driverId: string;
  name: string;
  location: { lat: number; lng: number };
  distanceKm: number;
  rating: number;
  vehicle: {
    type: string;
    plate: string;
    capacityKg: number;
    temperatureControl: boolean;
  };
  isAvailable: boolean;
  score: number;
  phone?: string;
  avatar?: string;
  completedDeliveries?: number;
  onTimeRate?: number;
  earnings?: number;
}

interface MetricCard {
  title: string;
  value: string | number;
  change: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon: React.ElementType;
  description?: string;
}

// Enhanced Sample Data
const sampleRequests: LogisticsRequest[] = [
  {
    requestId: "REQ-983473",
    status: "PENDING_ASSIGNMENT",
    timestamp: "2025-05-28T12:44:01Z",
    pickup: {
      address: "Bole International Airport, Addis Ababa, Ethiopia",
      coordinates: { lat: 8.9776, lng: 38.7991 },
      etaWindow: {
        start: "2025-05-28T13:00:00Z",
        end: "2025-05-28T14:00:00Z"
      }
    },
    destination: {
      address: "Gabon Street, Addis Ababa, Ethiopia",
      coordinates: { lat: 8.9807, lng: 38.7578 }
    },
    vehicleTypeRequired: "Van",
    cargoDetails: {
      type: "Electronics",
      weightKg: 120,
      volumeM3: 1.5,
      fragile: true,
      temperatureSensitive: false
    },
    assignedDriver: null,
    estimatedCost: 850,
    priority: 'HIGH',
    customerInfo: {
      name: "Alemayehu Tadesse",
      phone: "+251911234567",
      rating: 4.8
    }
  },
  {
    requestId: "REQ-983474",
    status: "IN_TRANSIT",
    timestamp: "2025-05-28T10:30:00Z",
    pickup: {
      address: "Merkato, Addis Ababa, Ethiopia",
      coordinates: { lat: 9.0192, lng: 38.7525 },
      etaWindow: {
        start: "2025-05-28T11:00:00Z",
        end: "2025-05-28T12:00:00Z"
      }
    },
    destination: {
      address: "Kazanchis, Addis Ababa, Ethiopia",
      coordinates: { lat: 9.0348, lng: 38.7525 }
    },
    vehicleTypeRequired: "Pickup",
    cargoDetails: {
      type: "Textiles",
      weightKg: 85,
      volumeM3: 2.1,
      fragile: false,
      temperatureSensitive: false
    },
    assignedDriver: {
      driverId: "DRV-102",
      name: "Amanuel Kebede",
      location: { lat: 9.0250, lng: 38.7600 },
      distanceKm: 2.1,
      rating: 4.9,
      vehicle: {
        type: "Van",
        plate: "AA1234",
        capacityKg: 200,
        temperatureControl: false
      },
      isAvailable: false,
      score: 0.87,
      phone: "+251911234567",
      completedDeliveries: 156,
      onTimeRate: 96.5,
      earnings: 45600
    },
    actualCost: 650,
    priority: 'MEDIUM',
    customerInfo: {
      name: "Hanan Mohammed",
      phone: "+251922345678",
      rating: 4.6
    }
  },
  {
    requestId: "REQ-983475",
    status: "DELIVERED",
    timestamp: "2025-05-28T08:15:00Z",
    pickup: {
      address: "Piassa, Addis Ababa, Ethiopia",
      coordinates: { lat: 9.0348, lng: 38.7525 },
      etaWindow: {
        start: "2025-05-28T09:00:00Z",
        end: "2025-05-28T10:00:00Z"
      }
    },
    destination: {
      address: "Bole Atlas, Addis Ababa, Ethiopia",
      coordinates: { lat: 8.9950, lng: 38.8050 }
    },
    vehicleTypeRequired: "Motorcycle",
    cargoDetails: {
      type: "Documents",
      weightKg: 2,
      volumeM3: 0.1,
      fragile: false,
      temperatureSensitive: false
    },
    assignedDriver: {
      driverId: "DRV-203",
      name: "Tigist Mekonnen",
      location: { lat: 8.9950, lng: 38.8050 },
      distanceKm: 0,
      rating: 4.7,
      vehicle: {
        type: "Motorcycle",
        plate: "AB7777",
        capacityKg: 50,
        temperatureControl: false
      },
      isAvailable: true,
      score: 0.95,
      phone: "+251922345678",
      completedDeliveries: 89,
      onTimeRate: 92.1,
      earnings: 28900
    },
    actualCost: 120,
    priority: 'LOW',
    customerInfo: {
      name: "Dawit Bekele",
      phone: "+251933456789",
      rating: 4.9
    }
  }
];

const availableDrivers: Driver[] = [
  {
    driverId: "DRV-102",
    name: "Amanuel Kebede",
    location: { lat: 8.9752, lng: 38.7899 },
    distanceKm: 2.1,
    rating: 4.9,
    vehicle: {
      type: "Van",
      plate: "AA1234",
      capacityKg: 200,
      temperatureControl: false
    },
    isAvailable: true,
    score: 0.87,
    phone: "+251911234567",
    completedDeliveries: 156,
    onTimeRate: 96.5,
    earnings: 45600
  },
  {
    driverId: "DRV-203",
    name: "Tigist Mekonnen",
    location: { lat: 8.9723, lng: 38.7923 },
    distanceKm: 3.6,
    rating: 4.7,
    vehicle: {
      type: "Pickup",
      plate: "AB7777",
      capacityKg: 300,
      temperatureControl: false
    },
    isAvailable: true,
    score: 0.72,
    phone: "+251922345678",
    completedDeliveries: 89,
    onTimeRate: 92.1,
    earnings: 28900
  },
  {
    driverId: "DRV-304",
    name: "Kebede Yonas",
    location: { lat: 8.9701, lng: 38.7801 },
    distanceKm: 5.8,
    rating: 4.2,
    vehicle: {
      type: "Van",
      plate: "AC4567",
      capacityKg: 180,
      temperatureControl: true
    },
    isAvailable: false,
    score: 0.0,
    phone: "+251933456789",
    completedDeliveries: 234,
    onTimeRate: 88.7,
    earnings: 67800
  }
];

// Utility functions
const getStatusConfig = (status: string) => {
  const configs = {
    'PENDING_ASSIGNMENT': { 
      color: 'bg-amber-50 text-amber-700 border-amber-200', 
      icon: Clock,
      label: 'Pending Assignment'
    },
    'ASSIGNED': { 
      color: 'bg-blue-50 text-blue-700 border-blue-200', 
      icon: User,
      label: 'Assigned'
    },
    'IN_TRANSIT': { 
      color: 'bg-purple-50 text-purple-700 border-purple-200', 
      icon: Truck,
      label: 'In Transit'
    },
    'DELIVERED': { 
      color: 'bg-green-50 text-green-700 border-green-200', 
      icon: CheckCircle,
      label: 'Delivered'
    },
    'CANCELLED': { 
      color: 'bg-red-50 text-red-700 border-red-200', 
      icon: XCircle,
      label: 'Cancelled'
    },
  };
  return configs[status as keyof typeof configs] || configs['PENDING_ASSIGNMENT'];
};

const getPriorityConfig = (priority: string) => {
  const configs = {
    'LOW': { color: 'bg-gray-50 text-gray-600 border-gray-200', label: 'Low' },
    'MEDIUM': { color: 'bg-blue-50 text-blue-600 border-blue-200', label: 'Medium' },
    'HIGH': { color: 'bg-orange-50 text-orange-600 border-orange-200', label: 'High' },
    'URGENT': { color: 'bg-red-50 text-red-600 border-red-200', label: 'Urgent' },
  };
  return configs[priority as keyof typeof configs] || configs['LOW'];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-ET', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

// Enhanced Components
const MetricCard: React.FC<{ metric: MetricCard }> = ({ metric }) => {
  const { title, value, change, icon: Icon, description } = metric;
  const ChangeIcon = change.type === 'increase' ? ArrowUpRight : 
                    change.type === 'decrease' ? ArrowDownRight : Minus;
  
  const changeColor = change.type === 'increase' ? 'text-green-600' : 
                     change.type === 'decrease' ? 'text-red-600' : 'text-gray-500';

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 bg-white hover:bg-gray-50/50 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-600 tracking-wide">{title}</p>
              {description && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-gray-400 hover:text-gray-600 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
            <div className={`flex items-center gap-1 text-xs ${changeColor}`}>
              <ChangeIcon className="w-3 h-3" />
              <span className="font-semibold">{Math.abs(change.value)}%</span>
              <span className="text-gray-500 font-normal">{change.period}</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-slate-200 transition-colors">
            <Icon className="w-6 h-6 text-slate-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  return (
    <Badge variant="outline" className={`${config.color} font-medium border`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
};

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const config = getPriorityConfig(priority);
  
  return (
    <Badge variant="outline" className={`${config.color} font-medium border`}>
      {config.label}
    </Badge>
  );
};

const RequestCard: React.FC<{ request: LogisticsRequest }> = ({ request }) => {
  const getProgressPercentage = () => {
    switch (request.status) {
      case 'PENDING_ASSIGNMENT': return 10;
      case 'ASSIGNED': return 30;
      case 'IN_TRANSIT': return 70;
      case 'DELIVERED': return 100;
      case 'CANCELLED': return 0;
      default: return 0;
    }
  };

  const getEstimatedTime = () => {
    const now = new Date();
    const pickup = new Date(request.pickup.etaWindow.start);
    const diffHours = Math.abs(pickup.getTime() - now.getTime()) / (1000 * 60 * 60);
    return Math.round(diffHours * 10) / 10;
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-gray-300 bg-white group">
      <CardContent className="p-6">
        {/* Header with Request ID and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Link href={`/logistics/requests/${request.requestId}`}>
                <span className="font-mono text-sm font-bold text-gray-900 bg-slate-100 px-3 py-1 rounded-md hover:bg-slate-200 cursor-pointer transition-colors">
                  {request.requestId}
                </span>
              </Link>
              <span className="text-xs text-gray-500 mt-1">{formatTimeAgo(request.timestamp)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <StatusBadge status={request.status} />
              <PriorityBadge priority={request.priority} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/logistics/requests/${request.requestId}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/logistics/requests/${request.requestId}`} className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Request
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Customer
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/logistics/tracking?id=${request.requestId}`} className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Track Location
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Request
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Progress</span>
            <span>{getProgressPercentage()}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>
        
        {/* Route Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3 text-sm">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
              <div className="w-0.5 h-4 bg-gray-300 mt-1" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-xs uppercase tracking-wide">PICKUP</p>
              <p className="text-gray-900 font-medium line-clamp-1">{request.pickup.address}</p>
              <p className="text-gray-500 text-xs">
                ETA: {formatDateTime(request.pickup.etaWindow.start)} - {formatDateTime(request.pickup.etaWindow.end)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-xs uppercase tracking-wide">DESTINATION</p>
              <p className="text-gray-900 font-medium line-clamp-1">{request.destination.address}</p>
              <p className="text-gray-500 text-xs">
                Est. {getEstimatedTime()}h delivery time
              </p>
            </div>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900">Cargo Details</h4>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                {formatCurrency(request.actualCost || request.estimatedCost || 0)}
              </p>
              {!request.actualCost && (
                <p className="text-xs text-gray-500">Estimated</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Box className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">{request.cargoDetails.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Weight className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">{request.cargoDetails.weightKg}kg</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">{request.vehicleTypeRequired}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{request.cargoDetails.volumeM3}m³</span>
            </div>
          </div>
          {(request.cargoDetails.fragile || request.cargoDetails.temperatureSensitive) && (
            <div className="flex gap-2 mt-2">
              {request.cargoDetails.fragile && (
                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                  <Shield className="w-2 h-2 mr-1" />
                  Fragile
                </Badge>
              )}
              {request.cargoDetails.temperatureSensitive && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  <Thermometer className="w-2 h-2 mr-1" />
                  Temperature Sensitive
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Customer & Driver Info */}
        <div className="flex items-center justify-between">
          {request.customerInfo && (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                  {request.customerInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium text-gray-900">{request.customerInfo.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">{request.customerInfo.rating}</span>
                </div>
              </div>
            </div>
          )}

          {request.assignedDriver ? (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={request.assignedDriver.avatar} />
                <AvatarFallback className="text-xs bg-slate-100 text-slate-700">
                  {request.assignedDriver.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium text-gray-900">{request.assignedDriver.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">{request.assignedDriver.rating}</span>
                </div>
              </div>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
              <User className="w-3 h-3 mr-1" />
              Assign Driver
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const DriverCard: React.FC<{ driver: Driver }> = ({ driver }) => {
  const getPerformanceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600';
    if (rate >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityText = () => {
    if (driver.isAvailable) {
      return { text: 'Available', color: 'text-green-600' };
    }
    return { text: 'On Delivery', color: 'text-orange-600' };
  };

  const availability = getAvailabilityText();

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-gray-300 bg-white group">
      <CardContent className="p-5">
        {/* Header with Avatar and Status */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar className="w-14 h-14 border-2 border-gray-200">
              <AvatarImage src={driver.avatar} />
              <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold text-lg">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              driver.isAvailable ? 'bg-green-500' : 'bg-orange-500'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{driver.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Driver
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="w-4 h-4 mr-2" />
                    Track Location
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">{driver.rating}</span>
              </div>
              <span className={`text-sm font-medium ${availability.color}`}>
                {availability.text}
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900">Vehicle Details</h4>
            <Badge variant="outline" className="text-xs">
              {driver.vehicle.plate}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">{driver.vehicle.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Weight className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">{driver.vehicle.capacityKg}kg</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">{driver.distanceKm}km away</span>
            </div>
            {driver.vehicle.temperatureControl && (
              <div className="flex items-center gap-2">
                <Thermometer className="w-3 h-3 text-blue-500" />
                <span className="text-blue-600 text-xs">Climate Control</span>
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">On-Time Rate</span>
              <span className={`font-semibold ${getPerformanceColor(driver.onTimeRate || 0)}`}>
                {driver.onTimeRate}%
              </span>
            </div>
            <Progress value={driver.onTimeRate} className="h-1.5" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-500">Deliveries</p>
              <p className="font-semibold text-gray-900">{driver.completedDeliveries}</p>
            </div>
            <div>
              <p className="text-gray-500">Earnings</p>
              <p className="font-semibold text-gray-900">{formatCurrency(driver.earnings || 0)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8 text-xs border-gray-300 hover:bg-gray-50"
            disabled={!driver.isAvailable}
          >
            <User className="w-3 h-3 mr-1" />
            {driver.isAvailable ? 'Assign' : 'Busy'}
          </Button>
          <Button size="sm" variant="outline" className="h-8 px-3 border-gray-300 hover:bg-gray-50">
            <Phone className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="h-8 px-3 border-gray-300 hover:bg-gray-50">
            <MapPin className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Advanced table state
  const [sortField, setSortField] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');

  // Advanced filtering and sorting
  const filteredAndSortedRequests = useMemo(() => {
    let filtered = sampleRequests.filter(request => {
      const matchesSearch = searchTerm === '' || 
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.destination.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.customerInfo?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
      const matchesVehicleType = vehicleTypeFilter === 'all' || request.vehicleTypeRequired === vehicleTypeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesVehicleType;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case 'requestId':
          aValue = a.requestId;
          bValue = b.requestId;
          break;
        case 'timestamp':
          aValue = new Date(a.timestamp);
          bValue = new Date(b.timestamp);
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
        case 'driver':
          aValue = a.assignedDriver?.name || '';
          bValue = b.assignedDriver?.name || '';
          break;
        default:
          aValue = a.timestamp;
          bValue = b.timestamp;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, priorityFilter, vehicleTypeFilter, sortField, sortDirection]);

  // Handlers
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
      setSelectedRequests(filteredAndSortedRequests.slice(0, 4).map(r => r.requestId));
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
    if (sortField !== field) return <ArrowUpRight className="w-3 h-3 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <ArrowUpRight className="w-3 h-3 text-gray-700" /> : 
      <ArrowDownRight className="w-3 h-3 text-gray-700" />;
  };

  // Filter requests
  const filteredRequests = useMemo(() => {
    return sampleRequests.filter(request => {
      const matchesSearch = searchTerm === '' || 
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.destination.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  // Calculate enhanced metrics
  const metrics = useMemo(() => {
    const total = sampleRequests.length;
    const pending = sampleRequests.filter(r => r.status === 'PENDING_ASSIGNMENT').length;
    const inTransit = sampleRequests.filter(r => r.status === 'IN_TRANSIT').length;
    const delivered = sampleRequests.filter(r => r.status === 'DELIVERED').length;
    const totalRevenue = sampleRequests.reduce((sum, r) => sum + (r.actualCost || r.estimatedCost || 0), 0);
    const avgDeliveryTime = 2.5;
    const onTimeDeliveryRate = 94.5;
    const activeDrivers = availableDrivers.filter(d => d.isAvailable).length;
    const totalDrivers = availableDrivers.length;

    const metricsData: MetricCard[] = [
      {
        title: 'Active Requests',
        value: total,
        change: { value: 12.5, type: 'increase', period: 'vs last week' },
        icon: Package,
        description: 'Total number of delivery requests'
      },
      {
        title: 'In Transit',
        value: inTransit,
        change: { value: 8.3, type: 'increase', period: 'vs yesterday' },
        icon: Truck,
        description: 'Packages currently being delivered'
      },
      {
        title: 'Revenue Today',
        value: formatCurrency(totalRevenue),
        change: { value: 15.2, type: 'increase', period: 'vs yesterday' },
        icon: DollarSign,
        description: 'Total revenue generated today'
      },
      {
        title: 'On-Time Rate',
        value: `${onTimeDeliveryRate}%`,
        change: { value: 2.1, type: 'increase', period: 'vs last month' },
        icon: Target,
        description: 'Percentage of on-time deliveries'
      },
      {
        title: 'Available Drivers',
        value: `${activeDrivers}/${totalDrivers}`,
        change: { value: 5.7, type: 'decrease', period: 'vs yesterday' },
        icon: Users,
        description: 'Drivers currently available for assignment'
      },
      {
        title: 'Avg Delivery Time',
        value: `${avgDeliveryTime}h`,
        change: { value: 3.2, type: 'decrease', period: 'vs last week' },
        icon: Clock,
        description: 'Average time to complete deliveries'
      }
    ];

    return { metricsData, total, pending, inTransit, delivered, totalRevenue, avgDeliveryTime, onTimeDeliveryRate };
  }, []);

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-xl shadow-sm">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Logistics Management</h1>
              <p className="text-sm sm:text-base text-gray-600">Advanced delivery and fleet operations control center</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Link href="/logistics/tracking">
            <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Live Tracking</span>
            </Button>
          </Link>
          <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm">
            <Plus className="w-4 h-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        {metrics.metricsData.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Enhanced Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-fit bg-white border border-gray-200">
            <TabsTrigger value="overview" className="gap-1 sm:gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Over</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-1 sm:gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm">
              <Package className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Requests</span>
              <span className="sm:hidden">Req</span>
            </TabsTrigger>
            <TabsTrigger value="drivers" className="gap-1 sm:gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Drivers</span>
              <span className="sm:hidden">Driv</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1 sm:gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm">
              <PieChart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Anal</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Recent Requests - Advanced Table */}
            <Card className="xl:col-span-2 border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                      Recent Requests
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1 text-sm">
                      {filteredAndSortedRequests.length} of {sampleRequests.length} requests
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowFilters(!showFilters)}
                      className="h-8 px-3 text-xs border-gray-300 hover:bg-gray-50"
                    >
                      <Filter className="w-3 h-3 mr-1" />
                      Filters
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="hover:bg-gray-100">
                      <Link href="/logistics/requests" className="gap-2 text-xs">
                        <span className="hidden sm:inline">See All Requests</span>
                        <span className="sm:hidden">See All</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Advanced Search and Filters */}
                <div className="mt-4 space-y-4">
                  <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search by ID, address, customer..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 h-9 border-gray-300 focus:border-gray-400 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[120px] sm:w-[140px] h-9 text-xs border-gray-300">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="PENDING_ASSIGNMENT">Pending</SelectItem>
                          <SelectItem value="ASSIGNED">Assigned</SelectItem>
                          <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-[100px] sm:w-[120px] h-9 text-xs border-gray-300">
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
                    </div>
                  </div>
                  
                  {showFilters && (
                    <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                          <SelectValue placeholder="Vehicle Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Vehicles</SelectItem>
                          <SelectItem value="Van">Van</SelectItem>
                          <SelectItem value="Pickup">Pickup</SelectItem>
                          <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                          <SelectItem value="Truck">Truck</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                          setPriorityFilter('all');
                          setVehicleTypeFilter('all');
                        }}
                        className="h-8 px-3 text-xs"
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>

                {/* Bulk Actions */}
                {selectedRequests.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-sm text-blue-700 font-medium">
                        {selectedRequests.length} request{selectedRequests.length > 1 ? 's' : ''} selected
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs border-blue-300 text-blue-700 hover:bg-blue-100">
                          <User className="w-3 h-3 mr-1" />
                          Bulk Assign
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs border-blue-300 text-blue-700 hover:bg-blue-100">
                          <Download className="w-3 h-3 mr-1" />
                          Export Selected
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs border-red-300 text-red-700 hover:bg-red-100">
                          <XCircle className="w-3 h-3 mr-1" />
                          Cancel Selected
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Mobile Card View */}
                <div className="block lg:hidden">
                  <div className="p-4 space-y-4">
                    {filteredAndSortedRequests.slice(0, 4).map((request) => (
                      <div key={request.requestId} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedRequests.includes(request.requestId)}
                              onChange={(e) => handleSelectRequest(request.requestId, e.target.checked)}
                              className="rounded border-gray-300 w-4 h-4"
                            />
                            <div>
                              <div className="font-mono text-sm font-bold text-gray-900">
                                {request.requestId}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatTimeAgo(request.timestamp)}
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Request
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="w-4 h-4 mr-2" />
                                Contact Customer
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel Request
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Status and Priority */}
                        <div className="flex items-center gap-2 mb-3">
                          <StatusBadge status={request.status} />
                          <PriorityBadge priority={request.priority} />
                        </div>

                        {/* Route */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="text-gray-700 truncate" title={request.pickup.address}>
                              {request.pickup.address.split(',')[0]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                            <span className="text-gray-700 truncate" title={request.destination.address}>
                              {request.destination.address.split(',')[0]}
                            </span>
                          </div>
                        </div>

                        {/* Driver and Cost */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {request.assignedDriver ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6 flex-shrink-0">
                                  <AvatarImage src={request.assignedDriver.avatar} />
                                  <AvatarFallback className="text-xs bg-slate-100 text-slate-700 font-semibold">
                                    {request.assignedDriver.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {request.assignedDriver.name}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                                    <span className="text-xs text-gray-500">{request.assignedDriver.rating}</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                                <User className="w-3 h-3 mr-1" />
                                Assign
                              </Button>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-900">
                              {formatCurrency(request.actualCost || request.estimatedCost || 0)}
                            </div>
                            {!request.actualCost && (
                              <div className="text-xs text-gray-500">Est.</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-100 bg-gray-50/50">
                        <TableHead className="w-12 pl-4 sm:pl-6">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={selectedRequests.length === filteredAndSortedRequests.slice(0, 4).length && filteredAndSortedRequests.slice(0, 4).length > 0}
                              onChange={(e) => handleSelectAll(e.target.checked)}
                              className="rounded border-gray-300 w-4 h-4"
                            />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors min-w-[140px]"
                          onClick={() => handleSort('requestId')}
                        >
                          <div className="flex items-center gap-2 py-2">
                            <span>Request</span>
                            {getSortIcon('requestId')}
                          </div>
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wide min-w-[180px] sm:min-w-[200px]">
                          <div className="py-2">Route</div>
                        </TableHead>
                        <TableHead 
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors min-w-[120px]"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center gap-2 py-2">
                            <span>Status</span>
                            {getSortIcon('status')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors min-w-[140px] sm:min-w-[160px]"
                          onClick={() => handleSort('driver')}
                        >
                          <div className="flex items-center gap-2 py-2">
                            <span>Driver</span>
                            {getSortIcon('driver')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors text-right min-w-[100px]"
                          onClick={() => handleSort('cost')}
                        >
                          <div className="flex items-center justify-end gap-2 py-2">
                            <span>Cost</span>
                            {getSortIcon('cost')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors min-w-[100px]"
                          onClick={() => handleSort('timestamp')}
                        >
                          <div className="flex items-center gap-2 py-2">
                            <span>Time</span>
                            {getSortIcon('timestamp')}
                          </div>
                        </TableHead>
                        <TableHead className="w-12 pr-4 sm:pr-6">
                          <div className="py-2"></div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedRequests.slice(0, 4).map((request) => (
                        <TableRow key={request.requestId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <TableCell className="pl-4 sm:pl-6 py-4">
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={selectedRequests.includes(request.requestId)}
                                onChange={(e) => handleSelectRequest(request.requestId, e.target.checked)}
                                className="rounded border-gray-300 w-4 h-4"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="space-y-2">
                              <div className="font-mono text-sm font-bold text-gray-900">
                                {request.requestId}
                              </div>
                              <div className="flex items-center">
                                <PriorityBadge priority={request.priority} />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                                <span className="text-gray-700 truncate max-w-[140px] sm:max-w-[180px]" title={request.pickup.address}>
                                  {request.pickup.address.split(',')[0]}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                                <span className="text-gray-700 truncate max-w-[140px] sm:max-w-[180px]" title={request.destination.address}>
                                  {request.destination.address.split(',')[0]}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center">
                              <StatusBadge status={request.status} />
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            {request.assignedDriver ? (
                              <div className="flex items-center gap-2 sm:gap-3">
                                <Avatar className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
                                  <AvatarImage src={request.assignedDriver.avatar} />
                                  <AvatarFallback className="text-xs bg-slate-100 text-slate-700 font-semibold">
                                    {request.assignedDriver.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {request.assignedDriver.name}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                                    <span className="text-xs text-gray-500">{request.assignedDriver.rating}</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Button size="sm" variant="outline" className="h-7 sm:h-8 px-2 sm:px-3 text-xs whitespace-nowrap">
                                <User className="w-3 h-3 mr-1" />
                                <span className="hidden sm:inline">Assign</span>
                                <span className="sm:hidden">Asgn</span>
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className="py-4 text-right">
                            <div className="space-y-1">
                              <div className="text-sm font-bold text-gray-900">
                                {formatCurrency(request.actualCost || request.estimatedCost || 0)}
                              </div>
                              {!request.actualCost && (
                                <div className="text-xs text-gray-500">Est.</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="text-xs text-gray-500 whitespace-nowrap">
                              {formatTimeAgo(request.timestamp)}
                            </div>
                          </TableCell>
                          <TableCell className="pr-4 sm:pr-6 py-4">
                            <div className="flex items-center justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Request
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact Customer
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel Request
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Footer with count */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Showing {Math.min(4, filteredAndSortedRequests.length)} of {filteredAndSortedRequests.length} requests
                    </span>
                    {filteredAndSortedRequests.length > 4 && (
                      <Button variant="ghost" size="sm" asChild className="hover:bg-gray-100">
                        <Link href="/logistics/requests" className="gap-2 text-xs">
                          See All {filteredAndSortedRequests.length} Requests
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Available Drivers Section */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                      <div className="p-2 bg-slate-900 rounded-lg shadow-sm">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-900 font-bold">
                          Available Drivers
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs text-gray-600 font-medium">
                              {availableDrivers.filter(d => d.isAvailable).length} Available
                            </span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-xs text-gray-500">
                            {availableDrivers.length} Total
                          </span>
                        </div>
                      </div>
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <RefreshCw className="w-4 h-4 text-gray-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Refresh drivers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="ghost" size="sm" asChild className="hover:bg-gray-100">
                      <Link href="/logistics/fleet" className="gap-2 text-xs px-3 h-8">
                        <span className="hidden sm:inline">View All</span>
                        <span className="sm:hidden">All</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Status Indicators */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-green-700">
                      Available ({availableDrivers.filter(d => d.isAvailable).length})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-xs font-medium text-orange-700">
                      On Delivery ({availableDrivers.filter(d => !d.isAvailable).length})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-gray-700">
                      Avg Rating: 4.6
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <ScrollArea className="h-[420px]">
                  <div className="p-4 space-y-3">
                    {availableDrivers.map((driver, index) => (
                      <div 
                        key={driver.driverId} 
                        className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                      >
                        {/* Status Indicator */}
                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                          driver.isAvailable ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <Avatar className="w-12 h-12 border border-gray-200">
                              <AvatarImage src={driver.avatar} />
                              <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold text-sm">
                                {driver.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            {/* Driver Info */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {driver.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium text-gray-700">{driver.rating}</span>
                                  </div>
                                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                                  <span className={`text-sm font-medium ${
                                    driver.isAvailable ? 'text-green-600' : 'text-orange-600'
                                  }`}>
                                    {driver.isAvailable ? 'Available' : 'On Delivery'}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Action Menu */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Driver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Track Location
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            {/* Vehicle & Location Info */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="flex items-center gap-2 text-xs">
                                <div className="p-1 bg-gray-100 rounded">
                                  <Truck className="w-3 h-3 text-gray-600" />
                                </div>
                                <div>
                                  <span className="text-gray-600">{driver.vehicle.type}</span>
                                  <div className="text-gray-500 font-mono">{driver.vehicle.plate}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <div className="p-1 bg-gray-100 rounded">
                                  <MapPin className="w-3 h-3 text-gray-600" />
                                </div>
                                <div>
                                  <span className="text-gray-600">{driver.distanceKm}km away</span>
                                  <div className="text-gray-500">~{Math.round(driver.distanceKm * 2)}min</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Performance Metrics */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                              <div className="grid grid-cols-3 gap-3 text-xs">
                                <div className="text-center">
                                  <div className="font-semibold text-gray-900">{driver.completedDeliveries}</div>
                                  <div className="text-gray-500">Deliveries</div>
                                </div>
                                <div className="text-center">
                                  <div className={`font-semibold ${
                                    (driver.onTimeRate || 0) >= 95 ? 'text-green-600' : 
                                    (driver.onTimeRate || 0) >= 85 ? 'text-yellow-600' : 'text-red-600'
                                  }`}>
                                    {driver.onTimeRate}%
                                  </div>
                                  <div className="text-gray-500">On-Time</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-semibold text-gray-900">{formatCurrency(driver.earnings || 0)}</div>
                                  <div className="text-gray-500">Earned</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className={`flex-1 h-8 text-xs ${
                                  driver.isAvailable 
                                    ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                                    : 'bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-100'
                                }`}
                                disabled={!driver.isAvailable}
                              >
                                <User className="w-3 h-3 mr-1" />
                                {driver.isAvailable ? 'Assign Now' : 'Busy'}
                              </Button>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-8 px-3 border-gray-300 hover:bg-gray-50">
                                      <Phone className="w-3 h-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Call {driver.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-8 px-3 border-gray-300 hover:bg-gray-50">
                                      <MapPin className="w-3 h-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Track location</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600 font-medium">Fleet Status</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-xs text-gray-600">{availableDrivers.filter(d => d.isAvailable).length} Available</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                          <span className="text-xs text-gray-600">{availableDrivers.filter(d => !d.isAvailable).length} Busy</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-gray-100">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">Map View</span>
                        <span className="sm:hidden">Map</span>
                      </Button>
                      <Button size="sm" className="h-8 px-3 text-xs bg-slate-900 hover:bg-slate-800 text-white">
                        <Plus className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">Add Driver</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Success Rate Card */}
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">+2.1%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900 tracking-tight">98.2</span>
                    <span className="text-lg font-semibold text-gray-600">%</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Success Rate</h3>
                  <p className="text-xs text-gray-500">vs last month</p>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Target: 95%</span>
                    <span>Achieved</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: '98.2%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Rating Card */}
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-yellow-100 rounded-xl group-hover:bg-yellow-200 transition-colors duration-300">
                    <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
                    <ArrowUpRight className="w-3 h-3 text-yellow-600" />
                    <span className="text-xs font-semibold text-yellow-700">+0.3</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900 tracking-tight">4.8</span>
                    <span className="text-lg font-semibold text-gray-600">/5</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Customer Rating</h3>
                  <p className="text-xs text-gray-500">vs last month</p>
                </div>
                
                {/* Star rating visual */}
                <div className="mt-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-3 h-3 ${star <= 4.8 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(1,247 reviews)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: '96%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Distance Card */}
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                    <Route className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
                    <ArrowDownRight className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">-1.2km</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900 tracking-tight">15.2</span>
                    <span className="text-lg font-semibold text-gray-600">km</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Avg Distance</h3>
                  <p className="text-xs text-gray-500">vs last month</p>
                </div>
                
                {/* Distance comparison */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Optimal: 12-18km</span>
                    <span className="text-green-600 font-medium">Efficient</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: '65%' }} />
                    </div>
                    <div className="absolute top-0 left-[65%] transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full -mt-0.5 border-2 border-white shadow-sm" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fuel Efficiency Card */}
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                    <Fuel className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
                    <ArrowDownRight className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">-0.5L</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900 tracking-tight">12.8</span>
                    <span className="text-lg font-semibold text-gray-600">L</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fuel Efficiency</h3>
                  <p className="text-xs text-gray-500">per 100km</p>
                </div>
                
                {/* Efficiency gauge */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Industry avg: 15L</span>
                    <span className="text-green-600 font-medium">15% Better</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-green-500 to-purple-500 h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Excellent</span>
                      <span>Poor</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          {/* Enhanced Filters */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by request ID, address, or customer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11 border-gray-300 focus:border-gray-400 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] sm:w-[180px] h-11 border-gray-300">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="PENDING_ASSIGNMENT">Pending</SelectItem>
                      <SelectItem value="ASSIGNED">Assigned</SelectItem>
                      <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[140px] sm:w-[180px] h-11 border-gray-300">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 h-11 border-gray-300 hover:bg-gray-50 hidden sm:flex">
                    <Filter className="w-4 h-4" />
                    More Filters
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="gap-2 h-11 hover:bg-gray-100">
                    <Link href="/logistics/requests" className="gap-2">
                      <span className="hidden sm:inline">See All Requests</span>
                      <span className="sm:hidden">See All</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Requests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedRequests.map((request) => (
              <RequestCard key={request.requestId} request={request} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          {/* Enhanced Drivers Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Fleet Management</h2>
              <p className="text-gray-600">Manage your driver network and fleet performance</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-green-700">
                  {availableDrivers.filter(d => d.isAvailable).length} Available
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  {availableDrivers.filter(d => !d.isAvailable).length} On Delivery
                </span>
              </div>
              <Button variant="ghost" size="sm" asChild className="gap-2 hover:bg-gray-100">
                <Link href="/logistics/fleet" className="gap-2">
                  <span className="hidden sm:inline">See All Drivers</span>
                  <span className="sm:hidden">See All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800 text-white">
                <Plus className="w-4 h-4" />
                Add Driver
              </Button>
            </div>
          </div>

          {/* Enhanced Driver Filters */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search drivers by name, vehicle, or location..."
                      className="pl-10 h-10 border-gray-300 focus:border-gray-400"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] h-10 border-gray-300">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">On Delivery</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] h-10 border-gray-300">
                      <SelectValue placeholder="Vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 h-10 border-gray-300 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Driver Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {availableDrivers.map((driver) => (
              <Card key={driver.driverId} className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="relative p-6">
                  {/* Status Indicator */}
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                    driver.isAvailable ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  
                  {/* Driver Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-lg">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${
                        driver.isAvailable ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {driver.isAvailable ? (
                          <CheckCircle className="w-3 h-3 text-white" />
                        ) : (
                          <Truck className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg text-gray-900 truncate">{driver.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-semibold text-gray-700">{driver.rating}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className={`text-sm font-medium ${
                              driver.isAvailable ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {driver.isAvailable ? 'Available' : 'On Delivery'}
                            </span>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="w-4 h-4 mr-2" />
                              Call Driver
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="w-4 h-4 mr-2" />
                              Track Location
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 group-hover:bg-gray-100/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-gray-900">Vehicle Details</h4>
                      <Badge variant="outline" className="text-xs font-mono bg-white">
                        {driver.vehicle.plate}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Truck className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Type</p>
                          <p className="text-sm font-semibold text-gray-900">{driver.vehicle.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Weight className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Capacity</p>
                          <p className="text-sm font-semibold text-gray-900">{driver.vehicle.capacityKg}kg</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <MapPin className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Distance</p>
                          <p className="text-sm font-semibold text-gray-900">{driver.distanceKm}km away</p>
                        </div>
                      </div>
                      {driver.vehicle.temperatureControl && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Thermometer className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-blue-600">Climate</p>
                            <p className="text-sm font-semibold text-blue-700">Controlled</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">On-Time Performance</span>
                        <span className={`text-sm font-bold ${
                          (driver.onTimeRate || 0) >= 95 ? 'text-green-600' : 
                          (driver.onTimeRate || 0) >= 85 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {driver.onTimeRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                            (driver.onTimeRate || 0) >= 95 ? 'bg-green-500' : 
                            (driver.onTimeRate || 0) >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${driver.onTimeRate}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{driver.completedDeliveries}</div>
                        <div className="text-xs text-gray-500">Deliveries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(driver.earnings || 0)}</div>
                        <div className="text-xs text-gray-500">Earned</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{Math.round(driver.score * 100)}</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      className={`flex-1 h-9 ${
                        driver.isAvailable 
                          ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                          : 'bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-100'
                      }`}
                      disabled={!driver.isAvailable}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {driver.isAvailable ? 'Assign Task' : 'Busy'}
                    </Button>
                    <Button size="sm" variant="outline" className="h-9 px-4 border-gray-300 hover:bg-gray-50">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-9 px-4 border-gray-300 hover:bg-gray-50">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fleet Summary */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-slate-700" />
                Fleet Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{availableDrivers.length}</div>
                  <div className="text-sm text-gray-600">Total Drivers</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(availableDrivers.reduce((sum, d) => sum + (d.onTimeRate || 0), 0) / availableDrivers.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg On-Time Rate</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(availableDrivers.reduce((sum, d) => sum + d.rating, 0) / availableDrivers.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(availableDrivers.reduce((sum, d) => sum + (d.earnings || 0), 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Earnings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Enhanced Analytics Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <p className="text-gray-600">Comprehensive insights into your logistics operations</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select defaultValue="7d">
                <SelectTrigger className="w-[140px] h-10 border-gray-300">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2 h-10 border-gray-300 hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button variant="ghost" size="sm" asChild className="gap-2 h-10 hover:bg-gray-100">
                <Link href="/logistics/analytics" className="gap-2">
                  <span className="hidden sm:inline">See Full Analytics</span>
                  <span className="sm:hidden">See All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="sm" className="gap-2 h-10 bg-slate-900 hover:bg-slate-800 text-white">
                <BarChart3 className="w-4 h-4" />
                Custom Report
              </Button>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                    <div className="text-xs text-gray-500">Total Deliveries</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">+12.5%</span>
                  <span className="text-sm text-gray-500">vs last period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(89750)}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">+18.2%</span>
                  <span className="text-sm text-gray-500">vs last period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-100 rounded-xl group-hover:bg-yellow-200 transition-colors">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">2.4h</div>
                    <div className="text-xs text-gray-500">Avg Delivery Time</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">-8.3%</span>
                  <span className="text-sm text-gray-500">vs last period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                    <Fuel className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(12450)}</div>
                    <div className="text-xs text-gray-500">Fuel Costs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">-5.7%</span>
                  <span className="text-sm text-gray-500">vs last period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Performance Chart */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-3">
                  <LineChart className="w-6 h-6 text-slate-700" />
                  Delivery Performance Trends
                </CardTitle>
                <CardDescription>
                  Daily delivery completion rates over the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Mock Chart Data */}
                  {[
                    { day: 'Mon', deliveries: 45, onTime: 42, percentage: 93 },
                    { day: 'Tue', deliveries: 52, onTime: 50, percentage: 96 },
                    { day: 'Wed', deliveries: 38, onTime: 36, percentage: 95 },
                    { day: 'Thu', deliveries: 61, onTime: 58, percentage: 95 },
                    { day: 'Fri', deliveries: 47, onTime: 45, percentage: 96 },
                    { day: 'Sat', deliveries: 33, onTime: 31, percentage: 94 },
                    { day: 'Sun', deliveries: 29, onTime: 28, percentage: 97 },
                  ].map((data, index) => (
                    <div key={data.day} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-gray-700">{data.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{data.deliveries} deliveries</span>
                          <span className={`font-semibold ${
                            data.percentage >= 95 ? 'text-green-600' : 
                            data.percentage >= 90 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {data.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                              data.percentage >= 95 ? 'bg-green-500' : 
                              data.percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${data.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Analysis */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-3">
                  <PieChart className="w-6 h-6 text-slate-700" />
                  Revenue Breakdown
                </CardTitle>
                <CardDescription>
                  Revenue distribution by service type
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { service: 'Standard Delivery', amount: 45600, percentage: 51, color: 'bg-blue-500' },
                    { service: 'Express Delivery', amount: 28900, percentage: 32, color: 'bg-green-500' },
                    { service: 'Same Day', amount: 12450, percentage: 14, color: 'bg-yellow-500' },
                    { service: 'Scheduled', amount: 2800, percentage: 3, color: 'bg-purple-500' },
                  ].map((item) => (
                    <div key={item.service} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm font-medium text-gray-700">{item.service}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">{formatCurrency(item.amount)}</div>
                          <div className="text-xs text-gray-500">{item.percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Performing Routes */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Route className="w-5 h-5 text-slate-700" />
                  Top Routes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {[
                    { route: 'Bole → Kazanchis', deliveries: 156, revenue: 23400, efficiency: 94 },
                    { route: 'Merkato → Piassa', deliveries: 134, revenue: 19800, efficiency: 91 },
                    { route: 'Airport → Gabon', deliveries: 98, revenue: 18200, efficiency: 96 },
                    { route: 'Atlas → CMC', deliveries: 87, revenue: 15600, efficiency: 89 },
                  ].map((route, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-gray-900">{route.route}</div>
                        <Badge variant="outline" className={`text-xs ${
                          route.efficiency >= 95 ? 'bg-green-50 text-green-700 border-green-200' :
                          route.efficiency >= 90 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {route.efficiency}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Deliveries</span>
                          <div className="font-semibold text-gray-900">{route.deliveries}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Revenue</span>
                          <div className="font-semibold text-gray-900">{formatCurrency(route.revenue)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Driver Performance */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Users className="w-5 h-5 text-slate-700" />
                  Top Drivers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {availableDrivers
                    .sort((a, b) => (b.onTimeRate || 0) - (a.onTimeRate || 0))
                    .slice(0, 4)
                    .map((driver, index) => (
                    <div key={driver.driverId} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={driver.avatar} />
                            <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold text-sm">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">#{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{driver.name}</div>
                          <div className="flex items-center gap-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{driver.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">On-Time</span>
                          <div className="font-semibold text-green-600">{driver.onTimeRate}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Deliveries</span>
                          <div className="font-semibold text-gray-900">{driver.completedDeliveries}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <AlertCircle className="w-5 h-5 text-slate-700" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {[
                    { type: 'warning', message: 'High fuel consumption detected on Route A-12', time: '2h ago', icon: Fuel },
                    { type: 'info', message: 'New driver Kebede Y. completed onboarding', time: '4h ago', icon: User },
                    { type: 'success', message: 'Monthly delivery target achieved (102%)', time: '1d ago', icon: Target },
                    { type: 'warning', message: 'Vehicle AA1234 due for maintenance', time: '2d ago', icon: Settings },
                  ].map((alert, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          alert.type === 'warning' ? 'bg-yellow-100' :
                          alert.type === 'success' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          <alert.icon className={`w-4 h-4 ${
                            alert.type === 'warning' ? 'text-yellow-600' :
                            alert.type === 'success' ? 'text-green-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 mb-1">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 