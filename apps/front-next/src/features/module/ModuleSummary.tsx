import {
  faCode,
  faGraduationCap,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { spacerStyle } from 'src/components/_spacer';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { Stat } from './Stat';

interface ModuleSummaryProps {
  className?: string;
}

const _ModuleSummary = (props: ModuleSummaryProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Heading type={5}>Podsumowanie</Heading>
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

export const ModuleSummary = styled(_ModuleSummary)`
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${Theme.gray_200};
  border-radius: 0.75rem;
  padding: 1.75rem;
  ${spacerStyle}
`;
