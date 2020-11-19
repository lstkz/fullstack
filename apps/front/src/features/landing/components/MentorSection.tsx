import * as React from 'react';
import { Heading } from 'src/new-components/Heading';
import styled from 'styled-components';

interface MentorSectionProps {
  className?: string;
}

const Left = styled.div`
  width: 50%;
  padding-right: 3rem;
`;
const Right = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const _MentorSection = (props: MentorSectionProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Row></Row>
      <Left></Left>
      <Right>
        <Heading type={2}>Poznaj mentora</Heading>
      </Right>
    </div>
  );
};

export const MentorSection = styled(_MentorSection)`
  display: flex;
`;
