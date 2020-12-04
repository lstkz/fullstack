import React from 'react';
import { useLandingModule } from '../module';
import { useEmailSubscribeForm } from '../../email-subscription/emailSubscribe-form';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { MainBanner } from './MainBanner';
import { MentorSection } from './MentorSection';
import { MoreThenCourse } from './MoreThenCourse';
import { SubscribeSection } from './SubscribeSection';
import { TargetSection } from './TargetSection';

export function LandingView() {
  useEmailSubscribeForm();
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
