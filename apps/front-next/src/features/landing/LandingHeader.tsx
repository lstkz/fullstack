import * as React from 'react';
import { Logo } from 'src/components/Logo';
import { Button } from 'src/components/Button';

export function LandingHeader() {
  return (
    <div className="px-4 py-3 bg-dark-600">
      <div className="container flex w-full items-center justify-between">
        <Logo type="light" landing />
        <Button
          type="primary"
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
  );
}
