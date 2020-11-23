import {
  faCode,
  faGraduationCap,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Col, Row } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { spacerStyle } from 'src/new-components/_spacer';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { Stat } from './Stat';

interface WeekInfoProps {
  className?: string;
}

const _WeekInfo = (props: WeekInfoProps) => {
  const { className } = props;
  return (
    <div className={className}>
      {/* <Badge type="primary">1</Badge> */}
      <Heading type={5}>Tydzień 1</Heading>W tym tygodniu nauczysz się podstaw
      języka: definiowania zmiennych, instrukcji warunkowych, pętel oraz
      operacji na tablicach.
      <Row mt={4}>
        <Col md={4}>
          <Stat
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
            title="Obejrzane lekcje"
            value="2/15"
          />
        </Col>
        <Col md={4}>
          <Stat
            icon={<FontAwesomeIcon icon={faCode} />}
            title="Zrobione zadania"
            value="12/20"
          />
        </Col>
        <Col md={4}>
          <Stat
            icon={<FontAwesomeIcon icon={faHourglassHalf} />}
            title="Spędzony czas na praktyce"
            value="25 godzin"
          />
        </Col>
      </Row>
    </div>
  );
};

export const WeekInfo = styled(_WeekInfo)`
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${NewTheme.gray_200};
  border-radius: 0.75rem;
  padding: 1.75rem;
  ${spacerStyle}
`;
