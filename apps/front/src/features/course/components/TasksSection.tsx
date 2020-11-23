import * as React from 'react';
import { Heading } from 'src/new-components/Heading';
import styled from 'styled-components';
import { TaskItem } from './TaskItem';

interface TasksSectionProps {
  className?: string;
}

const _TasksSection = (props: TasksSectionProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Heading type={4} mb={3}>
        Zadania
      </Heading>
      <TaskItem aboveText="Zadanie 1" title="Clamp" />
      <TaskItem aboveText="Zadanie 2" title="Cykliczna tablica" />
      <TaskItem aboveText="Zadanie 3" title="Niedokładne liczby" />
      <TaskItem aboveText="Zadanie 4" title="Najmniejsze zaokrąglenie" />
      <TaskItem aboveText="Zadanie 5" title="Brakująca liczba" />
      <TaskItem aboveText="Zadanie 6" title="Gra w światełka" />
      <TaskItem aboveText="Zadanie 7" title="Przedziały liczb" />
      <TaskItem aboveText="Zadanie 8" title="Piętro" />
      <TaskItem aboveText="Zadanie 9" title="Wspaniałe trójki" />
      <TaskItem aboveText="Zadanie 10" title="Trójkąt" />
      <TaskItem aboveText="Zadanie 11" title="Banknoty" />
      <TaskItem aboveText="Zadanie 12" title="Równe karty" />
      <TaskItem aboveText="Zadanie 13" title="Odwróć część tablicy" />
    </div>
  );
};

export const TasksSection = styled(_TasksSection)`
  display: block;
`;
