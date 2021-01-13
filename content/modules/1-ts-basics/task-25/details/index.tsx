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
      <TaskTitle>Binarna choinka</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>xmasTree</Code>, która generuje choinkę
        składającą się z samych zer i jedynek. Schemat generowania choinki jest
        następujący:
        <ul className="list-decimal pl-4">
          <li>Czubek zawiera zawsze jedną jedynkę.</li>
          <li>Każdy kolejny poziom zawiera o dwie jedynki więcej.</li>
          <li>
            Wszystkie poziomy muszą zawierać tyle samo znaków. Puste miejsca są
            ustawione na zera.
          </li>
          <li>Jedynki są zawsze wycentrowane w wierszu.</li>
          <li>Ostatni poziom zawsze składa się z samych jedynek.</li>
        </ul>
      </div>
      <TaskFnArguments>
        <li>
          <Code>n: number</Code> - Wysokość choinki.
          <br />
          <TaskRange min={1} max={50}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>string[]</Code> - Binarna choinka, gdzie każdy element to poziom
        choinki..
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
xmasTree(1)
[
  '1',
]

// Przykład 2
xmasTree(2)
[
  '010',
  '111',
]

// Przykład 3
xmasTree(3)
[
  '00100',
  '01110',
  '11111',
]

// Przykład 4
xmasTree(4)
[
  '0001000',
  '0011100',
  '0111110',
  '1111111',
]


      `}
      />
    </TaskWrapper>
  );
}
