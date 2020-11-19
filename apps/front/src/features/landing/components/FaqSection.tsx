import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Container } from 'src/components/Container';
import { AccordionItem } from 'src/new-components/AccordionItem';
import { Row, Col } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SectionShape } from './SectionShape';

interface FaqSectionProps {
  className?: string;
}

const Accordion = styled.div``;

const _FaqSection = (props: FaqSectionProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <SectionShape position="top" color="white" inverse />
      <Container>
        <Heading type={2} mb={5} white center>
          Najczęstsze pytania
        </Heading>
        <Row>
          <Col lg={6}>
            <Accordion>
              <AccordionItem header={<>Which license do I need?</>}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et.
              </AccordionItem>
              <AccordionItem header={<>How do I get access to a theme?</>}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et.
              </AccordionItem>
              <AccordionItem header={<>How do I see previous orders?</>}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et.
              </AccordionItem>
            </Accordion>
          </Col>
          <Col lg={6}>
            <Accordion>
              <AccordionItem header={<>Which license do I need?</>}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et.
              </AccordionItem>
              <AccordionItem header={<>How do I get access to a theme?</>}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et.
              </AccordionItem>
              <AccordionItem header={<>How do I see previous orders?</>}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et.
              </AccordionItem>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export const FaqSection = styled(_FaqSection)`
  position: relative;
  display: block;
  background: ${NewTheme.primary};
  padding-top: 7.5rem;
  color: white;
`;
