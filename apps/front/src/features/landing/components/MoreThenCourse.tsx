import * as React from 'react';
import { Container } from 'src/components/Container';
import { NewTheme } from 'src/NewTheme';
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
import { Icon } from 'src/new-components/Icon';
import { Heading } from 'src/new-components/Heading';

interface MoreThenCourseProps {
  className?: string;
}

const Left = styled.div`
  width: 50%;
  svg {
    max-width: 100%;
    height: auto;
  }
`;
const Right = styled.div`
  width: 50%;
  padding-left: 4.5rem;
`;

const Desc = styled.p`
  line-height: 1.9;
  margin: 1.5rem 0;
  font-size: 1.125rem;
  font-weight: 300;
`;

const List = styled.ul`
  padding-left: 0;
  list-style: none;
  li {
    padding: 0.5rem 0;
    font-weight: 600;
    color: ${NewTheme.headings_color};
    display: flex;
    ${Icon} {
      flex-shrink: 0;
      display: flex;
      margin-right: 1rem;
    }
  }
`;

const _MoreThenCourse = (props: MoreThenCourseProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Left>
          <Illustration1 />
        </Left>
        <Right>
          <Heading type={2}>To więcej niż zwykły kurs programowania</Heading>
          <Desc>
            Fullstack.pl to kompletna platforma do nauki programowania.
          </Desc>
          <List>
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
              Każdy tydzień zawiera lekcje video i zadania do zrobienie.
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
          </List>
        </Right>
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
