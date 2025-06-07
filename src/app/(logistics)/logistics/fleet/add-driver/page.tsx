'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Home, ChevronRight, UserPlus, User, Truck, FileText, 
  Shield, Calendar, Phone, Mail, MapPin, Upload, Camera,
  Save, X, ArrowLeft, CheckCircle, AlertTriangle, Info,
  Eye, EyeOff, Plus, Minus, Clock, Building2, CreditCard,
  Fuel, Gauge, Wrench, Battery, Wifi, Star, Target,
  Award, Activity, TrendingUp, BarChart3, PieChart
} from 'lucide-react';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  
  // License & Documents
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  medicalCertExpiry: string;
  backgroundCheckDate: string;
  
  // Vehicle Information
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  plateNumber: string;
  vehicleCapacity: string;
  fuelType: string;
  hasTemperatureControl: boolean;
  hasDashcam: boolean;
  hasGPS: boolean;
  
  // Employment Details
  employmentType: string;
  shiftStart: string;
  shiftEnd: string;
  workingDays: string[];
  hourlyRate: string;
  
  // Preferences
  autoAssignment: boolean;
  gpsTracking: boolean;
  notifications: boolean;
  preferredRoutes: string[];
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  city: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelation: '',
  licenseNumber: '',
  licenseType: '',
  licenseExpiry: '',
  medicalCertExpiry: '',
  backgroundCheckDate: '',
  vehicleType: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: '',
  plateNumber: '',
  vehicleCapacity: '',
  fuelType: '',
  hasTemperatureControl: false,
  hasDashcam: false,
  hasGPS: true,
  employmentType: '',
  shiftStart: '',
  shiftEnd: '',
  workingDays: [],
  hourlyRate: '',
  autoAssignment: true,
  gpsTracking: true,
  notifications: true,
  preferredRoutes: []
};

