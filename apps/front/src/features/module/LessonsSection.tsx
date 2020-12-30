import * as React from 'react';
import { ModuleDetails } from 'shared';
import { Heading } from 'src/components/Heading';
import { LessonItem } from './LessonItem';

interface LessonsSectionProps {
  module: ModuleDetails;
}

export function LessonsSection(props: LessonsSectionProps) {
  const { module } = props;
  return (
    <div>
      <Heading type={4} className="mb-3">
        Lekcje video
      </Heading>
      {module.lessons.map(item => (
        <LessonItem key={item.id} item={item} />
      ))}
    </div>
  );
}
