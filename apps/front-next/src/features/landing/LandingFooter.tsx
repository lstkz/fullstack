import * as React from 'react';
import { FooterCopyright } from 'src/components/FooterCopyright';
import { Heading } from 'src/components/Heading';
import { SectionShape } from './SectionShape';

export function LandingFooter() {
  return (
    <div className="relative bg-dark pt-24 text-gray-600">
      <SectionShape position="top" color="gray-100" inverse />
      <div className="container">
        <Heading white type={3}>
          Masz Pytania?
        </Heading>
        <div className="text-white opacity-80">
          Napisz do mnie na{' '}
          <a
            className="text-white font-semibold"
            href="mailto:lukasz@sentkiewicz"
          >
            lukasz@sentkiewicz.pl
          </a>
        </div>
        <FooterCopyright />
      </div>
    </div>
  );
}
