import React from 'react';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { MainBanner } from './MainBanner';
import { MentorSection } from './MentorSection';
import { MoreThenCourse } from './MoreThenCourse';
import { TargetSection } from './TargetSection';
import { PurchaseSection } from './PurchaseSection';
import { SubscribeSection } from './SubscribeSection';

export function LandingView() {
  return (
    <div className="overflow-x-hidden">
      <LandingHeader />
      <MainBanner />
      {/* <MoreThenCourse /> */}
      {/* <TargetSection /> */}
      <MentorSection />
      {/* <PurchaseSection /> */}
      {/* <FaqSection /> */}
      <SubscribeSection />
      <LandingFooter />
    </div>
  );
}
