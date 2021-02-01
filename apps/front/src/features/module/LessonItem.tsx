import * as React from 'react';
import { TimeIcon } from 'src/icons/TimeIcon';
import { ModuleMedia } from './ModuleMedia';
import { ModuleLesson } from 'shared';
import { Button } from 'src/components/Button';
import { useUser } from '../AuthModule';
import { createUrl } from 'src/common/url';

interface LessonItemProps {
  item: ModuleLesson;
  onWatch: () => void;
}

export function LessonItem(props: LessonItemProps) {
  const { item, onWatch } = props;
  const user = useUser();
  return (
    <ModuleMedia
      type={item.isWatched ? 'success' : 'pending'}
      aboveText={`Lekcja ${item.id}`}
      title={item.name}
      footer={
        <div className="flex items-center mt-2">
          <TimeIcon />
          <span className="text-xs ml-2">{item.duration}</span>
        </div>
      }
      button={
        user ? (
          <Button size="small" type="secondary" onClick={onWatch}>
            Obejrzyj
          </Button>
        ) : (
          <Button
            href={createUrl({
              name: 'register',
            })}
            size="small"
            type="secondary"
          >
            Obejrzyj
          </Button>
        )
      }
    />
  );
}
