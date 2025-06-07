import '@/styles/globals.css';
import ClientLayout from '@/components/ClientLayout';
import { metadata } from '@/app/metadata';
import React from 'react';

export { metadata };

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <ClientLayout>
        <div className="lg:pl-0">
          {children}
        </div>
      </ClientLayout>
    </div>
  );
}