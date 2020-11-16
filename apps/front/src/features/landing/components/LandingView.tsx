import React from 'react';
import * as Rx from 'rxjs';
import { createModule } from 'typeless';
import { LandingSymbol } from '../symbol';

export const [handle, LandingActions] = createModule(LandingSymbol).withActions(
  {
    $mounted: null,
  }
);

handle.epic().on(LandingActions.$mounted, () => {
  return Rx.empty();
});

export function LandingView() {
  return (
    <>
      <h1>WORK IN PROGRESS</h1>
    </>
  );
}
