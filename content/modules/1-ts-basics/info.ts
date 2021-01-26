import { ModuleTaskUpload, ModuleUpload, VideoUpload } from 'shared';

const sampleSources = [
  {
    resolution: '5k',
    url:
      'https://cdn.fullstack.pl/assets/sample-5k.54466dbf1212bb0bdb39ef875194dfc6.mp4',
  },
  {
    resolution: '1080',
    url:
      'https://cdn.fullstack.pl/assets/sample-1080p.d6867acbd6a566fb3ad237aaa70b6876.mp4',
  },
  {
    resolution: '720',
    url:
      'https://cdn.fullstack.pl/assets/sample-720p.3624bbf94bc8491650e64a72f58b0529.mp4',
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
      sources:
        // [
        //   {
        //     resolution: '4k',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-1-4k.c75b9f12b7764492cf30c8107e81c30b.mp4',
        //   },
        //   {
        //     resolution: '1080p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-1-1080p.60692c62cc679787d91b6450cb856741.mp4',
        //   },
        //   {
        //     resolution: '720p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-1-720p.7a3ce5291f95489b634d5868db9c6841.mp4',
        //   },
        // ],
        [
          {
            resolution: '4k',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-1-4k.92bb0e3baff01f32a365c3002053f41d.mp4',
          },
          {
            resolution: '1080p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-1-1080p.5b44397d00e8e6b3e9076935c7e2a2f1.mp4',
          },
          {
            resolution: '720p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-1-720p.eb0324afa215c87cb570758492a80bd7.mp4',
          },
        ],
    },
    {
      id: 2,
      name:
        'Deklaracja zmiennych: number, string, boolean, null, undefined, any.',
      duration: '8:55',
      sources:
        // [
        //   {
        //     resolution: '4k',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-2-4k.e52adedb369efe8133e73193cbfb9da1.mp4',
        //   },
        //   {
        //     resolution: '1080p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-2-1080p.811e4cb050c4e76d7ec0732c35c9be4e.mp4',
        //   },
        //   {
        //     resolution: '720p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-2-720p.81ff9a6b04c906278e51c1afde1be388.mp4',
        //   },
        // ],
        [
          {
            resolution: '4k',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-2-4k.bd1274261274e46270e27ac9f1941e5d.mp4',
          },
          {
            resolution: '1080p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-2-1080p.f049c7450a1c19575cb80b341c939b1f.mp4',
          },
          {
            resolution: '720p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-2-720p.accb03d6d6aa6356f0249f2feeec34db.mp4',
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
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-3-4k.c2a00336153d41b6b0e141cbd84a0f51.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-3-1080p.54f9d63517b6856bb3e56dc599ac0638.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-3-720p.49c512a6635e615fc09e47c7812b6300.mp4',
        },
      ],
    },
    {
      id: 4,
      name: 'Operatory binarne.',
      duration: '5:04',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-4-4k.be09a55c5e820b4708f54ded603a448c.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-4-1080p.da3cef380af9c3b6873604b2e2f68c71.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-4-720p.bf387b5093bf37ff47dfc6058566cd15.mp4',
        },
      ],
    },
    {
      id: 5,
      name: 'Instrukcje warunkowe If, ternary operator, falsy values.',
      duration: '8:02',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-5-4k.3e0ed3f802eb59e350892520dea4af78.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-5-1080p.4c2ec2400ad9de23c92fc1390923f9e2.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-5-720p.ff4ed20aa47e4493f9a46d3f80df7d39.mp4',
        },
      ],
    },
  ],
  tasks: [
    _getTask({
      id: 1,
      name: 'Środkowa liczba',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 2,
      name: 'Pełna kwota',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 3,
      name: 'Najcieplejszy miesiac',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 4,
      name: 'Okrągła suma',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 5,
      name: 'Wygrane pod rząd',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({ id: 6, name: 'Clamp', videoSolution: sampleSources }),
    _getTask({
      id: 7,
      name: 'Cykliczna tablica',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 8,
      name: 'Niedokładne liczby',
      videoSolution: sampleSources,
    }),
    _getTask({ id: 9, name: 'Brakująca liczba', videoSolution: sampleSources }),
    _getTask({ id: 10, name: 'Gra w światełka', videoSolution: sampleSources }),
    _getTask({
      id: 11,
      name: 'Przedziały liczb',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 12,
      name: 'Piętro',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 13,
      name: 'Wspaniałe trójki',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 14,
      name: 'Trójkąt',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 15,
      name: 'Banknoty',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 16,
      name: 'Równe karty',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 17,
      name: 'Odwróć część tablicy',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 18,
      name: 'Strony',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 19,
      name: 'Docelowa suma',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 20,
      name: 'Suma dwóch najwiekszych',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 21,
      name: 'Równe tablice',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 22,
      name: 'Najmniejsze zaokrąglenie',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 23,
      name: 'Suma prawie dwóch największych',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 24,
      name: 'Dziwna wojna',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 25,
      name: 'Binarna choinka',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 26,
      name: 'Sekwencja liczb',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 27,
      name: 'Odległość liczb',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 28,
      name: 'Najdłuższy rosnący ciąg',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 29,
      name: 'Hazardzista',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 30,
      name: 'Mikstura',
      videoSolution: sampleSources,
    }),
  ],
};
