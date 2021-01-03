import * as React from 'react';
import { Heading } from 'src/components/Heading';
import { LessonItem } from './LessonItem';
import { useLessonModalActions } from './LessonModalModule';
import { useModule } from './ModulePage';

export function LessonsSection() {
  const module = useModule();
  const { show: showLessonModal } = useLessonModalActions();
  return (
    <div>
      <Heading type={4} className="mb-3">
        Lekcje video
      </Heading>
      {module.lessons.map(item => (
        <LessonItem
          key={item.id}
          item={item}
          onWatch={() => {
            showLessonModal(item.id);
          }}
        />
      ))}
    </div>
  );
}
