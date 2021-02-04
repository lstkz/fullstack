import React from 'react';
import { track } from 'src/track';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { MainBanner } from './MainBanner';
import { MentorSection } from './MentorSection';
import { MoreThenCourse } from './MoreThenCourse';
import { SubscribeSection } from './SubscribeSection';
import { TargetSection } from './TargetSection';
import { PurchaseSection } from './PurchaseSection';

export function LandingView() {
  React.useEffect(() => {
    track({
      type: 'landing_viewed',
    });
  }, []);
  return (
    <div className="overflow-x-hidden">
      <LandingHeader />
      <MainBanner />
      <MoreThenCourse />
      <TargetSection />
      <MentorSection />
      <PurchaseSection />
      <FaqSection />
      <SubscribeSection />
      <LandingFooter />
    </div>
  );
}
