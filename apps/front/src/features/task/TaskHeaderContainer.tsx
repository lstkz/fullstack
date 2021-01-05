import Link from 'next/link';
import React from 'react';
import { createUrl } from 'src/common/url';

interface TaskHeaderContainerProps {
  children?: React.ReactNode;
  moduleId: string;
}

export function TaskHeaderContainer(props: TaskHeaderContainerProps) {
  const { children, moduleId } = props;

  return (
    <div className="flex justify-between items-center h-8 px-4 bg-dark">
      <Link
        href={createUrl({ name: 'module', id: moduleId })}
        aria-label="logo"
      >
        <a className="flex items-center text-white ">
          <h1 className="font-bold text-xl">Fullstack</h1>
        </a>
      </Link>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
