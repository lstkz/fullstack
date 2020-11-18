import React from 'react';
import * as Rx from 'rxjs';
import { createGlobalStyle } from 'styled-components';
import { createModule } from 'typeless';
import { LandingSymbol } from '../symbol';
import { LandingHeader } from './LandingHeader';
import { MainBanner } from './MainBanner';
import { SubscribeSection } from './SubscribeSection';

export const [handle, LandingActions] = createModule(LandingSymbol).withActions(
  {
    $mounted: null,
  }
);

handle.epic().on(LandingActions.$mounted, () => {
  return Rx.empty();
});

const GlobalStyles = createGlobalStyle` 
  body {
    font-family: "Nunito Sans", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.7;
    background: white;
  }
`;

export function LandingView() {
  return (
    <>
      <GlobalStyles />
      <LandingHeader />
      <MainBanner />
      <SubscribeSection />
    </>
  );
}
