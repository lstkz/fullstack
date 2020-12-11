import { Logo } from 'src/components/Logo';
import * as React from 'react';

export function TaskHeader() {
  return (
    <div className="flex items-center h-8 px-8 bg-dark">
      <Logo type="light" titleClassName="text-xl " />
    </div>
  );
}
