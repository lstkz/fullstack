import React from 'react';
import {
  TaskTitle,
  Code,
  TaskWrapper,
  TaskFnArguments,
  TaskFnReturn,
  TaskFnExamples,
  TaskRange,
} from 'ui';

export function Details() {
  return (
    <TaskWrapper>
      <TaskTitle>Najdłuższy rosnący ciąg</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>longestIncreasing</Code>, która zwraca
        długość najdłuższego rosnącego ciągu. Najdłuższy rosnący ciąg to ciąg, w
        którym każdy kolejny element jest większy od poprzedniego.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Tablica liczb.
          <br />
          <TaskRange min={1} max={[10, 5]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Długość najdłuższego rosnącego ciągu.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
longestIncreasing([1, 2, 3, 1, 2])
3

// Przykład 2
longestIncreasing([1, 1, 1])
1

// Przykład 3
longestIncreasing([1, 5, 10, 15])
4

// Przykład 4
longestIncreasing([1, 5, 10, 9, 15])
3

// Przykład 5
longestIncreasing([10, -6, -5, 0, 2, 1])
4
 
      `}
      />
    </TaskWrapper>
  );
}
