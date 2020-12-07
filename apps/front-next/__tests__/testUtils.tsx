import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { NextRouter } from 'next/router';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import '@testing-library/jest-dom/extend-expect';

// import { render, unmountComponentAtNode } from 'react-dom';

// let container: HTMLDivElement = null!;

// export function getByTestId(testId: string) {

//   // return container.querySelector(`[data-test="${testId}"]`);
// }

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null!;
// });

const customRender = (
  children: React.ReactNode,
  { router = {} }: { router?: Partial<NextRouter> } = {}
) => {
  // render(
  //   <RouterContext.Provider value={{ ...mockRouter, ...router }}>
  //     {children}
  //   </RouterContext.Provider>,
  //   container
  // );
  return act(async () => {
    render(
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        {children}
      </RouterContext.Provider>
    );
  });
};

type Args<T> = T extends (...args: infer U) => any ? U : never;

export function mockFn<T extends (...args: any[]) => any>(): jest.Mock<
  ReturnType<T>,
  Args<T>
> {
  return jest.fn() as any;
}

export { customRender as render };

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};
