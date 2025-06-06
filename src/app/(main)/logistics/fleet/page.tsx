'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Search, Filter, MapPin, Phone, Star, Truck, User, Plus, 
  MoreVertical, Eye, Settings, CheckCircle, Clock, TrendingUp,
  Calendar, DollarSign, Route, Fuel, AlertTriangle, Users,
  BarChart3, Map, Download, Upload, RefreshCw, Grid3X3,
  List, SortAsc, SortDesc, ChevronDown, ChevronRight,
  Navigation, Shield, Award, Target, Zap, Activity,
  Bell, MessageSquare, FileText, Camera, Edit3, Trash2,
  Send, UserPlus, UserMinus, RotateCcw, PlayCircle,
  PauseCircle, StopCircle, Gauge, Battery, Wifi,
  WifiOff, Signal, SignalHigh, SignalLow, SignalMedium,
  Timer, MapPinned, Route as RouteIcon, Compass,
  TrendingDown, PieChart, LineChart, BarChart2,
  Calendar as CalendarIcon, Clock3, AlertCircle,
  CheckCircle2, XCircle, Info, Wrench, Droplets,
  ThermometerSun, Package, Weight, Ruler,
  ExternalLink, ArrowUpRight, ArrowDownRight, Minus,
  Circle, Dot, Home, ArrowLeft, Maximize2, Minimize2,
  SlidersHorizontal, Building2, Copy
} from 'lucide-react';

// Enhanced Driver Interface with Advanced Features
interface Driver {
  driverId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location: { 
    lat: number; 
    lng: number; 
    address: string;
    lastUpdated: string;
    accuracy: number;
  };
  distanceKm: number;
  rating: number;
  status: 'online' | 'offline' | 'busy' | 'break' | 'maintenance' | 'emergency';
  vehicle: {
    type: string;
    make: string;
    model: string;
    year: number;
    plate: string;
    capacityKg: number;
    temperatureControl: boolean;
    fuelType: string;
    condition: 'excellent' | 'good' | 'fair' | 'poor';
    mileage: number;
    fuelLevel: number;
    batteryLevel?: number;
    lastMaintenance: string;
    nextMaintenance: string;
    insuranceExpiry: string;
    registrationExpiry: string;
    gpsEnabled: boolean;
    dashcamEnabled: boolean;
  };
  performance: {
    completedDeliveries: number;
    onTimeRate: number;
    customerRating: number;
    earnings: number;
    totalDistance: number;
    fuelEfficiency: number;
    incidentCount: number;
    averageSpeed: number;
    idleTime: number;
    workingHours: number;
    weeklyEarnings: number;
    monthlyEarnings: number;
    deliverySuccessRate: number;
    customerComplaintRate: number;
  };
  schedule: {
    shiftStart: string;
    shiftEnd: string;
    workingDays: string[];
    isFullTime: boolean;
    breakTime: number;
    overtimeHours: number;
    leaveBalance: number;
  };
  documents: {
    license: { valid: boolean; expiryDate: string; type: string };
    insurance: { valid: boolean; expiryDate: string; provider: string };
    registration: { valid: boolean; expiryDate: string };
    medicalCertificate: { valid: boolean; expiryDate: string };
    backgroundCheck: { valid: boolean; date: string };
  };
  joinDate: string;
  lastActive: string;
  currentDelivery?: {
    orderId: string;
    destination: string;
    eta: string;
    progress: number;
    customerName: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    notifications: boolean;
    gpsTracking: boolean;
    autoAssignment: boolean;
    preferredRoutes: string[];
  };
  analytics: {
    dailyStats: {
      deliveries: number;
      distance: number;
      earnings: number;
      fuelUsed: number;
    };
    weeklyTrend: number[];
    monthlyTrend: number[];
    performanceScore: number;
    riskScore: number;
    efficiencyRating: number;
  };
}

