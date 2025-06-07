'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Truck, 
  FileText, 
  Package, 
  Settings, 
  X,
  LayoutDashboard,
  ClipboardList,
  MapPin
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/logistics/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/logistics/analytics",
    icon: BarChart3,
  },
  {
    title: "Fleet",
    href: "/logistics/fleet",
    icon: Truck,
  },
  {
    title: "Requests",
    href: "/logistics/requests",
    icon: ClipboardList,
  },
  {
    title: "Tracking",
    href: "/logistics/tracking",
    icon: MapPin,
  }
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function LogisticsSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* Logo Section */}
      <div className="flex items-center gap-2 px-6 h-[60px] border-b">
        <div className="bg-blue-50 dark:bg-blue-900/20 w-10 h-10 rounded-lg flex items-center justify-center">
          <Truck className="h-5 w-5 text-blue-600 dark:text-blue-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Logistics</span>
          <span className="text-xs text-muted-foreground">Management</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500 font-medium" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-50"
                )}
                onClick={onClose}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-400 dark:text-gray-500"
                )} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Settings */}
      <div className="px-3 py-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
        >
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-[280px] lg:fixed lg:inset-y-0 border-r">
        {SidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[280px] p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
} 