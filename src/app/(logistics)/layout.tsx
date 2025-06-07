'use client';

import React, { useState } from 'react';
import { LogisticsSidebar } from '@/components/logistics/LogisticsSidebar';
import { LogisticsHeader } from '@/components/logistics/LogisticsHeader';
import { usePathname } from 'next/navigation';

interface LogisticsLayoutProps {
  children: React.ReactNode;
}

export default function LogisticsLayout({ children }: LogisticsLayoutProps) {
  const pathname = usePathname();
  const pageName = pathname.split('/').pop() || 'overview';
  const pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <LogisticsSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      <div className="flex-1">
        <LogisticsHeader 
          title={pageTitle} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 lg:pl-72">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 