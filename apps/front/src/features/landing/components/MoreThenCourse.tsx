import * as React from 'react';
import { Container } from 'src/components/Container';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faVideo,
  faGraduationCap,
  faLaptopCode,
  faChalkboardTeacher,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Illustration1 } from './Illustration1';
import { Icon } from 'src/components/Icon';
import { Heading } from 'src/components/Heading';
import { IconList } from './IconList';
import { Col, Row } from 'src/components/Grid';
import { MEDIA_MD } from 'src/Theme';

interface MoreThenCourseProps {
  className?: string;
}

const Left = styled(Col)`
  order: 2;
  ${MEDIA_MD} {
    order: 1;
  }
  svg {
    max-width: 100%;
    height: auto;
  }
`;
const Right = styled(Col)``;

const Desc = styled.p`
  line-height: 1.9;
  margin: 1.5rem 0;
  font-size: 1.125rem;
  font-weight: 300;
`;

const _MoreThenCourse = (props: MoreThenCourseProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Row>
          <Left md={6}>
            <Illustration1 />
          </Left>
          <Right md={6} mdSpacer={{ pl: 6 }}>
            <Heading type={2}>To więcej niż zwykły kurs programowania</Heading>
            <Desc>
              Fullstack.pl to kompletna platforma do nauki programowania.
            </Desc>
            <IconList>
              <li>
                <Icon type="primary" circle size="sm">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </Icon>
                Podział na tygodnie nauki.
              </li>
              <li>
                <Icon type="warning" circle size="sm">
                  <FontAwesomeIcon icon={faVideo} />
                </Icon>
                Każdy tydzień zawiera lekcje video i zadania do zrobienia.
              </li>
              <li>
                <Icon type="success" circle size="sm">
                  <FontAwesomeIcon icon={faTasks} />
                </Icon>
                Zadania są automatycznie sprawdzane.
              </li>
              <li>
                <Icon type="primary" circle size="sm">
                  <FontAwesomeIcon icon={faLaptopCode} />
                </Icon>
                Wbudowane IDE w przeglądarce. Nie trzeba nic ściągać!
              </li>
              <li>
                <Icon type="warning" circle size="sm">
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                </Icon>
                Po każdej lekcji możesz zobaczyć film video z rozwiązaniem
                wzorcowym przez mentora.
              </li>
              <li>
                <Icon type="danger" circle size="sm">
                  <FontAwesomeIcon icon={faExclamation} />
                </Icon>
                Nie wiesz jak zrobić zadania? Przeczytaj wskazówkę albo zobacz
                kompletne rozwiązanie.
              </li>
            </IconList>
          </Right>
        </Row>
      </Container>
    </div>
  );
};

export const MoreThenCourse = styled(_MoreThenCourse)`
  display: block;
  padding: 4rem 0;
  ${Container} {
    display: flex;
  }
`;
