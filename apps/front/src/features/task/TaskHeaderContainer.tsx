import React from 'react';
import { Logo } from 'src/components/Logo';

interface TaskHeaderContainerProps {
  children?: React.ReactNode;
}

export function TaskHeaderContainer(props: TaskHeaderContainerProps) {
  const { children } = props;

  return (
    <div className="flex justify-between items-center h-8 px-4 bg-dark">
      <Logo type="light" titleClassName="text-xl " />
      <div className="flex items-center">{children}</div>
    </div>
  );
}
