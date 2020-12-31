import * as React from 'react';
import { ModuleDetails } from 'shared';
import { Heading } from 'src/components/Heading';
import { LessonItem } from './LessonItem';
import { useLessonModalActions } from './LessonModalModule';

interface LessonsSectionProps {
  module: ModuleDetails;
}

export function LessonsSection(props: LessonsSectionProps) {
  const { module } = props;
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
            showLessonModal(item);
          }}
        />
      ))}
    </div>
  );
}
