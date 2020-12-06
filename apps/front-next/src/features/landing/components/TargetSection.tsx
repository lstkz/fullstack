import * as React from 'react';
import { Container } from 'src/components/Container';
import { ChartIcon } from 'src/icons/ChartIcon';
import { CodeIcon } from 'src/icons/CodeIcon';
import { GroupIcon } from 'src/icons/GroupIcon';
import { MoneyBagIcon } from 'src/icons/MoneyBagIcon';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { spacerStyle } from 'src/components/_spacer';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { Illustration3 } from './Illustration3';
import { Media } from './Media';
import { SectionShape } from './SectionShape';

interface TargetSectionProps {
  className?: string;
}

const MainRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  svg {
    max-width: 100%;
    height: auto;
    transform: scaleX(-1);
  }
`;

const Text = styled.div`
  opacity: 0.8;
  color: white;
  ${spacerStyle}
`;

const _TargetSection = (props: TargetSectionProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <MainRow>
          <Col md={6}>
            <Heading white type={3}>
              Dla kogo jest fullstack.pl?
            </Heading>
            <Text mt={2} mb={5}>
              Ta platforma jest odpowiednia dla Ciebie, jeżeli:
            </Text>
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
          </Col>
          <Col md={5}>
            <Illustration3 />
          </Col>
        </MainRow>
        <SectionShape position="bottom" color="white" />
      </Container>
    </div>
  );
};

export const TargetSection = styled(_TargetSection)`
  display: block;
  background: ${Theme.dark};
  padding: 6rem 0;
  position: relative;
`;
