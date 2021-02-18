import * as React from 'react';
import { Logo } from 'src/components/Logo';
import { Button } from 'src/components/Button';
import { createUrl } from 'src/common/url';
import { track } from 'src/track';
import { useIsMobile } from 'src/hooks/useIsMobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export function LandingHeader() {
  const isMobile = useIsMobile(500);
  const btnSize = isMobile ? 'small' : undefined;
  return (
    <div className=" py-3 bg-dark-600">
      <div className="container flex w-full items-center justify-between">
        <Logo type="light" landing />
        <div className="ml-2 flex">
          <Button
            type="primary"
            size={btnSize}
            onClick={() => {
              track({
                type: 'landing_try_clicked',
              });
              document.getElementById('purchase-section')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            Wypróbuj
          </Button>
          <Button
            className="ml-3"
            type="secondary"
            size={btnSize}
            href={createUrl({ name: 'login' })}
          >
            {isMobile ? <FontAwesomeIcon icon={faSignInAlt} /> : 'Zaloguj się'}
          </Button>
        </div>
      </div>
    </div>
  );
}
