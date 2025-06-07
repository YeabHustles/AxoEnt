'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
} from '@/components/ui/tooltip';
import { 
  ArrowLeft,
  MapPin,
  Clock,
  Package,
  User,
  Phone,
  Star,
  Truck,
  Navigation,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  MessageSquare,
  Download,
  RefreshCw,
  Eye,
  Route,
  Thermometer,
  Weight,
  Box,
  Shield,
  Timer,
  TrendingUp,
  FileText,
  Camera,
  Share2,
  Bell,
  Settings,
  Activity,
  Copy,
  ExternalLink,
  Zap,
  Wifi,
  WifiOff,
  Home,
  Building2,
  ChevronRight,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  History,
  Calculator,
  MapPinned,
  Gauge,
  Signal,
  Battery,
  Smartphone
} from 'lucide-react';

// Sample detailed request data
const getRequestDetails = (id: string) => {
  const baseRequest = {
    requestId: id,
    status: 'IN_TRANSIT' as const,
    timestamp: '2024-01-15T08:30:00Z',
    pickup: {
      address: 'Bole Atlas, Addis Ababa, Ethiopia',
      coordinates: { lat: 8.9806, lng: 38.7578 },
      etaWindow: { start: '09:00', end: '10:00' },
      contactPerson: 'Bethlehem Tadesse',
      contactPhone: '+251911987654',
      instructions: 'Building entrance on the left side, 3rd floor office',
      actualPickupTime: '2024-01-15T09:15:00Z'
    },
    destination: {
      address: 'Kazanchis Business District, Addis Ababa, Ethiopia',
      coordinates: { lat: 9.0192, lng: 38.7525 },
      contactPerson: 'Dawit Alemayehu',
      contactPhone: '+251911876543',
      instructions: 'Reception desk, ask for Mr. Dawit',
      estimatedDeliveryTime: '2024-01-15T11:30:00Z'
    },
    vehicleTypeRequired: 'Van',
    cargoDetails: {
      type: 'Electronics',
      weightKg: 25.5,
      volumeM3: 0.8,
      fragile: true,
      temperatureSensitive: false,
      description: 'Laptop computers and accessories',
      specialRequirements: ['Handle with care', 'Keep dry', 'Signature required'],
      value: 45000,
      insurance: true
    },
    assignedDriver: {
      driverId: 'DRV-001',
      name: 'Alemayehu Tadesse',
      location: { lat: 8.9856, lng: 38.7489 },
      distanceKm: 2.3,
      rating: 4.8,
      vehicle: {
        type: 'Van',
        plate: 'AA-12345',
        capacityKg: 1000,
        temperatureControl: false,
        model: 'Toyota Hiace 2022',
        color: 'White'
      },
      isAvailable: false,
      score: 0.95,
      phone: '+251911234567',
      avatar: '/avatars/alemayehu.jpg',
      completedDeliveries: 234,
      onTimeRate: 96,
      earnings: 15600,
      joinedDate: '2023-03-15',
      licenseNumber: 'ET-DL-123456',
      emergencyContact: '+251911234568'
    },
    estimatedCost: 450,
    actualCost: 420,
    priority: 'HIGH' as const,
    customerInfo: {
      name: 'Bethlehem Electronics',
      phone: '+251911987654',
      rating: 4.6,
      email: 'info@bethlehemelectronics.com',
      address: 'Bole Atlas, Addis Ababa',
      customerType: 'Business',
      accountManager: 'Sarah Kebede'
    },
    timeline: [
      {
        timestamp: '2024-01-15T08:30:00Z',
        event: 'Request Created',
        description: 'Delivery request submitted by customer',
        status: 'completed',
        actor: 'System'
      },
      {
        timestamp: '2024-01-15T08:35:00Z',
        event: 'Driver Assigned',
        description: 'Alemayehu Tadesse assigned to this delivery',
        status: 'completed',
        actor: 'Auto Assignment Engine'
      },
      {
        timestamp: '2024-01-15T09:15:00Z',
        event: 'Package Picked Up',
        description: 'Package collected from pickup location',
        status: 'completed',
        actor: 'Alemayehu Tadesse'
      },
      {
        timestamp: '2024-01-15T09:45:00Z',
        event: 'In Transit',
        description: 'Package is on the way to destination',
        status: 'current',
        actor: 'Alemayehu Tadesse'
      },
      {
        timestamp: '2024-01-15T11:30:00Z',
        event: 'Estimated Delivery',
        description: 'Expected delivery time',
        status: 'pending',
        actor: 'System'
      }
    ],
    tracking: {
      currentLocation: { lat: 9.0084, lng: 38.7500 },
      speed: 35,
      estimatedArrival: '2024-01-15T11:25:00Z',
      distanceRemaining: 1.2,
      route: [
        { lat: 8.9806, lng: 38.7578, timestamp: '2024-01-15T09:15:00Z' },
        { lat: 8.9856, lng: 38.7489, timestamp: '2024-01-15T09:30:00Z' },
        { lat: 9.0084, lng: 38.7500, timestamp: '2024-01-15T09:45:00Z' }
      ]
    },
    documents: [
      { type: 'Pickup Receipt', url: '/documents/pickup-receipt.pdf', timestamp: '2024-01-15T09:15:00Z' },
      { type: 'Insurance Certificate', url: '/documents/insurance.pdf', timestamp: '2024-01-15T08:30:00Z' }
    ],
    photos: [
      { type: 'Package Photo', url: '/photos/package-1.jpg', timestamp: '2024-01-15T09:15:00Z' },
      { type: 'Pickup Location', url: '/photos/pickup-location.jpg', timestamp: '2024-01-15T09:15:00Z' }
    ],
    notifications: [
      { timestamp: '2024-01-15T09:45:00Z', message: 'Package is on the way', type: 'info' },
      { timestamp: '2024-01-15T09:15:00Z', message: 'Package picked up successfully', type: 'success' },
      { timestamp: '2024-01-15T08:35:00Z', message: 'Driver assigned to your delivery', type: 'info' }
    ]
  };

  return baseRequest;
};