// Enhanced Sample Driver Data with Advanced Features
const enhancedDrivers: Driver[] = [
  {
    driverId: "DRV-001",
    name: "Amanuel Kebede",
    email: "amanuel.kebede@axova.com",
    phone: "+251911234567",
    avatar: "/avatars/amanuel.jpg",
    location: { 
      lat: 8.9752, 
      lng: 38.7899, 
      address: "Bole, Addis Ababa",
      lastUpdated: "2024-01-15T14:30:00Z",
      accuracy: 95
    },
    distanceKm: 2.1,
    rating: 4.9,
    status: 'online',
    vehicle: {
      type: "Van",
      make: "Toyota",
      model: "Hiace",
      year: 2022,
      plate: "AA1234",
      capacityKg: 1500,
      temperatureControl: true,
      fuelType: "Diesel",
      condition: 'excellent',
      mileage: 45230,
      fuelLevel: 85,
      batteryLevel: 92,
      lastMaintenance: "2024-01-01",
      nextMaintenance: "2024-04-01",
      insuranceExpiry: "2025-12-31",
      registrationExpiry: "2025-08-20",
      gpsEnabled: true,
      dashcamEnabled: true
    },
    performance: {
      completedDeliveries: 1247,
      onTimeRate: 96.5,
      customerRating: 4.8,
      earnings: 125600,
      totalDistance: 45230,
      fuelEfficiency: 12.5,
      incidentCount: 2,
      averageSpeed: 45,
      idleTime: 120,
      workingHours: 8.5,
      weeklyEarnings: 3200,
      monthlyEarnings: 12800,
      deliverySuccessRate: 98.5,
      customerComplaintRate: 1.2
    },
    schedule: {
      shiftStart: "08:00",
      shiftEnd: "18:00",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      isFullTime: true,
      breakTime: 60,
      overtimeHours: 5,
      leaveBalance: 12
    },
    documents: {
      license: { valid: true, expiryDate: "2026-03-15", type: "Commercial" },
      insurance: { valid: true, expiryDate: "2025-12-31", provider: "Ethiopian Insurance" },
      registration: { valid: true, expiryDate: "2025-08-20" },
      medicalCertificate: { valid: true, expiryDate: "2025-06-30" },
      backgroundCheck: { valid: true, date: "2023-01-10" }
    },
    joinDate: "2023-01-15",
    lastActive: "2024-01-15T14:30:00Z",
    currentDelivery: {
      orderId: "ORD-12345",
      destination: "Kazanchis Business District",
      eta: "15:45",
      progress: 65,
      customerName: "Alemayehu Tadesse",
      priority: 'high'
    },
    emergencyContact: {
      name: "Meron Kebede",
      phone: "+251911234568",
      relationship: "Spouse"
    },
    preferences: {
      notifications: true,
      gpsTracking: true,
      autoAssignment: true,
      preferredRoutes: ["Bole-Kazanchis", "Bole-Merkato"]
    },
    analytics: {
      dailyStats: {
        deliveries: 8,
        distance: 120,
        earnings: 850,
        fuelUsed: 15
      },
      weeklyTrend: [85, 92, 88, 95, 90, 87, 93],
      monthlyTrend: [88, 91, 89, 94, 92, 90, 95, 93, 89, 91, 94, 96],
      performanceScore: 94,
      riskScore: 15,
      efficiencyRating: 92
    }
  },
  {
    driverId: "DRV-002",
    name: "Tigist Mekonnen",
    email: "tigist.mekonnen@axova.com",
    phone: "+251922345678",
    location: { 
      lat: 8.9723, 
      lng: 38.7923, 
      address: "Kirkos, Addis Ababa",
      lastUpdated: "2024-01-15T14:25:00Z",
      accuracy: 88
    },
    distanceKm: 3.6,
    rating: 4.7,
    status: 'busy',
    vehicle: {
      type: "Pickup",
      make: "Isuzu",
      model: "D-Max",
      year: 2021,
      plate: "AB7777",
      capacityKg: 1200,
      temperatureControl: false,
      fuelType: "Diesel",
      condition: 'good',
      mileage: 32150,
      fuelLevel: 65,
      batteryLevel: 88,
      lastMaintenance: "2023-12-15",
      nextMaintenance: "2024-03-15",
      insuranceExpiry: "2025-09-15",
      registrationExpiry: "2025-06-10",
      gpsEnabled: true,
      dashcamEnabled: false
    },
    performance: {
      completedDeliveries: 892,
      onTimeRate: 92.1,
      customerRating: 4.6,
      earnings: 89400,
      totalDistance: 32150,
      fuelEfficiency: 11.8,
      incidentCount: 1,
      averageSpeed: 42,
      idleTime: 95,
      workingHours: 8.0,
      weeklyEarnings: 2800,
      monthlyEarnings: 11200,
      deliverySuccessRate: 96.8,
      customerComplaintRate: 2.1
    },
    schedule: {
      shiftStart: "09:00",
      shiftEnd: "17:00",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      isFullTime: true,
      breakTime: 45,
      overtimeHours: 2,
      leaveBalance: 8
    },
    documents: {
      license: { valid: true, expiryDate: "2025-11-20", type: "Commercial" },
      insurance: { valid: true, expiryDate: "2025-09-15", provider: "Nyala Insurance" },
      registration: { valid: true, expiryDate: "2025-06-10" },
      medicalCertificate: { valid: true, expiryDate: "2025-04-30" },
      backgroundCheck: { valid: true, date: "2023-03-15" }
    },
    joinDate: "2023-03-20",
    lastActive: "2024-01-15T14:25:00Z",
    currentDelivery: {
      orderId: "ORD-12346",
      destination: "Mercato Commercial Area",
      eta: "16:20",
      progress: 45,
      customerName: "Hanan Mohammed",
      priority: 'medium'
    },
    emergencyContact: {
      name: "Dawit Mekonnen",
      phone: "+251922345679",
      relationship: "Brother"
    },
    preferences: {
      notifications: true,
      gpsTracking: true,
      autoAssignment: false,
      preferredRoutes: ["Kirkos-Mercato", "Kirkos-Piassa"]
    },
    analytics: {
      dailyStats: {
        deliveries: 6,
        distance: 95,
        earnings: 720,
        fuelUsed: 12
      },
      weeklyTrend: [78, 85, 82, 88, 84, 80, 86],
      monthlyTrend: [82, 85, 83, 87, 85, 84, 89, 87, 83, 85, 88, 90],
      performanceScore: 86,
      riskScore: 22,
      efficiencyRating: 84
    }
  },
  {
    driverId: "DRV-003",
    name: "Kebede Yonas",
    email: "kebede.yonas@axova.com",
    phone: "+251933456789",
    location: { 
      lat: 8.9701, 
      lng: 38.7801, 
      address: "Lideta, Addis Ababa",
      lastUpdated: "2024-01-15T12:00:00Z",
      accuracy: 72
    },
    distanceKm: 5.8,
    rating: 4.2,
    status: 'maintenance',
    vehicle: {
      type: "Truck",
      make: "Mitsubishi",
      model: "Canter",
      year: 2020,
      plate: "AC4567",
      capacityKg: 3000,
      temperatureControl: true,
      fuelType: "Diesel",
      condition: 'fair',
      mileage: 67890,
      fuelLevel: 45,
      batteryLevel: 76,
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-02-10",
      insuranceExpiry: "2024-12-01",
      registrationExpiry: "2025-04-15",
      gpsEnabled: true,
      dashcamEnabled: true
    },
    performance: {
      completedDeliveries: 1456,
      onTimeRate: 88.7,
      customerRating: 4.3,
      earnings: 156800,
      totalDistance: 67890,
      fuelEfficiency: 9.2,
      incidentCount: 5,
      averageSpeed: 38,
      idleTime: 180,
      workingHours: 9.5,
      weeklyEarnings: 3800,
      monthlyEarnings: 15200,
      deliverySuccessRate: 94.2,
      customerComplaintRate: 3.8
    },
    schedule: {
      shiftStart: "06:00",
      shiftEnd: "16:00",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      isFullTime: true,
      breakTime: 90,
      overtimeHours: 8,
      leaveBalance: 5
    },
    documents: {
      license: { valid: true, expiryDate: "2025-07-30", type: "Heavy Vehicle" },
      insurance: { valid: false, expiryDate: "2024-12-01", provider: "Awash Insurance" },
      registration: { valid: true, expiryDate: "2025-04-15" },
      medicalCertificate: { valid: true, expiryDate: "2025-02-28" },
      backgroundCheck: { valid: true, date: "2022-08-05" }
    },
    joinDate: "2022-08-10",
    lastActive: "2024-01-15T12:00:00Z",
    emergencyContact: {
      name: "Almaz Yonas",
      phone: "+251933456790",
      relationship: "Wife"
    },
    preferences: {
      notifications: true,
      gpsTracking: false,
      autoAssignment: true,
      preferredRoutes: ["Lideta-Industrial", "Lideta-Kaliti"]
    },
    analytics: {
      dailyStats: {
        deliveries: 0,
        distance: 0,
        earnings: 0,
        fuelUsed: 0
      },
      weeklyTrend: [65, 72, 68, 75, 70, 67, 73],
      monthlyTrend: [70, 73, 71, 76, 74, 72, 78, 76, 72, 74, 77, 79],
      performanceScore: 74,
      riskScore: 45,
      efficiencyRating: 68
    }
  }
];

