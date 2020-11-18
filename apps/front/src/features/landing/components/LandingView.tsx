import React from 'react';
import * as Rx from 'rxjs';
import { NewTheme } from 'src/NewTheme';
import { createGlobalStyle } from 'styled-components';
import { createModule } from 'typeless';
import { LandingSymbol } from '../symbol';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { MainBanner } from './MainBanner';
import { MoreThenCourse } from './MoreThenCourse';
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
    color: ${NewTheme.body_color};
  }
  a {
    color: ${NewTheme.primary};
    &:hover {
        text-decoration: none;
    }
  }
`;

export function LandingView() {
  return (
    <>
      <GlobalStyles />
      <LandingHeader />
      <MainBanner />
      <MoreThenCourse />
      <SubscribeSection />
      <LandingFooter />
    </>
  );
}
