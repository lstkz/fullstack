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
      type={item.isSolved ? 'success' : 'pending'}
      aboveText={`Zadanie ${item.id}${item.isExample ? ' (Przykład)' : ''}`}
      title={item.name}
      footer={
        item.score > 0 && (
          <div className="flex items-center ">
            <span className="text-xs">Punkty: {item.score}</span>
          </div>
        )
      }
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
