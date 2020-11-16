import { Course } from '../src/types';

export const info: Course = {
  id: 'ts_algo',
  name: 'Typescript i algorytmika od podstaw',
  description: `Pierwszy krok do zostania fullstack developerem!
    Kurs zawiera 5 godzin video oraz 100 zadań praktycznych, które zajmą Ci od 200h  do 300h praktyki.`,

  price: 3000,
  promoPrice: 1000,
  promoEnds: new Date(2021, 0, 1),
};
