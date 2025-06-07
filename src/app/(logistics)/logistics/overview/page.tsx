'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Package, 
  MapPin, 
  Users, 
  Clock, 
  AlertCircle,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Plus
} from 'lucide-react';

export default function LogisticsOverviewPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="text-muted-foreground">Here's what's happening with your logistics operations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,274</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              8 currently on delivery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +10.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Performance */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  icon: Package,
                  title: "New shipment #12345",
                  description: "Pickup scheduled for 2:30 PM",
                  time: "2 minutes ago",
                  status: "success"
                },
                {
                  icon: AlertCircle,
                  title: "Delivery delay alert",
                  description: "Shipment #12342 delayed due to traffic",
                  time: "15 minutes ago",
                  status: "warning"
                },
                {
                  icon: CheckCircle,
                  title: "Successful delivery",
                  description: "Shipment #12340 delivered to John Doe",
                  time: "1 hour ago",
                  status: "success"
                },
                {
                  icon: Users,
                  title: "Driver assignment",
                  description: "Mike Johnson assigned to Route #45",
                  time: "2 hours ago",
                  status: "info"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${
                    item.status === 'success' ? 'bg-green-100' :
                    item.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <item.icon className={`h-4 w-4 ${
                      item.status === 'success' ? 'text-green-600' :
                      item.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  label: "Fleet Utilization",
                  value: "85%",
                  trend: "+5%",
                  icon: Truck
                },
                {
                  label: "Route Efficiency",
                  value: "92%",
                  trend: "+2.5%",
                  icon: MapPin
                },
                {
                  label: "Customer Satisfaction",
                  value: "4.8/5",
                  trend: "+0.3",
                  icon: TrendingUp
                }
              ].map((metric, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center flex-1">
                    <div className="bg-muted p-2 rounded-md mr-4">
                      <metric.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {metric.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 