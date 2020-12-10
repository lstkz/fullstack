import * as React from 'react';
import { ModuleDetails } from 'shared';
import { Heading } from 'src/components/Heading';
import styled from 'styled-components';
import { LessonItem } from './LessonItem';

interface LessonsSectionProps {
  className?: string;
  module: ModuleDetails;
}

const _LessonsSection = (props: LessonsSectionProps) => {
  const { className, module } = props;
  return (
    <div className={className}>
      <Heading type={4} mb={3}>
        Lekcje video
      </Heading>
      {module.lessons.map(item => (
        <LessonItem
          key={item.id}
          aboveText={`Lekcja ${item.id}`}
          title={item.name}
          time="5 min"
        />
      ))}
    </div>
  );
};

export const LessonsSection = styled(_LessonsSection)`
  display: block;
`;