export default function FleetManagementPage() {
  // Basic State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);

  // Advanced State
  const [activeTab, setActiveTab] = useState('overview');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [showMaintenanceAlerts, setShowMaintenanceAlerts] = useState(true);
  const [showPerformanceInsights, setShowPerformanceInsights] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Dialog States
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showMaintenanceSchedule, setShowMaintenanceSchedule] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Real-time updates simulation
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Refreshing fleet data...');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Advanced filtering and sorting
  const filteredAndSortedDrivers = useMemo(() => {
    let filtered = enhancedDrivers.filter(driver => {
      const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           driver.vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           driver.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           driver.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
      const matchesVehicle = vehicleFilter === 'all' || driver.vehicle.type.toLowerCase() === vehicleFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesVehicle;
    });

    // Advanced sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'deliveries':
          aValue = a.performance.completedDeliveries;
          bValue = b.performance.completedDeliveries;
          break;
        case 'earnings':
          aValue = a.performance.earnings;
          bValue = b.performance.earnings;
          break;
        case 'onTime':
          aValue = a.performance.onTimeRate;
          bValue = b.performance.onTimeRate;
          break;
        case 'performance':
          aValue = a.analytics.performanceScore;
          bValue = b.analytics.performanceScore;
          break;
        case 'efficiency':
          aValue = a.analytics.efficiencyRating;
          bValue = b.analytics.efficiencyRating;
          break;
        case 'risk':
          aValue = a.analytics.riskScore;
          bValue = b.analytics.riskScore;
          break;
        case 'lastActive':
          aValue = new Date(a.lastActive).getTime();
          bValue = new Date(b.lastActive).getTime();
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, vehicleFilter, sortBy, sortOrder]);

  // Advanced Statistics with Analytics
  const stats = useMemo(() => {
    const total = enhancedDrivers.length;
    const online = enhancedDrivers.filter(d => d.status === 'online').length;
    const busy = enhancedDrivers.filter(d => d.status === 'busy').length;
    const offline = enhancedDrivers.filter(d => d.status === 'offline').length;
    const maintenance = enhancedDrivers.filter(d => d.status === 'maintenance').length;
    const emergency = enhancedDrivers.filter(d => d.status === 'emergency').length;
    
    const avgRating = enhancedDrivers.reduce((sum, d) => sum + d.rating, 0) / total;
    const totalDeliveries = enhancedDrivers.reduce((sum, d) => sum + d.performance.completedDeliveries, 0);
    const totalEarnings = enhancedDrivers.reduce((sum, d) => sum + d.performance.earnings, 0);
    const avgOnTime = enhancedDrivers.reduce((sum, d) => sum + d.performance.onTimeRate, 0) / total;
    const avgPerformance = enhancedDrivers.reduce((sum, d) => sum + d.analytics.performanceScore, 0) / total;
    const avgEfficiency = enhancedDrivers.reduce((sum, d) => sum + d.analytics.efficiencyRating, 0) / total;
    const avgRisk = enhancedDrivers.reduce((sum, d) => sum + d.analytics.riskScore, 0) / total;
    
    const totalDistance = enhancedDrivers.reduce((sum, d) => sum + d.performance.totalDistance, 0);
    const totalFuelUsed = enhancedDrivers.reduce((sum, d) => sum + (d.analytics.dailyStats.fuelUsed || 0), 0);
    const avgFuelEfficiency = enhancedDrivers.reduce((sum, d) => sum + d.performance.fuelEfficiency, 0) / total;
    
    const documentsExpiring = enhancedDrivers.filter(d => {
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      return new Date(d.documents.license.expiryDate) <= thirtyDaysFromNow ||
             new Date(d.documents.insurance.expiryDate) <= thirtyDaysFromNow ||
             new Date(d.vehicle.insuranceExpiry) <= thirtyDaysFromNow;
    }).length;

    const maintenanceDue = enhancedDrivers.filter(d => {
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return new Date(d.vehicle.nextMaintenance) <= sevenDaysFromNow;
    }).length;

    return {
      total,
      online,
      busy,
      offline,
      maintenance,
      emergency,
      avgRating: Number(avgRating.toFixed(1)),
      totalDeliveries,
      totalEarnings,
      avgOnTime: Number(avgOnTime.toFixed(1)),
      avgPerformance: Number(avgPerformance.toFixed(1)),
      avgEfficiency: Number(avgEfficiency.toFixed(1)),
      avgRisk: Number(avgRisk.toFixed(1)),
      totalDistance,
      totalFuelUsed,
      avgFuelEfficiency: Number(avgFuelEfficiency.toFixed(1)),
      documentsExpiring,
      maintenanceDue,
      activeDrivers: online + busy,
      utilizationRate: Number(((online + busy) / total * 100).toFixed(1)),
      totalRevenue: totalEarnings + totalFuelUsed * 12.5 // Assuming $12.5 per liter of fuel
    };
  }, []);

  // Utility Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDistance = (km: number) => {
    return `${km.toLocaleString()} km`;
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-orange-500';
      case 'break': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      case 'maintenance': return 'bg-blue-500';
      case 'emergency': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      online: 'bg-green-100 text-green-800 border-green-200',
      busy: 'bg-orange-100 text-orange-800 border-orange-200',
      break: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      offline: 'bg-gray-100 text-gray-800 border-gray-200',
      maintenance: 'bg-blue-100 text-blue-800 border-blue-200',
      emergency: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return colors[status as keyof typeof colors] || colors.offline;
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-green-600';
    if (score <= 40) return 'text-yellow-600';
    if (score <= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSelectDriver = (driverId: string, checked: boolean) => {
    if (checked) {
      setSelectedDrivers([...selectedDrivers, driverId]);
    } else {
      setSelectedDrivers(selectedDrivers.filter(id => id !== driverId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDrivers(filteredAndSortedDrivers.map(d => d.driverId));
    } else {
      setSelectedDrivers([]);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on drivers:`, selectedDrivers);
    setShowBulkActions(false);
    setSelectedDrivers([]);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

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
                  <BreadcrumbPage>Fleet Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl shadow-sm">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Fleet Management
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
                      Advanced fleet operations and driver management center
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Last updated: {formatTime(lastUpdated.toISOString())}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Back Button */}
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
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
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

                <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm shadow-sm" onClick={() => setShowAddDriver(true)}>
                  <Plus className="w-4 h-4" />
                  Add Driver
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Enhanced Metrics Dashboard - Matching Requests Page Style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total Fleet</div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{stats.online}</div>
                    <div className="text-sm text-gray-600">Online</div>
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
                    <div className="text-2xl font-bold text-purple-600">{stats.busy}</div>
                    <div className="text-sm text-gray-600">Busy</div>
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
                    <div className="text-2xl font-bold text-gray-600">{stats.offline}</div>
                    <div className="text-sm text-gray-600">Offline</div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Circle className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.maintenance}</div>
                    <div className="text-sm text-gray-600">Maintenance</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Wrench className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{stats.emergency}</div>
                    <div className="text-sm text-gray-600">Emergency</div>
                  </div>
                  <div className="p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</div>
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
                    <div className="text-2xl font-bold text-slate-600">{stats.avgPerformance}</div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Target className="w-6 h-6 text-slate-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Filters - Matching Requests Page Style */}
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
                      {filteredAndSortedDrivers.length} of {enhancedDrivers.length} drivers
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
                  {selectedDrivers.length > 0 && (
                    <Badge variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700">
                      {selectedDrivers.length} selected
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
                    placeholder="Search drivers..."
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
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="break">On Break</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Vehicle Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="deliveries">Deliveries</SelectItem>
                    <SelectItem value="earnings">Earnings</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="efficiency">Efficiency</SelectItem>
                    <SelectItem value="lastActive">Last Active</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Time Range" />
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
                      setVehicleFilter('all');
                      setSortBy('name');
                      setSelectedTimeRange('today');
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
                      <label className="text-sm font-medium text-gray-700">Performance Range</label>
                      <div className="flex gap-2">
                        <Input placeholder="Min" className="border-gray-300" />
                        <Input placeholder="Max" className="border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Rating Range</label>
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
                  </div>
                </div>
              )}

              {/* Results Summary and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600 font-medium">
                    Showing <span className="font-bold text-gray-900">{filteredAndSortedDrivers.length}</span> of <span className="font-bold text-gray-900">{enhancedDrivers.length}</span> drivers
                  </p>
                  {selectedDrivers.length > 0 && (
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="font-medium">
                        {selectedDrivers.length} selected
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowBulkActions(true)}
                        className="gap-2 h-8"
                      >
                        <Settings className="w-4 h-4" />
                        Bulk Actions
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 h-8" asChild>
                    <Link href="/logistics/tracking">
                      <Map className="w-4 h-4" />
                      <span className="hidden sm:inline">Live Map</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 h-8">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Analytics</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Driver Management Section */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                    Driver Management
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1 text-sm">
                    Comprehensive driver oversight and performance tracking
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 h-8">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" asChild className="hover:bg-gray-100">
                    <Link href="/logistics/fleet/analytics" className="gap-2 text-xs">
                      <BarChart3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Analytics</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Enhanced Driver Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedDrivers.map((driver) => (
                    <Card key={driver.driverId} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-slate-300 relative overflow-hidden bg-white">
                      {/* Status Indicator */}
                      <div className={`absolute top-0 left-0 w-full h-1 ${getStatusColor(driver.status)}`} />
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedDrivers.includes(driver.driverId)}
                              onCheckedChange={(checked) => handleSelectDriver(driver.driverId, checked as boolean)}
                            />
                            <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                              <AvatarImage src={driver.avatar} alt={driver.name} />
                              <AvatarFallback className="bg-gradient-to-br from-slate-500 to-slate-700 text-white font-semibold">
                                {driver.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{driver.name}</h3>
                              <p className="text-sm text-gray-600 truncate">{driver.vehicle.make} {driver.vehicle.model}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem onClick={() => {
                                setSelectedDriver(driver);
                                setShowDriverDetails(true);
                              }}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="w-4 h-4 mr-2" />
                                Call Driver
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="w-4 h-4 mr-2" />
                                Track Location
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <UserMinus className="w-4 h-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Status and Rating */}
                        <div className="flex items-center justify-between mt-3">
                          <Badge className={`text-xs font-medium ${getStatusBadge(driver.status)}`}>
                            {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">{driver.rating}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Current Delivery */}
                        {driver.currentDelivery && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Active Delivery</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-900">{driver.currentDelivery.destination}</p>
                              <div className="flex items-center justify-between text-xs text-gray-600">
                                <span>ETA: {driver.currentDelivery.eta}</span>
                                <Badge variant={driver.currentDelivery.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                                  {driver.currentDelivery.priority}
                                </Badge>
                              </div>
                              <Progress value={driver.currentDelivery.progress} className="h-1.5" />
                            </div>
                          </div>
                        )}

                        {/* Location and Distance */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 truncate">{driver.location.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Route className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{driver.distanceKm} km away</span>
                            <span className="text-xs text-gray-500">• {formatTime(driver.location.lastUpdated)}</span>
                          </div>
                        </div>

                        {/* Vehicle Info */}
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-900">{driver.vehicle.plate}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {driver.vehicle.type}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Fuel className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{driver.vehicle.fuelLevel}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Gauge className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{formatDistance(driver.vehicle.mileage)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="text-lg font-bold text-gray-900">{driver.performance.completedDeliveries}</div>
                            <div className="text-xs text-gray-600">Deliveries</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="text-lg font-bold text-gray-900">{driver.performance.onTimeRate}%</div>
                            <div className="text-xs text-gray-600">On Time</div>
                          </div>
                        </div>

                        {/* Performance Score */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Performance Score</span>
                            <span className={`font-semibold ${getPerformanceColor(driver.analytics.performanceScore)}`}>
                              {driver.analytics.performanceScore}/100
                            </span>
                          </div>
                          <Progress value={driver.analytics.performanceScore} className="h-2" />
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2 pt-2 border-t border-gray-100">
                          <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs border-gray-300 hover:bg-gray-50">
                            <Phone className="w-3 h-3" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs border-gray-300 hover:bg-gray-50">
                            <MessageSquare className="w-3 h-3" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs border-gray-300 hover:bg-gray-50">
                            <MapPin className="w-3 h-3" />
                            Track
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Enhanced List View */}
                  {filteredAndSortedDrivers.map((driver) => (
                    <Card key={driver.driverId} className="hover:shadow-md transition-shadow border-gray-200 bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Checkbox
                            checked={selectedDrivers.includes(driver.driverId)}
                            onCheckedChange={(checked) => handleSelectDriver(driver.driverId, checked as boolean)}
                          />
                          
                          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                            <AvatarImage src={driver.avatar} alt={driver.name} />
                            <AvatarFallback className="bg-gradient-to-br from-slate-500 to-slate-700 text-white font-semibold">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                              <p className="text-sm text-gray-600">{driver.email}</p>
                            </div>

                            <div className="space-y-1">
                              <Badge className={`text-xs font-medium ${getStatusBadge(driver.status)}`}>
                                {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                              </Badge>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium text-gray-700">{driver.rating}</span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-900">{driver.vehicle.make} {driver.vehicle.model}</p>
                              <p className="text-xs text-gray-600">{driver.vehicle.plate} • {driver.vehicle.type}</p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-900">{driver.performance.completedDeliveries}</p>
                              <p className="text-xs text-gray-600">Deliveries</p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-900">{driver.performance.onTimeRate}%</p>
                              <p className="text-xs text-gray-600">On Time Rate</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="gap-1 border-gray-300 hover:bg-gray-50">
                                <Phone className="w-3 h-3" />
                                Call
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedDriver(driver);
                                    setShowDriverDetails(true);
                                  }}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Track Location
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredAndSortedDrivers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No drivers found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button className="gap-2" onClick={() => setShowAddDriver(true)}>
                    <Plus className="w-4 h-4" />
                    Add New Driver
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Driver Details Modal */}
        <Dialog open={showDriverDetails} onOpenChange={setShowDriverDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <User className="w-5 h-5" />
                Driver Details
              </DialogTitle>
            </DialogHeader>
            {selectedDriver && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                    <AvatarImage src={selectedDriver.avatar} alt={selectedDriver.name} />
                    <AvatarFallback className="bg-gradient-to-br from-slate-500 to-slate-700 text-white font-semibold text-lg">
                      {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedDriver.name}</h3>
                    <p className="text-gray-600">{selectedDriver.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={`${getStatusBadge(selectedDriver.status)}`}>
                        {selectedDriver.status.charAt(0).toUpperCase() + selectedDriver.status.slice(1)}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedDriver.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-2xl font-bold text-gray-900">{selectedDriver.performance.completedDeliveries}</div>
                          <div className="text-sm text-gray-600">Deliveries</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-2xl font-bold text-gray-900">{selectedDriver.performance.onTimeRate}%</div>
                          <div className="text-sm text-gray-600">On Time</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Performance Score</span>
                          <span className="font-semibold">{selectedDriver.analytics.performanceScore}/100</span>
                        </div>
                        <Progress value={selectedDriver.analytics.performanceScore} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Vehicle Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="font-medium">{selectedDriver.vehicle.make} {selectedDriver.vehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plate:</span>
                        <span className="font-medium">{selectedDriver.vehicle.plate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDriver.vehicle.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fuel Level:</span>
                        <span className="font-medium">{selectedDriver.vehicle.fuelLevel}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Driver Modal */}
        <Dialog open={showAddDriver} onOpenChange={setShowAddDriver}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <UserPlus className="w-5 h-5" />
                Add New Driver
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter driver's full name" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="driver@example.com" className="border-gray-300" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+251911234567" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input id="license" placeholder="License number" className="border-gray-300" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Information</Label>
                <Textarea id="vehicle" placeholder="Vehicle make, model, plate number, etc." className="border-gray-300" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDriver(false)} className="border-gray-300">
                Cancel
              </Button>
              <Button onClick={() => setShowAddDriver(false)} className="bg-slate-900 hover:bg-slate-800">
                Add Driver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Actions Modal */}
        <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                Bulk Actions
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Perform actions on {selectedDrivers.length} selected drivers
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 border-gray-300 hover:bg-gray-50"
                  onClick={() => handleBulkAction('assign')}
                >
                  <User className="w-4 h-4" />
                  Bulk Assignment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 border-gray-300 hover:bg-gray-50"
                  onClick={() => handleBulkAction('notify')}
                >
                  <Bell className="w-4 h-4" />
                  Send Notification
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 border-gray-300 hover:bg-gray-50"
                  onClick={() => handleBulkAction('schedule')}
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Maintenance
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => handleBulkAction('deactivate')}
                >
                  <UserMinus className="w-4 h-4" />
                  Deactivate Selected
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBulkActions(false)} className="border-gray-300">
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Maintenance Schedule Modal */}
        <Dialog open={showMaintenanceSchedule} onOpenChange={setShowMaintenanceSchedule}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                Schedule Maintenance
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-select">Select Vehicle</Label>
                <Select>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Choose a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {enhancedDrivers.map((driver) => (
                      <SelectItem key={driver.driverId} value={driver.driverId}>
                        {driver.vehicle.plate} - {driver.vehicle.make} {driver.vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenance-type">Maintenance Type</Label>
                <Select>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select maintenance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine Service</SelectItem>
                    <SelectItem value="oil">Oil Change</SelectItem>
                    <SelectItem value="tires">Tire Replacement</SelectItem>
                    <SelectItem value="brake">Brake Service</SelectItem>
                    <SelectItem value="engine">Engine Repair</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-date">Schedule Date</Label>
                <Input id="schedule-date" type="date" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes or instructions" className="border-gray-300" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMaintenanceSchedule(false)} className="border-gray-300">
                Cancel
              </Button>
              <Button onClick={() => setShowMaintenanceSchedule(false)} className="bg-slate-900 hover:bg-slate-800">
                Schedule Maintenance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
} 