import * as React from 'react';
import { Heading } from 'src/new-components/Heading';
import { Spacer, spacerStyle } from 'src/new-components/_spacer';
import styled from 'styled-components';

interface MediaProps {
  className?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Text = styled.div`
  opacity: 0.8;
  color: white;
  ${spacerStyle}
`;

const MediaBody = styled.div`
  flex: 1 1;
  ${spacerStyle}
`;

const Icon = styled.figure`
  width: 40px;
  display: flex;
  align-items: center;
`;

const _Media = (props: MediaProps) => {
  const { children, title, icon, className } = props;
  return (
    <Spacer className={className} mb={3}>
      <Icon>{icon}</Icon>
      <MediaBody ml={4}>
        <Heading white type={6} mb={1}>
          {title}
        </Heading>
        <Text mb={3}>{children}</Text>
      </MediaBody>
    </Spacer>
  );
};

export const Media = styled(_Media)`
  display: flex;
  align-items: flex-start;
`;
