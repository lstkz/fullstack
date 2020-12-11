import React from 'react';
import { Highlight } from './Highlight';
import { TaskSection } from './TaskSection';

interface TaskFnExamplesProps {
  code: string;
}

export function TaskFnExamples({ code }: TaskFnExamplesProps) {
  return (
    <>
      <TaskSection title="Przykłady">
        <Highlight lang="js" code={code.trim()} />
      </TaskSection>
    </>
  );
}
