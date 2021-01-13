import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Obliczenia można podzielić na dwie części. Najpierw rób obstawianie
      progresywne 1, 2, 4, 8 itd., dopóki zakład nie przekroczy maksymalnej
      dopuszczalnej kwoty. Następnie możesz użyć dzielenia, żeby sprawdzić ile
      razy trzeba obstawić maksymalną kwotę, żeby przegrać resztę pieniędzy.
    </div>
  );
}
