import React from 'react';

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      {children}
    </div>
  );
} 