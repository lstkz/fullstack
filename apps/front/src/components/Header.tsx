import * as React from 'react';
import { Logo } from 'src/components/Logo';

export function Header() {
  return (
    <div className="block px-4 bg-dark">
      <div className="container">
        <div className="flex h-16">
          <Logo type="light" landing />
        </div>
      </div>
    </div>
  );
}
