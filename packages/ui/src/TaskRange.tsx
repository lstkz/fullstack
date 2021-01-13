import React from 'react';
import { Code } from './Code';

interface TaskRangeProps {
  children: React.ReactNode;
  min: number | [number, number];
  max: number | [number, number];
}

export function TaskRange(props: TaskRangeProps) {
  const { children, min, max } = props;
  const getNum = (num: number | [number, number]) =>
    typeof num === 'number' ? (
      num
    ) : (
      <>
        {num[0]}
        <sup>{num[1]}</sup>
      </>
    );
  return (
    <span>
      {children}{' '}
      <Code>
        {'<'}
        {getNum(min)}; {getNum(max)}
        {'>'}
      </Code>
      .
    </span>
  );
}
