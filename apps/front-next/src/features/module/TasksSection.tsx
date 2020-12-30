import * as React from 'react';
import { ModuleDetails } from 'shared';
import { Heading } from 'src/components/Heading';
import { TaskItem } from './TaskItem';

interface TasksSectionProps {
  module: ModuleDetails;
}

export function TasksSection(props: TasksSectionProps) {
  const { module } = props;
  return (
    <div>
      <Heading type={4} className="mb-3">
        Zadania
      </Heading>
      {module.tasks.map(item => (
        <TaskItem key={item.id} moduleId={module.id} item={item} />
      ))}
    </div>
  );
}
