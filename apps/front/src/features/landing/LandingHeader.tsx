import * as React from 'react';
import { Logo } from 'src/components/Logo';
import { Button } from 'src/components/Button';
import { useIsMobile } from 'src/hooks/useIsMobile';

export function LandingHeader() {
  const isMobile = useIsMobile(500);
  const btnSize = isMobile ? 'small' : undefined;
  return (
    <div className=" py-3 bg-dark-600">
      <div className="container flex w-full items-center justify-between">
        <Logo type="light" landing />
        <div className="ml-2 flex">
          <Button
            type="primary"
            size={btnSize}
            onClick={() => {
              document.getElementById('subscribe-section')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            Zapisz się
          </Button>
        </div>
      </div>
    </div>
  );
}
