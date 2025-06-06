import '@/styles/globals.css';
import ClientLayout from '@/components/ClientLayout';
import { metadata } from '@/app/metadata';
import { Providers } from '@/providers';

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}