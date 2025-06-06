'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  MapPin,
  Truck,
  Package,
  Users,
  Star,
  Route,
  Fuel,
  Timer,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Target,
  Zap,
  Shield,
  Award,
  TrendingRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample Analytics Data
const analyticsData = {
  overview: {
    totalDeliveries: 1247,
    totalRevenue: 156780,
    avgDeliveryTime: 2.4,
    onTimeRate: 94.5,
    customerSatisfaction: 4.7,
    fuelEfficiency: 12.8,
    trends: {
      deliveries: { value: 12.5, direction: 'up' },
      revenue: { value: 8.3, direction: 'up' },
      deliveryTime: { value: -5.2, direction: 'down' },
      onTimeRate: { value: 2.1, direction: 'up' },
      satisfaction: { value: 0.3, direction: 'up' },
      fuelEfficiency: { value: -3.1, direction: 'down' }
    }
  },
  costBreakdown: {
    fuel: { amount: 45600, percentage: 29.1 },
    maintenance: { amount: 23400, percentage: 14.9 },
    driverSalaries: { amount: 67800, percentage: 43.2 },
    insurance: { amount: 12300, percentage: 7.8 },
    other: { amount: 7680, percentage: 4.9 }
  },
  routePerformance: [
    {
      route: 'Airport → Bole',
      deliveries: 156,
      avgTime: 25,
      onTimeRate: 96.2,
      revenue: 23400,
      efficiency: 'Excellent'
    },
    {
      route: 'Merkato → Kazanchis',
      deliveries: 134,
      avgTime: 18,
      onTimeRate: 94.8,
      revenue: 18900,
      efficiency: 'Good'
    },
    {
      route: 'Piassa → CMC',
      deliveries: 98,
      avgTime: 32,
      onTimeRate: 89.3,
      revenue: 15600,
      efficiency: 'Fair'
    },
    {
      route: 'Bole → Gabon St',
      deliveries: 87,
      avgTime: 22,
      onTimeRate: 97.1,
      revenue: 12800,
      efficiency: 'Excellent'
    }
  ],
  driverPerformance: [
    {
      name: 'Amanuel Kebede',
      deliveries: 156,
      onTimeRate: 96.5,
      rating: 4.9,
      revenue: 45600,
      efficiency: 'Top Performer'
    },
    {
      name: 'Tigist Mekonnen',
      deliveries: 89,
      onTimeRate: 92.1,
      rating: 4.7,
      revenue: 28900,
      efficiency: 'Good'
    },
    {
      name: 'Kebede Yonas',
      deliveries: 234,
      onTimeRate: 88.7,
      rating: 4.2,
      revenue: 67800,
      efficiency: 'Average'
    }
  ],
  vehicleTypes: [
    { type: 'Van', count: 8, utilization: 87.5, revenue: 67800 },
    { type: 'Pickup', count: 6, utilization: 92.3, revenue: 45600 },
    { type: 'Motorcycle', count: 10, utilization: 78.9, revenue: 23400 },
    { type: 'Truck', count: 3, utilization: 95.2, revenue: 19980 }
  ],
  monthlyTrends: [
    { month: 'Jan', deliveries: 980, revenue: 134500, satisfaction: 4.5 },
    { month: 'Feb', deliveries: 1120, revenue: 145600, satisfaction: 4.6 },
    { month: 'Mar', deliveries: 1050, revenue: 138900, satisfaction: 4.4 },
    { month: 'Apr', deliveries: 1180, revenue: 152300, satisfaction: 4.7 },
    { month: 'May', deliveries: 1247, revenue: 156780, satisfaction: 4.7 }
  ]
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return TrendingDown;
    default: return TrendingRight;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up': return 'text-green-600';
    case 'down': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getEfficiencyColor = (efficiency: string) => {
  switch (efficiency) {
    case 'Excellent': case 'Top Performer': return 'bg-green-100 text-green-800';
    case 'Good': return 'bg-blue-100 text-blue-800';
    case 'Fair': case 'Average': return 'bg-yellow-100 text-yellow-800';
    case 'Poor': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LogisticsAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/logistics">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Logistics
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Logistics Analytics</h1>
          <p className="text-gray-600">Performance insights and business intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Object.entries(analyticsData.overview).filter(([key]) => key !== 'trends').map(([key, value]) => {
          const trend = analyticsData.overview.trends[key as keyof typeof analyticsData.overview.trends];
          const TrendIcon = getTrendIcon(trend.direction);
          const trendColor = getTrendColor(trend.direction);
          
          const getMetricIcon = (metricKey: string) => {
            switch (metricKey) {
              case 'totalDeliveries': return Package;
              case 'totalRevenue': return DollarSign;
              case 'avgDeliveryTime': return Clock;
              case 'onTimeRate': return Target;
              case 'customerSatisfaction': return Star;
              case 'fuelEfficiency': return Fuel;
              default: return Activity;
            }
          };

          const getMetricLabel = (metricKey: string) => {
            switch (metricKey) {
              case 'totalDeliveries': return 'Total Deliveries';
              case 'totalRevenue': return 'Total Revenue';
              case 'avgDeliveryTime': return 'Avg Delivery Time';
              case 'onTimeRate': return 'On-Time Rate';
              case 'customerSatisfaction': return 'Customer Rating';
              case 'fuelEfficiency': return 'Fuel Efficiency';
              default: return metricKey;
            }
          };

          const formatValue = (metricKey: string, val: any) => {
            switch (metricKey) {
              case 'totalRevenue': return formatCurrency(val);
              case 'avgDeliveryTime': return `${val}h`;
              case 'onTimeRate': return `${val}%`;
              case 'customerSatisfaction': return `${val}/5`;
              case 'fuelEfficiency': return `${val}L/100km`;
              default: return val.toLocaleString();
            }
          };

          const MetricIcon = getMetricIcon(key);

          return (
            <Card key={key}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <MetricIcon className="w-5 h-5 text-gray-600" />
                  <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
                    <TrendIcon className="w-3 h-3" />
                    {Math.abs(trend.value)}%
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">{getMetricLabel(key)}</p>
                  <p className="text-lg font-bold text-gray-900">{formatValue(key, value)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="routes">Route Analytics</TabsTrigger>
          <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Delivery Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>On-Time Delivery Rate</span>
                      <span className="font-medium">{analyticsData.overview.onTimeRate}%</span>
                    </div>
                    <Progress value={analyticsData.overview.onTimeRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">{analyticsData.overview.customerSatisfaction}/5</span>
                    </div>
                    <Progress value={(analyticsData.overview.customerSatisfaction / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Average Delivery Time</span>
                      <span className="font-medium">{analyticsData.overview.avgDeliveryTime}h</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fleet Utilization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Fleet Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.vehicleTypes.map((vehicle) => (
                    <div key={vehicle.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{vehicle.type}</p>
                          <p className="text-xs text-gray-600">{vehicle.count} vehicles</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{vehicle.utilization}%</p>
                        <p className="text-xs text-gray-600">{formatCurrency(vehicle.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">98.2%</p>
                <p className="text-sm text-gray-600">Successful Deliveries</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">2.4h</p>
                <p className="text-sm text-gray-600">Average Response Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Route className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">15.2km</p>
                <p className="text-sm text-gray-600">Average Distance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Fuel className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">12.8L</p>
                <p className="text-sm text-gray-600">Fuel per 100km</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Cost Breakdown
                </CardTitle>
                <CardDescription>Monthly operational costs distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.costBreakdown).map(([category, data]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm capitalize">{category.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(data.amount)}</p>
                        <p className="text-xs text-gray-600">{data.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total Monthly Cost</span>
                    <span>{formatCurrency(Object.values(analyticsData.costBreakdown).reduce((sum, item) => sum + item.amount, 0))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Cost Efficiency
                </CardTitle>
                <CardDescription>Cost per delivery and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Cost per Delivery</span>
                      <span className="font-semibold">{formatCurrency(125.7)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Revenue per Delivery</span>
                      <span className="font-semibold">{formatCurrency(185.3)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <span className="font-semibold text-green-600">32.1%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fuel Efficiency</span>
                        <span>Good</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Maintenance Cost</span>
                        <span>Optimal</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Driver Productivity</span>
                        <span>Excellent</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5" />
                Route Performance Analysis
              </CardTitle>
              <CardDescription>Performance metrics for popular delivery routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Route</th>
                      <th className="text-left py-3 px-2">Deliveries</th>
                      <th className="text-left py-3 px-2">Avg Time</th>
                      <th className="text-left py-3 px-2">On-Time Rate</th>
                      <th className="text-left py-3 px-2">Revenue</th>
                      <th className="text-left py-3 px-2">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.routePerformance.map((route, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{route.route}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">{route.deliveries}</td>
                        <td className="py-3 px-2">{route.avgTime} min</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span>{route.onTimeRate}%</span>
                            <Progress value={route.onTimeRate} className="w-16 h-1" />
                          </div>
                        </td>
                        <td className="py-3 px-2">{formatCurrency(route.revenue)}</td>
                        <td className="py-3 px-2">
                          <Badge className={getEfficiencyColor(route.efficiency)}>
                            {route.efficiency}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Driver Performance Leaderboard
              </CardTitle>
              <CardDescription>Top performing drivers based on key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.driverPerformance.map((driver, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{driver.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-gray-600">Deliveries:</span>
                          <span className="font-medium ml-1">{driver.deliveries}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">On-Time:</span>
                          <span className="font-medium ml-1">{driver.onTimeRate}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Rating:</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{driver.rating}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Revenue:</span>
                          <span className="font-medium ml-1">{formatCurrency(driver.revenue)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getEfficiencyColor(driver.efficiency)}>
                      {driver.efficiency}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Monthly Trends
                </CardTitle>
                <CardDescription>Delivery and revenue trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.monthlyTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{month.month} 2025</p>
                        <p className="text-sm text-gray-600">{month.deliveries} deliveries</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(month.revenue)}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{month.satisfaction}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Growth Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Growth Metrics
                </CardTitle>
                <CardDescription>Year-over-year growth indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Delivery Volume Growth</span>
                      <span className="font-semibold text-green-600">+27.3%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Revenue Growth</span>
                      <span className="font-semibold text-green-600">+16.5%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Customer Base Growth</span>
                      <span className="font-semibold text-green-600">+34.2%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Fleet Expansion</span>
                      <span className="font-semibold text-blue-600">+12.5%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Key Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Strengths</h4>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Excellent on-time delivery performance (94.5%)</li>
                    <li>• High customer satisfaction ratings (4.7/5)</li>
                    <li>• Strong revenue growth (+16.5% YoY)</li>
                    <li>• Efficient route optimization</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">Opportunities</h4>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Improve fuel efficiency (currently 12.8L/100km)</li>
                    <li>• Optimize maintenance scheduling</li>
                    <li>• Expand motorcycle fleet for quick deliveries</li>
                    <li>• Implement driver training programs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
} 