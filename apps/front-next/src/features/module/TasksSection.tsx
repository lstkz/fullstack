import * as React from 'react';
import { ModuleDetails } from 'shared';
import { HeadingNext } from 'src/components/HeadingNext';
import { TaskItem } from './TaskItem';

interface TasksSectionProps {
  module: ModuleDetails;
}

export function TasksSection(props: TasksSectionProps) {
  const { module } = props;
  return (
    <div>
      <HeadingNext type={4} className="mb-3">
        Zadania
      </HeadingNext>
      {module.tasks.map(item => (
        <TaskItem key={item.id} moduleId={module.id} item={item} />
      ))}
    </div>
  );
}
