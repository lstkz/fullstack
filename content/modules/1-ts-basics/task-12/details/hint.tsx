import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Iteruj po każdym piętrze i obliczaj sumę od ziemi do tego piętra. Jeżeli
      obecna suma jest więszka od danej wysokości to znaczy, że iterowane piętro
      zawiera tę wysokość. Trzeba również sprawdzić dodatkowy warunek, czy dana
      wysokość jest równa wysokości całego budynku. Jeżeli tak, to znaczy na
      ostatnie piętro znajduję się na danej wysokości.
    </div>
  );
}
