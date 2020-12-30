import * as React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface DashboardProps {
  children: React.ReactNode;
  noHeader?: boolean;
}

export function Dashboard(props: DashboardProps) {
  const { children } = props;

  return (
    <>
      <div className="flex flex-col min-h-full">
        <Header />
        <div className="bg-gray-100 flex-grow flex-shrink-0">{children}</div>
        <Footer />
      </div>
    </>
  );
}
