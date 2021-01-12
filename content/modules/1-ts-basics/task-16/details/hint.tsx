import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Pary kart są takie same, jeżeli <Code>pair1[0]</Code> równa się{' '}
      <Code>pair2[0]</Code> i <Code>pair1[1]</Code> równa się{' '}
      <Code>pair2[1]</Code> lub <Code>pair1[0]</Code> równa się{' '}
      <Code>pair2[1]</Code> i <Code>pair1[1]</Code> równa się{' '}
      <Code>pair2[0]</Code>.
    </div>
  );
}
