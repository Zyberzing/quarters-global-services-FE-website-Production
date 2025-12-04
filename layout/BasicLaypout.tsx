'use client'; // required for client-side hooks

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import { Footer } from './Footer';

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const pathname = usePathname();

  // Hide header/footer on /dashboard (and its subpaths) and /login
  const hideLayout = pathname.startsWith('/dashboard') || pathname === '/login';

  return (
    <>
     <Header />
      {children}
       <Footer />
    </>
  );
};

export default BasicLayout;
