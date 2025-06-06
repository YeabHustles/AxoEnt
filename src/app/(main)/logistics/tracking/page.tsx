'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Home, 
  Calendar, 
  MapPin, 
  Clock, 
  Truck, 
  User, 
  Phone, 
  Mail, 
  Navigation, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  MoreHorizontal, 
  Filter, 
  Search, 
  Download, 
  Share, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  RefreshCw, 
  Settings, 
  HelpCircle, 
  Info, 
  AlertCircle, 
  Bell, 
  BellOff, 
  Star, 
  Heart, 
  Bookmark, 
  Flag, 
  Tag, 
  Paperclip, 
  ExternalLink, 
  Copy, 
  FileText, 
  Image, 
  Video, 
  Mic,
  Sparkles, 
  Waves, 
  Radar, 
  Radio, 
  ZoomIn,
  ZoomOut, 
  Layers,
  MapIcon,
  Target,
  Timer,
  Route,
  BarChart3,
  PieChart,
  Gauge,
  Fuel,
  Battery,
  Thermometer,
  MessageCircle,
  Package,
  Box,
  Weight,
  DollarSign,
  Shield,
  Signal,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Satellite,
  Play,
  Pause
} from 'lucide-react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow, Polyline } from '@react-google-maps/api';

// Enhanced tracking data with more comprehensive information
const trackingData = {
  requestId: "REQ-983473",
  status: "IN_TRANSIT",
  priority: "HIGH",
  estimatedValue: 25000,
  currentLocation: {
    lat: 8.9785,
    lng: 38.7850,
    address: "Near Bole Medhanialem Church, Addis Ababa",
    accuracy: 5,
    lastUpdate: "2025-05-28T13:45:00Z"
  },
  driver: {
    id: "DRV-001",
    name: "Amanuel Kebede",
    phone: "+251911234567",
    rating: 4.9,
    totalDeliveries: 1247,
    avatar: "",
    status: "ACTIVE",
    vehicle: {
      type: "Van",
      plate: "AA1234",
      color: "White",
      make: "Toyota",
      model: "Hiace",
      year: 2022,
      fuelLevel: 75,
      batteryLevel: 95,
      temperature: 22,
      mileage: 45230
    },
    performance: {
      onTimeDeliveries: 98.5,
      customerRating: 4.9,
      avgDeliveryTime: 28,
      completionRate: 99.2
    }
  },
  route: {
    pickup: {
      address: "Bole International Airport, Addis Ababa, Ethiopia",
      coordinates: { lat: 8.9776, lng: 38.7991 },
      completedAt: "2025-05-28T13:15:00Z",
      contactPerson: "John Smith",
      contactPhone: "+251911111111"
    },
    destination: {
      address: "Gabon Street, Addis Ababa, Ethiopia",
      coordinates: { lat: 8.9807, lng: 38.7578 },
      contactPerson: "Sarah Johnson",
      contactPhone: "+251922222222"
    },
    estimatedArrival: "2025-05-28T14:30:00Z",
    actualDistance: "12.5 km",
    plannedDistance: "11.8 km",
    duration: "25 mins",
    trafficDelay: 3,
    alternativeRoutes: 2,
    waypoints: [
      { lat: 8.9780, lng: 38.7900, name: "Checkpoint 1", passed: true },
      { lat: 8.9790, lng: 38.7800, name: "Checkpoint 2", passed: true },
      { lat: 8.9800, lng: 38.7700, name: "Checkpoint 3", passed: false }
    ]
  },
  cargo: {
    type: "Electronics",
    category: "High-Value",
    weightKg: 120,
    volumeM3: 1.5,
    fragile: true,
    temperatureSensitive: false,
    hazardous: false,
    insured: true,
    insuranceValue: 25000,
    description: "High-value electronic equipment requiring careful handling",
    items: [
      { name: "Laptop Computers", quantity: 10, value: 15000 },
      { name: "Tablets", quantity: 5, value: 7500 },
      { name: "Accessories", quantity: 1, value: 2500 }
    ],
    specialInstructions: "Handle with extreme care. Keep upright at all times.",
    packaging: "Original manufacturer packaging with foam inserts"
  },
  timeline: [
    {
      status: "REQUEST_CREATED",
      timestamp: "2025-05-28T12:44:01Z",
      description: "Delivery request created",
      completed: true,
      location: "System",
      details: "Request submitted by customer portal"
    },
    {
      status: "DRIVER_ASSIGNED",
      timestamp: "2025-05-28T12:50:00Z",
      description: "Driver Amanuel Kebede assigned",
      completed: true,
      location: "Dispatch Center",
      details: "Auto-assigned based on proximity and availability"
    },
    {
      status: "PICKUP_STARTED",
      timestamp: "2025-05-28T13:00:00Z",
      description: "Driver en route to pickup location",
      completed: true,
      location: "Driver Location",
      details: "Driver departed from previous location"
    },
    {
      status: "PICKUP_COMPLETED",
      timestamp: "2025-05-28T13:15:00Z",
      description: "Package picked up successfully",
      completed: true,
      location: "Bole International Airport",
      details: "Package verified and loaded. Signature obtained."
    },
    {
      status: "IN_TRANSIT",
      timestamp: "2025-05-28T13:20:00Z",
      description: "Package in transit to destination",
      completed: true,
      current: true,
      location: "En Route",
      details: "Following optimal route with real-time traffic updates"
    },
    {
      status: "DELIVERY_STARTED",
      timestamp: null,
      description: "Arrived at destination",
      completed: false,
      location: "Gabon Street",
      details: "Driver will contact recipient upon arrival"
    },
    {
      status: "DELIVERED",
      timestamp: null,
      description: "Package delivered successfully",
      completed: false,
      location: "Destination",
      details: "Delivery confirmation and signature required"
    }
  ],
  liveUpdates: [
    {
      id: 1,
      timestamp: "2025-05-28T13:45:00Z",
      message: "Driver is 5 minutes away from destination",
      type: "info",
      priority: "medium",
      category: "ETA_UPDATE"
    },
    {
      id: 2,
      timestamp: "2025-05-28T13:40:00Z",
      message: "Package temperature maintained at optimal level (22°C)",
      type: "success",
      priority: "low",
      category: "CONDITION_UPDATE"
    },
    {
      id: 3,
      timestamp: "2025-05-28T13:35:00Z",
      message: "Driver took alternative route due to traffic congestion",
      type: "warning",
      priority: "medium",
      category: "ROUTE_CHANGE"
    },
    {
      id: 4,
      timestamp: "2025-05-28T13:30:00Z",
      message: "Vehicle fuel level at 75% - sufficient for delivery",
      type: "info",
      priority: "low",
      category: "VEHICLE_STATUS"
    },
    {
      id: 5,
      timestamp: "2025-05-28T13:25:00Z",
      message: "GPS signal strength: Excellent (4 bars)",
      type: "success",
      priority: "low",
      category: "SYSTEM_STATUS"
    }
  ],
  analytics: {
    totalDistance: 12.5,
    avgSpeed: 35,
    maxSpeed: 65,
    idleTime: 2,
    fuelConsumption: 1.2,
    co2Emissions: 2.8,
    trafficScore: 7.5,
    routeEfficiency: 94.2,
    customerSatisfaction: 4.8
  },
  alerts: [
    {
      id: 1,
      type: "warning",
      title: "Traffic Delay",
      message: "Moderate traffic detected on current route",
      timestamp: "2025-05-28T13:35:00Z",
      resolved: false
    },
    {
      id: 2,
      type: "info",
      title: "Weather Update",
      message: "Clear weather conditions for remainder of journey",
      timestamp: "2025-05-28T13:30:00Z",
      resolved: true
    }
  ]
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export default function AdvancedTrackingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLiveTracking, setIsLiveTracking] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapView, setMapView] = useState('street');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [notifications, setNotifications] = useState(trackingData.liveUpdates);
  const mapRef = useRef<HTMLDivElement>(null);

  // Google Maps Configuration
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCrUdJaAHlJJMmu75Qtk97zTGq8E_0A-PA';
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Map configuration
  const mapContainerStyle = {
    width: '100%',
    height: isFullscreen ? '100vh' : '700px'
  };

  const defaultCenter = {
    lat: 9.0192, // Addis Ababa coordinates
    lng: 38.7525
  };

  // Convert tracking data coordinates to Google Maps format
  const pickupLocation = {
    lat: 9.0192,
    lng: 38.7525
  };

  const currentLocation = {
    lat: 9.0300, // Slightly different for demo
    lng: 38.7600
  };

  const destinationLocation = {
    lat: 9.0500,
    lng: 38.7800
  };

  // Map options based on view type
  const getMapOptions = useCallback(() => {
    if (!googleMapsLoaded) return {};
    
    const baseOptions: google.maps.MapOptions = {
      zoom: 13,
      center: currentLocation,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: false,
      styles: mapView === 'street' ? [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ] : undefined
    };

    switch (mapView) {
      case 'satellite':
        return { ...baseOptions, mapTypeId: 'satellite' };
      case 'hybrid':
        return { ...baseOptions, mapTypeId: 'hybrid' };
      default:
        return { ...baseOptions, mapTypeId: 'roadmap' };
    }
  }, [mapView, currentLocation, googleMapsLoaded]);

  // Handle Google Maps script load
  const onGoogleMapsLoad = useCallback(() => {
    setGoogleMapsLoaded(true);
  }, []);

  // Handle Google Maps script error
  const onGoogleMapsError = useCallback((error: Error) => {
    console.error('Google Maps failed to load:', error);
    setGoogleMapsLoaded(false);
  }, []);

  // Initialize directions service
  const onMapLoad = useCallback((map: google.maps.Map) => {
    if (!googleMapsLoaded) return;
    
    setMap(map);
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#3B82F6',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    });
    
    setDirectionsService(directionsService);
    setDirectionsRenderer(directionsRenderer);
    directionsRenderer.setMap(map);
    setMapLoaded(true);
  }, [googleMapsLoaded]);

  // Calculate and display route
  useEffect(() => {
    if (directionsService && directionsRenderer && mapLoaded && googleMapsLoaded) {
      directionsService.route(
        {
          origin: pickupLocation,
          destination: destinationLocation,
          waypoints: [{ location: currentLocation, stopover: true }],
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
            directionsRenderer.setDirections(result);
          }
        }
      );
    }
  }, [directionsService, directionsRenderer, mapLoaded, googleMapsLoaded, pickupLocation, currentLocation, destinationLocation]);

  // Update map center when current location changes
  useEffect(() => {
    if (map && googleMapsLoaded) {
      map.panTo(currentLocation);
    }
  }, [map, currentLocation, googleMapsLoaded]);

  // Simulate real-time location updates
  useEffect(() => {
    if (isLiveTracking && autoRefresh) {
      const interval = setInterval(() => {
        // Simulate slight movement for demo purposes
        const newLat = currentLocation.lat + (Math.random() - 0.5) * 0.001;
        const newLng = currentLocation.lng + (Math.random() - 0.5) * 0.001;
        
        // Update the current location (in a real app, this would come from GPS)
        // For demo purposes, we'll just update the timestamp
        setLastUpdate(new Date());
        
        // Update map center to follow the vehicle
        if (map && googleMapsLoaded) {
          map.panTo({ lat: newLat, lng: newLng });
        }
        
        // Simulate new notifications
        if (Math.random() > 0.7) {
          const newNotification = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            message: "Location updated - driver maintaining optimal speed",
            type: "info" as const,
            priority: "low" as const,
            category: "LOCATION_UPDATE" as const
          };
          setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
        }
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [isLiveTracking, autoRefresh, refreshInterval, map, currentLocation, googleMapsLoaded]);

  const completedSteps = trackingData.timeline.filter(step => step.completed).length;
  const totalSteps = trackingData.timeline.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  // Helper function to safely create marker icons
  const createMarkerIcon = useCallback((svgContent: string, width: number, height: number) => {
    if (!googleMapsLoaded || typeof google === 'undefined') {
      return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgContent)
      };
    }
    
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgContent),
      scaledSize: new google.maps.Size(width, height),
      anchor: new google.maps.Point(width / 2, height / 2)
    };
  }, [googleMapsLoaded]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Map control functions
  const zoomIn = () => {
    if (map && googleMapsLoaded) {
      const currentZoom = map.getZoom() || 13;
      map.setZoom(currentZoom + 1);
    }
  };

  const zoomOut = () => {
    if (map && googleMapsLoaded) {
      const currentZoom = map.getZoom() || 13;
      map.setZoom(currentZoom - 1);
    }
  };

  const centerOnCurrentLocation = () => {
    if (map && googleMapsLoaded) {
      map.panTo(currentLocation);
      map.setZoom(15);
    }
  };

  const toggleTrafficLayer = () => {
    if (map && googleMapsLoaded) {
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Modern Dark Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {/* Enhanced Breadcrumb */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/logistics" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <div className="p-1.5 bg-gray-100 rounded-lg">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    Logistics
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 font-medium">Live Tracking</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  {/* Modern Icon Container */}
                  <div className="relative">
                    <div className="p-4 bg-gray-900 rounded-xl shadow-lg">
                      <MapPin className="w-7 h-7 text-white" />
                  </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Live Tracking
                      </h1>
                      {/* Enhanced Live Indicator */}
                      <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                        <div className="relative">
                          <div className={`w-3 h-3 rounded-full ${isLiveTracking ? 'bg-green-500' : 'bg-red-500'}`} />
                          {isLiveTracking && (
                            <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {isLiveTracking ? 'Live Tracking' : 'Offline'}
                        </span>
                        <Radio className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Request ID:</span>
                        <code className="px-2 py-1 bg-gray-100 rounded-md text-sm font-mono text-gray-800">
                          {trackingData.requestId}
                        </code>
                      </div>
                      <Badge 
                        variant={trackingData.priority === 'HIGH' ? 'destructive' : 'secondary'} 
                        className="px-3 py-1 text-xs font-medium"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {trackingData.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {soundEnabled ? 'Disable' : 'Enable'} sound notifications
                  </TooltipContent>
                </Tooltip>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  <Share className="w-4 h-4" />
                  Share
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Tracking Settings
                      </DialogTitle>
                      <DialogDescription>
                        Configure your live tracking preferences
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="space-y-1">
                          <Label htmlFor="auto-refresh" className="font-medium">Auto Refresh</Label>
                          <p className="text-sm text-gray-600">Automatically update tracking data</p>
                        </div>
                        <Switch
                          id="auto-refresh"
                          checked={autoRefresh}
                          onCheckedChange={setAutoRefresh}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="refresh-interval" className="font-medium">Refresh Interval</Label>
                        <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(Number(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">1 minute</SelectItem>
                            <SelectItem value="300">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="space-y-1">
                          <Label htmlFor="sound-notifications" className="font-medium">Sound Notifications</Label>
                          <p className="text-sm text-gray-600">Play sounds for important updates</p>
                        </div>
                        <Switch
                          id="sound-notifications"
                          checked={soundEnabled}
                          onCheckedChange={setSoundEnabled}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Modern Status Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">Current Status</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">In Transit</p>
                    <div className="flex items-center gap-3">
                      <Progress value={progressPercentage} className="h-2 flex-1" />
                      <span className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <Truck className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">ETA</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatTime(trackingData.route.estimatedArrival)}</p>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <ArrowUp className="w-3 h-3" />
                      <span>On time</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Route className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">Distance</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{trackingData.route.actualDistance}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Target className="w-3 h-3" />
                      <span>94% efficient</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <Route className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">Live Updates</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Radio className="w-3 h-3" />
                      <span>Last: {formatTime(lastUpdate.toISOString())}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <Bell className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Tabs with Modern Design */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
              <TabsList className="grid w-full grid-cols-5 bg-transparent gap-2">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="map" 
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 hover:bg-gray-50"
                >
                  <MapIcon className="w-4 h-4 mr-2" />
                  Live Map
                </TabsTrigger>
                <TabsTrigger 
                  value="timeline" 
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 hover:bg-gray-50"
                >
                  <Timer className="w-4 h-4 mr-2" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 hover:bg-gray-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="updates" 
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 hover:bg-gray-50"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Live Updates
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Enhanced Driver Information Card */}
                <Card className="group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gray-900 rounded-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      Driver Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <Avatar className="w-16 h-16 border-2 border-gray-200 shadow-sm">
                        <AvatarImage src={trackingData.driver.avatar} />
                          <AvatarFallback className="bg-gray-900 text-white text-lg font-bold">
                          {trackingData.driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{trackingData.driver.name}</h3>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                            {trackingData.driver.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">{trackingData.driver.rating}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{trackingData.driver.totalDeliveries} deliveries</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          {trackingData.driver.vehicle.color} {trackingData.driver.vehicle.make} {trackingData.driver.vehicle.model} • {trackingData.driver.vehicle.plate}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced Vehicle Status */}
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        Vehicle Status
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Fuel className="w-4 h-4 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Fuel</span>
                        </div>
                          <div className="text-lg font-bold text-gray-900">{trackingData.driver.vehicle.fuelLevel}%</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Battery className="w-4 h-4 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Battery</span>
                        </div>
                          <div className="text-lg font-bold text-gray-900">{trackingData.driver.vehicle.batteryLevel}%</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Thermometer className="w-4 h-4 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Temperature</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">{trackingData.driver.vehicle.temperature}°C</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Gauge className="w-4 h-4 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Mileage</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">{trackingData.driver.vehicle.mileage.toLocaleString()} km</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1 bg-gray-900 hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Driver
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Package Details Card */}
                <Card className="group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gray-900 rounded-lg">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      Package Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Package Overview */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Box className="w-4 h-4 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Category</span>
                          </div>
                          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 font-medium">
                          {trackingData.cargo.category}
                        </Badge>
                      </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Package className="w-4 h-4 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Type</span>
                      </div>
                          <span className="text-sm font-bold text-gray-900">{trackingData.cargo.type}</span>
                      </div>
                      </div>

                      {/* Physical Properties */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Weight className="w-4 h-4" />
                          Physical Properties
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <Weight className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">{trackingData.cargo.weightKg}</div>
                            <div className="text-xs text-gray-600">kg</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <Box className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">{trackingData.cargo.volumeM3}</div>
                            <div className="text-xs text-gray-600">m³</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <DollarSign className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">{trackingData.cargo.insuranceValue.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">ETB</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Special Requirements */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Special Requirements
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {trackingData.cargo.fragile && (
                            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200 font-medium px-3 py-1">
                              <Shield className="w-3 h-3 mr-1" />
                              Fragile
                            </Badge>
                          )}
                          {trackingData.cargo.insured && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 font-medium px-3 py-1">
                              <Shield className="w-3 h-3 mr-1" />
                              Insured
                            </Badge>
                          )}
                          {trackingData.cargo.temperatureSensitive && (
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200 font-medium px-3 py-1">
                              <Thermometer className="w-3 h-3 mr-1" />
                              Temperature Control
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Items Breakdown */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Items Breakdown
                        </h4>
                        <div className="space-y-3">
                          {trackingData.cargo.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Package className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-xs text-gray-600">Quantity: {item.quantity}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-gray-900">ETB {item.value.toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Description
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed">{trackingData.cargo.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Route Information Card */}
                <Card className="group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gray-900 rounded-lg">
                        <Route className="w-5 h-5 text-white" />
                      </div>
                      Route Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Route Timeline */}
                      <div className="relative">
                      {/* Pickup Location */}
                        <div className="flex items-start gap-4 pb-6">
                          <div className="relative flex flex-col items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm z-10"></div>
                            <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
                          </div>
                          <div className="flex-1 pt-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-gray-900">Pickup Location</span>
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 font-medium">
                                <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                            <p className="text-sm text-gray-700 mb-2">{trackingData.route.pickup.address}</p>
                            <div className="grid grid-cols-1 gap-1 text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <User className="w-3 h-3" />
                                <span>Contact: {trackingData.route.pickup.contactPerson}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>Completed: {formatDateTime(trackingData.route.pickup.completedAt)}</span>
                              </div>
                            </div>
                        </div>
                      </div>

                      {/* Current Location */}
                        <div className="flex items-start gap-4 pb-6">
                          <div className="relative flex flex-col items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm z-10 animate-pulse"></div>
                            <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
                          </div>
                          <div className="flex-1 pt-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-gray-900">Current Location</span>
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 font-medium">
                                <Radio className="w-3 h-3 mr-1" />
                            Live
                          </Badge>
                        </div>
                            <p className="text-sm text-gray-700 mb-2">{trackingData.currentLocation.address}</p>
                            <div className="grid grid-cols-1 gap-1 text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <Target className="w-3 h-3" />
                                <span>Accuracy: ±{trackingData.currentLocation.accuracy}m</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>Updated: {formatTime(trackingData.currentLocation.lastUpdate)}</span>
                              </div>
                            </div>
                        </div>
                      </div>

                      {/* Destination */}
                        <div className="flex items-start gap-4">
                          <div className="relative flex flex-col items-center">
                            <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow-sm z-10"></div>
                          </div>
                          <div className="flex-1 pt-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-gray-900">Destination</span>
                              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200 font-medium">
                                <Timer className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                            <p className="text-sm text-gray-700 mb-2">{trackingData.route.destination.address}</p>
                            <div className="grid grid-cols-1 gap-1 text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <User className="w-3 h-3" />
                                <span>Contact: {trackingData.route.destination.contactPerson}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>ETA: {formatTime(trackingData.route.estimatedArrival)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Enhanced Route Statistics */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Route Statistics
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Route className="w-4 h-4 text-gray-600" />
                              <span className="text-xs font-medium text-gray-700">Planned</span>
                          </div>
                            <div className="text-lg font-bold text-gray-900">{trackingData.route.plannedDistance}</div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Navigation className="w-4 h-4 text-gray-600" />
                              <span className="text-xs font-medium text-gray-700">Actual</span>
                          </div>
                            <div className="text-lg font-bold text-gray-900">{trackingData.route.actualDistance}</div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Timer className="w-4 h-4 text-gray-600" />
                              <span className="text-xs font-medium text-gray-700">Duration</span>
                        </div>
                            <div className="text-lg font-bold text-gray-900">{trackingData.route.duration}</div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-gray-600" />
                              <span className="text-xs font-medium text-gray-700">Traffic Delay</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">+{trackingData.route.trafficDelay} min</div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-3">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200">
                          <MapIcon className="w-4 h-4 mr-2" />
                          View Route
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200">
                          <Share className="w-4 h-4 mr-2" />
                          Share ETA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Enhanced Live Map Tab */}
            <TabsContent value="map">
              <Card className="group bg-white border border-gray-200 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gray-900 rounded-lg">
                        <MapIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span>Live Map Tracking</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm text-gray-600 font-normal">Real-time location updates</span>
                        </div>
                      </div>
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <Select value={mapView} onValueChange={setMapView}>
                        <SelectTrigger className="w-36 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satellite">
                            <div className="flex items-center gap-2">
                              <Satellite className="w-4 h-4" />
                              Satellite
                            </div>
                          </SelectItem>
                          <SelectItem value="street">
                            <div className="flex items-center gap-2">
                              <MapIcon className="w-4 h-4" />
                              Street
                            </div>
                          </SelectItem>
                          <SelectItem value="hybrid">
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4" />
                              Hybrid
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                      >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div ref={mapRef} className="relative bg-gray-100 overflow-hidden" style={{ height: isFullscreen ? '100vh' : '700px' }}>
                    <LoadScript
                      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                      libraries={['geometry', 'drawing']}
                      onLoad={onGoogleMapsLoad}
                      onError={onGoogleMapsError}
                    >
                      {googleMapsLoaded && (
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          options={getMapOptions()}
                          onLoad={onMapLoad}
                        >
                          {/* Advanced Pickup Location Marker - Warehouse Icon */}
                          <Marker
                            position={pickupLocation}
                            icon={createMarkerIcon(`
                              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" fill="#10B981" stroke="white" stroke-width="4" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"/>
                                <rect x="14" y="18" width="20" height="12" fill="white" rx="2"/>
                                <rect x="16" y="20" width="4" height="8" fill="#10B981"/>
                                <rect x="22" y="20" width="4" height="8" fill="#10B981"/>
                                <rect x="28" y="20" width="4" height="8" fill="#10B981"/>
                                <path d="M18 16l6-4 6 4v2H18v-2z" fill="white"/>
                                <circle cx="38" cy="14" r="6" fill="#059669" stroke="white" stroke-width="2"/>
                                <path d="M35 14l2 2 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            `, 48, 48)}
                            title="Pickup Warehouse - Completed"
                            onClick={() => setSelectedMarker('pickup')}
                          />

                          {/* Advanced Current Location Marker - Animated Truck */}
                          <Marker
                            position={currentLocation}
                            icon={createMarkerIcon(`
                              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="28" cy="28" r="24" fill="#3B82F6" stroke="white" stroke-width="4" filter="drop-shadow(0 6px 12px rgba(59,130,246,0.3))"/>
                                <circle cx="28" cy="28" r="28" fill="#3B82F6" fill-opacity="0.1" class="animate-ping"/>
                                <rect x="12" y="22" width="18" height="8" fill="white" rx="2"/>
                                <rect x="30" y="24" width="8" height="6" fill="white" rx="1"/>
                                <rect x="30" y="20" width="8" height="4" fill="white" rx="1"/>
                                <circle cx="18" cy="32" r="2.5" fill="#374151"/>
                                <circle cx="18" cy="32" r="1.5" fill="#6B7280"/>
                                <circle cx="32" cy="32" r="2.5" fill="#374151"/>
                                <circle cx="32" cy="32" r="1.5" fill="#6B7280"/>
                                <path d="M8 20h4M8 24h3M8 28h4" stroke="white" stroke-width="1" stroke-linecap="round"/>
                                <circle cx="42" cy="14" r="8" fill="#059669" stroke="white" stroke-width="2"/>
                                <circle cx="42" cy="14" r="3" fill="white"/>
                                <circle cx="42" cy="14" r="1" fill="#059669"/>
                                <circle cx="42" cy="14" r="6" fill="none" stroke="white" stroke-width="1" opacity="0.5" class="animate-pulse"/>
                              </svg>
                            `, 56, 56)}
                            title="Delivery Truck - Live Tracking"
                            onClick={() => setSelectedMarker('current')}
                          />

                          {/* Advanced Destination Marker - Building with Flag */}
                          <Marker
                            position={destinationLocation}
                            icon={createMarkerIcon(`
                              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" fill="#6B7280" stroke="white" stroke-width="4" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"/>
                                <rect x="16" y="18" width="16" height="14" fill="white" rx="2"/>
                                <rect x="18" y="20" width="2" height="2" fill="#6B7280"/>
                                <rect x="22" y="20" width="2" height="2" fill="#6B7280"/>
                                <rect x="26" y="20" width="2" height="2" fill="#6B7280"/>
                                <rect x="30" y="20" width="2" height="2" fill="#6B7280"/>
                                <rect x="18" y="24" width="2" height="2" fill="#6B7280"/>
                                <rect x="22" y="24" width="2" height="2" fill="#6B7280"/>
                                <rect x="26" y="24" width="2" height="2" fill="#6B7280"/>
                                <rect x="30" y="24" width="2" height="2" fill="#6B7280"/>
                                <rect x="22" y="28" width="4" height="4" fill="#6B7280"/>
                                <line x1="34" y1="12" x2="34" y2="24" stroke="#DC2626" stroke-width="2"/>
                                <path d="M34 12h8l-2 3 2 3h-8z" fill="#DC2626"/>
                                <circle cx="38" cy="34" r="6" fill="#F59E0B" stroke="white" stroke-width="2"/>
                                <path d="M38 31v3l2 2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            `, 48, 48)}
                            title="Destination Building - Pending Delivery"
                            onClick={() => setSelectedMarker('destination')}
                          />

                          {/* Additional Route Waypoints */}
                          <Marker
                            position={{ lat: 9.0250, lng: 38.7550 }}
                            icon={createMarkerIcon(`
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="8" fill="#8B5CF6" stroke="white" stroke-width="2"/>
                                <path d="M8 12l2 2 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            `, 24, 24)}
                            title="Checkpoint 1 - Passed"
                          />

                          <Marker
                            position={{ lat: 9.0350, lng: 38.7650 }}
                            icon={createMarkerIcon(`
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="8" fill="#F59E0B" stroke="white" stroke-width="2"/>
                                <circle cx="12" cy="12" r="3" fill="white"/>
                                <circle cx="12" cy="12" r="1" fill="#F59E0B"/>
                              </svg>
                            `, 24, 24)}
                            title="Checkpoint 2 - Approaching"
                          />

                          {/* Traffic Markers */}
                          <Marker
                            position={{ lat: 9.0400, lng: 38.7700 }}
                            icon={createMarkerIcon(`
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="8" fill="#EF4444" stroke="white" stroke-width="2"/>
                                <path d="M7 10h6M10 7v6" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            `, 20, 20)}
                            title="Traffic Alert - Heavy Traffic"
                          />

                          {/* Enhanced Info Windows with Cards */}
                          {selectedMarker === 'pickup' && (
                            <InfoWindow
                              position={pickupLocation}
                              onCloseClick={() => setSelectedMarker(null)}
                            >
                              <div className="p-4 max-w-sm bg-white rounded-lg shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900">Pickup Warehouse</h3>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      ✓ Completed
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                  <p><strong>Address:</strong> {trackingData.route.pickup.address}</p>
                                  <p><strong>Contact:</strong> {trackingData.route.pickup.contactPerson}</p>
                                  <p><strong>Completed:</strong> {formatDateTime(trackingData.route.pickup.completedAt)}</p>
                                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
                    <div className="text-center">
                                      <div className="font-semibold text-green-600">24</div>
                                      <div className="text-xs text-gray-500">Packages</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-semibold text-green-600">847kg</div>
                                      <div className="text-xs text-gray-500">Total Weight</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </InfoWindow>
                          )}

                          {selectedMarker === 'current' && (
                            <InfoWindow
                              position={currentLocation}
                              onCloseClick={() => setSelectedMarker(null)}
                            >
                              <div className="p-4 max-w-sm bg-white rounded-lg shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900">Delivery Truck</h3>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-pulse">
                                      📍 Live Tracking
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                  <p><strong>Driver:</strong> {trackingData.driver.name}</p>
                                  <p><strong>Vehicle:</strong> {trackingData.driver.vehicle.model} ({trackingData.driver.vehicle.plate})</p>
                                  <p><strong>Current Speed:</strong> {trackingData.analytics.avgSpeed} km/h</p>
                                  <p><strong>GPS Accuracy:</strong> ±{trackingData.currentLocation.accuracy}m</p>
                                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t">
                                    <div className="text-center">
                                      <div className="font-semibold text-blue-600">94%</div>
                                      <div className="text-xs text-gray-500">Fuel</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-semibold text-green-600">Normal</div>
                                      <div className="text-xs text-gray-500">Engine</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-semibold text-blue-600">Strong</div>
                                      <div className="text-xs text-gray-500">Signal</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </InfoWindow>
                          )}

                          {selectedMarker === 'destination' && (
                            <InfoWindow
                              position={destinationLocation}
                              onCloseClick={() => setSelectedMarker(null)}
                            >
                              <div className="p-4 max-w-sm bg-white rounded-lg shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-gray-100 rounded-lg">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900">Destination</h3>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                      ⏳ Pending Delivery
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                  <p><strong>Address:</strong> {trackingData.route.destination.address}</p>
                                  <p><strong>Contact:</strong> {trackingData.route.destination.contactPerson}</p>
                                  <p><strong>ETA:</strong> {formatTime(trackingData.route.estimatedArrival)}</p>
                                  <p><strong>Distance:</strong> {trackingData.route.actualDistance}</p>
                                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
                                    <div className="text-center">
                                      <div className="font-semibold text-orange-600">18 min</div>
                                      <div className="text-xs text-gray-500">ETA</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-semibold text-orange-600">3.2 km</div>
                                      <div className="text-xs text-gray-500">Distance</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </InfoWindow>
                          )}
                        </GoogleMap>
                      )}
                      
                      {/* Loading State */}
                      {!googleMapsLoaded && (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
                              <MapIcon className="w-8 h-8 text-white animate-pulse" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Google Maps</h3>
                            <p className="text-gray-600">Please wait while we initialize the map...</p>
                          </div>
                        </div>
                      )}
                    </LoadScript>

                    {/* Enhanced Live Location Indicator */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg border border-gray-700">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="relative">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                          </div>
                          <span className="font-medium">Live tracking active</span>
                          <span className="text-green-400">•</span>
                          <span className="text-gray-300">Updated {formatTime(lastUpdate.toISOString())}</span>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Vehicle Status Card */}
                    <div className="absolute bottom-6 left-6 z-10">
                      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-lg max-w-xs">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Vehicle Status</h4>
                            <p className="text-xs text-gray-600">{trackingData.driver.vehicle.plate}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">Engine: Normal</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">Fuel: {trackingData.driver.vehicle.fuelLevel}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-gray-700">Temp: {trackingData.driver.vehicle.temperature}°C</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-700">Speed: {trackingData.analytics.avgSpeed} km/h</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Battery</span>
                            <span className="text-xs font-semibold text-gray-900">{trackingData.driver.vehicle.batteryLevel}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full transition-all duration-300" 
                              style={{ width: `${trackingData.driver.vehicle.batteryLevel}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Map Legend with Live Data */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <MapIcon className="w-4 h-4" />
                          Live Map Legend
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700">Pickup Warehouse</span>
                        </div>
                            <span className="text-xs text-green-600 font-medium">✓ Done</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-gray-700">Delivery Truck</span>
                        </div>
                            <span className="text-xs text-blue-600 font-medium">📍 Live</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              <span className="text-gray-700">Checkpoints</span>
                        </div>
                            <span className="text-xs text-purple-600 font-medium">1/2</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                              <span className="text-gray-700">Destination</span>
                            </div>
                            <span className="text-xs text-orange-600 font-medium">18 min</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-1 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700">Route Path</span>
                            </div>
                            <span className="text-xs text-blue-600 font-medium">3.2 km</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Route Analytics Card */}
                    <div className="absolute top-6 right-6 z-10">
                      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-600" />
                          Route Analytics
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700">Progress</span>
                            </div>
                            <span className="font-semibold text-green-600">67%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full w-2/3"></div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700">Efficiency</span>
                            </div>
                            <span className="font-semibold text-blue-600">{trackingData.analytics.routeEfficiency}%</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-700">ETA</span>
                            </div>
                            <span className="font-semibold text-orange-600">18 min</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-gray-700">Avg Speed</span>
                            </div>
                            <span className="font-semibold text-purple-600">{trackingData.analytics.avgSpeed} km/h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Controls */}
                    <div className="absolute top-32 right-6 z-10">
                      <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
                        <div className="flex flex-col gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-10 h-10 p-0 hover:bg-gray-50"
                            onClick={zoomIn}
                            title="Zoom In"
                          >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-10 h-10 p-0 hover:bg-gray-50"
                            onClick={zoomOut}
                            title="Zoom Out"
                          >
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                          <Separator className="my-1" />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-10 h-10 p-0 hover:bg-gray-50"
                            onClick={centerOnCurrentLocation}
                            title="Center on Vehicle"
                          >
                            <Navigation className="w-4 h-4" />
                      </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-10 h-10 p-0 hover:bg-gray-50"
                            onClick={toggleTrafficLayer}
                            title="Toggle Traffic"
                          >
                        <Layers className="w-4 h-4" />
                      </Button>
                    </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Continue with other tabs... */}
            <TabsContent value="timeline">
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Timer className="w-5 h-5" />
                      Delivery Timeline
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {completedSteps} of {totalSteps} completed
                      </Badge>
                      <Select defaultValue="detailed">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="detailed">Detailed View</SelectItem>
                          <SelectItem value="compact">Compact View</SelectItem>
                          <SelectItem value="summary">Summary Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export Timeline
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Real-time tracking of your delivery progress with detailed timestamps and locations
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Compact Progress Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div className="lg:col-span-3">
                        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                              <Activity className="w-4 h-4 text-blue-600" />
                              Overall Progress
                            </h3>
                            <span className="text-sm font-semibold text-blue-700">{Math.round(progressPercentage)}%</span>
                      </div>
                          <div className="space-y-2">
                            <Progress value={progressPercentage} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-600">
                              <span>Started: {trackingData.timeline[0].timestamp ? formatDateTime(trackingData.timeline[0].timestamp) : 'N/A'}</span>
                        <span>ETA: {formatTime(trackingData.route.estimatedArrival)}</span>
                      </div>
                    </div>

                          {/* Compact Timeline Indicators */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-200">
                      {trackingData.timeline.map((step, index) => (
                              <div key={index} className="flex flex-col items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  step.current 
                                    ? 'bg-blue-500 animate-pulse' 
                                    : step.completed 
                                      ? 'bg-green-500' 
                                      : 'bg-gray-300'
                            }`} />
                                <span className="text-xs text-gray-600 text-center max-w-12 truncate">
                                  {step.status.replace('_', ' ').toLowerCase()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Compact Time Statistics */}
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-green-100 rounded">
                              <Clock className="w-3 h-3 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-green-800">Elapsed</p>
                              <p className="text-sm font-bold text-green-900">
                                {trackingData.timeline[0].timestamp ? Math.round((Date.now() - new Date(trackingData.timeline[0].timestamp).getTime()) / (1000 * 60)) : 0}m
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-100 rounded">
                              <Timer className="w-3 h-3 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-blue-800">Remaining</p>
                              <p className="text-sm font-bold text-blue-900">
                                {Math.round((new Date(trackingData.route.estimatedArrival).getTime() - Date.now()) / (1000 * 60))}m
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-purple-100 rounded">
                              <Target className="w-3 h-3 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-purple-800">Efficiency</p>
                              <p className="text-sm font-bold text-purple-900">
                                {trackingData.analytics.routeEfficiency}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Compact Timeline Steps */}
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-300 via-blue-300 to-gray-200"></div>
                      
                      {trackingData.timeline.map((step, index) => (
                        <div key={index} className="relative flex items-start pb-8 last:pb-0">
                          {/* Compact Timeline Node */}
                          <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-xl border-2 shadow-sm ${
                            step.current 
                              ? 'bg-blue-500 border-blue-200 shadow-blue-200' 
                              : step.completed 
                                ? 'bg-green-500 border-green-200 shadow-green-200' 
                                : 'bg-gray-300 border-gray-100 shadow-gray-200'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : step.current ? (
                              <div className="relative">
                                <Activity className="w-5 h-5 text-white" />
                                <div className="absolute inset-0 w-5 h-5 animate-ping">
                                  <Activity className="w-5 h-5 text-white opacity-75" />
                                </div>
                              </div>
                            ) : (
                              <Clock className="w-5 h-5 text-gray-500" />
                            )}
                          </div>

                          {/* Compact Timeline Content */}
                          <div className="ml-6 flex-1">
                            <div className={`p-4 rounded-lg border shadow-sm ${
                              step.current 
                                ? 'bg-blue-50 border-blue-200 shadow-blue-100' 
                                : step.completed 
                                  ? 'bg-green-50 border-green-200 shadow-green-100' 
                                  : 'bg-gray-50 border-gray-200'
                            }`}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className={`font-semibold mb-2 ${
                                  step.current ? 'text-blue-900' : step.completed ? 'text-green-900' : 'text-gray-700'
                                }`}>
                                  {step.description}
                                </h4>
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                      <MapPin className="w-3 h-3" />
                                      <span className="font-medium">{step.location}</span>
                                    </div>
                                  {step.timestamp && (
                                      <Badge variant="outline" className="text-xs bg-white px-2 py-0.5">
                                        <Clock className="w-3 h-3 mr-1" />
                                      {formatDateTime(step.timestamp)}
                                    </Badge>
                                  )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {step.current && (
                                    <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5 animate-pulse">
                                      <Radio className="w-3 h-3 mr-1" />
                                      Live
                                    </Badge>
                                  )}
                                  {step.completed && (
                                    <Badge className="bg-green-600 text-white text-xs px-2 py-0.5">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Done
                                    </Badge>
                                  )}
                                  {!step.completed && !step.current && (
                                    <Badge variant="outline" className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Pending
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{step.details}</p>
                              
                              {/* Compact Current Step Details */}
                                {step.current && (
                                <div className="space-y-3">
                                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                                    <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2 text-sm">
                                      <Activity className="w-3 h-3" />
                                      Live Status
                                    </h5>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                      <div className="text-center p-2 bg-blue-50 rounded">
                                        <Gauge className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                                        <div className="text-sm font-bold text-blue-900">{trackingData.analytics.avgSpeed}</div>
                                        <div className="text-xs text-blue-600">km/h</div>
                                      </div>
                                      <div className="text-center p-2 bg-green-50 rounded">
                                        <Signal className="w-4 h-4 text-green-600 mx-auto mb-1" />
                                        <div className="text-sm font-bold text-green-900">Strong</div>
                                        <div className="text-xs text-green-600">GPS</div>
                                      </div>
                                      <div className="text-center p-2 bg-orange-50 rounded">
                                        <Fuel className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                                        <div className="text-sm font-bold text-orange-900">{trackingData.driver.vehicle.fuelLevel}%</div>
                                        <div className="text-xs text-orange-600">Fuel</div>
                                      </div>
                                      <div className="text-center p-2 bg-purple-50 rounded">
                                        <Thermometer className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                                        <div className="text-sm font-bold text-purple-900">{trackingData.driver.vehicle.temperature}°C</div>
                                        <div className="text-xs text-purple-600">Temp</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Compact Actions */}
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1.5">
                                      <Phone className="w-3 h-3 mr-1" />
                                      Call
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 text-xs px-3 py-1.5">
                                      <MessageCircle className="w-3 h-3 mr-1" />
                                      Message
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 text-xs px-3 py-1.5">
                                      <MapIcon className="w-3 h-3 mr-1" />
                                      Map
                                    </Button>
                                    </div>
                                  </div>
                                )}
                              
                              {/* Compact Completed Step Summary */}
                              {step.completed && step.timestamp && (
                                <div className="p-3 bg-white rounded-lg border border-green-200">
                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-green-700">
                                      <CheckCircle className="w-3 h-3" />
                                      <span className="font-medium text-xs">Completed successfully</span>
                              </div>
                                    <span className="text-gray-600 text-xs">
                                      Duration: {index > 0 && trackingData.timeline[index-1].timestamp ? 
                                        Math.round((new Date(step.timestamp).getTime() - new Date(trackingData.timeline[index-1].timestamp!).getTime()) / (1000 * 60)) : 0}m
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Compact Timeline Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-200">
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="p-2 bg-blue-600 rounded-lg w-fit mx-auto mb-2">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-lg font-bold text-blue-900 mb-1">
                          {trackingData.timeline[0].timestamp ? Math.round((Date.now() - new Date(trackingData.timeline[0].timestamp).getTime()) / (1000 * 60)) : 0}
                      </div>
                        <div className="text-xs text-blue-700 font-medium">Minutes Elapsed</div>
                        </div>
                      
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="p-2 bg-green-600 rounded-lg w-fit mx-auto mb-2">
                          <Timer className="w-4 h-4 text-white" />
                      </div>
                        <div className="text-lg font-bold text-green-900 mb-1">
                          {Math.round((new Date(trackingData.route.estimatedArrival).getTime() - Date.now()) / (1000 * 60))}
                        </div>
                        <div className="text-xs text-green-700 font-medium">Minutes Remaining</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="p-2 bg-purple-600 rounded-lg w-fit mx-auto mb-2">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-lg font-bold text-purple-900 mb-1">
                          {trackingData.analytics.routeEfficiency}%
                        </div>
                        <div className="text-xs text-purple-700 font-medium">Route Efficiency</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                        <div className="p-2 bg-orange-600 rounded-lg w-fit mx-auto mb-2">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-lg font-bold text-orange-900 mb-1">
                          {Math.round(progressPercentage)}%
                        </div>
                        <div className="text-xs text-orange-700 font-medium">Progress Complete</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="space-y-6">
                {/* Analytics Header */}
                <Card className="border border-gray-200 shadow-sm bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold mb-2">Delivery Analytics Dashboard</h2>
                        <p className="text-slate-300">Real-time performance metrics and insights</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          Last 30 Days
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Download className="w-4 h-4 mr-2" />
                          Export Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700 mb-1">Average Speed</p>
                          <p className="text-3xl font-bold text-blue-900">{trackingData.analytics.avgSpeed}</p>
                          <p className="text-sm text-blue-600">km/h</p>
                          <div className="flex items-center gap-1 mt-2">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">+5% vs avg</span>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-600 rounded-xl">
                          <Gauge className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-700 mb-1">Route Efficiency</p>
                          <p className="text-3xl font-bold text-green-900">{trackingData.analytics.routeEfficiency}</p>
                          <p className="text-sm text-green-600">%</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Target className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">Excellent</span>
                          </div>
                        </div>
                        <div className="p-3 bg-green-600 rounded-xl">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-700 mb-1">Fuel Efficiency</p>
                          <p className="text-3xl font-bold text-purple-900">{trackingData.analytics.fuelConsumption}</p>
                          <p className="text-sm text-purple-600">L/100km</p>
                          <div className="flex items-center gap-1 mt-2">
                            <ArrowDown className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">-8% vs avg</span>
                          </div>
                        </div>
                        <div className="p-3 bg-purple-600 rounded-xl">
                          <Fuel className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-700 mb-1">Customer Rating</p>
                          <p className="text-3xl font-bold text-orange-900">{trackingData.analytics.customerSatisfaction}</p>
                          <p className="text-sm text-orange-600">/5.0</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-orange-600">Top rated</span>
                          </div>
                        </div>
                        <div className="p-3 bg-orange-600 rounded-xl">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Chart */}
                  <Card className="border border-gray-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Performance Metrics
                      </CardTitle>
                      <CardDescription>Real-time delivery performance analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Speed Analysis */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Current Speed</span>
                            <span className="text-sm font-bold text-blue-600">{trackingData.analytics.avgSpeed} km/h</span>
                          </div>
                          <Progress value={(trackingData.analytics.avgSpeed / trackingData.analytics.maxSpeed) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0 km/h</span>
                            <span>Max: {trackingData.analytics.maxSpeed} km/h</span>
                          </div>
                        </div>

                        {/* Route Efficiency */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Route Efficiency</span>
                            <span className="text-sm font-bold text-green-600">{trackingData.analytics.routeEfficiency}%</span>
                          </div>
                          <Progress value={trackingData.analytics.routeEfficiency} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Poor</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        {/* Traffic Score */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Traffic Conditions</span>
                            <span className="text-sm font-bold text-purple-600">{trackingData.analytics.trafficScore}/10</span>
                          </div>
                          <Progress value={trackingData.analytics.trafficScore * 10} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Heavy Traffic</span>
                            <span>Clear Roads</span>
                          </div>
                        </div>

                        {/* Environmental Impact */}
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-900 mb-2">Environmental Impact</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-green-700">CO₂ Emissions</span>
                              <p className="font-bold text-green-900">{trackingData.analytics.co2Emissions} kg</p>
                            </div>
                            <div>
                              <span className="text-green-700">Fuel Used</span>
                              <p className="font-bold text-green-900">{trackingData.analytics.fuelConsumption} L</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Driver Performance */}
                  <Card className="border border-gray-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Driver Performance
                      </CardTitle>
                      <CardDescription>Comprehensive driver analytics and ratings</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Driver Stats */}
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16 border-2 border-gray-200">
                            <AvatarFallback className="bg-slate-900 text-white text-lg">
                              {trackingData.driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{trackingData.driver.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(trackingData.driver.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{trackingData.driver.rating}/5.0</span>
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                              <span className="text-sm font-medium text-blue-900">On-Time Deliveries</span>
                            </div>
                            <span className="text-lg font-bold text-blue-900">{trackingData.driver.performance.onTimeDeliveries}%</span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Target className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium text-green-900">Completion Rate</span>
                            </div>
                            <span className="text-lg font-bold text-green-900">{trackingData.driver.performance.completionRate}%</span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">Avg Delivery Time</span>
                            </div>
                            <span className="text-lg font-bold text-purple-900">{trackingData.driver.performance.avgDeliveryTime} min</span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-orange-600" />
                              <span className="text-sm font-medium text-orange-900">Customer Rating</span>
                            </div>
                            <span className="text-lg font-bold text-orange-900">{trackingData.driver.performance.customerRating}/5.0</span>
                          </div>
                        </div>

                        {/* Achievement Badges */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Achievement Badges</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                              <Award className="w-3 h-3 mr-1" />
                              Top Performer
                            </Badge>
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Reliable Driver
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                              <Clock className="w-3 h-3 mr-1" />
                              Punctual
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                              <Fuel className="w-3 h-3 mr-1" />
                              Eco-Friendly
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border border-gray-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <PieChart className="w-4 h-4" />
                        Route Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Distance Covered</span>
                          <span className="font-medium">{trackingData.analytics.totalDistance} km</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Idle Time</span>
                          <span className="font-medium">{trackingData.analytics.idleTime} min</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Traffic Delays</span>
                          <span className="font-medium text-orange-600">+{trackingData.route.trafficDelay} min</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Alternative Routes</span>
                          <span className="font-medium">{trackingData.route.alternativeRoutes} available</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <DollarSign className="w-4 h-4" />
                        Cost Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Fuel Cost</span>
                          <span className="font-medium">ETB 45.50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Driver Fee</span>
                          <span className="font-medium">ETB 120.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Vehicle Wear</span>
                          <span className="font-medium">ETB 15.25</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Total Cost</span>
                          <span className="text-green-600">ETB 180.75</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="w-4 h-4" />
                        Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Speed Trend</span>
                          <div className="flex items-center gap-1">
                            <ArrowUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600 font-medium">+5%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Efficiency</span>
                          <div className="flex items-center gap-1">
                            <ArrowUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600 font-medium">+12%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Fuel Usage</span>
                          <div className="flex items-center gap-1">
                            <ArrowDown className="w-3 h-3 text-green-600" />
                            <span className="text-green-600 font-medium">-8%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Customer Rating</span>
                          <div className="flex items-center gap-1">
                            <ArrowUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600 font-medium">+0.2</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="updates">
              <div className="space-y-6">
                {/* Live Updates Header */}
                <Card className="border border-gray-200 shadow-sm bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                          <Activity className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold mb-1">Live Updates Feed</h2>
                          <p className="text-green-100">Real-time notifications and status updates</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${isLiveTracking ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                          <span className="text-sm">{isLiveTracking ? 'Live' : 'Offline'}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsLiveTracking(!isLiveTracking)}
                          className="border-white/30 text-white hover:bg-white/20"
                        >
                          {isLiveTracking ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                          {isLiveTracking ? 'Pause' : 'Resume'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Filters and Controls */}
                  <Card className="border border-gray-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Filter className="w-4 h-4" />
                        Filters & Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Update Categories */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Categories</Label>
                          <div className="space-y-2">
                            {['All', 'Location', 'Vehicle', 'Route', 'System'].map((category) => (
                              <div key={category} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={category}
                                  defaultChecked={category === 'All'}
                                  className="rounded border-gray-300"
                                />
                                <Label htmlFor={category} className="text-sm text-gray-700">
                                  {category}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Priority Levels */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Priority</Label>
                          <div className="space-y-2">
                            {['High', 'Medium', 'Low'].map((priority) => (
                              <div key={priority} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={priority}
                                  defaultChecked
                                  className="rounded border-gray-300"
                                />
                                <Label htmlFor={priority} className="text-sm text-gray-700">
                                  {priority}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Auto-refresh Settings */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Auto-refresh</Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Enable</span>
                            <Switch
                              checked={autoRefresh}
                              onCheckedChange={setAutoRefresh}
                            />
                          </div>
                          <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(Number(value))}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10 seconds</SelectItem>
                              <SelectItem value="30">30 seconds</SelectItem>
                              <SelectItem value="60">1 minute</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        {/* Actions */}
                        <div className="space-y-2">
                          <Button size="sm" className="w-full bg-slate-900 hover:bg-slate-800">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh Now
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Export Updates
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Live Updates Feed */}
                  <div className="lg:col-span-3 space-y-4">
                    {/* Update Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-700">Total Updates</p>
                              <p className="text-2xl font-bold text-blue-900">{notifications.length}</p>
                            </div>
                            <Bell className="w-6 h-6 text-blue-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-green-700">Success</p>
                              <p className="text-2xl font-bold text-green-900">
                                {notifications.filter(n => n.type === 'success').length}
                              </p>
                            </div>
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-orange-700">Warnings</p>
                              <p className="text-2xl font-bold text-orange-900">
                                {notifications.filter(n => n.type === 'warning').length}
                              </p>
                            </div>
                            <AlertCircle className="w-6 h-6 text-orange-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-purple-700">Info</p>
                              <p className="text-2xl font-bold text-purple-900">
                                {notifications.filter(n => n.type === 'info').length}
                              </p>
                            </div>
                            <Activity className="w-6 h-6 text-purple-600" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Updates List */}
                    <Card className="border border-gray-200 shadow-sm bg-white">
                      <CardHeader className="border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Recent Updates
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Last updated: {formatTime(lastUpdate.toISOString())}
                            </Badge>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Search className="w-4 h-4" />
                              Search
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="max-h-[600px] overflow-y-auto">
                          {notifications.map((update, index) => (
                            <div
                              key={update.id}
                              className={`p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                                index === 0 ? 'bg-blue-50/50' : ''
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                {/* Update Icon */}
                                <div className={`p-2 rounded-lg flex-shrink-0 ${
                                  update.type === 'success' 
                                    ? 'bg-green-100 text-green-600' 
                                    : update.type === 'warning'
                                      ? 'bg-orange-100 text-orange-600'
                                      : update.type === 'error'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-blue-100 text-blue-600'
                                }`}>
                                  {update.type === 'success' ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : update.type === 'warning' ? (
                                    <AlertCircle className="w-4 h-4" />
                                  ) : update.type === 'error' ? (
                                    <AlertCircle className="w-4 h-4" />
                                  ) : (
                                    <Activity className="w-4 h-4" />
                                  )}
                                </div>

                                {/* Update Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <Badge 
                                        variant="outline" 
                                        className={`text-xs ${
                                          update.category === 'ETA_UPDATE' 
                                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                                            : update.category === 'ROUTE_CHANGE'
                                              ? 'bg-orange-50 text-orange-700 border-orange-200'
                                              : update.category === 'CONDITION_UPDATE'
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : update.category === 'VEHICLE_STATUS'
                                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                  : 'bg-gray-50 text-gray-700 border-gray-200'
                                        }`}
                                      >
                                        {update.category.replace('_', ' ')}
                                      </Badge>
                                      <Badge 
                                        variant="outline" 
                                        className={`text-xs ${
                                          update.priority === 'high' 
                                            ? 'bg-red-50 text-red-700 border-red-200'
                                            : update.priority === 'medium'
                                              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                              : 'bg-gray-50 text-gray-700 border-gray-200'
                                        }`}
                                      >
                                        {update.priority}
                                      </Badge>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {formatTime(update.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-900 leading-relaxed">
                                    {update.message}
                                  </p>
                                  
                                  {/* Additional Actions */}
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                      <Eye className="w-3 h-3 mr-1" />
                                      View Details
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                      <Copy className="w-3 h-3 mr-1" />
                                      Copy
                                    </Button>
                                    {update.category === 'ROUTE_CHANGE' && (
                                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                        <MapIcon className="w-3 h-3 mr-1" />
                                        View Route
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border border-gray-200 shadow-sm bg-white">
                      <CardHeader className="border-b border-gray-100">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Zap className="w-4 h-4" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <Button variant="outline" size="sm" className="gap-2 h-auto py-3 flex-col">
                            <Phone className="w-4 h-4" />
                            <span className="text-xs">Call Driver</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 h-auto py-3 flex-col">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">Send Message</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 h-auto py-3 flex-col">
                            <MapIcon className="w-4 h-4" />
                            <span className="text-xs">View Map</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 h-auto py-3 flex-col">
                            <Share className="w-4 h-4" />
                            <span className="text-xs">Share Status</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
} 