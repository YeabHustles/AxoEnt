'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Store, X, ExternalLink, Package, Globe, CreditCard, Check, ArrowRight, Building2, Rocket, Settings, ShoppingBag, Bell, Users, Palette, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SetupTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  buttonText?: string;
  icon?: React.ReactNode;
  timeEstimate?: string;
}

interface SetupSection {
  id: string;
  title: string;
  tasks: SetupTask[];
}

interface StoreInfo {
  name: string;
  lastUpdated: string;
  updatedBy: string;
}

export default function Home() {
  const [openSectionId, setOpenSectionId] = useState<string>('store-name');
  const [sections] = useState<SetupSection[]>([
    {
      id: 'store-name',
      title: 'Store name',
      tasks: [
        {
          id: 'name-store',
          title: 'Name your store',
          description: 'Your store name is set to "${storeInfo.name}"',
          completed: true,
          buttonText: 'Edit name',
          icon: <Building2 className="w-4 h-4" />,
          timeEstimate: '2 min'
        }
      ]
    },
    {
      id: 'sell-online',
      title: 'Sell online',
      tasks: [
        {
          id: 'add-product',
          title: 'Add your first product',
          description: 'Write a description and add photos',
          completed: false,
          buttonText: 'Add product',
          icon: <Plus className="w-4 h-4" />,
          timeEstimate: '10 min'
        },
        {
          id: 'customize-store',
          title: 'Customize your online store',
          description: "Choose a theme and add your branding",
          completed: false,
          buttonText: 'Customize',
          icon: <Palette className="w-4 h-4" />,
          timeEstimate: '15 min'
        },
        {
          id: 'add-domain',
          title: 'Add a custom domain',
          description: 'Get a professional web address',
          completed: false,
          buttonText: 'Add domain',
          icon: <Globe className="w-4 h-4" />,
          timeEstimate: '5 min'
        }
      ]
    },
    {
      id: 'store-settings',
      title: 'Store settings',
      tasks: [
        {
          id: 'business-details',
          title: 'Add business details',
          description: 'Add your business information',
          completed: false,
          buttonText: 'Add details',
          icon: <Package className="w-4 h-4" />,
          timeEstimate: '8 min'
        },
        {
          id: 'payment-provider',
          title: 'Set up payments',
          description: "Choose how you'll get paid",
          completed: false,
          buttonText: 'Set up',
          icon: <CreditCard className="w-4 h-4" />,
          timeEstimate: '5 min'
        },
        {
          id: 'tax-settings',
          title: 'Configure tax settings',
          description: 'Set up your tax rates and regions',
          completed: false,
          buttonText: 'Configure',
          icon: <Settings className="w-4 h-4" />,
          timeEstimate: '10 min'
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing setup',
      tasks: [
        {
          id: 'social-media',
          title: 'Connect social accounts',
          description: 'Link your social media profiles',
          completed: false,
          buttonText: 'Connect',
          icon: <Share2 className="w-4 h-4" />,
          timeEstimate: '5 min'
        },
        {
          id: 'notifications',
          title: 'Set up notifications',
          description: 'Configure email and SMS alerts',
          completed: false,
          buttonText: 'Configure',
          icon: <Bell className="w-4 h-4" />,
          timeEstimate: '3 min'
        }
      ]
    }
  ]);

  const totalTasks = sections.reduce((acc, section) => acc + section.tasks.length, 0);
  const completedTasks = sections.reduce((acc, section) => 
    acc + section.tasks.filter(task => task.completed).length, 0);
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const toggleSection = (sectionId: string) => {
    setOpenSectionId(sectionId === openSectionId ? '' : sectionId);
  };

  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: 'My Store',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Admin'
  });
  const [newStoreName, setNewStoreName] = useState('');
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);

  const handleStoreNameChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStoreName && newStoreName.length >= 3) {
      setStoreInfo({
        name: newStoreName,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin'
      });
      setIsNameDialogOpen(false);
      setNewStoreName('');
    }
  };

  const [isDomainDialogOpen, setIsDomainDialogOpen] = useState(false);
  const [domainInfo, setDomainInfo] = useState({
    customDomain: '',
    status: 'pending' as 'pending' | 'active' | 'error',
    currentDomain: 'mystore.axova.store'
  });
  const [domainError, setDomainError] = useState('');

  const validateDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domain) return 'Domain is required';
    if (!domainRegex.test(domain)) return 'Please enter a valid domain';
    return '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-white p-3.5 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Get 3 months at 500 ETB / month</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-8 bg-white hover:bg-gray-100 text-black w-full sm:w-auto"
            >
              Select plan
            </Button>
            <button className="text-white/80 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Setup guide</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Complete these steps to launch your store
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50/80 px-3 py-1.5 rounded-full border border-gray-100">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-sm border border-gray-200 text-xs font-medium text-gray-700">
                  {completedTasks}
                </div>
                <span className="text-xs text-gray-600">of {totalTasks}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8"
              >
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                View store
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {progressPercentage === 100 
              ? 'All set! Your store is ready to launch.' 
              : `${Math.round(progressPercentage)}% complete`
            }
          </p>
        </div>

        {/* Setup Sections */}
        <div className="space-y-3">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className={`border rounded-lg overflow-hidden bg-white transition-all duration-200 ${
                section.id === openSectionId 
                  ? 'shadow-sm ring-1 ring-gray-200' 
                  : 'hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-3.5 transition-colors ${
                  section.id === openSectionId 
                    ? 'bg-gray-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-medium text-gray-900 text-sm truncate">{section.title}</span>
                  {section.tasks.every(task => task.completed) && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex-shrink-0">
                      Completed
                    </span>
                  )}
                </div>
                {section.id === openSectionId ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {section.id === openSectionId && (
                <div className="border-t divide-y divide-gray-100">
                  {section.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors group relative"
                    >
                      <button
                        className={`w-4 h-4 rounded-full border flex-shrink-0 mt-1 flex items-center justify-center transition-all duration-200 ${
                          task.completed 
                            ? 'bg-emerald-600 border-emerald-600 ring-2 ring-emerald-100' 
                            : 'border-gray-300 group-hover:border-gray-400 group-hover:scale-105'
                        }`}
                      >
                        {task.completed && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                              {task.timeEstimate && (
                                <span className="text-xs text-gray-500">· {task.timeEstimate}</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {task.description}
                            </p>
                          </div>
                          {task.id === 'name-store' && (
                            <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className={`h-8 text-xs shadow-sm transition-all duration-200 w-full sm:w-auto ${
                                    task.completed 
                                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-50/80' 
                                      : 'hover:border-gray-400 hover:bg-gray-50/50'
                                  }`}
                                >
                                  {task.icon}
                                  <span className="ml-1.5">{task.buttonText}</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit store name</DialogTitle>
                                  <DialogDescription>
                                    Change your store's name. This will be visible to your customers across all channels.
                                  </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleStoreNameChange}>
                                  <div className="space-y-6 py-4">
                                    {/* Current Store Info */}
                                    <div className="bg-gray-50 p-3 rounded-lg border">
                                      <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Store className="w-4 h-4" />
                                        <span>Current store name:</span>
                                        <span className="font-medium text-gray-900">{storeInfo.name}</span>
                                      </div>
                                      <div className="mt-2 text-xs text-gray-500">
                                        Last updated {new Date(storeInfo.lastUpdated).toLocaleDateString()} by {storeInfo.updatedBy}
                                      </div>
                                    </div>

                                    {/* New Name Input */}
                                    <div className="space-y-2">
                                      <Label htmlFor="storeName">New store name</Label>
                                      <div className="relative">
                                        <Input
                                          id="storeName"
                                          value={newStoreName}
                                          onChange={(e) => setNewStoreName(e.target.value)}
                                          placeholder="Enter new store name"
                                          className="pr-24"
                                          autoComplete="off"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                          {newStoreName && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0 hover:bg-transparent"
                                              onClick={() => setNewStoreName('')}
                                            >
                                              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            </Button>
                                          )}
                                          <span className="text-xs text-gray-400">
                                            {newStoreName.length}/50
                                          </span>
                                        </div>
                                      </div>
                                      
                                      {/* Validation Messages */}
                                      <div className="text-xs space-y-1">
                                        {newStoreName.length < 3 && newStoreName.length > 0 && (
                                          <p className="text-red-500">Store name must be at least 3 characters</p>
                                        )}
                                        {newStoreName.length > 50 && (
                                          <p className="text-red-500">Store name cannot exceed 50 characters</p>
                                        )}
                                        {newStoreName === storeInfo.name && (
                                          <p className="text-yellow-600">New name is same as current name</p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Preview */}
                                    {newStoreName && (
                                      <div className="space-y-2">
                                        <Label className="text-sm text-gray-500">Preview</Label>
                                        <div className="p-3 border rounded-lg bg-white">
                                          <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                                              <span className="text-white font-medium">
                                                {newStoreName.slice(0, 2).toUpperCase()}
                                              </span>
                                            </div>
                                            <div className="flex flex-col">
                                              <span className="font-medium text-sm">{newStoreName}</span>
                                              <span className="text-xs text-gray-500">mystore.axova.com</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <DialogFooter>
                                    <Button 
                                      type="button" 
                                      variant="ghost" 
                                      onClick={() => {
                                        setIsNameDialogOpen(false);
                                        setNewStoreName('');
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      type="submit"
                                      disabled={
                                        !newStoreName || 
                                        newStoreName === storeInfo.name || 
                                        newStoreName.length < 3 ||
                                        newStoreName.length > 50
                                      }
                                    >
                                      Save changes
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                          {task.id === 'add-domain' && (
                            <Dialog open={isDomainDialogOpen} onOpenChange={setIsDomainDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8 text-xs shadow-sm transition-all duration-200 w-full sm:w-auto hover:border-gray-400 hover:bg-gray-50/50"
                                >
                                  {task.icon}
                                  <span className="ml-1.5">{task.buttonText}</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Add custom domain</DialogTitle>
                                  <DialogDescription>
                                    Connect your existing domain to your store.
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 py-4">
                                  {/* Current Domain Info */}
                                  <div className="bg-gray-50 p-3 rounded-lg border">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <Globe className="w-4 h-4" />
                                      <span>Current domain:</span>
                                      <span className="font-medium text-gray-900">{domainInfo.currentDomain}</span>
                                    </div>
                                  </div>

                                  {/* Domain Input */}
                                  <div className="space-y-2">
                                    <Label>Enter your domain</Label>
                                    <div className="relative">
                                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                      <Input
                                        value={domainInfo.customDomain}
                                        onChange={(e) => {
                                          const domain = e.target.value;
                                          setDomainInfo(prev => ({ ...prev, customDomain: domain }));
                                          setDomainError(validateDomain(domain));
                                        }}
                                        placeholder="example.com"
                                        className="pl-10"
                                      />
                                    </div>
                                    {domainError && (
                                      <p className="text-xs text-red-500">{domainError}</p>
                                    )}
                                  </div>

                                  {/* Instructions */}
                                  <div className="space-y-3">
                                    <h4 className="text-sm font-medium">Next steps:</h4>
                                    <div className="space-y-2">
                                      {[
                                        'Update your DNS settings at your domain provider',
                                        'Add CNAME record pointing to axova.store',
                                        'Add TXT record for domain verification',
                                        'Wait for DNS propagation (up to 48 hours)'
                                      ].map((step, index) => (
                                        <div key={index} className="flex items-start gap-2 text-sm">
                                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs text-gray-600">{index + 1}</span>
                                          </div>
                                          <span className="text-gray-600">{step}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Domain Preview */}
                                  {domainInfo.customDomain && !domainError && (
                                    <div className="space-y-2">
                                      <Label className="text-sm text-gray-500">Preview</Label>
                                      <div className="p-3 border rounded-lg bg-white space-y-3">
                                        <div className="flex items-center gap-2">
                                          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                                            <Globe className="w-4 h-4 text-white" />
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="font-medium text-sm">{domainInfo.customDomain}</span>
                                            <span className="text-xs text-gray-500">Primary domain</span>
                                          </div>
                                        </div>
                                        <div className="text-xs bg-blue-50 text-blue-700 p-2 rounded">
                                          Domain will be connected after DNS verification
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <DialogFooter>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => {
                                      setIsDomainDialogOpen(false);
                                      setDomainInfo(prev => ({ ...prev, customDomain: '' }));
                                      setDomainError('');
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    type="submit"
                                    disabled={!domainInfo.customDomain || !!domainError}
                                  >
                                    Connect domain
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}