'use client';

import React from 'react';
import { Bell, Search, Menu, User, Settings, LogOut, ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";

interface LogisticsHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function LogisticsHeader({ title, onMenuClick }: LogisticsHeaderProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Convert path to breadcrumb
  const getBreadcrumb = () => {
    if (pathSegments.length <= 1) return null;
    
    const currentPage = pathSegments[pathSegments.length - 1];
    return currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950">
      <div className="flex h-[60px] items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden h-9 w-9"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <nav className="flex items-center gap-1 text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-200">Logistics</span>
            {getBreadcrumb() && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-500 dark:text-gray-400">{getBreadcrumb()}</span>
              </>
            )}
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:block flex-1 max-w-2xl px-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full h-9 pl-9 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 min-w-[200px] justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex h-9 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>

          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-9 w-9 text-gray-700 dark:text-gray-200"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full border border-gray-200 dark:border-gray-800"
                >
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Avatar"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 mt-1 border-gray-200 dark:border-gray-800"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-gray-700 dark:text-gray-200">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 dark:text-gray-200">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
} 