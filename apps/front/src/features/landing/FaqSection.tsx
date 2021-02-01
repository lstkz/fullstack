import * as React from 'react';
import { Accordion, AccordionItem } from 'src/components/AccordionItem';
import { SectionShape } from './SectionShape';
import { Heading } from 'src/components/Heading';

export function FaqSection() {
  return (
    <div className="text-white py-28 bg-primary relative">
      <div className="container">
        <Heading className="mb-12 text-center" type={2} white>
          Najczęstsze pytania
        </Heading>
        <div className="grid lg:grid-cols-2 lg:gap-6">
          <div>
            <Accordion>
              <AccordionItem header={<>Czego się nauczę konkretnie?</>}>
                Nauczysz się rozwiązywania zadań, zaczynając od fundamentów. Na
                samym początku kariery programisty, kluczowe jest, aby umieć
                przepisywać "logikę biznesową" na kod.
                <br />
                Następnie zaczniesz się uczyć technologii z frontendu i
                backendu.
              </AccordionItem>
              <AccordionItem header={<>Jak wyglądają zadania do zrobienia?</>}>
                Cały kod piszesz w wbudowanym Visual Studio Code w przeglądarce.
                Nie musisz nic ściągać, ani instalować. Testowanie odbywa się
                automaczynie, a wynik otrzymasz w parę sekund.
              </AccordionItem>
              <AccordionItem header={<>Ile czasu muszę poświęcić?</>}>
                Każdy moduł wymaga od 100 do 200 godzin praktyki. <br />
                Nie ma limitów czasowych na wykonanie zadań.
              </AccordionItem>
              <AccordionItem
                header={
                  <>Jakie języki programowania i technologie są dostępne?</>
                }
              >
                W pierwszej kolejności będą się pojawiać moduły z TypeScripta,
                Reacta, Node.JSa, HTML/CSS.
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
              <AccordionItem
                header={<>Co jeśli chcę zostać tylko frontend developerem?</>}
              >
                Jeżeli nie chcesz zostać fullstackiem, to możesz zrobić tylko te
                moduły, które Cię interesują. <br />
                Frontend developerzy mogą pominąć moduły z Node.JS i baz danych.{' '}
                <br />
                Backend developerzy mogą pominąć moduły z HTML, CSS i Reacta.
              </AccordionItem>
              <AccordionItem header={<>Czy jest dostęp do społeczności?</>}>
                Tak, każda osoba, która kupi kurs, otrzyma dostęp do prywatnego
                Discorda.
              </AccordionItem>
              <AccordionItem header={<>Czy są zwroty?</>}>
                Tak, masz 14 dni na przetestowanie produktu. Jeśli Ci się nie
                spodobał, zwrócimy Ci pieniądze.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <SectionShape position="bottom" color="gray-100" />
    </div>
  );
}
