import React from 'react';
import * as Rx from 'rxjs';
import { NewTheme } from 'src/NewTheme';
import { createGlobalStyle } from 'styled-components';
import { createModule } from 'typeless';
import { LandingSymbol } from '../symbol';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { MainBanner } from './MainBanner';
import { MentorSection } from './MentorSection';
import { MoreThenCourse } from './MoreThenCourse';
import { SubscribeSection } from './SubscribeSection';
import { TargetSection } from './TargetSection';

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
  figure {
    max-width: 100%;
    min-height: 1px;
  }
  figcaption, figure, main {
      display: block;
      margin: 0;
  }
`;

export function LandingView() {
  return (
    <>
      <GlobalStyles />
      <LandingHeader />
      <MainBanner />
      <MoreThenCourse />
      <TargetSection />
      <MentorSection />
      <FaqSection />
      <SubscribeSection />
      <LandingFooter />
    </>
  );
}
