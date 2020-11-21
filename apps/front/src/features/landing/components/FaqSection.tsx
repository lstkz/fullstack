import * as React from 'react';
import { Container } from 'src/components/Container';
import { Accordion, AccordionItem } from 'src/new-components/AccordionItem';
import { Row, Col } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SectionShape } from './SectionShape';

interface FaqSectionProps {
  className?: string;
}

const _FaqSection = (props: FaqSectionProps) => {
  const { className } = props;
  return (
    <div className={className}>
      {/* <SectionShape position="top" color="white" inverse /> */}
      <Container>
        <Heading type={2} mb={5} white center>
          Najczęstsze pytania
        </Heading>
        <Row>
          <Col lg={6}>
            <Accordion>
              <AccordionItem header={<>Czego się nauczę konkretnie?</>}>
                Nauczysz się TypeScripta i rozwiązywania zadań bez frameworków.
                Na samym początku kariery programisty, kluczowe jest, aby umieć
                przepisywać "logikę biznesową" na kod.
                <br />
                Celem tego kursu jest nauka fundamentów, które będą potrzebne w
                poźniejszej pracy frontend i/lub backend developera.
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
                Im więcej typ lepiej 🙂. Będziesz musiał poświęcić od 6 do 10
                godzin dziennie. Niestety, ale nie da się nauczyć programować
                siedząc 2 godziny przez weekend.
                <br />
                Dostęp do kursu jest nieograniczony. Możesz robić zadania przez
                dowolnie długi czas!
              </AccordionItem>
            </Accordion>
          </Col>
          <Col lg={6} mt={0}>
            <Accordion>
              <AccordionItem
                header={<>Co jeżeli nie będę umiał zrobić zadania?</>}
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
          </Col>
        </Row>
        <SectionShape position="bottom" color="white" />
      </Container>
    </div>
  );
};

export const FaqSection = styled(_FaqSection)`
  position: relative;
  display: block;
  background: ${NewTheme.primary};
  padding: 7.5rem 0;
  color: white;
`;
