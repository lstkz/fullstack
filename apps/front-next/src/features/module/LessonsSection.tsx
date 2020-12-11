import * as React from 'react';
import { ModuleDetails } from 'shared';
import { HeadingNext } from 'src/components/HeadingNext';
import { LessonItem } from './LessonItem';

interface LessonsSectionProps {
  module: ModuleDetails;
}

export function LessonsSection(props: LessonsSectionProps) {
  const { module } = props;
  return (
    <div>
      <HeadingNext type={4} className="mb-3">
        Lekcje video
      </HeadingNext>
      {module.lessons.map(item => (
        <LessonItem key={item.id} item={item} />
      ))}
    </div>
  );
}
