import React from 'react';
import { TaskSection } from './TaskSection';

interface TaskFnArgumentsProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function TaskFnArguments({ children, footer }: TaskFnArgumentsProps) {
  return (
    <>
      <TaskSection title="Argumenty funkcji">
        <ul className="grid gap-1">{children}</ul>
      </TaskSection>
      {footer && <div className="mt-2">{footer}</div>}
    </>
  );
}
