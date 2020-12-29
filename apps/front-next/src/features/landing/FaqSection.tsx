import * as React from 'react';
import { Accordion, AccordionItem } from 'src/components/AccordionItem';
import { Theme } from 'src/Theme';
import { SectionShape } from './SectionShape';
import { HeadingNext } from 'src/components/HeadingNext';

export function FaqSection() {
  return (
    <div className="text-white py-28 bg-primary relative">
      <div className="container">
        <HeadingNext className="mb-12 text-center" type={2} white>
          Najczęstsze pytania
        </HeadingNext>
        <div className="grid lg:grid-cols-2 lg:gap-6">
          <div>
            <Accordion>
              <AccordionItem header={<>Czego się nauczę konkretnie?</>}>
                Nauczysz się TypeScripta i rozwiązywania zadań bez frameworków.
                Na samym początku kariery programisty, kluczowe jest, aby umieć
                przepisywać "logikę biznesową" na kod.
                <br />
                Celem tego kursu jest nauka fundamentów, które będą potrzebne w
                późniejszej pracy frontend i/lub backend developera.
              </AccordionItem>
              <AccordionItem header={<>Dla kogo NIE jest ten kurs?</>}>
                Ten kurs nie jest dla osób, których celem jest tworzenie tylko
                prostych stron z użyciem HTMLa i CSSów.
              </AccordionItem>
              <AccordionItem header={<>Jak wyglądają zadania do zrobienia?</>}>
                Cały kod piszesz w wbudowanym Visual Studio Code w przeglądarce.
                Nie musisz nic ściągać, ani instalować. Testowanie odbywa się
                automaczynie, a wynik otrzymasz w parę sekund.
              </AccordionItem>
              <AccordionItem header={<>Ile czasu muszę poświęcić?</>}>
                Im więcej typ lepiej 🙂. Będziesz musiał(a) poświęcić od 6 do 10
                godzin dziennie. Niestety, ale nie da się nauczyć programować
                siedząc 2 godziny przez weekend.
                <br />
                Dostęp do kursu jest nieograniczony. Możesz robić zadania przez
                dowolnie długi czas!
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionItem
                header={<>Co jeżeli nie będę umiał(a) zrobić zadania?</>}
              >
                Dostępna będzie wskazówka tekstowa, która opisuje rozwiązania
                zadania. Jeżeli ciągle masz trudności, to możesz obejrzeć
                kompletne rozwiązanie video stworzone przez mentora. Ważne jest,
                aby rozwiązać 80-90% wszystkich zadań samodzielnie.
              </AccordionItem>
              <AccordionItem header={<>Czy jest dostęp do społeczności?</>}>
                Tak, każda osoba, która kupi kurs, otrzyma dostęp do prywatnego
                Slacka.
              </AccordionItem>
              <AccordionItem header={<>Czy otrzymam fakturę VAT?</>}>
                Tak, możesz otrzymać fakturę z 23% VAT.
              </AccordionItem>
              <AccordionItem header={<>Czy są zwroty?</>}>
                Tak, możesz otrzymać 100% zwrotu pieniędzy do 14-dni od
                uzyskania dostępu do kursu.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <SectionShape position="bottom" color={Theme.section_secondary} />
    </div>
  );
}
