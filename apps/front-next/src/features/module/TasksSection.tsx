import * as React from 'react';
import { ModuleDetails } from 'shared';
import { createUrl } from 'src/common/url';
import { Heading } from 'src/components/Heading';
import styled from 'styled-components';
import { TaskItem } from './TaskItem';

interface TasksSectionProps {
  className?: string;
  module: ModuleDetails;
}

const _TasksSection = (props: TasksSectionProps) => {
  const { className, module } = props;
  return (
    <div className={className}>
      <Heading type={4} mb={3}>
        Zadania
      </Heading>
      {module.tasks.map(item => (
        <TaskItem
          key={item.id}
          href={createUrl({
            name: 'task',
            id: module.id,
            taskId: item.id,
          })}
          aboveText={`Zadanie ${item.id}${item.isExample ? ' (Przykład)' : ''}`}
          title={item.name}
        />
      ))}
    </div>
  );
};

export const TasksSection = styled(_TasksSection)`
  display: block;
`;
