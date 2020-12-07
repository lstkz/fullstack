import React from 'react';
import { mocked } from 'ts-jest/utils';
import { mockFn, render } from './testUtils';
import { ConfirmEmailChecker } from '../src/features/ConfirmEmailChecker';
import { SubscriptionModalsModule } from 'src/features/SubscriptionModalsModule';
import { ErrorModalModule } from 'src/features/ErrorModalModule';
import { NextRouter } from 'next/router';
import { screen } from '@testing-library/react';
import { api } from 'src/services/api';

const mockedApi = mocked(api);

const replace = mockFn<NextRouter['replace']>();

beforeEach(() => {
  replace.mockReset();
});

function _run(query: Record<string, string>) {
  return render(
    <SubscriptionModalsModule>
      <ErrorModalModule>
        <ConfirmEmailChecker />
      </ErrorModalModule>
    </SubscriptionModalsModule>,
    {
      router: {
        pathname: '/foo',
        query: query,
        replace,
      },
    }
  );
}

it('should confirm code', async () => {
  api.emailSubscription_confirmSubscription = jest.fn(async () => {});

  await _run({
    'confirm-email': 'adb',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_confirmSubscription).toBeCalledWith('adb');
  expect(screen.queryByTestId('SubConfirmedModal')).toBeVisible();
  expect(screen.queryByTestId('ErrorModal')).toBeNull();
});

it('error when confirm code', async () => {
  api.emailSubscription_confirmSubscription = jest.fn(async () => {
    throw new Error('foo');
  });

  await _run({
    'confirm-email': 'adb',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_confirmSubscription).toBeCalledWith('adb');
  expect(screen.queryByTestId('SubConfirmedModal')).toBeNull();
  expect(screen.queryByTestId('ErrorModal')).toBeVisible();
});

it('should unsubscribe', async () => {
  api.emailSubscription_unsubscribe = jest.fn(async () => {});

  await _run({
    email: 'a1',
    unsubscribe: 'a2',
    source: 'a3',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_unsubscribe).toBeCalledWith(
    'a1',
    'a2',
    'a3'
  );
  expect(screen.queryByTestId('SubRemovedModal')).toBeVisible();
  expect(screen.queryByTestId('ErrorModal')).toBeNull();
});

it('error when unsubscribe', async () => {
  api.emailSubscription_unsubscribe = jest.fn(async () => {
    throw new Error('foo');
  });

  await _run({
    email: 'a1',
    unsubscribe: 'a2',
    source: 'a3',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_unsubscribe).toBeCalledWith(
    'a1',
    'a2',
    'a3'
  );
  expect(screen.queryByTestId('SubRemovedModal')).toBeNull();
  expect(screen.queryByTestId('ErrorModal')).toBeVisible();
});
