import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { HeadTitle } from 'src/components/HeadTitle';
import { Pricing } from 'src/components/Pricing';

export function PricingPage() {
  return (
    <Dashboard>
      <HeadTitle title="Cennik" />
      <Pricing />
    </Dashboard>
  );
}
