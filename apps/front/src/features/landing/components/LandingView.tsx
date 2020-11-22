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

export function LandingView() {
  useSubscribeForm();
  useLandingModule();
  return (
    <>
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
