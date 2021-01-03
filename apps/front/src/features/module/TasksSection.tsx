import * as React from 'react';
import { Heading } from 'src/components/Heading';
import { useModule } from './ModulePage';
import { TaskItem } from './TaskItem';

export function TasksSection() {
  const module = useModule();
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
