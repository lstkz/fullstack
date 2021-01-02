import * as React from 'react';
import { ModuleTask } from 'shared';
import { createUrl } from 'src/common/url';
import { Button } from 'src/components/Button';
import { ModuleMedia } from './ModuleMedia';

interface TaskItemProps {
  moduleId: string;
  item: ModuleTask;
}

export function TaskItem(props: TaskItemProps) {
  const { moduleId, item } = props;
  return (
    <ModuleMedia
      type="pending"
      aboveText={`Zadanie ${item.id}${item.isExample ? ' (Przykład)' : ''}`}
      title={item.name}
      button={
        <Button
          size="small"
          type="secondary"
          href={createUrl({
            name: 'task',
            id: moduleId,
            taskId: item.id,
          })}
        >
          Rozwiąż
        </Button>
      }
    />
  );
}
