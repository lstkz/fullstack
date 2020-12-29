import * as React from 'react';
import { Heading } from 'src/components/Heading';
import { HeadingNext } from 'src/components/HeadingNext';
import { Spacer, spacerStyle } from 'src/components/_spacer';
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

export const Media2 = styled(_Media)`
  display: flex;
  align-items: flex-start;
`;

export function Media(props: MediaProps) {
  const { children, title, icon } = props;
  return (
    <div className="flex items-start mb-8">
      <figure className="w-10 flex flex-shrink-0">{icon}</figure>
      <div className="ml-6">
        <HeadingNext className="mb-1" white type={6}>
          {title}
        </HeadingNext>
        <div className="text-white opacity-80">{children}</div>
      </div>
    </div>
  );
}
