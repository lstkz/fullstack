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
      <TaskTitle>Równe karty</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>equalCards</Code>, która porównuje czy dwie
        pary karty są takie same. Kolejność kart nie ma znaczenia.
      </div>
      <TaskFnArguments
        footer={
          <>
            Każda para zawiera dokładnie dwa elementy. Możesz założyć, że ta
            sama karta nie wystąpi z różną wielkością liter.
          </>
        }
      >
        <li>
          <Code>pair1: [string, string]</Code> - Pierwsza para.
        </li>
        <li>
          <Code>pair2: [string, string]</Code> - Druga para.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>boolean</Code> - <Code>true</Code>, jeśli pary kart są równe,{' '}
        <Code>false</Code>, jeśli pary kart są nierówne.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
equalCards(['2d', '3d'], ['2d', '3d'])
true

// Przykład 2
equalCards(['2d', '3d'], ['3d', '2d'])
true

// Przykład 3
equalCards(['2d', '3c'], ['3d', '2d'])
false

// Przykład 4
equalCards(['Ad', 'Ac'], ['Ad', 'Kd'])
false

      `}
      />
    </TaskWrapper>
  );
}
