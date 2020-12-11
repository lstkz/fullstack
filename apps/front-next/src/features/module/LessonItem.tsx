import * as React from 'react';
import { TimeIcon } from 'src/icons/TimeIcon';
import { ModuleMedia } from './ModuleMedia';
import { ModuleLesson } from 'shared';
import { ButtonNext } from 'src/components/ButtonNext';

interface LessonItemProps {
  item: ModuleLesson;
}

export function LessonItem(props: LessonItemProps) {
  const { item } = props;
  return (
    <ModuleMedia
      aboveText={`Lekcja ${item.id}`}
      title={item.name}
      footer={
        <div className="flex items-center mt-2">
          <TimeIcon />
          <span className="text-xs ml-2">5 min</span>
        </div>
      }
      button={
        <ButtonNext size="small" type="secondary">
          Obejrzyj
        </ButtonNext>
      }
    />
  );
}
