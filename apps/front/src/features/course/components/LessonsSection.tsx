import * as React from 'react';
import { Heading } from 'src/new-components/Heading';
import styled from 'styled-components';
import { LessonItem } from './LessonItem';

interface LessonsSectionProps {
  className?: string;
}

const _LessonsSection = (props: LessonsSectionProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Heading type={4} mb={3}>
        Lekcje video
      </Heading>
      <LessonItem aboveText="Lekcja 1" title="Wprowadzenie" time="5 min" />
      <LessonItem
        aboveText="Lekcja 2"
        title="Deklaracja zmiennych"
        time="8 min"
      />
      <LessonItem aboveText="Lekcja 3" title="Typy podstawowe" time="8 min" />
      <LessonItem aboveText="Lekcja 4" title="Tablice" time="11 min" />
      <LessonItem
        aboveText="Lekcja 5"
        title="Operatory jednoargumentowe: +, -, ++, --"
        time="3 min"
      />
      <LessonItem
        aboveText="Lekcja 6"
        title="Operatory dwuargumentowe podstawowe: +, -, *, **, /, %"
        time="5 min"
      />
    </div>
  );
};

export const LessonsSection = styled(_LessonsSection)`
  display: block;
`;
