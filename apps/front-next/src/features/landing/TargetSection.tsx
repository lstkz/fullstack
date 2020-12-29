import * as React from 'react';
import { ChartIcon } from 'src/icons/ChartIcon';
import { CodeIcon } from 'src/icons/CodeIcon';
import { GroupIcon } from 'src/icons/GroupIcon';
import { MoneyBagIcon } from 'src/icons/MoneyBagIcon';
import { Illustration3 } from './Illustration3';
import { Media } from './Media';
import { SectionShape } from './SectionShape';
import { HeadingNext } from 'src/components/HeadingNext';

export function TargetSection() {
  return (
    <div className="bg-dark relative">
      <div className=" py-24 container">
        <div className="grid items-center justify-between md:grid-cols-2 md:gap-24">
          <div>
            <HeadingNext white type={3}>
              Dla kogo jest fullstack.pl?
            </HeadingNext>
            <div className="text-white opacity-80 mt-2 mb-12">
              Ta platforma jest odpowiednia dla Ciebie, jeżeli:
            </div>
            <Media
              icon={<CodeIcon />}
              title="Chcesz się nauczyć programować od zera"
            >
              Wszystko jest tłumaczone krok po kroku. Teoria jest przeplatana na
              zmianę z praktyką. Nauczysz się najnowszej wersji TypeScripta i
              najlepszych praktyk.
            </Media>
            <Media
              icon={<ChartIcon />}
              title="Masz trochę doświadczenie, ale..."
            >
              Ciągle masz problem z pisaniem bardziej skomplikowanego kodu i
              "logiki biznesowej". Duża liczba zadań pomoże Ci nabrać wprawy.
            </Media>
            <Media
              icon={<GroupIcon />}
              title="Chcesz z łatwością przechodzić rozmowy rekrutacyjne"
            >
              Ponad 90% kandydatów odpada na praktycznym zadaniu rekrutacyjnym.
              Wkuwanie na pamięć dziesiątek pytań niewiele daje. Po skończonym
              kursie, rozmowy o prace będą dużo łatwiejsze.
            </Media>
            <Media
              icon={<MoneyBagIcon />}
              title="Chcesz kiedyś zostać programistą 20k"
            >
              Topowe stawki są możliwe po 3-4 latach doświadczenia. W kursie
              będą zadania łatwe oraz trudne, które nakierują Cię na odpowiednią
              ścieżkę nauki. Wiele osób zatrzymuje się na poziomie podstawowym.
            </Media>
          </div>
          <div>
            <Illustration3
              className="max-w-full h-auto "
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        </div>
      </div>
      <SectionShape position="bottom" color="white" />
    </div>
  );
}
