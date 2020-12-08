import React from 'react';
import { createUrl } from 'src/common/url';
import { Button } from 'src/components/Button';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { Theme } from 'src/Theme';
import styled from 'styled-components';

const Desc = styled.div`
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  position: relative;
  margin-bottom: 30px;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-clip: border-box;
  border: 1px solid ${Theme.gray_200};
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    z-index: 2;
    transform: scale(1.1);
  }
`;

const CardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.75rem;
  color: ${Theme.gray_600};
  text-align: center;

  ${Button} {
    min-width: 8rem;
  }
`;

const Footer = styled.div`
  text-align: center;
  font-size: 0.875rem;
  margin-top: 2rem;
`;

const CardHeader = styled.div`
  padding: 3rem 0;
  text-align: center;
  color: ${Theme.headings_color};
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 80%;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -40%;
    height: 1px;
    background: radial-gradient(
      ellipse at center,
      #d1dbe7 0,
      rgba(255, 255, 255, 0) 75%
    );
  }
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 2.5rem;
  small {
    font-size: 1.5rem;
  }
`;

const MainRow = styled(Row)`
  justify-content: center;
`;

const Type = styled.div`
  color: ${Theme.gray_600};
  font-weight: 600;
`;

const Features = styled.ul`
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  padding-left: 0;
  list-style: none;
  li {
    padding: 0.5rem 0;
  }
`;

const BlueCard = styled(Card)`
  background: ${Theme.primary};
  color: white;
  ${CardHeader}, ${CardBody}, ${Type} {
    color: white;
  }
  ${Features} li {
    opacity: 0.8;
  }
`;

export function PricingPage() {
  return (
    <Dashboard>
      <Container>
        <Heading type={2} center mt={6}>
          Prosta oferta
        </Heading>
        <Desc>
          Zacznij za darmo albo wykup płatny dostęp do całej platformy.
          <br />W wersji darmowej masz dostęp tylko do teori, bez praktyki.
        </Desc>
        <MainRow>
          <Col lg={4}>
            <Card>
              <CardHeader>
                <Price>
                  0 <small>zł/mc</small>
                </Price>
                <Type>Wersja Darmowa</Type>
              </CardHeader>
              <CardBody>
                <Features>
                  <li>Dostęp do wszystkich filmów</li>
                  <li>Jakość video 720p</li>
                  <li>Dostęp do przykładowych rozwiązań przez mentora</li>
                </Features>
                <Button
                  type="warning"
                  size="small"
                  href={createUrl({ name: 'modules' })}
                >
                  Wybróbuj
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <BlueCard>
              <CardHeader>
                <Price>
                  129 <small>zł/mc</small>
                </Price>
                <Type>Wersja Premium</Type>
              </CardHeader>
              <CardBody>
                <Features>
                  <li>Dostęp do wszystkich filmów</li>
                  <li>Jakość video 4k</li>
                  <li>Dostęp do przykładowych rozwiązań przez mentora</li>
                  <li>Dostęp do wszystkich praktycznych zadań</li>
                  <li>Automatyczne sprawdzanie rozwiązań</li>
                  <li>Dostęp do społeczności</li>
                </Features>
                <Button
                  type="neutral"
                  size="small"
                  href={createUrl({ name: 'subscription' })}
                >
                  Kup
                </Button>
              </CardBody>
            </BlueCard>
          </Col>
        </MainRow>
        <Footer>
          Wszystkie ceny są cenami brutto za jeden miesiąc przy zakupie
          abonamentu na cały rok z góry.
        </Footer>
      </Container>
    </Dashboard>
  );
}
