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
      <TaskTitle>Okrągła suma</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>roundSum</Code>. Funkcja przyjmuje jako
        argumenty dwie tablice liczb całkowitych. Znajdź takie dwie liczby po
        jednej z każdej tablicy, aby ich suma kończyła się na <Code>00</Code>.
      </div>
      <TaskFnArguments
        footer={
          <>
            <TaskRange min={1} max={100}>
              Zakres liczby elementów w każdej tablicy:
            </TaskRange>{' '}
            <TaskRange min={1} max={[10, 9]}>
              Zakres elementu:
            </TaskRange>
          </>
        }
      >
        <li>
          <Code>arr1: number[]</Code> - Pierwsza tablica.
        </li>
        <li>
          <Code>arr2: number[]</Code> - Druga tablica.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>[number, number] | null</Code> - Para liczb, gdzie pierwszy
        element to indeks z pierwszej tablicy, a drugi element to indeks z
        drugiej tablicy. Jeżeli para nie istnieje lub jest więcej niż 1
        kombinacja to zwróć <Code>null</Code>.
      </TaskFnReturn>
      <TaskFnExamples
        code={`
// Przykład 1
roundSum([60, 40], [10, 20, 30, 40])
[0, 3]

// Przykład 2
roundSum([50], [150])
[0, 0]

// Przykład 3
roundSum([1, 2, 3, 4], [1, 2, 3])
null

// Przykład 4
roundSum([60, 40], [40, 60])
null

// Przykład 5
roundSum([201, 100, 301], [50, 1, 2, 0])
[1, 3]

// Przykład 6
roundSum([5], [5])
null
      `}
      />
    </TaskWrapper>
  );
}
