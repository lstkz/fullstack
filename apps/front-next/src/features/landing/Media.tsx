import * as React from 'react';
import { Heading } from 'src/components/Heading';

interface MediaProps {
  title: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Media(props: MediaProps) {
  const { children, title, icon } = props;
  return (
    <div className="flex items-start mb-8">
      <figure className="w-10 flex flex-shrink-0">{icon}</figure>
      <div className="ml-6">
        <Heading className="mb-1" white type={6}>
          {title}
        </Heading>
        <div className="text-white opacity-80">{children}</div>
      </div>
    </div>
  );
}