const getStatusConfig = (status: string) => {
  const configs = {
    PENDING_ASSIGNMENT: { 
      label: 'Pending Assignment', 
      className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      icon: Clock,
      color: 'yellow'
    },
    ASSIGNED: { 
      label: 'Assigned', 
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: User,
      color: 'blue'
    },
    IN_TRANSIT: { 
      label: 'In Transit', 
      className: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Truck,
      color: 'purple'
    },
    DELIVERED: { 
      label: 'Delivered', 
      className: 'bg-green-50 text-green-700 border-green-200',
      icon: CheckCircle,
      color: 'green'
    },
    CANCELLED: { 
      label: 'Cancelled', 
      className: 'bg-red-50 text-red-700 border-red-200',
      icon: XCircle,
      color: 'red'
    }
  };
  return configs[status as keyof typeof configs] || configs.PENDING_ASSIGNMENT;
};

const getPriorityConfig = (priority: string) => {
  const configs = {
    LOW: { label: 'Low', className: 'bg-gray-50 text-gray-700 border-gray-200', color: 'gray' },
    MEDIUM: { label: 'Medium', className: 'bg-blue-50 text-blue-700 border-blue-200', color: 'blue' },
    HIGH: { label: 'High', className: 'bg-orange-50 text-orange-700 border-orange-200', color: 'orange' },
    URGENT: { label: 'Urgent', className: 'bg-red-50 text-red-700 border-red-200', color: 'red' }
  };
  return configs[priority as keyof typeof configs] || configs.LOW;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDateTime = (dateString: string) => {
  return new Intl.DateTimeFormat('en-ET', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};

const formatTime = (dateString: string) => {
  return new Intl.DateTimeFormat('en-ET', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};

const getProgressPercentage = (status: string) => {
  const progressMap = {
    PENDING_ASSIGNMENT: 10,
    ASSIGNED: 25,
    IN_TRANSIT: 60,
    DELIVERED: 100,
    CANCELLED: 0
  };
  return progressMap[status as keyof typeof progressMap] || 0;
};

export default function RequestDetailPage() {
  const params = useParams();
  const requestId = params.id as string;
  const [request, setRequest] = useState(getRequestDetails(requestId));
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCostCalculator, setShowCostCalculator] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const statusConfig = getStatusConfig(request.status);
  const priorityConfig = getPriorityConfig(request.priority);
  const StatusIcon = statusConfig.icon;
  const progress = getProgressPercentage(request.status);

  // Real-time updates simulation
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Simulate real-time updates
      setRequest(prev => ({
        ...prev,
        tracking: {
          ...prev.tracking,
          currentLocation: {
            lat: prev.tracking.currentLocation.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.tracking.currentLocation.lng + (Math.random() - 0.5) * 0.001
          },
          speed: Math.max(0, prev.tracking.speed + (Math.random() - 0.5) * 10),
          distanceRemaining: Math.max(0, prev.tracking.distanceRemaining - 0.1)
        }
      }));
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Connection status simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(Math.random() > 0.1); // 90% uptime
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRequest(getRequestDetails(requestId));
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleCopyRequestId = () => {
    navigator.clipboard.writeText(request.requestId);
    // Add toast notification here
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const calculateETA = () => {
    const speed = request.tracking.speed;
    const distance = request.tracking.distanceRemaining;
    if (speed > 0) {
      const hours = distance / speed;
      const minutes = Math.round(hours * 60);
      return `${minutes} min`;
    }
    return 'Calculating...';
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
                  <BreadcrumbLink href="/logistics/requests">Requests</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{request.requestId}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href="/logistics/requests">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Requests
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-gray-900">{request.requestId}</h1>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleCopyRequestId}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy Request ID</TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Delivery Request Details</span>
                      <div className="flex items-center gap-1">
                        {isConnected ? (
                          <Wifi className="w-3 h-3 text-green-500" />
                        ) : (
                          <WifiOff className="w-3 h-3 text-red-500" />
                        )}
                        <span className="text-xs">
                          {isConnected ? 'Live' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Connection Status */}
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-gray-600">
                    Updated {formatTime(lastUpdated.toISOString())}
                  </span>
                </div>

                {/* Auto Refresh Toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={`gap-2 ${autoRefresh ? 'bg-green-50 border-green-200' : ''}`}
                    >
                      <Zap className={`w-4 h-4 ${autoRefresh ? 'text-green-600' : 'text-gray-400'}`} />
                      Auto
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
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>

                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>

                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleFullscreen}
                      className="gap-2"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isFullscreen ? 'Exit' : 'Enter'} fullscreen
                  </TooltipContent>
                </Tooltip>

                <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Enhanced Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Card with Real-time Updates */}
            <Card className="lg:col-span-2 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <StatusIcon className={`w-6 h-6 text-${statusConfig.color}-600`} />
                    Request Status
                    {request.status === 'IN_TRANSIT' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
                        <Signal className="w-3 h-3 mr-1" />
                        Live Tracking
                      </Badge>
                    )}
                  </CardTitle>
                  <Badge variant="outline" className={statusConfig.className}>
                    {statusConfig.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  <div>
                    <div className="text-sm text-gray-600">Created</div>
                    <div className="font-medium">{formatDateTime(request.timestamp)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Priority</div>
                    <Badge variant="outline" className={priorityConfig.className}>
                      {priorityConfig.label}
                    </Badge>
                  </div>
                  {request.status === 'IN_TRANSIT' && (
                    <>
                      <div>
                        <div className="text-sm text-gray-600">ETA</div>
                        <div className="font-medium text-green-600">{calculateETA()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Speed</div>
                        <div className="font-medium">{Math.round(request.tracking.speed)} km/h</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Real-time metrics for in-transit requests */}
                {request.status === 'IN_TRANSIT' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-blue-700">Live Updates</span>
                      </div>
                      <div className="text-xs text-blue-600">
                        {request.tracking.distanceRemaining.toFixed(1)} km remaining
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {request.assignedDriver && (
                  <>
                    <Button className="w-full gap-2" variant="outline">
                      <Phone className="w-4 h-4" />
                      Call Driver
                      <Badge variant="secondary" className="ml-auto">
                        {request.assignedDriver.phone}
                      </Badge>
                    </Button>
                    <Button className="w-full gap-2" variant="outline">
                      <MessageSquare className="w-4 h-4" />
                      Send Message
                    </Button>
                  </>
                )}
                
                <Button className="w-full gap-2" variant="outline" asChild>
                  <Link href={`/logistics/tracking?id=${request.requestId}`}>
                    <Eye className="w-4 h-4" />
                    Live Tracking
                    {request.status === 'IN_TRANSIT' && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto" />
                    )}
                  </Link>
                </Button>

                <Button 
                  className="w-full gap-2" 
                  variant="outline"
                  onClick={() => setShowCostCalculator(true)}
                >
                  <Calculator className="w-4 h-4" />
                  Cost Calculator
                </Button>

                <Button className="w-full gap-2" variant="outline">
                  <History className="w-4 h-4" />
                  View History
                </Button>

                <Separator />
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2 text-red-600 hover:text-red-700">
                      <XCircle className="w-4 h-4" />
                      Cancel Request
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Request</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this delivery request? This action cannot be undone and may incur cancellation fees.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Yes, Cancel Request
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Route Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Route className="w-5 h-5" />
                      Route Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Pickup */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="font-medium text-green-700">Pickup Location</span>
                      </div>
                      <div className="ml-5 space-y-2">
                        <div className="text-sm font-medium">{request.pickup.address}</div>
                        <div className="text-xs text-gray-600">
                          Contact: {request.pickup.contactPerson} ({request.pickup.contactPhone})
                        </div>
                        <div className="text-xs text-gray-600">
                          Window: {request.pickup.etaWindow.start} - {request.pickup.etaWindow.end}
                        </div>
                        {request.pickup.actualPickupTime && (
                          <div className="text-xs text-green-600 font-medium">
                            ✓ Picked up at {formatTime(request.pickup.actualPickupTime)}
                          </div>
                        )}
                        {request.pickup.instructions && (
                          <div className="text-xs text-gray-600 italic">
                            Instructions: {request.pickup.instructions}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="w-px h-8 bg-gray-300" />
                    </div>

                    {/* Destination */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="font-medium text-red-700">Destination</span>
                      </div>
                      <div className="ml-5 space-y-2">
                        <div className="text-sm font-medium">{request.destination.address}</div>
                        <div className="text-xs text-gray-600">
                          Contact: {request.destination.contactPerson} ({request.destination.contactPhone})
                        </div>
                        <div className="text-xs text-gray-600">
                          ETA: {formatTime(request.destination.estimatedDeliveryTime)}
                        </div>
                        {request.destination.instructions && (
                          <div className="text-xs text-gray-600 italic">
                            Instructions: {request.destination.instructions}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cargo Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Box className="w-5 h-5" />
                      Cargo Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Type</div>
                        <div className="font-medium">{request.cargoDetails.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Value</div>
                        <div className="font-medium">{formatCurrency(request.cargoDetails.value)}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Weight className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-600">Weight</div>
                          <div className="font-medium">{request.cargoDetails.weightKg} kg</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-600">Volume</div>
                          <div className="font-medium">{request.cargoDetails.volumeM3} m³</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Special Requirements</div>
                      <div className="flex flex-wrap gap-2">
                        {request.cargoDetails.fragile && (
                          <Badge variant="outline" className="gap-1">
                            <Shield className="w-3 h-3" />
                            Fragile
                          </Badge>
                        )}
                        {request.cargoDetails.temperatureSensitive && (
                          <Badge variant="outline" className="gap-1">
                            <Thermometer className="w-3 h-3" />
                            Temperature Sensitive
                          </Badge>
                        )}
                        {request.cargoDetails.insurance && (
                          <Badge variant="outline" className="gap-1">
                            <Shield className="w-3 h-3" />
                            Insured
                          </Badge>
                        )}
                      </div>
                    </div>

                    {request.cargoDetails.description && (
                      <div>
                        <div className="text-sm text-gray-600">Description</div>
                        <div className="text-sm">{request.cargoDetails.description}</div>
                      </div>
                    )}

                    {request.cargoDetails.specialRequirements && (
                      <div>
                        <div className="text-sm text-gray-600">Special Requirements</div>
                        <ul className="text-sm space-y-1">
                          {request.cargoDetails.specialRequirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-gray-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Driver and Customer Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Driver Information */}
                {request.assignedDriver && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Assigned Driver
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={request.assignedDriver.avatar} />
                          <AvatarFallback className="text-lg bg-slate-100 text-slate-700 font-semibold">
                            {request.assignedDriver.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-semibold text-lg">{request.assignedDriver.name}</div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{request.assignedDriver.rating}</span>
                            <span className="text-sm text-gray-600">
                              ({request.assignedDriver.completedDeliveries} deliveries)
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            On-time rate: {request.assignedDriver.onTimeRate}%
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Phone</div>
                          <div className="font-medium">{request.assignedDriver.phone}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">License</div>
                          <div className="font-medium">{request.assignedDriver.licenseNumber}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">Vehicle Information</div>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Model:</span>
                            <span className="text-sm font-medium">{request.assignedDriver.vehicle.model}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Plate:</span>
                            <span className="text-sm font-medium">{request.assignedDriver.vehicle.plate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Capacity:</span>
                            <span className="text-sm font-medium">{request.assignedDriver.vehicle.capacityKg} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Color:</span>
                            <span className="text-sm font-medium">{request.assignedDriver.vehicle.color}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 gap-2">
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-lg">{request.customerInfo.name}</div>
                        <div className="text-sm text-gray-600">{request.customerInfo.customerType} Customer</div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{request.customerInfo.rating}</span>
                        <span className="text-sm text-gray-600">Customer Rating</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Phone</div>
                        <div className="font-medium">{request.customerInfo.phone}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="font-medium">{request.customerInfo.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Address</div>
                        <div className="font-medium">{request.customerInfo.address}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Account Manager</div>
                        <div className="font-medium">{request.customerInfo.accountManager}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gap-2">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cost Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cost Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(request.estimatedCost)}
                      </div>
                      <div className="text-sm text-blue-600">Estimated Cost</div>
                    </div>
                    {request.actualCost && (
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(request.actualCost)}
                        </div>
                        <div className="text-sm text-green-600">Actual Cost</div>
                      </div>
                    )}
                    {request.actualCost && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">
                          {formatCurrency(request.estimatedCost - request.actualCost)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {request.actualCost < request.estimatedCost ? 'Savings' : 'Overage'}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tracking Tab */}
            <TabsContent value="tracking" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Enhanced Map Section */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Navigation className="w-5 h-5" />
                        Live Tracking
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Signal className="w-3 h-3 mr-1" />
                          GPS Active
                        </Badge>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Enhanced Mock Map */}
                    <div className="relative h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-bounce" />
                          <div className="text-gray-700 font-medium">Interactive Map View</div>
                          <div className="text-sm text-gray-500">Real-time driver location and route</div>
                          <div className="mt-2 text-xs text-gray-400">
                            Lat: {request.tracking.currentLocation.lat.toFixed(4)}, 
                            Lng: {request.tracking.currentLocation.lng.toFixed(4)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Simulated route line */}
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-blue-400 transform rotate-45"></div>
                      
                      {/* Pickup point */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                      
                      {/* Current location */}
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      
                      {/* Destination */}
                      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>

                    {/* Real-time Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Gauge className="w-4 h-4 text-purple-600" />
                          <div className="text-lg font-bold text-purple-600">
                            {Math.round(request.tracking.speed)}
                          </div>
                        </div>
                        <div className="text-xs text-purple-600">km/h</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <MapPinned className="w-4 h-4 text-blue-600" />
                          <div className="text-lg font-bold text-blue-600">
                            {request.tracking.distanceRemaining.toFixed(1)}
                          </div>
                        </div>
                        <div className="text-xs text-blue-600">km left</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Timer className="w-4 h-4 text-green-600" />
                          <div className="text-lg font-bold text-green-600">
                            {calculateETA()}
                          </div>
                        </div>
                        <div className="text-xs text-green-600">ETA</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Battery className="w-4 h-4 text-orange-600" />
                          <div className="text-lg font-bold text-orange-600">98%</div>
                        </div>
                        <div className="text-xs text-orange-600">GPS Signal</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Driver Communication Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Driver Communication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {request.assignedDriver && (
                      <>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={request.assignedDriver.avatar} />
                            <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold">
                              {request.assignedDriver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{request.assignedDriver.name}</div>
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              Online
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{request.assignedDriver.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full gap-2" size="sm">
                            <Phone className="w-4 h-4" />
                            Call Driver
                          </Button>
                          <Button className="w-full gap-2" variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4" />
                            Send Message
                          </Button>
                        </div>

                        <Separator />

                        {/* Quick Messages */}
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Quick Messages</div>
                          <div className="space-y-1">
                            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                              "What's your ETA?"
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                              "Please handle with care"
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                              "Call when you arrive"
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Route History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Route History & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Route Points */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        GPS Tracking Points
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {request.tracking.route.map((point, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-mono">
                                {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDateTime(point.timestamp)}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              #{index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Route Analytics */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Route Analytics
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm text-blue-600">Average Speed</div>
                            <div className="text-lg font-bold text-blue-700">32 km/h</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-sm text-green-600">Distance Covered</div>
                            <div className="text-lg font-bold text-green-700">8.2 km</div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-2">Route Efficiency</div>
                          <div className="flex items-center gap-2">
                            <Progress value={85} className="flex-1 h-2" />
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Optimal route with minimal detours
                          </div>
                        </div>

                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <div className="text-sm font-medium text-yellow-700">Traffic Alert</div>
                          </div>
                          <div className="text-xs text-yellow-600">
                            Moderate traffic detected on Bole Road. ETA may increase by 5-10 minutes.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Delivery Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {request.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            event.status === 'completed' ? 'bg-green-500' :
                            event.status === 'current' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`} />
                          {index < request.timeline.length - 1 && (
                            <div className="w-px h-12 bg-gray-200 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{event.event}</div>
                            <div className="text-sm text-gray-500">
                              {formatDateTime(event.timestamp)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {event.description}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            by {event.actor}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {request.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{doc.type}</div>
                            <div className="text-sm text-gray-500">
                              {formatDateTime(doc.timestamp)}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Photos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Photos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {request.photos.map((photo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Camera className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{photo.type}</div>
                            <div className="text-sm text-gray-500">
                              {formatDateTime(photo.timestamp)}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Chat */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Live Chat
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                        Online
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Chat Messages */}
                    <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={request.assignedDriver?.avatar} />
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                            {request.assignedDriver?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            <div className="text-sm">Package picked up successfully. On my way to destination.</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {request.assignedDriver?.name} • 15 min ago
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="flex-1 max-w-xs">
                          <div className="bg-blue-500 text-white p-2 rounded-lg">
                            <div className="text-sm">Great! Please handle with care as it's fragile.</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 text-right">
                            You • 14 min ago
                          </div>
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-gray-100 text-gray-700">
                            You
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={request.assignedDriver?.avatar} />
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                            {request.assignedDriver?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            <div className="text-sm">Understood. I'll be extra careful. ETA is 25 minutes.</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {request.assignedDriver?.name} • 12 min ago
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center py-2">
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                          <span className="ml-2">{request.assignedDriver?.name} is typing...</span>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button size="sm" className="px-4">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        📍 Share Location
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        📞 Request Call
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        ⏰ Update ETA
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Center */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Center
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        3 New
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {/* System Notifications */}
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-green-800">Package Picked Up</div>
                            <div className="text-xs text-green-600 mt-1">
                              Driver has successfully collected the package from pickup location.
                            </div>
                            <div className="text-xs text-green-500 mt-2">
                              {formatDateTime('2024-01-15T09:15:00Z')}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Navigation className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-blue-800">Route Update</div>
                            <div className="text-xs text-blue-600 mt-1">
                              Driver is taking an alternate route due to traffic congestion.
                            </div>
                            <div className="text-xs text-blue-500 mt-2">
                              {formatDateTime('2024-01-15T09:30:00Z')}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-yellow-800">Delivery Delay</div>
                            <div className="text-xs text-yellow-600 mt-1">
                              ETA updated to 11:45 AM due to traffic conditions.
                            </div>
                            <div className="text-xs text-yellow-500 mt-2">
                              {formatDateTime('2024-01-15T09:45:00Z')}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-purple-800">New Message</div>
                            <div className="text-xs text-purple-600 mt-1">
                              Driver sent a message about package handling.
                            </div>
                            <div className="text-xs text-purple-500 mt-2">
                              {formatDateTime('2024-01-15T09:50:00Z')}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">Driver Assigned</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {request.assignedDriver?.name} has been assigned to this delivery.
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              {formatDateTime('2024-01-15T08:35:00Z')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-700">Notification Preferences</div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          SMS notifications
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          Email updates
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          Push notifications
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          WhatsApp updates
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Communication Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Communication Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-blue-600">Messages Sent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-green-600">Messages Received</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2</div>
                      <div className="text-sm text-purple-600">Phone Calls</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">95%</div>
                      <div className="text-sm text-orange-600">Response Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
} 