import { ModuleTaskUpload, ModuleUpload, VideoUpload } from 'shared';

const task1Sources = [
  {
    type: 'vimeo',
    url: 'https://vimeo.com/507226143/4578830c1e',
  },
];

const task2Sources = [
  {
    type: 'vimeo',
    url: 'https://vimeo.com/507226042/32927a8e87',
  },
];

const task3Sources = [
  {
    type: 'vimeo',
    url: 'https://vimeo.com/507225887/7b47cd6d73',
  },
];

const task4Sources = [
  {
    type: 'vimeo',
    url: 'https://vimeo.com/507225745/002a6b07fe',
  },
];

const task5Sources = [
  {
    type: 'vimeo',
    url: 'https://vimeo.com/507225625/dd5143b529',
  },
];

function _getTask({
  id,
  name,
  isExample = false,
  videoSolution = null,
}: {
  id: number;
  name: string;
  isExample?: boolean;
  videoSolution?: VideoUpload[];
}): ModuleTaskUpload {
  return {
    id,
    isExample: isExample,
    name,
    detailsS3Key: '',
    sourceS3Key: '',
    htmlS3Key: '',
    hintHtmlS3Key: null,
    videoSolution,
    testsInfo: require(`./task-${id}/tests-info.json`),
  };
}

export const info: ModuleUpload = {
  id: '1-ts-basics',
  name: 'Typescript i algorytmika - podstawy',
  description: `
Naucz się kompletnych podstaw Typescripta i algorytmiki.
Moduł zawiera lekcje i zadania dla osób, które chcą zacząć swoją przygodę z programowaniem.
`.trim(),
  packageJson: JSON.stringify(require('./package-template.json'), null, 2),
  isPending: false,
  estimatedPracticeTimeHours: 100,

  lessons: [
    {
      id: 1,
      name: 'Wprowadzenie.',
      duration: '7:20',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507501206',
        },
      ],
    },
    {
      id: 2,
      name:
        'Deklaracja zmiennych: number, string, boolean, null, undefined, any.',
      duration: '8:55',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507501080',
        },
      ],
    },
    {
      id: 3,
      name:
        'Operatory: jednoargumentowe, dwuargumentowe, przypisania, porównania, logiczne.',
      duration: '8:23',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507500953',
        },
      ],
    },
    {
      id: 4,
      name: 'Operatory binarne.',
      duration: '5:04',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507500827',
        },
      ],
    },
    {
      id: 5,
      name: 'Instrukcje warunkowe If, ternary operator, falsy values.',
      duration: '8:02',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507228512/7fe5d16ee7',
        },
      ],
    },
    {
      id: 6,
      name: 'Deklaracja funkcji i funkcje lambda.',
      duration: '11:53',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507228193/c47628758f',
        },
      ],
    },
    {
      id: 7,
      name: 'Tablice i podstawowe operacje na tablicach.',
      duration: '11:55',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507227837/1cdff5d3af',
        },
      ],
    },
    {
      id: 8,
      name: 'Pętle "for" i "for of".',
      duration: '12:53',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507227487/bd5456540d',
        },
      ],
    },
    {
      id: 9,
      name: 'Pętle "while", "do while" oraz kontrola pętel.',
      duration: '6:16',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507227293/d39aad4dc1',
        },
      ],
    },
    {
      id: 10,
      name: 'Spread operator',
      duration: '5:11',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507227134/f8a71ccf43',
        },
      ],
    },
    {
      id: 11,
      name: 'Tablice: sort, forEach, map, filter.',
      duration: '13:37',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507226763/1808e362d8',
        },
      ],
    },
    {
      id: 12,
      name: 'Math: min, max, floor, ceil, round.',
      duration: '7:54',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507226526/8667f9d823',
        },
      ],
    },
    {
      id: 13,
      name: 'Jak korzystać z platformy?',
      duration: '5:46',
      sources: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507226306/08cfa97598',
        },
      ],
    },
    {
      id: 14,
      name: 'Przykładowe rozwiązanie: Środkowa liczba',
      duration: '2:17',
      sources: task1Sources,
    },
    {
      id: 15,
      name: 'Przykładowe rozwiązanie: Pełna kwota',
      duration: '0:32',
      sources: task2Sources,
    },
    {
      id: 16,
      name: 'Przykładowe rozwiązanie: Najcieplejszy miesiac',
      duration: '3:48',
      sources: task3Sources,
    },
    {
      id: 17,
      name: 'Przykładowe rozwiązanie: Okrągła suma',
      duration: '2:38',
      sources: task4Sources,
    },
    {
      id: 18,
      name: 'Przykładowe rozwiązanie: Wygrane pod rząd',
      duration: '1:29',
      sources: task5Sources,
    },
  ],
  tasks: [
    _getTask({
      id: 1,
      name: 'Środkowa liczba',
      isExample: true,
      videoSolution: task1Sources,
    }),
    _getTask({
      id: 2,
      name: 'Pełna kwota',
      isExample: true,
      videoSolution: task2Sources,
    }),
    _getTask({
      id: 3,
      name: 'Najcieplejszy miesiąc',
      isExample: true,
      videoSolution: task3Sources,
    }),
    _getTask({
      id: 4,
      name: 'Okrągła suma',
      isExample: true,
      videoSolution: task4Sources,
    }),
    _getTask({
      id: 5,
      name: 'Wygrane pod rząd',
      isExample: true,
      videoSolution: task5Sources,
    }),
    _getTask({
      id: 6,
      name: 'Clamp',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507225508/9da10e9d50',
        },
      ],
    }),
    _getTask({
      id: 7,
      name: 'Cykliczna tablica',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507225389/01730b38db',
        },
      ],
    }),
    _getTask({
      id: 8,
      name: 'Niedokładne liczby',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507225277/a44d27d3a8',
        },
      ],
    }),
    _getTask({
      id: 9,
      name: 'Brakująca liczba',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507225118/ee2e5cec93',
        },
      ],
    }),
    _getTask({
      id: 10,
      name: 'Gra w światełka',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507224899/9b56505f3a',
        },
      ],
    }),
    _getTask({
      id: 11,
      name: 'Przedziały liczb',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507224736/99c8409343',
        },
      ],
    }),
    _getTask({
      id: 12,
      name: 'Piętro',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507224514/b38fd378ab',
        },
      ],
    }),
    _getTask({
      id: 13,
      name: 'Wspaniałe trójki',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507224368/8645364be6',
        },
      ],
    }),
    _getTask({
      id: 14,
      name: 'Trójkąt',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507224265/bf3dc37b64',
        },
      ],
    }),
    _getTask({
      id: 15,
      name: 'Banknoty',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507224151/f7b03958db',
        },
      ],
    }),
    _getTask({
      id: 16,
      name: 'Równe karty',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507224003/4b165d7e50',
        },
      ],
    }),
    _getTask({
      id: 17,
      name: 'Odwróć część tablicy',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507223857/4fa9fe165c',
        },
      ],
    }),
    _getTask({
      id: 18,
      name: 'Strony',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507223787/beb863343a',
        },
      ],
    }),
    _getTask({
      id: 19,
      name: 'Docelowa suma',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507223374/ae96df1944',
        },
      ],
    }),
    _getTask({
      id: 20,
      name: 'Suma dwóch najwiekszych',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507223307/307579bbd1',
        },
      ],
    }),
    _getTask({
      id: 21,
      name: 'Równe tablice',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507223225/a1a8bbf4d3',
        },
      ],
    }),
    _getTask({
      id: 22,
      name: 'Najmniejsze zaokrąglenie',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507223108/1df42c737c',
        },
      ],
    }),
    _getTask({
      id: 23,
      name: 'Suma prawie dwóch największych',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222936/ab0fadee97',
        },
      ],
    }),
    _getTask({
      id: 24,
      name: 'Dziwna wojna',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222859/ce4187f91d',
        },
      ],
    }),
    _getTask({
      id: 25,
      name: 'Binarna choinka',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222759/0c5a9c5dde',
        },
      ],
    }),
    _getTask({
      id: 26,
      name: 'Sekwencja liczb',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222707/ab3050b19e',
        },
      ],
    }),
    _getTask({
      id: 27,
      name: 'Odległość liczb',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222651/23f3b5bf00',
        },
      ],
    }),
    _getTask({
      id: 28,
      name: 'Najdłuższy rosnący ciąg',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222556/033a8e1940',
        },
      ],
    }),
    _getTask({
      id: 29,
      name: 'Hazardzista',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222453/ad1c4e4ee8',
        },
      ],
    }),
    _getTask({
      id: 30,
      name: 'Mikstura',
      videoSolution: [
        {
          type: 'vimeo',
          url: 'https://vimeo.com/507222453/ad1c4e4ee8',
        },
      ],
    }),
  ],
};
