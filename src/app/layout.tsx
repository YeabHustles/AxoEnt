import { metadata } from './metadata';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css';
import { MainLayout } from '@/components/layouts/MainLayout';

export { metadata };  

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}