import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { Heading } from 'src/components/Heading';
import { HeadTitle } from 'src/components/HeadTitle';

export function TermsPage() {
  return (
    <Dashboard>
      <HeadTitle title="Regulamin" />
      <div className="container">
        <div className="py-12">
          <Heading type={2} className="text-center mb-10">
            Regulamin
          </Heading>
        </div>
        <div>
          <a
            target="_blank"
            href="https://cdn.fullstack.pl/assets/regulamin_09.02.2021.9204d2178036a6e9816fa3f4b7dbfde9.pdf"
          >
            Regulamin z dnia 09.02.2021
          </a>
        </div>
      </div>
    </Dashboard>
  );
}
