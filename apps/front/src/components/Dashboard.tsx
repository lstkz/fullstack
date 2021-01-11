import * as React from 'react';
import { useIsMobile } from 'src/hooks/useIsMobile';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileHeader } from './MobileHeader';

interface DashboardProps {
  children: React.ReactNode;
  noHeader?: boolean;
}

export function Dashboard(props: DashboardProps) {
  const { children } = props;
  const isMobile = useIsMobile(600);

  return (
    <>
      <div className="flex flex-col min-h-full">
        {isMobile ? <MobileHeader /> : <Header />}
        <div className="bg-gray-100 flex-grow flex-shrink-0">{children}</div>
        <Footer />
      </div>
    </>
  );
}
