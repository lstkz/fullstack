import React from 'react';
import { Pricing } from 'src/components/Pricing';
import { track } from 'src/track';

export function PurchaseSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    let isReported = false;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting || isReported) {
          return;
        }
        track({
          type: 'landing_purchase_section_viewed',
        });
        isReported = true;
      },
      {
        threshold: 0.5,
      }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-100 py-8" id="purchase-section" ref={ref}>
      <Pricing />
    </div>
  );
}
