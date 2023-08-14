import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-full bg-contentBackground md:bg-background [&>*]:shrink-0 [&>*]:min-h-0">
      <Nav />

      {children}

      <Footer />
    </div>
  );
}
