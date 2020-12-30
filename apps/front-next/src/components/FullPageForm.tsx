import * as React from 'react';
import { Heading } from './Heading';

interface AuthFormProps {
  title: string;
  children: React.ReactNode;
  subTitle?: React.ReactNode;
  bottom?: React.ReactNode;
  testId?: string;
}

export function FullPageForm(props: AuthFormProps) {
  const { title, children, bottom, testId, subTitle } = props;

  return (
    <div data-test={testId} className="max-w-lg w-full mx-auto py-32 px-8">
      <div className="text-center mb-8">
        <Heading type={3}>{title}</Heading>
        {subTitle && <div className="mt-1 text-gray-600">{subTitle}</div>}
      </div>
      {children}
      {bottom && <div className="text-center mt-6">{bottom}</div>}
    </div>
  );
}
