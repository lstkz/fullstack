import * as React from 'react';
import { Logo } from 'src/components/Logo';
import { Button } from 'src/components/Button';
import { createUrl } from 'src/common/url';
import { track } from 'src/track';

export function LandingHeader() {
  return (
    <div className="px-4 py-3 bg-dark-600">
      <div className="container flex w-full items-center justify-between">
        <Logo type="light" landing />
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="primary"
            onClick={() => {
              track({
                type: 'landing_try_clicked',
              });
              document.getElementById('purchase-section')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            Wypróbuj
          </Button>
          <Button type="secondary" href={createUrl({ name: 'login' })}>
            Zaloguj się
          </Button>
        </div>
      </div>
    </div>
  );
}