export default function AddDriverPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const totalSteps = 5;
  const stepProgress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Documents', icon: FileText },
    { id: 3, title: 'Vehicle', icon: Truck },
    { id: 4, title: 'Employment', icon: Building2 },
    { id: 5, title: 'Preferences', icon: Shield }
  ];

  const workingDaysOptions = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
        if (!formData.licenseType) newErrors.licenseType = 'License type is required';
        if (!formData.licenseExpiry) newErrors.licenseExpiry = 'License expiry is required';
        break;
      case 3:
        if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
        if (!formData.plateNumber) newErrors.plateNumber = 'Plate number is required';
        break;
      case 4:
        if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
        if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleWorkingDaysChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      workingDays: checked 
        ? [...prev.workingDays, day]
        : prev.workingDays.filter(d => d !== day)
    }));
  };

  const handleFileUpload = (type: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to fleet management
      router.push('/logistics/fleet?success=driver-added');
    } catch (error) {
      console.error('Error adding driver:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`border-gray-300 ${errors.firstName ? 'border-red-500' : ''}`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`border-gray-300 ${errors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="driver@example.com"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`border-gray-300 ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+251911234567"
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                    <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                    <SelectItem value="mekelle">Mekelle</SelectItem>
                    <SelectItem value="gondar">Gondar</SelectItem>
                    <SelectItem value="hawassa">Hawassa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="border-gray-300"
                placeholder="Enter full address"
                rows={3}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Emergency Contact
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                    className="border-gray-300"
                    placeholder="Emergency contact name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                  <Input
                    id="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                    className="border-gray-300"
                    placeholder="+251911234567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelation">Relationship</Label>
                  <Select value={formData.emergencyContactRelation} onValueChange={(value) => handleInputChange('emergencyContactRelation', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className={`border-gray-300 ${errors.licenseNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter license number"
                />
                {errors.licenseNumber && <p className="text-sm text-red-600">{errors.licenseNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseType">License Type *</Label>
                <Select value={formData.licenseType} onValueChange={(value) => handleInputChange('licenseType', value)}>
                  <SelectTrigger className={`border-gray-300 ${errors.licenseType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="heavy-vehicle">Heavy Vehicle</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  </SelectContent>
                </Select>
                {errors.licenseType && <p className="text-sm text-red-600">{errors.licenseType}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="licenseExpiry">License Expiry Date *</Label>
                <Input
                  id="licenseExpiry"
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                  className={`border-gray-300 ${errors.licenseExpiry ? 'border-red-500' : ''}`}
                />
                {errors.licenseExpiry && <p className="text-sm text-red-600">{errors.licenseExpiry}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalCertExpiry">Medical Certificate Expiry</Label>
                <Input
                  id="medicalCertExpiry"
                  type="date"
                  value={formData.medicalCertExpiry}
                  onChange={(e) => handleInputChange('medicalCertExpiry', e.target.value)}
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundCheckDate">Background Check Date</Label>
              <Input
                id="backgroundCheckDate"
                type="date"
                value={formData.backgroundCheckDate}
                onChange={(e) => handleInputChange('backgroundCheckDate', e.target.value)}
                className="border-gray-300"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Document Uploads
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'license', label: 'Driver License Copy' },
                  { key: 'medical', label: 'Medical Certificate' },
                  { key: 'background', label: 'Background Check' },
                  { key: 'photo', label: 'Profile Photo' }
                ].map((doc) => (
                  <div key={doc.key} className="space-y-2">
                    <Label>{doc.label}</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <Input
                        type="file"
                        className="hidden"
                        id={`upload-${doc.key}`}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.key, file);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById(`upload-${doc.key}`)?.click()}
                      >
                        Choose File
                      </Button>
                      {uploadedFiles[doc.key] && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {uploadedFiles[doc.key].name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                  <SelectTrigger className={`border-gray-300 ${errors.vehicleType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="pickup">Pickup Truck</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vehicleType && <p className="text-sm text-red-600">{errors.vehicleType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="plateNumber">Plate Number *</Label>
                <Input
                  id="plateNumber"
                  value={formData.plateNumber}
                  onChange={(e) => handleInputChange('plateNumber', e.target.value)}
                  className={`border-gray-300 ${errors.plateNumber ? 'border-red-500' : ''}`}
                  placeholder="AA1234"
                />
                {errors.plateNumber && <p className="text-sm text-red-600">{errors.plateNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehicleMake">Make</Label>
                <Input
                  id="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                  className="border-gray-300"
                  placeholder="Toyota"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleModel">Model</Label>
                <Input
                  id="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                  className="border-gray-300"
                  placeholder="Hiace"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleYear">Year</Label>
                <Input
                  id="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                  className="border-gray-300"
                  placeholder="2022"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehicleCapacity">Capacity (kg)</Label>
                <Input
                  id="vehicleCapacity"
                  value={formData.vehicleCapacity}
                  onChange={(e) => handleInputChange('vehicleCapacity', e.target.value)}
                  className="border-gray-300"
                  placeholder="1500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Vehicle Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTemperatureControl"
                    checked={formData.hasTemperatureControl}
                    onCheckedChange={(checked) => handleInputChange('hasTemperatureControl', checked)}
                  />
                  <Label htmlFor="hasTemperatureControl" className="text-sm font-medium">
                    Temperature Control
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDashcam"
                    checked={formData.hasDashcam}
                    onCheckedChange={(checked) => handleInputChange('hasDashcam', checked)}
                  />
                  <Label htmlFor="hasDashcam" className="text-sm font-medium">
                    Dashcam
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasGPS"
                    checked={formData.hasGPS}
                    onCheckedChange={(checked) => handleInputChange('hasGPS', checked)}
                  />
                  <Label htmlFor="hasGPS" className="text-sm font-medium">
                    GPS Tracking
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type *</Label>
                <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                  <SelectTrigger className={`border-gray-300 ${errors.employmentType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentType && <p className="text-sm text-red-600">{errors.employmentType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (ETB) *</Label>
                <Input
                  id="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className={`border-gray-300 ${errors.hourlyRate ? 'border-red-500' : ''}`}
                  placeholder="150"
                />
                {errors.hourlyRate && <p className="text-sm text-red-600">{errors.hourlyRate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="shiftStart">Shift Start Time</Label>
                <Input
                  id="shiftStart"
                  type="time"
                  value={formData.shiftStart}
                  onChange={(e) => handleInputChange('shiftStart', e.target.value)}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shiftEnd">Shift End Time</Label>
                <Input
                  id="shiftEnd"
                  type="time"
                  value={formData.shiftEnd}
                  onChange={(e) => handleInputChange('shiftEnd', e.target.value)}
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Working Days</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {workingDaysOptions.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${day}`}
                      checked={formData.workingDays.includes(day)}
                      onCheckedChange={(checked) => handleWorkingDaysChange(day, checked as boolean)}
                    />
                    <Label htmlFor={`day-${day}`} className="text-sm font-medium">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="autoAssignment" className="text-base font-medium">
                    Auto Assignment
                  </Label>
                  <p className="text-sm text-gray-600">
                    Automatically assign deliveries to this driver
                  </p>
                </div>
                <Switch
                  id="autoAssignment"
                  checked={formData.autoAssignment}
                  onCheckedChange={(checked) => handleInputChange('autoAssignment', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="gpsTracking" className="text-base font-medium">
                    GPS Tracking
                  </Label>
                  <p className="text-sm text-gray-600">
                    Enable real-time location tracking
                  </p>
                </div>
                <Switch
                  id="gpsTracking"
                  checked={formData.gpsTracking}
                  onCheckedChange={(checked) => handleInputChange('gpsTracking', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="notifications" className="text-base font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-600">
                    Send notifications for new assignments and updates
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Driver Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">License:</span>
                      <span className="font-medium">{formData.licenseNumber}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Vehicle & Employment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{formData.vehicleMake} {formData.vehicleModel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Plate:</span>
                      <span className="font-medium">{formData.plateNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{formData.employmentType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate:</span>
                      <span className="font-medium">{formData.hourlyRate} ETB/hr</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
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
                  <BreadcrumbLink href="/logistics/fleet">Fleet Management</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Add Driver</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl shadow-sm">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Add New Driver
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Complete driver registration and onboarding process
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Link href="/logistics/fleet">
                  <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Fleet
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Progress Steps */}
          <Card className="mb-6 border border-gray-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Registration Progress</h2>
                  <Badge variant="outline" className="text-sm">
                    Step {currentStep} of {totalSteps}
                  </Badge>
                </div>
                
                <Progress value={stepProgress} className="h-2" />
                
                <div className="flex justify-between">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center space-y-2">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                          ${isActive ? 'bg-slate-900 border-slate-900 text-white' : 
                            isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                            'bg-white border-gray-300 text-gray-400'}
                        `}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <span className={`text-xs font-medium ${isActive ? 'text-slate-900' : 'text-gray-500'}`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Form */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-3">
                {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Enter the driver's personal information and contact details"}
                {currentStep === 2 && "Upload required documents and certifications"}
                {currentStep === 3 && "Provide vehicle information and specifications"}
                {currentStep === 4 && "Set employment terms and working schedule"}
                {currentStep === 5 && "Configure preferences and review information"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {renderStepContent()}
            </CardContent>

            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="gap-2 bg-slate-900 hover:bg-slate-800"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="gap-2 bg-green-600 hover:bg-green-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Adding Driver...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Add Driver
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Driver Registration</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to add this driver to the fleet? This will create a new driver account and send login credentials to their email.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                          Confirm & Add Driver
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
} 