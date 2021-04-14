import * as React from 'react';
import { Illustration10 } from './Illustration10';
import { SectionShape } from './SectionShape';

export function MainBanner() {
  return (
    <div className="relative bg-dark-600 text-white ">
      <div className="container pt-3 border-0 border-t border-alpha-black20">
        <div className="grid lg:grid-cols-2 py-20">
          <div className="pr-6 flex flex-col justify-center">
            <h6 className="mb-4 text-base font-semibold">
              - Ucz się od najlepszych
            </h6>
            <h2 className="text-5xl font-bold leading-tight">
              Profesjonalne szkolenia&nbsp;dla
              <div className="text-primary text-4xl font-semibold">
                fullstack developerów.
              </div>
            </h2>
            <div className="text-lg mt-6 font-light opacity-80">
              Kursy programowania.
              <br />
              Szkolenia i workshopy.
              <br />
              Indywidualne prowadzenie i konsultacje.
            </div>
          </div>

          <div className="hidden lg:block ">
            <Illustration10 />
          </div>
        </div>
      </div>
      <SectionShape position="bottom" color="white" />
    </div>
  );
}
