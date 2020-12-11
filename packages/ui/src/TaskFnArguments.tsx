import React from 'react';
import { TaskSection } from './TaskSection';

interface TaskFnArgumentsProps {
  children: React.ReactNode;
}

export function TaskFnArguments({ children }: TaskFnArgumentsProps) {
  return (
    <>
      <TaskSection title="Argumenty funkcji">
        <ul className="grid gap-1">{children}</ul>
      </TaskSection>
    </>
  );
}
