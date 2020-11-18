import * as React from 'react';
import { Container } from 'src/components/Container';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';

import { Illustration1 } from './Illustration1';
import { Icon } from 'src/new-components/Icon';

// library.add(faStoreAlt);

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

const Title = styled.h2`
  margin: 0;
  font-weight: 600;
  font-size: 2rem;
  color: ${NewTheme.headings_color};
  line-height: 1.5;
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
    ${Icon} {
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
          <Title>To więcej niż zwykły kurs programowania</Title>
          <Desc>
            Fullstack.pl to kompletna platforma do nauki programowania.
          </Desc>
          <List>
            <li>
              <Icon type="primary" circle size="sm">
                <FontAwesomeIcon icon={faStoreAlt} />
              </Icon>
              Lekcje video
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
