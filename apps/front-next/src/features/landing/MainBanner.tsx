import * as React from 'react';
import { SectionShape } from './SectionShape';
import { TesterMock } from './TesterMock';

export function MainBanner() {
  return (
    <div className="relative bg-dark-600 text-white ">
      <div className="container pt-3 border-0 border-t border-alpha-black20">
        <div className="grid md:grid-cols-2">
          <div className="pr-12 flex flex-col justify-center">
            <h6 className="mb-4 text-base font-semibold">
              - Ucz się od najlepszych
            </h6>
            <h2 className="text-5xl font-bold leading-snug">
              Najlepszy sposób na
              <div className="text-primary text-4xl font-semibold">
                naukę programowania.
              </div>
            </h2>
            <div className="text-lg mt-6 font-light opacity-80">
              Nowoczesna platforma edukacyjna.
              <br />
              Setki godzin praktyki.
              <br />
              Narastający stopień trudności.
              <br />
              Zacznij od kompletnych podstaw.
            </div>
          </div>
          <div className="relative">
            <div
              className="rounded-md rounded-b-none absolute bg-primary left-0 bottom-0"
              style={{
                height: 330,
                width: 240,
                zIndex: 2,
              }}
            >
              <TesterMock />
            </div>
            <div
              className="max-w-full rounded-md rounded-b-none left-28 mt-6 relative overflow-hidden"
              style={{ height: 500 }}
            >
              <img
                className="w-full rounded-md rounded-b-none"
                src={require('./assets/main-image.png')}
              />
            </div>
          </div>
        </div>
      </div>
      <SectionShape position="bottom" color="white" />
    </div>
  );
}
