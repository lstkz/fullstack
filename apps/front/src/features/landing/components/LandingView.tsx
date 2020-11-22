import React from 'react';
import { NewTheme } from 'src/NewTheme';
import { createGlobalStyle } from 'styled-components';
import { useLandingModule } from '../module';
import { useSubscribeForm } from '../../subscription/subscribe-form';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { MainBanner } from './MainBanner';
import { MentorSection } from './MentorSection';
import { MoreThenCourse } from './MoreThenCourse';
import { SubscribeSection } from './SubscribeSection';
import { TargetSection } from './TargetSection';

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
  #root {
    z-index: 1;
  }
  #portals {
    z-index: 2;
  }
`;

export function LandingView() {
  useSubscribeForm();
  useLandingModule();
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
