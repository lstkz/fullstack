import React from 'react';
import { TaskSection } from './TaskSection';

interface TaskFnReturnProps {
  children: React.ReactNode;
}

export function TaskFnReturn({ children }: TaskFnReturnProps) {
  return (
    <>
      <TaskSection title="Zwrot funkcji">{children}</TaskSection>
    </>
  );
}
